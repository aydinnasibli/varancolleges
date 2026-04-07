import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getExamBySlug, getUserPurchaseForExam, getUserAttempts } from "@/app/actions/exam-public";
import { startAttempt } from "@/app/actions/exam-attempt";
import ExamInterface from "@/components/exam/ExamInterface";

export const dynamic = "force-dynamic";

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
  const exam = examResult.exam as { _id: string; title: string; slug: string; type: string };

  // Verify purchase
  const purchaseResult = await getUserPurchaseForExam(userId, exam._id);
  if (!purchaseResult.purchase) {
    redirect(`/exam/${slug}`);
  }

  const purchase = purchaseResult.purchase as { _id: string };

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
