import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getExamById } from "@/app/actions/exam-admin";
import ExamForm from "../../ExamForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getExamById(id);

  if (!result.success || !result.exam) {
    notFound();
  }

  const exam = result.exam as {
    _id: string;
    title: string;
    description: string;
    type: string;
    price: number;
    isActive: boolean;
    coverImage: string;
    totalDuration: number;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/exam"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Geri
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">İmtahanı Düzəlt</h1>
          <p className="text-sm text-slate-500 mt-0.5">{exam.title}</p>
        </div>
      </div>
      <ExamForm initialData={exam} />
    </div>
  );
}
