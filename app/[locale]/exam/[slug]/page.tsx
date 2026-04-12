import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { Clock, BookOpen, CheckCircle, ChevronRight, PenLine, Calculator } from "lucide-react";
import ExamPurchaseButton from "./ExamPurchaseButton";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const result = await getExamBySlug(slug);
  if (!result.success || !result.exam) return {};
  const exam = result.exam as { title: string; description: string };
  const canonical = locale === 'az'
    ? `https://www.varancolleges.com/exam/${slug}`
    : `https://www.varancolleges.com/${locale}/exam/${slug}`;
  return {
    title: exam.title,
    description: exam.description,
    alternates: {
      canonical,
      languages: {
        'x-default': `https://www.varancolleges.com/exam/${slug}`,
        az: `https://www.varancolleges.com/exam/${slug}`,
        en: `https://www.varancolleges.com/en/exam/${slug}`,
      },
    },
  };
}

const SAT_STRUCTURE = [
  { section: "Reading & Writing", icon: PenLine, modules: 2, questionsPerModule: 27, minutesPerModule: 32 },
  { section: "Math", icon: Calculator, modules: 2, questionsPerModule: 22, minutesPerModule: 35 },
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

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-background-dark to-background-dark" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                {exam.type} {t("mockExam")}
              </span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6 max-w-4xl mx-auto">
              {exam.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-accent">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {exam.totalDuration} {t("minutesTotal")}
              </span>
              <span className="w-px h-4 bg-accent/30" />
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                98 {t("questionsAcross")}
              </span>
            </div>
          </div>
        </section>

        {/* ── CONTENT ──────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT COLUMN ────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-10">

              {/* Description */}
              <div>
                <p className="text-slate-300 text-base leading-relaxed">
                  {exam.description}
                </p>
              </div>

              {/* Exam Structure */}
              <div>
                <h2 className="text-xl font-serif font-bold text-white mb-5 flex items-center gap-3">
                  <span className="w-6 h-px bg-accent" />
                  {t("examStructure")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAT_STRUCTURE.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.section}
                        className="surface-1 border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden group"
                      >
                        <div className="absolute -bottom-4 -right-4 opacity-5">
                          <Icon className="w-28 h-28 text-white" />
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-white font-semibold mb-4">{s.section}</h3>
                        <div className="space-y-2.5 text-sm">
                          <div className="flex justify-between text-slate-400">
                            <span>{t("modules")}</span>
                            <span className="text-white font-medium">{s.modules}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>{t("questionsPerModule")}</span>
                            <span className="text-white font-medium">{s.questionsPerModule}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>{t("timePerModule")}</span>
                            <span className="text-white font-medium">{s.minutesPerModule} min</span>
                          </div>
                          <div className="flex justify-between pt-2.5 border-t border-white/8">
                            <span className="text-slate-400">{t("totalTime")}</span>
                            <span className="text-accent font-bold text-base">
                              {s.modules * s.minutesPerModule} min
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Previous Attempts */}
              {completedAttempts.length > 1 && (
                <div>
                  <h2 className="text-xl font-serif font-bold text-white mb-5 flex items-center gap-3">
                    <span className="w-6 h-px bg-accent" />
                    {t("previousAttempts")}
                  </h2>
                  <div className="space-y-3">
                    {completedAttempts.map((attempt, i) => {
                      const score = attempt.scores?.total;
                      const pct = score !== undefined ? Math.round((score / 1600) * 100) : null;
                      return (
                        <Link
                          key={attempt._id}
                          href={`/exam/${slug}/results/${attempt._id}`}
                          className="block surface-1 border border-white/[0.07] hover:border-accent/30 rounded-xl px-5 py-4 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm text-white font-medium group-hover:text-accent transition-colors">
                                {t("attempt")} #{completedAttempts.length - i}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {new Date(attempt.startedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            {score !== undefined && (
                              <div className="text-right">
                                <p className="text-xl font-bold text-accent leading-none">{score}</p>
                                <p className="text-xs text-slate-500 mt-0.5">/ 1600</p>
                              </div>
                            )}
                          </div>
                          {pct !== null && (
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-700"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── PURCHASE CARD ──────────────────────────────────── */}
            <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                {/* Gold accent top stripe */}
                <div className="h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
                <div className="surface-1 p-6">
                  {/* Price */}
                  <div className="mb-5">
                    <p className="text-4xl font-bold text-white">
                      ₼{(exam.price / 100).toFixed(2)}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">{t("oneTimePayment")}</p>
                  </div>

                  {/* CTA section */}
                  {!userId ? (
                    <div className="space-y-3 mb-5">
                      <p className="text-xs text-slate-400 text-center pb-1">
                        {t("signInToPurchase")}
                      </p>
                      <div className="flex gap-2">
                        <a
                          href="/sign-in"
                          className="flex-1 text-center surface-2 hover:bg-white/10 text-white py-2.5 rounded-xl text-sm font-medium transition-colors border border-white/10"
                        >
                          {t("signIn")}
                        </a>
                        <a
                          href="/sign-up"
                          className="flex-1 text-center bg-accent hover:bg-accent-light text-[#07101e] py-2.5 rounded-xl text-sm font-semibold transition-colors"
                        >
                          {t("signUp")}
                        </a>
                      </div>
                    </div>
                  ) : hasPurchase ? (
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                        <CheckCircle className="h-4 w-4" />
                        {t("purchased")}
                      </div>
                      {inProgressAttempt ? (
                        <Link
                          href={`/exam/${slug}/take`}
                          className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-light text-[#07101e] py-3 rounded-xl text-sm font-semibold transition-colors"
                        >
                          {t("continueExam")}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <Link
                          href={`/exam/${slug}/take`}
                          className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-light text-[#07101e] py-3 rounded-xl text-sm font-semibold transition-colors"
                        >
                          {t("startExam")}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                      {completedAttempts.length > 0 && (
                        <Link
                          href={`/exam/${slug}/results/${completedAttempts[0]._id}`}
                          className="flex items-center justify-center gap-2 w-full border border-white/15 hover:border-white/30 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                          {t("viewLatestResults")}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="mb-5">
                      <ExamPurchaseButton examId={exam._id} price={exam.price} />
                    </div>
                  )}

                  {/* Feature checklist */}
                  <div className="pt-4 border-t border-white/8 space-y-2.5">
                    {(["fullSimulation", "timedModules", "sectionScores", "questionReview", "retakeAnytime"] as const).map((key) => (
                      <div key={key} className="flex items-center gap-2.5 text-xs text-slate-400">
                        <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                        {t(`features.${key}`)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
