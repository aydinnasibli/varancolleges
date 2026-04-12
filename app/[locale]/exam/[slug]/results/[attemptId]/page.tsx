import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getAttemptById } from "@/app/actions/exam-public";
import { getExamBySlug } from "@/app/actions/exam-public";
import Question from "@/models/Question";
import dbConnect from "@/lib/db";
import ExamNavbar from "@/components/exam/ExamNavbar";
import ResultsQuestionCard from "@/components/exam/ResultsQuestionCard";
import Link from "next/link";
import { Trophy, Target, RotateCcw } from "lucide-react";
import { answersMatch } from "@/lib/answer-utils";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ slug: string; attemptId: string }>;
}) {
  const { slug, attemptId } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect(`/exam/${slug}`);
  }

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

  if (attempt.status !== "completed") {
    redirect(`/exam/${slug}/take`);
  }

  // Load all questions for this attempt's exam
  await dbConnect();
  const allQuestions = await Question.find({ examId: exam._id }).lean();

  // Map answers by questionId
  const answerMap = new Map(
    attempt.answers.map((a) => [a.questionId, a])
  );

  // Build question review list (only questions that appear in this attempt)
  const attemptQuestionIds = new Set(attempt.answers.map((a) => a.questionId));
  const reviewQuestions = allQuestions
    .filter((q) => attemptQuestionIds.has(q._id.toString()))
    .sort((a, b) => {
      // Sort: RW M1 → RW M2 → Math M1 → Math M2
      const sectionOrder = { reading_writing: 0, math: 1 };
      const sectionDiff = sectionOrder[a.section] - sectionOrder[b.section];
      if (sectionDiff !== 0) return sectionDiff;
      if (a.module !== b.module) return a.module - b.module;
      return a.questionNumber - b.questionNumber;
    });

  const scores = attempt.scores || {};
  const rwScore = scores.rw ?? 0;
  const mathScore = scores.math ?? 0;
  const totalScore = scores.total ?? 0;

  // Count by section
  const rwQuestions = reviewQuestions.filter((q) => q.section === "reading_writing");
  const mathQuestions = reviewQuestions.filter((q) => q.section === "math");
  const rwCorrect = rwQuestions.filter((q) => {
    const sel = answerMap.get(q._id.toString())?.selectedAnswer ?? null;
    return q.questionType === "free_response"
      ? answersMatch(sel ?? "", q.correctAnswer)
      : sel === q.correctAnswer;
  }).length;
  const mathCorrect = mathQuestions.filter((q) => {
    const sel = answerMap.get(q._id.toString())?.selectedAnswer ?? null;
    return q.questionType === "free_response"
      ? answersMatch(sel ?? "", q.correctAnswer)
      : sel === q.correctAnswer;
  }).length;

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark pb-20">
        {/* Score hero */}
        <section className="border-b border-white/5 py-12 bg-gradient-to-b from-primary/30 to-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4">
              <Trophy className="h-4 w-4" />
              {exam.title} — Results
            </div>

            <div className="text-7xl font-bold text-white mb-2">{totalScore}</div>
            <div className="text-slate-400 text-lg mb-8">out of 1600</div>

            {/* Section scores */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Reading & Writing</p>
                <p className="text-3xl font-bold text-white">{rwScore}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {rwCorrect}/{rwQuestions.length} correct
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Math</p>
                <p className="text-3xl font-bold text-white">{mathScore}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {mathCorrect}/{mathQuestions.length} correct
                </p>
              </div>
            </div>

            {/* Score bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>400</span>
                <span>1600</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-green-400 rounded-full transition-all"
                  style={{ width: `${((totalScore - 400) / 1200) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-center">
              <Link
                href={`/exam/${slug}/take`}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Retake Exam
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                My Profile
              </Link>
            </div>
          </div>
        </section>

        {/* Question review */}
        <section className="max-w-4xl mx-auto px-6 pt-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Question Review
          </h2>

          {/* RW Section */}
          <QuestionSection
            title="Reading & Writing"
            questions={rwQuestions}
            answerMap={answerMap}
          />

          {/* Math Section */}
          <QuestionSection
            title="Math"
            questions={mathQuestions}
            answerMap={answerMap}
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
}: {
  title: string;
  questions: Array<{
    _id: { toString(): string };
    questionNumber: number;
    module: number;
    questionText: string;
    passageText?: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    questionType?: string;
    explanation?: string;
    domain?: string;
  }>;
  answerMap: Map<string, { selectedAnswer: string | null; isFlagged: boolean }>;
}) {
  if (questions.length === 0) return null;

  const correct = questions.filter((q) => {
    const sel = answerMap.get(q._id.toString())?.selectedAnswer ?? null;
    return q.questionType === "free_response"
      ? answersMatch(sel ?? "", q.correctAnswer)
      : sel === q.correctAnswer;
  }).length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-sm text-slate-400">
          {correct}/{questions.length} correct
        </span>
      </div>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const answer = answerMap.get(q._id.toString());
          const selected = answer?.selectedAnswer;
          const isFR = q.questionType === "free_response";
          const isCorrect = isFR
            ? answersMatch(selected ?? "", q.correctAnswer)
            : selected === q.correctAnswer;
          const isSkipped = !selected;

          return (
            <ResultsQuestionCard
              key={q._id.toString()}
              index={i + 1}
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
}

