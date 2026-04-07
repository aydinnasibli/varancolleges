import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getExamById } from "@/app/actions/exam-admin";
import { getQuestionById } from "@/app/actions/question-admin";
import QuestionForm from "../../../../QuestionForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string; qid: string }>;
}) {
  const { id, qid } = await params;
  const [examResult, questionResult] = await Promise.all([
    getExamById(id),
    getQuestionById(qid),
  ]);

  if (!examResult.success || !examResult.exam) notFound();
  if (!questionResult.success || !questionResult.question) notFound();

  const exam = examResult.exam as { title: string };
  const question = questionResult.question as {
    _id: string;
    section: string;
    module: number;
    questionNumber: number;
    passageText: string;
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    explanation: string;
    domain: string;
    difficulty: string;
    image: string;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/exam/${id}/questions`}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Suallar
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sualı Düzəlt</h1>
          <p className="text-sm text-slate-500 mt-0.5">{exam.title}</p>
        </div>
      </div>
      <QuestionForm examId={id} initialData={question} />
    </div>
  );
}
