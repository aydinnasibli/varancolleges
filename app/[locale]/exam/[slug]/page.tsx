import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { Clock, BookOpen, CheckCircle, ChevronRight, Calculator, Languages } from "lucide-react";
import ExamPurchaseButton from "./ExamPurchaseButton";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

const SAT_STRUCTURE = [
  { section: "Reading & Writing", modules: 2, questionsPerModule: 27, minutesPerModule: 32, icon: Languages, accentClass: "border-t-accent/60 border-accent/20", iconColor: "text-accent", iconBg: "bg-accent/15", totalColor: "text-accent" },
  { section: "Math", modules: 2, questionsPerModule: 22, minutesPerModule: 35, icon: Calculator, accentClass: "border-t-secondary/60 border-secondary/20", iconColor: "text-secondary", iconBg: "bg-secondary/15", totalColor: "text-secondary" },
];

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const [{ userId }, t] = await Promise.all([
    auth(),
    getTranslations("Exam.detail"),
  ]);

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
        <section className="relative pt-16 pb-12 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent/6 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-56 h-56 bg-secondary/6 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Left: info */}
              <div className="flex-1">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                  {exam.type} {t("mockExam")}
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
                    {exam.totalDuration} {t("minutesTotal")}
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    98 {t("questionsAcross")}
                  </span>
                </div>
              </div>

              {/* Right: purchase card */}
              <div className="w-full lg:w-80 bg-gradient-to-b from-white/8 to-white/3 border border-white/20 rounded-2xl p-6 flex-shrink-0 shadow-lg shadow-accent/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent">
                    {exam.type}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  ₼{(exam.price / 100).toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm mb-6">{t("oneTimePayment")}</p>

                {!userId ? (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400 text-center">
                      {t("signInToPurchase")}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="/sign-in"
                        className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        {t("signIn")}
                      </a>
                      <a
                        href="/sign-up"
                        className="flex-1 text-center bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        {t("signUp")}
                      </a>
                    </div>
                  </div>
                ) : hasPurchase ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      {t("purchased")}
                    </div>
                    {inProgressAttempt ? (
                      <Link
                        href={`/exam/${slug}/take`}
                        className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        {t("continueExam")}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link
                        href={`/exam/${slug}/take`}
                        className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        {t("startExam")}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                    {completedAttempts.length > 0 && (
                      <Link
                        href={`/exam/${slug}/results/${completedAttempts[0]._id}`}
                        className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-white/40 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        {t("viewLatestResults")}
                      </Link>
                    )}
                  </div>
                ) : (
                  <ExamPurchaseButton examId={exam._id} price={exam.price} />
                )}

                <div className="mt-4 space-y-2">
                  {(["fullSimulation", "timedModules", "sectionScores", "questionReview", "retakeAnytime"] as const).map((key) => (
                    <div key={key} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                      {t(`features.${key}`)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exam structure */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-6">{t("examStructure")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAT_STRUCTURE.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.section} className={`bg-white/5 border border-t-2 ${s.accentClass} rounded-xl p-5`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-5 w-5 ${s.iconColor}`} />
                    </div>
                    <h3 className="text-white font-semibold">{s.section}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>{t("modules")}</span>
                      <span className="text-white font-medium">{s.modules}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("questionsPerModule")}</span>
                      <span className="text-white font-medium">{s.questionsPerModule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("timePerModule")}</span>
                      <span className="text-white font-medium">{s.minutesPerModule} min</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                      <span>{t("totalTime")}</span>
                      <span className={`font-semibold ${s.totalColor}`}>
                        {s.modules * s.minutesPerModule} min
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Previous attempts */}
        {completedAttempts.length > 1 && (
          <section className="max-w-5xl mx-auto px-6 pb-12">
            <h2 className="text-xl font-bold text-white mb-4">{t("previousAttempts")}</h2>
            <div className="space-y-2">
              {completedAttempts.map((attempt, i) => (
                <Link
                  key={attempt._id}
                  href={`/exam/${slug}/results/${attempt._id}`}
                  className="flex items-center justify-between bg-white/5 border border-white/10 hover:border-accent/30 rounded-xl px-5 py-3 transition-colors"
                >
                  <div>
                    <p className="text-sm text-white font-medium">
                      {t("attempt")} #{completedAttempts.length - i}
                    </p>
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
