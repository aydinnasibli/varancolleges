import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ExamForm from "../ExamForm";

export default function NewExamPage() {
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
          <h1 className="text-2xl font-bold text-slate-900">Yeni İmtahan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Yeni mock imtahanı yaradın</p>
        </div>
      </div>
      <ExamForm />
    </div>
  );
}
