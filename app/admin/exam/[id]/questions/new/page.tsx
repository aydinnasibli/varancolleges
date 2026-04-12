import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getExamById } from "@/app/actions/exam-admin";
import QuestionForm from "../../../QuestionForm";
import { notFound } from "next/navigation";

export default async function NewQuestionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ section?: string; module?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const result = await getExamById(id);
  if (!result.success || !result.exam) notFound();
  const exam = result.exam as { title: string };

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
          <h1 className="text-2xl font-bold text-slate-900">Yeni Sual</h1>
          <p className="text-sm text-slate-500 mt-0.5">{exam.title}</p>
        </div>
      </div>
      <QuestionForm
        examId={id}
        defaultSection={sp.section}
        defaultModule={sp.module}
      />
    </div>
  );
}
