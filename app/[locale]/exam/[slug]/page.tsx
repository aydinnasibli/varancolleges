import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { Clock, BookOpen, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import ExamPurchaseButton from "./ExamPurchaseButton";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

const SAT_STRUCTURE = [
  { section: "Reading & Writing", modules: 2, questionsPerModule: 27, minutesPerModule: 32 },
  { section: "Math", modules: 2, questionsPerModule: 22, minutesPerModule: 35 },
];

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const [{ userId }, t] = await Promise.all([auth(), getTranslations("Exam.detail")]);

  const examResult = await getExamBySlug(slug);
  if (!examResult.success || !examResult.exam) notFound();

  const exam = examResult.exam as {
    _id: string; title: string; description: string; type: string;
    price: number; totalDuration: number; coverImage: string; slug: string;
  };

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
      const attempts = attemptsResult.attempts as Array<{ _id: string; status: string; scores?: { total?: number }; startedAt: string }>;
      inProgressAttempt = attempts.find((a) => a.status === "in_progress") || null;
      completedAttempts = attempts.filter((a) => a.status === "completed");
    }
  }

  const hasPurchase = !!purchase;

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <ExamNavbar />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            {exam.type} {t("mockExam")}
          </p>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
            {exam.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {exam.description}
          </p>
          <div className="mt-10 flex justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              {exam.totalDuration} {t("minutesTotal")}
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              98 {t("questionsAcross")}
            </span>
          </div>
          <div className="mt-6 flex justify-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">VaranColleges</Link>
            <span className="text-accent">•</span>
            <Link href="/exam" className="hover:text-white transition-colors">{t("mockExam")}s</Link>
            <span className="text-accent">•</span>
            <span className="text-white">{exam.title}</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: structure + attempts */}
            <div className="lg:col-span-2 space-y-12">
              {/* Exam Structure */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-2">{t("examStructure")}</h2>
                <div className="w-12 h-px bg-accent mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SAT_STRUCTURE.map((s) => (
                    <div key={s.section} className="border border-white/5 rounded-lg p-6 bg-primary/10">
                      <h3 className="text-white font-serif font-semibold mb-4 text-lg">{s.section}</h3>
                      <div className="space-y-3 text-sm">
                        {[
                          [t("modules"), s.modules],
                          [t("questionsPerModule"), s.questionsPerModule],
                          [t("timePerModule"), `${s.minutesPerModule} min`],
                        ].map(([label, val]) => (
                          <div key={label as string} className="flex justify-between text-slate-400">
                            <span className="font-light">{label}</span>
                            <span className="text-white font-medium">{val}</span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-3 border-t border-white/5">
                          <span className="text-slate-400 font-light">{t("totalTime")}</span>
                          <span className="text-accent font-semibold">{s.modules * s.minutesPerModule} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous attempts */}
              {completedAttempts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-2">{t("previousAttempts")}</h2>
                  <div className="w-12 h-px bg-accent mb-8" />
                  <div className="space-y-3">
                    {completedAttempts.map((attempt, i) => (
                      <Link
                        key={attempt._id}
                        href={`/exam/${slug}/results/${attempt._id}`}
                        className="flex items-center justify-between border border-white/5 hover:border-accent/30 rounded-lg px-6 py-4 transition-colors group"
                      >
                        <div>
                          <p className="text-sm text-white font-medium group-hover:text-accent transition-colors">
                            {t("attempt")} #{completedAttempts.length - i}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {new Date(attempt.startedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          {attempt.scores?.total !== undefined && (
                            <span className="text-xl font-serif font-bold text-accent">{attempt.scores.total}
                              <span className="text-xs text-slate-500 font-normal ml-1">/ 1600</span>
                            </span>
                          )}
                          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-accent transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: purchase card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-white/10 rounded-lg p-8 bg-primary/20 backdrop-blur-sm">
                <div className="text-4xl font-serif font-bold text-white mb-1">
                  ₼{(exam.price / 100).toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm font-light mb-8">{t("oneTimePayment")}</p>

                {!userId ? (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 text-center font-light">
                      {t("signInToPurchase")}
                    </p>
                    <div className="flex gap-3">
                      <a href="/sign-in" className="flex-1 text-center border border-white/20 hover:border-white/40 text-white py-2.5 rounded text-sm font-medium transition-colors">
                        {t("signIn")}
                      </a>
                      <a href="/sign-up" className="flex-1 text-center bg-accent hover:bg-accent/90 text-primary py-2.5 rounded text-sm font-semibold transition-colors">
                        {t("signUp")}
                      </a>
                    </div>
                  </div>
                ) : hasPurchase ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
                      <CheckCircle className="h-4 w-4" />
                      {t("purchased")}
                    </div>
                    {inProgressAttempt ? (
                      <Link href={`/exam/${slug}/take`} className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-3 rounded text-sm font-semibold transition-colors">
                        {t("continueExam")} <ChevronRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link href={`/exam/${slug}/take`} className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-3 rounded text-sm font-semibold transition-colors">
                        {t("startExam")} <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                    {completedAttempts.length > 0 && (
                      <Link href={`/exam/${slug}/results/${completedAttempts[0]._id}`} className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-white/40 text-white py-3 rounded text-sm font-medium transition-colors">
                        {t("viewLatestResults")}
                      </Link>
                    )}
                  </div>
                ) : (
                  <ExamPurchaseButton examId={exam._id} price={exam.price} />
                )}

                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                  {(["fullSimulation", "timedModules", "sectionScores", "questionReview", "retakeAnytime"] as const).map((key) => (
                    <div key={key} className="flex items-center gap-3 text-xs text-slate-400 font-light">
                      <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      {t(`features.${key}`)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
