import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserPurchases, getUserAttempts } from "@/app/actions/exam-public";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Trophy, RotateCcw, CheckCircle, PlayCircle, Loader2 } from "lucide-react";

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

  const user = await currentUser();
  const [purchasesResult, attemptsResult] = await Promise.all([
    getUserPurchases(userId),
    getUserAttempts(userId),
  ]);

  const purchases = purchasesResult.success ? purchasesResult.purchases : [];
  const allAttempts = attemptsResult.success ? attemptsResult.attempts : [];

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">
        {paymentSuccess && (
          <div className="bg-green-500/10 border-b border-green-500/20 py-3 px-6 text-center text-sm text-green-400 font-medium">
            Payment successful! Your exam is now available below.
          </div>
        )}
        {/* Header */}
        <section className="border-b border-white/5 py-10 bg-gradient-to-b from-primary/20 to-transparent">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4">
              {user?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-accent/30"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-2xl font-bold text-accent">
                  {user?.firstName?.[0] || "U"}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-slate-400 text-sm">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: "Exams Purchased", value: purchases.length },
                {
                  label: "Attempts",
                  value: allAttempts.length,
                },
                {
                  label: "Best Score",
                  value:
                    allAttempts
                      .filter((a) => a.status === "completed" && a.scores?.total)
                      .reduce(
                        (best, a) =>
                          (a.scores?.total ?? 0) > best ? (a.scores?.total ?? 0) : best,
                        0
                      ) || "—",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purchased exams */}
        <section className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            My Exams
          </h2>

          {purchases.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <Trophy className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-medium mb-2">No exams purchased yet</p>
              <Link
                href="/exam"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Browse Mock Exams
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
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
                  .sort(
                    (a, b) =>
                      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
                  );
                const latestCompleted = completed[0];

                const exam = purchase.exam as {
                  title: string;
                  slug: string;
                  type: string;
                  totalDuration: number;
                };

                return (
                  <div
                    key={purchase._id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                            {exam.type}
                          </span>
                          {examAttempts.length > 0 && (
                            <span className="text-xs text-slate-500">
                              {examAttempts.length} attempt{examAttempts.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{exam.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {exam.totalDuration} min
                          </span>
                          <span>Purchased {new Date(purchase.purchasedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Best score */}
                      {latestCompleted?.scores?.total && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-accent">
                            {latestCompleted.scores.total}
                          </div>
                          <div className="text-xs text-slate-400">best / 1600</div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      {isPending ? (
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing payment...
                        </div>
                      ) : inProgress ? (
                        <Link
                          href={`/exam/${exam.slug}/take`}
                          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          <PlayCircle className="h-4 w-4" />
                          Continue Exam
                        </Link>
                      ) : (
                        <Link
                          href={`/exam/${exam.slug}/take`}
                          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {completed.length > 0 ? "Retake Exam" : "Start Exam"}
                        </Link>
                      )}
                      {latestCompleted && (
                        <Link
                          href={`/exam/${exam.slug}/results/${latestCompleted._id}`}
                          className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          View Latest Results
                        </Link>
                      )}
                    </div>

                    {/* Attempt history */}
                    {completed.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-slate-500 mb-3">Attempt History</p>
                        <div className="space-y-2">
                          {completed.slice(0, 3).map((attempt, i) => (
                            <Link
                              key={attempt._id}
                              href={`/exam/${exam.slug}/results/${attempt._id}`}
                              className="flex items-center justify-between px-3 py-2 bg-white/3 hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <div className="text-xs text-slate-400">
                                Attempt #{completed.length - i} ·{" "}
                                {new Date(attempt.startedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                              <div className="flex items-center gap-3">
                                {attempt.scores && (
                                  <div className="flex gap-3 text-xs text-slate-400">
                                    <span>R&W: {attempt.scores.rw}</span>
                                    <span>Math: {attempt.scores.math}</span>
                                    <span className="font-bold text-white">
                                      {attempt.scores.total}
                                    </span>
                                  </div>
                                )}
                                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                              </div>
                            </Link>
                          ))}
                          {completed.length > 3 && (
                            <p className="text-xs text-slate-500 text-center py-1">
                              + {completed.length - 3} more attempts
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
        </section>
      </main>
      <Footer />
    </>
  );
}
