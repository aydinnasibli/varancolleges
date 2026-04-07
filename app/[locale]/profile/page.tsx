import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserPurchases, getUserAttempts } from "@/app/actions/exam-public";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Trophy, RotateCcw, CheckCircle, PlayCircle, ArrowRight, Loader2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/exam");

  const sp = await searchParams;
  const paymentSuccess = sp.payment === "success";

  const [user, t, purchasesResult, attemptsResult] = await Promise.all([
    currentUser(),
    getTranslations("Exam.profile"),
    getUserPurchases(userId),
    getUserAttempts(userId),
  ]);

  const purchases = purchasesResult.success ? purchasesResult.purchases : [];
  const allAttempts = attemptsResult.success ? attemptsResult.attempts : [];

  const bestScore = allAttempts
    .filter((a) => a.status === "completed" && a.scores?.total)
    .reduce((best, a) => ((a.scores?.total ?? 0) > best ? (a.scores?.total ?? 0) : best), 0);

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <ExamNavbar />

      {paymentSuccess && (
        <div className="bg-green-500/10 border-b border-green-500/20 py-3 px-6 text-center text-sm text-green-400 font-light tracking-wide">
          {t("paymentSuccess")}
        </div>
      )}

      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            VaranColleges
          </p>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
            {user?.firstName ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}` : t("myExams")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <div className="mt-6 flex justify-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">VaranColleges</Link>
            <span className="text-accent">•</span>
            <Link href="/exam" className="hover:text-white transition-colors">{t("myExams")}</Link>
            <span className="text-accent">•</span>
            <span className="text-white">{t("myExams")}</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/5 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: t("examsPurchased"), value: purchases.length },
              { label: t("attempts"), value: allAttempts.length },
              { label: t("bestScore"), value: bestScore || "—" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchased exams */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">{t("myExams")}</h2>
          <div className="w-12 h-px bg-accent mb-10" />

          {purchases.length === 0 ? (
            <div className="text-center py-24 border border-white/5 rounded-lg bg-primary/5">
              <Trophy className="h-12 w-12 text-slate-600 mx-auto mb-6" />
              <p className="text-xl text-slate-500 font-light mb-6">{t("noExamsPurchased")}</p>
              <Link
                href="/exam"
                className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
              >
                {t("browseMockExams")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {purchases.map((purchase) => {
                const examAttempts = allAttempts.filter(
                  (a) => a.examId === purchase.examId.toString()
                ) as Array<{
                  _id: string;
                  status: string;
                  scores?: { total?: number; rw?: number; math?: number };
                  startedAt: string;
                  completedAt?: string | null;
                }>;

                const isPending = (purchase as { status: string }).status === "pending";
                const inProgress = examAttempts.find((a) => a.status === "in_progress");
                const completed = examAttempts
                  .filter((a) => a.status === "completed")
                  .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
                const latestCompleted = completed[0];

                const exam = purchase.exam as {
                  title: string;
                  slug: string;
                  type: string;
                  totalDuration: number;
                };

                return (
                  <div key={purchase._id} className="border border-white/5 rounded-lg bg-primary/10 overflow-hidden">
                    {/* Card header */}
                    <div className="px-8 py-6 flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold uppercase tracking-widest text-accent border border-accent/20 px-2.5 py-0.5 rounded">
                            {exam.type}
                          </span>
                          {isPending && (
                            <span className="flex items-center gap-1.5 text-xs text-yellow-400 font-light">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              {t("paymentVerifying")}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white mb-2">{exam.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-light">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-accent/60" />
                            {exam.totalDuration} min
                          </span>
                          <span className="text-accent/30">•</span>
                          <span>
                            {t("purchased")} {new Date(purchase.purchasedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </span>
                          {examAttempts.length > 0 && (
                            <>
                              <span className="text-accent/30">•</span>
                              <span>{examAttempts.length} {t("attempts").toLowerCase()}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {latestCompleted?.scores?.total !== undefined && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-4xl font-serif font-bold text-accent">
                            {latestCompleted.scores.total}
                          </div>
                          <div className="text-xs text-slate-500 font-light mt-0.5">/ 1600</div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-8 pb-6 flex flex-wrap gap-3">
                      {inProgress ? (
                        <Link
                          href={`/exam/${exam.slug}/take`}
                          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-5 py-2.5 rounded text-sm font-semibold transition-colors"
                        >
                          <PlayCircle className="h-4 w-4" />
                          {t("continueExam")}
                        </Link>
                      ) : (
                        <Link
                          href={`/exam/${exam.slug}/take`}
                          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-5 py-2.5 rounded text-sm font-semibold transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {completed.length > 0 ? t("retakeExam") : t("startExam")}
                        </Link>
                      )}
                      {latestCompleted && (
                        <Link
                          href={`/exam/${exam.slug}/results/${latestCompleted._id}`}
                          className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          {t("viewLatestResults")}
                        </Link>
                      )}
                    </div>

                    {/* Attempt history */}
                    {completed.length > 0 && (
                      <div className="border-t border-white/5 px-8 py-5">
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-4">
                          {t("attemptHistory")}
                        </p>
                        <div className="space-y-2">
                          {completed.slice(0, 3).map((attempt, i) => (
                            <Link
                              key={attempt._id}
                              href={`/exam/${exam.slug}/results/${attempt._id}`}
                              className="flex items-center justify-between px-4 py-3 border border-white/5 hover:border-accent/30 rounded transition-colors group"
                            >
                              <div className="text-sm text-slate-400 font-light group-hover:text-white transition-colors">
                                {t("attempt")} #{completed.length - i} ·{" "}
                                {new Date(attempt.startedAt).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                              <div className="flex items-center gap-4">
                                {attempt.scores && (
                                  <div className="flex gap-4 text-xs text-slate-500">
                                    <span>R&W: <span className="text-slate-300">{attempt.scores.rw}</span></span>
                                    <span>Math: <span className="text-slate-300">{attempt.scores.math}</span></span>
                                    <span className="font-serif font-bold text-accent text-base">{attempt.scores.total}</span>
                                  </div>
                                )}
                                <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-accent transition-colors" />
                              </div>
                            </Link>
                          ))}
                          {completed.length > 3 && (
                            <p className="text-xs text-slate-500 font-light text-center py-2">
                              + {completed.length - 3} {t("moreAttempts")}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
