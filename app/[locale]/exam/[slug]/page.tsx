import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { Clock, BookOpen, CheckCircle, ChevronRight, Lock } from "lucide-react";
import ExamPurchaseButton from "./ExamPurchaseButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SAT_STRUCTURE = [
  { section: "Reading & Writing", modules: 2, questionsPerModule: 27, minutesPerModule: 32 },
  { section: "Math", modules: 2, questionsPerModule: 22, minutesPerModule: 35 },
];

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { userId } = await auth();

  const examResult = await getExamBySlug(slug);
  if (!examResult.success || !examResult.exam) notFound();

  const exam = examResult.exam as {
    _id: string;
    title: string;
    description: string;
    type: string;
    price: number;
    totalDuration: number;
    coverImage: string;
    slug: string;
  };

  // Check purchase and attempts
  let purchase = null;
  let inProgressAttempt = null;
  let completedAttempts: Array<{ _id: string; scores?: { total?: number }; startedAt: string }> = [];

  if (userId) {
    const [purchaseResult, attemptsResult] = await Promise.all([
      getUserPurchaseForExam(userId, exam._id),
      getUserAttempts(userId, exam._id),
    ]);
    purchase = purchaseResult.purchase;
    if (attemptsResult.success) {
      const attempts = attemptsResult.attempts as Array<{
        _id: string;
        status: string;
        scores?: { total?: number };
        startedAt: string;
      }>;
      inProgressAttempt = attempts.find((a) => a.status === "in_progress") || null;
      completedAttempts = attempts.filter((a) => a.status === "completed");
    }
  }

  const hasPurchase = !!purchase;

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">
        {/* Hero */}
        <section className="relative pt-16 pb-12 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Left: info */}
              <div className="flex-1">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                  {exam.type} Mock Exam
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {exam.title}
                </h1>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  {exam.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    {exam.totalDuration} minutes total
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    98 questions across 4 modules
                  </span>
                </div>
              </div>

              {/* Right: purchase card */}
              <div className="w-full lg:w-80 bg-white/5 border border-white/10 rounded-2xl p-6 flex-shrink-0">
                <div className="text-3xl font-bold text-white mb-1">
                  ₼{(exam.price / 100).toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm mb-6">One-time payment • Unlimited retakes</p>

                {!userId ? (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400 text-center">
                      Sign in to purchase this exam
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="/sign-in"
                        className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        Sign In
                      </a>
                      <a
                        href="/sign-up"
                        className="flex-1 text-center bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                ) : hasPurchase ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      Purchased
                    </div>
                    {inProgressAttempt ? (
                      <Link
                        href={`/exam/${slug}/take`}
                        className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Continue Exam
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link
                        href={`/exam/${slug}/take`}
                        className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Start Exam
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                    {completedAttempts.length > 0 && (
                      <Link
                        href={`/exam/${slug}/results/${completedAttempts[0]._id}`}
                        className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-white/40 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        View Latest Results
                      </Link>
                    )}
                  </div>
                ) : (
                  <ExamPurchaseButton
                    examId={exam._id}
                    price={exam.price}
                  />
                )}

                <div className="mt-4 space-y-2">
                  {[
                    "Full Digital SAT simulation",
                    "Adaptive Module 2",
                    "Section scores (R&W + Math)",
                    "Question-by-question review",
                    "Retake anytime",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exam structure */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-6">Exam Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAT_STRUCTURE.map((s) => (
              <div
                key={s.section}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <h3 className="text-white font-semibold mb-3">{s.section}</h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between">
                    <span>Modules</span>
                    <span className="text-white font-medium">{s.modules}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions per module</span>
                    <span className="text-white font-medium">{s.questionsPerModule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time per module</span>
                    <span className="text-white font-medium">{s.minutesPerModule} min</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                    <span>Total time</span>
                    <span className="text-accent font-semibold">
                      {s.modules * s.minutesPerModule} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
            <Lock className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              <strong className="text-white">Adaptive Scoring:</strong> Module 2 difficulty is
              automatically adjusted based on your Module 1 performance — harder Module 2 if you
              scored ≥60%, easier if below. This mirrors how the real Digital SAT works.
            </p>
          </div>
        </section>

        {/* Previous attempts */}
        {completedAttempts.length > 1 && (
          <section className="max-w-5xl mx-auto px-6 pb-12">
            <h2 className="text-xl font-bold text-white mb-4">Previous Attempts</h2>
            <div className="space-y-2">
              {completedAttempts.map((attempt, i) => (
                <Link
                  key={attempt._id}
                  href={`/exam/${slug}/results/${attempt._id}`}
                  className="flex items-center justify-between bg-white/5 border border-white/10 hover:border-accent/30 rounded-xl px-5 py-3 transition-colors"
                >
                  <div>
                    <p className="text-sm text-white font-medium">Attempt #{completedAttempts.length - i}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(attempt.startedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    {attempt.scores?.total !== undefined && (
                      <p className="text-lg font-bold text-accent">{attempt.scores.total}</p>
                    )}
                    <p className="text-xs text-slate-400">/ 1600</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
