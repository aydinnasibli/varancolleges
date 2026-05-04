import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserPurchases, getUserAttempts } from "@/app/actions/exam-public";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ExamActionButton from "./ExamActionButton";
import {
  BookOpen,
  Clock,
  ChevronRight,
  Trophy,
  RotateCcw,
  CheckCircle,
  PlayCircle,
  Loader2,
  Target,
  TrendingUp,
  CalendarDays,
  ArrowRight,
  ListChecks,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

// Score ring: colour based on score level
function ScoreRing({ score }: { score: number }) {
  const colour =
    score >= 1400 ? "text-emerald-400" : score >= 1100 ? "text-accent" : "text-orange-400";
  return (
    <div className="flex flex-col items-center justify-center">
      <span className={`text-3xl font-bold tabular-nums ${colour}`}>{score}</span>
      <span className="text-xs text-slate-500 mt-0.5">/ 1600</span>
    </div>
  );
}

// Sub-score pill (R&W or Math)
function SubScore({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex flex-col items-center bg-white/5 rounded-lg px-3 py-1.5">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-white">{value ?? "—"}</span>
    </div>
  );
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/exam");

  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const paymentSuccess = sp.payment === "success";

  const [user, t, purchasesResult, attemptsResult] = await Promise.all([
    currentUser(),
    getTranslations({ locale, namespace: "Exam.profile" }),
    getUserPurchases(userId),
    getUserAttempts(userId),
  ]);

  const purchases = purchasesResult.success ? purchasesResult.purchases : [];
  const allAttempts = attemptsResult.success ? attemptsResult.attempts : [];

  const completedAttempts = allAttempts.filter((a) => a.status === "completed");
  const bestScore = completedAttempts
    .reduce((best, a) => ((a.scores?.total ?? 0) > best ? (a.scores?.total ?? 0) : best), 0);

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">
        {paymentSuccess && (
          <div className="bg-green-500/10 border-b border-green-500/20 py-3 px-6 text-center text-sm text-green-400 font-medium">
            {t("paymentSuccess")}
          </div>
        )}

        {/* ── Profile header ──────────────────────────────────────────────── */}
        <section className="border-b border-white/5 bg-gradient-to-b from-accent/5 via-primary/10 to-transparent">
          <div className="max-w-4xl mx-auto px-6 pt-10 pb-8">
            {/* Avatar + name */}
            <div className="flex items-center gap-5 mb-8">
              {user?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-accent/40 shadow-lg shadow-accent/10"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-3xl font-bold text-accent shadow-lg shadow-accent/10">
                  {user?.firstName?.[0] || "U"}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
                {user?.createdAt && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: <BookOpen className="h-4 w-4" />,
                  label: t("examsPurchased"),
                  value: purchases.length,
                  color: "text-accent",
                },
                {
                  icon: <ListChecks className="h-4 w-4" />,
                  label: t("attempts"),
                  value: completedAttempts.length,
                  color: "text-blue-400",
                },
                {
                  icon: <Trophy className="h-4 w-4" />,
                  label: t("bestScore"),
                  value: bestScore || "—",
                  color: "text-yellow-400",
                },
                {
                  icon: <TrendingUp className="h-4 w-4" />,
                  label: "Avg Score",
                  value:
                    completedAttempts.length > 0
                      ? Math.round(
                          completedAttempts.reduce((s, a) => s + (a.scores?.total ?? 0), 0) /
                            completedAttempts.length
                        )
                      : "—",
                  color: "text-emerald-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3"
                >
                  <div className={`shrink-0 ${stat.color} bg-white/5 rounded-lg p-2`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── My Exams ────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-10 space-y-8">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            {t("myExams")}
          </h2>

          {purchases.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-14 text-center">
              <Trophy className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-300 font-semibold mb-1">{t("noExamsPurchased")}</p>
              <p className="text-slate-500 text-sm mb-6">Your purchased exams will appear here.</p>
              <Link
                href="/exam"
                className="inline-flex items-center gap-2 text-sm bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 px-4 py-2 rounded-xl transition-colors"
              >
                {t("browseMockExams")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            purchases.map((purchase) => {
              const examAttempts = allAttempts.filter(
                (a) => a.examId === purchase.examId.toString()
              ) as Array<{
                _id: string;
                status: string;
                scores?: { total?: number; rw?: number; math?: number };
                startedAt: string;
                completedAt?: string | null;
                answers: Array<{ selectedAnswer: string | null }>;
              }>;

              const isPending = (purchase as { status: string }).status === "pending";
              const inProgressAttempt = examAttempts.find((a) => a.status === "in_progress");
              const inProgress = inProgressAttempt?.answers.some((a) => a.selectedAnswer !== null)
                ? inProgressAttempt
                : null;
              const completed = examAttempts
                .filter((a) => a.status === "completed")
                .sort(
                  (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
                );
              const latestCompleted = completed[0];
              const examBestScore = completed.reduce(
                (best, a) => ((a.scores?.total ?? 0) > best ? (a.scores?.total ?? 0) : best),
                0
              );

              const exam = purchase.exam as {
                title: string;
                slug: string;
                type: string;
                totalDuration: number;
              };

              return (
                <div
                  key={purchase._id}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* ── Card header ── */}
                  <div className="flex items-start justify-between gap-4 p-6 pb-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-accent/15 text-accent px-2.5 py-0.5 rounded-full border border-accent/20">
                          {exam.type}
                        </span>
                        {isPending && (
                          <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {t("paymentVerifying")}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{exam.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {exam.totalDuration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {t("purchased")}{" "}
                          {new Date(purchase.purchasedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Best score display */}
                    {examBestScore > 0 && (
                      <div className="flex flex-col items-center justify-center shrink-0 bg-white/5 border border-white/10 rounded-xl px-5 py-3 gap-2">
                        <ScoreRing score={examBestScore} />
                        <div className="flex gap-2">
                          <SubScore
                            label="R&W"
                            value={
                              completed.find((a) => a.scores?.total === examBestScore)?.scores?.rw
                            }
                          />
                          <SubScore
                            label="Math"
                            value={
                              completed.find((a) => a.scores?.total === examBestScore)?.scores?.math
                            }
                          />
                        </div>
                        <span className="text-xs text-slate-500">Best score</span>
                      </div>
                    )}
                  </div>

                  {/* ── Action buttons ── */}
                  <div className="flex flex-wrap items-center gap-3 px-6 pb-5">
                    {inProgress ? (
                      <ExamActionButton
                        href={`/exam/${exam.slug}/take`}
                        label={t("continueExam")}
                        variant="continue"
                      />
                    ) : (
                      <ExamActionButton
                        href={`/exam/${exam.slug}/take`}
                        label={completed.length > 0 ? t("retakeExam") : t("startExam")}
                        variant={completed.length > 0 ? "retake" : "start"}
                      />
                    )}
                    {latestCompleted && (
                      <Link
                        href={`/exam/${exam.slug}/results/${latestCompleted._id}`}
                        className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        {t("viewLatestResults")}
                      </Link>
                    )}
                    {completed.length === 0 && !inProgress && (
                      <span className="text-xs text-slate-600 italic">No attempts yet</span>
                    )}
                  </div>

                  {/* ── Attempts list ── */}
                  {completed.length > 0 && (
                    <div className="border-t border-white/5">
                      <div className="flex items-center justify-between px-6 pt-4 pb-3">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-slate-500" />
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                            {t("attemptHistory")} · {completed.length}{" "}
                            {completed.length === 1 ? "attempt" : "attempts"}
                          </span>
                        </div>
                        {/* Column headers */}
                        <div className="hidden sm:flex items-center gap-8 pr-10 text-xs text-slate-600 font-medium">
                          <span className="w-10 text-center">R&W</span>
                          <span className="w-10 text-center">Math</span>
                          <span className="w-14 text-center">Total</span>
                        </div>
                      </div>

                      <div className="divide-y divide-white/[0.04]">
                        {completed.map((attempt, i) => {
                          const isLatest = i === 0;
                          const isBest = attempt.scores?.total === examBestScore && examBestScore > 0;
                          return (
                            <Link
                              key={attempt._id}
                              href={`/exam/${exam.slug}/results/${attempt._id}`}
                              className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.04] transition-colors group"
                            >
                              {/* Attempt number */}
                              <span className="text-xs font-mono text-slate-600 w-5 flex-shrink-0">
                                {completed.length - i}
                              </span>

                              {/* Date + badges */}
                              <div className="flex-1 flex items-center gap-2 min-w-0">
                                <span className="text-xs text-slate-400">
                                  {new Date(attempt.startedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                                {isLatest && (
                                  <span className="text-xs text-blue-400 bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded-full">
                                    Latest
                                  </span>
                                )}
                                {isBest && (
                                  <span className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-1.5 py-0.5 rounded-full">
                                    Best
                                  </span>
                                )}
                              </div>

                              {/* Scores */}
                              <div className="hidden sm:flex items-center gap-8 flex-shrink-0">
                                <span className="w-10 text-center text-sm text-slate-300 tabular-nums">
                                  {attempt.scores?.rw ?? "—"}
                                </span>
                                <span className="w-10 text-center text-sm text-slate-300 tabular-nums">
                                  {attempt.scores?.math ?? "—"}
                                </span>
                                <span className={`w-14 text-center text-sm font-bold tabular-nums ${isBest ? "text-accent" : "text-white"}`}>
                                  {attempt.scores?.total ?? "—"}
                                </span>
                              </div>

                              {/* Mobile score */}
                              <span className={`sm:hidden text-sm font-bold tabular-nums flex-shrink-0 ${isBest ? "text-accent" : "text-white"}`}>
                                {attempt.scores?.total ?? "—"}
                              </span>

                              {/* Arrow */}
                              <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-accent transition-colors flex-shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
