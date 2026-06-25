import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { Clock, BookOpen, CheckCircle, ChevronRight, PenLine, Calculator, Calendar, Lock } from "lucide-react";
import ExamPurchaseButton from "./ExamPurchaseButton";
import TakeExamButton from "./TakeExamButton";
import { Link } from "@/i18n/routing";
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
  const { slug, locale } = await params;
  const [{ userId }, t] = await Promise.all([
    auth(),
    getTranslations({ locale, namespace: "Exam.detail" }),
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
    examDate: string;
  };

  const examDateObj = new Date(exam.examDate);
  const isExamUnlocked = examDateObj <= new Date();
  const isUpcoming = !isExamUnlocked;
  const examDateFormatted = examDateObj.toLocaleDateString(locale === "az" ? "az-AZ" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
      const RESUME_TIMEOUT_MS = 5 * 60 * 1000;
      const attempts = attemptsResult.attempts as Array<{
        _id: string;
        status: string;
        scores?: { total?: number };
        startedAt: string;
        updatedAt: string;
      }>;
      // Only treat an in_progress attempt as resumable if it was active within
      // the last 5 minutes — matches the server-side abandonment threshold
      inProgressAttempt = attempts.find(
        (a) =>
          a.status === "in_progress" &&
          Date.now() - new Date(a.updatedAt).getTime() < RESUME_TIMEOUT_MS
      ) || null;
      completedAttempts = attempts.filter((a) => a.status === "completed");
    }
  }

  const hasPurchase = !!purchase;

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-white">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 overflow-hidden bg-navy">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-light/20 via-navy to-navy" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white text-xs font-semibold uppercase tracking-widest">
                {exam.type} {t("mockExam")}
              </span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6 max-w-4xl mx-auto">
              {exam.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-white/80 flex-wrap">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {exam.totalDuration} {t("minutesTotal")}
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                98 {t("questionsAcross")}
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span className={`flex items-center gap-2 ${isExamUnlocked ? "text-green-300" : "text-white/80"}`}>
                <Calendar className="h-4 w-4" />
                {examDateFormatted}
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
                <p className="text-text-secondary text-base leading-relaxed">
                  {exam.description}
                </p>
              </div>

              {/* Exam Structure */}
              <div>
                <h2 className="text-xl font-serif font-bold text-navy mb-5 flex items-center gap-3">
                  <span className="w-6 h-px bg-navy" />
                  {t("examStructure")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAT_STRUCTURE.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.section}
                        className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group"
                      >
                        <div className="absolute -bottom-4 -right-4 opacity-5">
                          <Icon className="w-28 h-28 text-navy" />
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center text-navy-light mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-navy font-semibold mb-4">{s.section}</h3>
                        <div className="space-y-2.5 text-sm">
                          <div className="flex justify-between text-text-secondary">
                            <span>{t("modules")}</span>
                            <span className="text-navy font-medium">{s.modules}</span>
                          </div>
                          <div className="flex justify-between text-text-secondary">
                            <span>{t("questionsPerModule")}</span>
                            <span className="text-navy font-medium">{s.questionsPerModule}</span>
                          </div>
                          <div className="flex justify-between text-text-secondary">
                            <span>{t("timePerModule")}</span>
                            <span className="text-navy font-medium">{s.minutesPerModule} min</span>
                          </div>
                          <div className="flex justify-between pt-2.5 border-t border-border">
                            <span className="text-text-secondary">{t("totalTime")}</span>
                            <span className="text-navy-light font-bold text-base">
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
                  <h2 className="text-xl font-serif font-bold text-navy mb-5 flex items-center gap-3">
                    <span className="w-6 h-px bg-navy" />
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
                          className="block bg-surface border border-border hover:border-navy/30 rounded-xl px-5 py-4 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm text-navy font-medium group-hover:text-navy-light transition-colors">
                                {t("attempt")} #{completedAttempts.length - i}
                              </p>
                              <p className="text-xs text-text-muted mt-0.5">
                                {new Date(attempt.startedAt).toLocaleDateString(locale === "az" ? "az-AZ" : "en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            {score !== undefined && (
                              <div className="text-right">
                                <p className="text-xl font-bold text-navy-light leading-none">{score}</p>
                                <p className="text-xs text-text-muted mt-0.5">/ 1600</p>
                              </div>
                            )}
                          </div>
                          {pct !== null && (
                            <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-navy-light/60 to-navy-light rounded-full transition-all duration-700"
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
              <div className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-navy/5">
                {/* Navy accent top stripe */}
                <div className="h-1 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />
                <div className="bg-white p-6">
                  {/* Price */}
                  <div className="mb-5">
                    <p className="text-4xl font-bold text-navy">
                      ₼{(exam.price / 100).toFixed(2)}
                    </p>
                    <p className="text-text-secondary text-sm mt-1">{t("oneTimePayment")}</p>
                  </div>

                  {/* CTA section */}
                  {!userId ? (
                    <div className="space-y-3 mb-5">
                      <p className="text-xs text-text-secondary text-center pb-1">
                        {t("signInToPurchase")}
                      </p>
                      <div className="flex gap-2">
                        <a
                          href="/sign-in"
                          className="flex-1 text-center bg-surface hover:bg-border/50 text-navy py-2.5 rounded-xl text-sm font-medium transition-colors border border-border"
                        >
                          {t("signIn")}
                        </a>
                        <a
                          href="/sign-up"
                          className="flex-1 text-center bg-navy hover:bg-navy-light text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                        >
                          {t("signUp")}
                        </a>
                      </div>
                    </div>
                  ) : hasPurchase ? (
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <CheckCircle className="h-4 w-4" />
                        {t("purchased")}
                      </div>
                      {!isExamUnlocked ? (
                        <div className="w-full bg-surface border border-border rounded-xl py-4 px-4 text-center">
                          <Lock className="h-5 w-5 text-text-muted mx-auto mb-2" />
                          <p className="text-sm text-text-secondary font-medium">{t("unlocksOn")}</p>
                          <p className="text-navy-light font-bold mt-1">{examDateFormatted}</p>
                        </div>
                      ) : inProgressAttempt ? (
                        <TakeExamButton
                          href={`/exam/${slug}/take`}
                          label={t("continueExam")}
                        />
                      ) : (
                        <TakeExamButton
                          href={`/exam/${slug}/take`}
                          label={t("startExam")}
                        />
                      )}
                      {completedAttempts.length > 0 && (
                        <Link
                          href={`/exam/${slug}/results/${completedAttempts[0]._id}`}
                          className="flex items-center justify-center gap-2 w-full border border-border hover:border-navy/30 text-navy py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                          {t("viewLatestResults")}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="mb-5">
                      <ExamPurchaseButton examId={exam._id} price={exam.price} isUpcoming={isUpcoming} />
                    </div>
                  )}

                  {/* Feature checklist */}
                  <div className="pt-4 border-t border-border space-y-2.5">
                    {(["fullSimulation", "timedModules", "sectionScores", "questionReview", "retakeAnytime"] as const).map((key) => (
                      <div key={key} className="flex items-center gap-2.5 text-xs text-text-secondary">
                        <CheckCircle className="h-3.5 w-3.5 text-navy-light shrink-0" />
                        {t(`features.${key}`)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── DISCLAIMER ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              {t("disclaimerSection.title")}
            </h3>
            <ul className="space-y-2 text-xs text-text-muted leading-relaxed list-disc list-inside">
              <li>{t("disclaimerSection.mockExam")}</li>
              <li>{t("disclaimerSection.indicative")}</li>
              {isUpcoming && (
                <li className="text-amber-600">
                  {t("disclaimerSection.physicalAttendance")}
                </li>
              )}
              <li>{t("disclaimerSection.noRefund")}</li>
              <li>{t("disclaimerSection.dataConsent")}</li>
            </ul>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
