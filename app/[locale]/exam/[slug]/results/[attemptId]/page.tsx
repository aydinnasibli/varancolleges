import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getAttemptById } from "@/app/actions/exam-public";
import { getExamBySlug } from "@/app/actions/exam-public";
import Question from "@/models/Question";
import dbConnect from "@/lib/db";
import ExamNavbar from "@/components/exam/ExamNavbar";
import ResultsQuestionCard from "@/components/exam/ResultsQuestionCard";
import { Link } from "@/i18n/routing";
import TakeExamButton from "../../TakeExamButton";
import { Trophy, Target, RotateCcw, CheckCircle, XCircle, MinusCircle, User } from "lucide-react";
import { answersMatch } from "@/lib/answer-utils";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

type QuestionRow = {
  _id: { toString(): string };
  questionNumber: number;
  module: number;
  section: string;
  questionText: string;
  passageText?: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  questionType?: string;
  explanation?: string;
  domain?: string;
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ slug: string; attemptId: string }>;
}) {
  const { slug, attemptId } = await params;
  const { userId } = await auth();
  if (!userId) redirect(`/exam/${slug}`);

  const [examResult, attemptResult] = await Promise.all([
    getExamBySlug(slug),
    getAttemptById(attemptId, userId),
  ]);

  if (!examResult.success || !examResult.exam) notFound();
  if (!attemptResult.success || !attemptResult.attempt) notFound();

  const exam = examResult.exam as { _id: string; title: string; type: string };
  const attempt = attemptResult.attempt as {
    status: string;
    scores?: { rw?: number; math?: number; total?: number };
    answers: Array<{ questionId: string; selectedAnswer: string | null; isFlagged: boolean }>;
    startedAt: string;
    completedAt?: string;
  };

  if (attempt.status !== "completed") redirect(`/exam/${slug}/take`);

  await dbConnect();
  const allQuestions = await Question.find({ examId: exam._id }).lean();

  const answerMap = new Map(attempt.answers.map((a) => [a.questionId, a]));
  const attemptQuestionIds = new Set(attempt.answers.map((a) => a.questionId));

  const reviewQuestions: QuestionRow[] = (allQuestions as unknown as QuestionRow[])
    .filter((q) => attemptQuestionIds.has(q._id.toString()))
    .sort((a, b) => {
      const sO = { reading_writing: 0, math: 1 } as Record<string, number>;
      const sd = (sO[a.section] ?? 0) - (sO[b.section] ?? 0);
      if (sd !== 0) return sd;
      if (a.module !== b.module) return a.module - b.module;
      return a.questionNumber - b.questionNumber;
    });

  const scores = attempt.scores || {};
  const rwScore = scores.rw ?? 0;
  const mathScore = scores.math ?? 0;
  const totalScore = scores.total ?? 0;

  const rwQuestions = reviewQuestions.filter((q) => q.section === "reading_writing");
  const mathQuestions = reviewQuestions.filter((q) => q.section === "math");

  const isCorrectQ = (q: QuestionRow) => {
    const sel = answerMap.get(q._id.toString())?.selectedAnswer ?? null;
    return q.questionType === "free_response"
      ? answersMatch(sel ?? "", q.correctAnswer)
      : sel === q.correctAnswer;
  };

  const rwCorrect = rwQuestions.filter(isCorrectQ).length;
  const mathCorrect = mathQuestions.filter(isCorrectQ).length;
  const totalCorrect = rwCorrect + mathCorrect;
  const totalSkipped = reviewQuestions.filter(
    (q) => !answerMap.get(q._id.toString())?.selectedAnswer
  ).length;
  const totalWrong = reviewQuestions.length - totalCorrect - totalSkipped;

  // Per-module counts for the overview grid
  const modules = [
    { key: "rw_m1", label: "R&W Module 1", qs: rwQuestions.filter((q) => q.module === 1) },
    { key: "rw_m2", label: "R&W Module 2", qs: rwQuestions.filter((q) => q.module === 2) },
    { key: "math_m1", label: "Math Module 1", qs: mathQuestions.filter((q) => q.module === 1) },
    { key: "math_m2", label: "Math Module 2", qs: mathQuestions.filter((q) => q.module === 2) },
  ].filter((m) => m.qs.length > 0);

  // Global sequential index for anchor ids
  let globalIdx = 0;
  const indexedQuestions = reviewQuestions.map((q) => ({ q, gi: ++globalIdx }));

  const scoreColour =
    totalScore >= 1400
      ? "text-emerald-400"
      : totalScore >= 1100
      ? "text-accent"
      : "text-orange-400";

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark pb-24">
        {/* ── Score hero ──────────────────────────────────────────────── */}
        <section className="border-b border-white/5 py-12 bg-gradient-to-b from-accent/5 via-primary/10 to-transparent">
          <div className="max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
              <Link href="/profile" className="hover:text-accent transition-colors flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> My Profile
              </Link>
              <span>/</span>
              <span className="text-slate-400">{exam.title}</span>
              <span>/</span>
              <span>
                {new Date(attempt.startedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              {/* Left: scores */}
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <Trophy className="h-4 w-4 text-accent" />
                  {exam.title} — Results
                </div>
                <div className={`text-7xl font-bold mb-1 ${scoreColour}`}>{totalScore}</div>
                <div className="text-slate-500 text-base mb-6">out of 1600</div>

                {/* Score bar */}
                <div className="max-w-xs">
                  <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                    <span>400</span>
                    <span>1600</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-emerald-400 rounded-full"
                      style={{ width: `${Math.max(0, ((totalScore - 400) / 1200) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: section breakdown */}
              <div className="flex flex-col gap-3 min-w-[220px]">
                {[
                  {
                    label: "Reading & Writing",
                    score: rwScore,
                    correct: rwCorrect,
                    total: rwQuestions.length,
                  },
                  {
                    label: "Math",
                    score: mathScore,
                    correct: mathCorrect,
                    total: mathQuestions.length,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                  >
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      {s.label}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <span className="text-3xl font-bold text-white">{s.score}</span>
                      <span className="text-sm text-slate-400 mb-0.5">
                        {s.correct}/{s.total} correct
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent/70 rounded-full"
                        style={{ width: `${s.total > 0 ? (s.correct / s.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary chips */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="flex items-center gap-1.5 text-sm text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-3.5 w-3.5" />
                {totalCorrect} correct
              </span>
              <span className="flex items-center gap-1.5 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1.5 rounded-full">
                <XCircle className="h-3.5 w-3.5" />
                {totalWrong} wrong
              </span>
              {totalSkipped > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <MinusCircle className="h-3.5 w-3.5" />
                  {totalSkipped} skipped
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <TakeExamButton
                href={`/exam/${slug}/take`}
                label="Retake Exam"
              />
              <Link
                href="/profile"
                className="flex items-center gap-2 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                My Profile
              </Link>
            </div>
          </div>
        </section>

        {/* ── Question overview grid ───────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 pt-10">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Question Overview
          </h2>

          <div className="space-y-5">
            {modules.map((mod) => {
              // find the global index offset for this module's questions
              return (
                <div key={mod.key}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {mod.label} ·{" "}
                    {mod.qs.filter(isCorrectQ).length}/{mod.qs.length} correct
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mod.qs.map((q) => {
                      const sel = answerMap.get(q._id.toString())?.selectedAnswer ?? null;
                      const correct = isCorrectQ(q);
                      const skipped = !sel;
                      const gi = indexedQuestions.find((x) => x.q._id.toString() === q._id.toString())?.gi ?? 0;
                      return (
                        <a
                          key={q._id.toString()}
                          href={`#q-${gi}`}
                          title={`Q${gi} — ${skipped ? "Skipped" : correct ? "Correct" : "Wrong"}`}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 ${
                            skipped
                              ? "bg-white/10 text-slate-500 border border-white/10"
                              : correct
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {q.questionNumber}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-5 pt-4 border-t border-white/5">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-green-500/30 inline-block" /> Correct
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-red-500/30 inline-block" /> Wrong
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-white/10 inline-block" /> Skipped
            </span>
          </div>
        </section>

        {/* ── Question review ──────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 pt-10">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Question Review
          </h2>

          <QuestionSection
            title="Reading & Writing"
            questions={rwQuestions}
            answerMap={answerMap}
            isCorrectQ={isCorrectQ}
            indexedQuestions={indexedQuestions}
          />

          <QuestionSection
            title="Math"
            questions={mathQuestions}
            answerMap={answerMap}
            isCorrectQ={isCorrectQ}
            indexedQuestions={indexedQuestions}
          />
        </section>
      </main>
    </>
  );
}

function QuestionSection({
  title,
  questions,
  answerMap,
  isCorrectQ,
  indexedQuestions,
}: {
  title: string;
  questions: QuestionRow[];
  answerMap: Map<string, { selectedAnswer: string | null; isFlagged: boolean }>;
  isCorrectQ: (q: QuestionRow) => boolean;
  indexedQuestions: Array<{ q: QuestionRow; gi: number }>;
}) {
  if (questions.length === 0) return null;

  const correct = questions.filter(isCorrectQ).length;
  const byModule = [1, 2].map((m) => questions.filter((q) => q.module === m));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <span className="text-sm text-slate-400">
          {correct}/{questions.length} correct
        </span>
      </div>

      {byModule.map((qs, mi) => {
        if (qs.length === 0) return null;
        return (
          <div key={mi} className="mb-6">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Module {mi + 1}
            </p>
            <div className="space-y-2">
              {qs.map((q) => {
                const answer = answerMap.get(q._id.toString());
                const selected = answer?.selectedAnswer;
                const isFR = q.questionType === "free_response";
                const isCorrect = isFR
                  ? answersMatch(selected ?? "", q.correctAnswer)
                  : selected === q.correctAnswer;
                const isSkipped = !selected;
                const gi =
                  indexedQuestions.find((x) => x.q._id.toString() === q._id.toString())?.gi ?? 0;

                return (
                  <ResultsQuestionCard
                    key={q._id.toString()}
                    id={`q-${gi}`}
                    index={gi}
                    question={q}
                    selected={selected}
                    isCorrect={isCorrect}
                    isSkipped={isSkipped}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
