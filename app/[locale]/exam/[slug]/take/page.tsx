import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { startAttempt } from "@/app/actions/exam-attempt";
import ExamInterface from "@/components/exam/ExamInterface";
import ExamPasswordGate from "../ExamPasswordGate";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function TakeExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect(`/exam/${slug}`);
  }

  // Get exam
  const examResult = await getExamBySlug(slug);
  if (!examResult.success || !examResult.exam) notFound();
  const exam = examResult.exam as { _id: string; title: string; slug: string; type: string; examDate: string; requiresPassword: boolean };

  // Verify purchase
  const purchaseResult = await getUserPurchaseForExam(userId, exam._id);
  if (!purchaseResult.purchase) {
    redirect(`/exam/${slug}`);
  }

  const purchase = purchaseResult.purchase as { _id: string };

  // Block access if exam date hasn't arrived yet — but only for first-time takers.
  // Users who have already completed the exam can always retake.
  if (exam.examDate && new Date(exam.examDate) > new Date()) {
    const attemptsResult = await getUserAttempts(userId, exam._id);
    const hasCompleted = attemptsResult.success &&
      attemptsResult.attempts.some((a) => a.status === "completed");
    if (!hasCompleted) {
      redirect(`/exam/${slug}`);
    }
  }

  // If the exam requires a password, show the gate — don't start the attempt yet
  if (exam.requiresPassword) {
    return (
      <ExamPasswordGate
        examId={exam._id}
        examSlug={slug}
        examTitle={exam.title}
        purchaseId={purchase._id}
      />
    );
  }

  // Start or resume attempt
  const attemptResult = await startAttempt(exam._id, purchase._id);

  if (!attemptResult.success) {
    redirect(`/exam/${slug}?error=start_failed`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <ExamInterface
      attempt={attemptResult.attempt as any}
      questions={attemptResult.questions as any}
      examId={exam._id}
      examTitle={exam.title}
      examSlug={slug}
      isResuming={attemptResult.isResuming ?? false}
    />
  );
}
