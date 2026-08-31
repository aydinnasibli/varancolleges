import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { Clock, BookOpen, CheckCircle, PenLine, Calculator, Calendar, Lock } from "lucide-react";
import ExamPurchaseButton from "./ExamPurchaseButton";
import TakeExamButton from "./TakeExamButton";
import ExamAuthButtons from "./ExamAuthButtons";
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

const TOTAL_QUESTIONS = SAT_STRUCTURE.reduce(
  (sum, s) => sum + s.modules * s.questionsPerModule,
  0
);

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
        <section className="relative py-14 sm:py-16 overflow-hidden bg-navy">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-light/20 via-navy to-navy" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white text-xs font-semibold uppercase tracking-widest">
                {exam.type} {t("mockExam")}
              </span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.15] text-balance mb-6 max-w-4xl mx-auto">
              {exam.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                {exam.totalDuration} {t("minutesTotal")}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/30" />
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0" />
                {TOTAL_QUESTIONS} {t("questionsAcross")}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/30" />
              <span className={`flex items-center gap-2 ${isExamUnlocked ? "text-green-300" : "text-white/80"}`}>
                <Calendar className="h-4 w-4 shrink-0" />
                {examDateFormatted}
              </span>
            </div>
          </div>
        </section>

        {/* ── CONTENT ──────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-12 sm:pb-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

            {/* ── LEFT COLUMN ────────────────────────────────────── */}
            <div className="order-2 lg:order-1 flex-1 min-w-0 space-y-10 sm:space-y-12">

              {/* Description */}
              <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
                {exam.description}
              </p>

              {/* Exam Structure */}
              <div>
                <h2 className="text-xl font-serif font-bold text-navy mb-5 flex items-center gap-3">
                  <span className="w-6 h-px bg-navy shrink-0" />
                  {t("examStructure")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAT_STRUCTURE.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.section}
                        className="bg-surface border border-border hover:border-navy/25 rounded-2xl p-5 sm:p-6 relative overflow-hidden group transition-colors duration-200"
                      >
                        <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none">
                          <Icon className="w-28 h-28 text-navy" />
                        </div>
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center text-navy-light mb-4">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-navy font-semibold mb-4">{s.section}</h3>
                          <div className="space-y-2.5 text-sm">
                            <div className="flex items-baseline justify-between gap-3 text-text-secondary">
                              <span>{t("modules")}</span>
                              <span className="text-navy font-medium tabular-nums">{s.modules}</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3 text-text-secondary">
                              <span>{t("questionsPerModule")}</span>
                              <span className="text-navy font-medium tabular-nums">{s.questionsPerModule}</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3 text-text-secondary">
                              <span>{t("timePerModule")}</span>
                              <span className="text-navy font-medium tabular-nums whitespace-nowrap">{s.minutesPerModule} min</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3 pt-2.5 border-t border-border">
                              <span className="text-text-secondary">{t("totalTime")}</span>
                              <span className="text-navy-light font-bold text-base tabular-nums whitespace-nowrap">
                                {s.modules * s.minutesPerModule} min
                              </span>
                            </div>
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
                    <span className="w-6 h-px bg-navy shrink-0" />
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
                          className="block bg-surface border border-border hover:border-navy/30 rounded-xl px-5 py-4 transition-colors duration-200 group"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="min-w-0">
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
                              <div className="text-right shrink-0">
                                <p className="text-xl font-bold text-navy-light leading-none tabular-nums">{score}</p>
                                <p className="text-xs text-text-muted mt-1">/ 1600</p>
                              </div>
                            )}
                          </div>
                          {pct !== null && (
                            <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-navy-light/60 to-navy-light rounded-full"
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
            <div className="order-1 lg:order-2 w-full lg:w-80 shrink-0 lg:sticky lg:top-20">
              <div className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-navy/5">
                {/* Navy accent top stripe */}
                <div className="h-1 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />
                <div className="bg-white p-5 sm:p-6">
                  {/* Price */}
                  <div className="mb-5">
                    <p className="text-4xl font-bold text-navy tabular-nums leading-none">
                      ₼{(exam.price / 100).toFixed(2)}
                    </p>
                    <p className="text-text-secondary text-sm mt-2">{t("oneTimePayment")}</p>
                  </div>

                  {/* CTA section */}
                  {!userId ? (
                    <div className="space-y-3 mb-5">
                      <p className="text-xs text-text-secondary text-center">
                        {t("signInToPurchase")}
                      </p>
                      <ExamAuthButtons
                        signInLabel={t("signIn")}
                        signUpLabel={t("signUp")}
                      />
                    </div>
                  ) : hasPurchase ? (
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                        <CheckCircle className="h-4 w-4 shrink-0" />
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
                      <div key={key} className="flex items-start gap-2.5 text-[13px] leading-snug text-text-secondary">
                        <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-navy-light shrink-0" />
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
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              {t("disclaimerSection.title")}
            </h3>
            <ul className="space-y-2 text-[13px] text-text-muted leading-relaxed list-disc list-outside pl-4 marker:text-text-muted/50">
              <li>{t("disclaimerSection.mockExam")}</li>
              <li>{t("disclaimerSection.indicative")}</li>
              {isUpcoming && (
                <li className="text-amber-700 marker:text-amber-700/60">
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
