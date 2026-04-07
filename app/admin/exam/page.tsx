import Link from "next/link";
import { Plus, Edit, Trash2, BookOpen, ToggleLeft, ToggleRight } from "lucide-react";
import { getAllExams } from "@/app/actions/exam-admin";
import { DeleteExamButton } from "./DeleteExamButton";
import { ToggleActiveButton } from "./ToggleActiveButton";

export const dynamic = "force-dynamic";

export default async function AdminSinaqPage() {
  const result = await getAllExams();
  const exams = result.success ? result.exams ?? [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sınaq İdarəetmə</h1>
          <p className="text-sm text-slate-500 mt-1">Mock imtahanları idarə edin</p>
        </div>
        <Link
          href="/admin/exam/new"
          className="flex items-center gap-2 bg-[#1152d4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0e42b0] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Yeni İmtahan
        </Link>
      </div>

      {exams.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Hələ heç bir imtahan yoxdur</p>
          <p className="text-slate-400 text-sm mt-1">Yeni imtahan əlavə etmək üçün yuxarıdakı düyməyə klikləyin</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">İmtahan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Növ</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qiymət</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exams.map((exam) => (
                <tr key={exam._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{exam.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{exam.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {exam.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {((exam.price as number) / 100).toFixed(2)} AZN
                  </td>
                  <td className="px-6 py-4">
                    <ToggleActiveButton
                      examId={exam._id}
                      isActive={exam.isActive as boolean}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/exam/${exam._id}/questions`}
                        className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#1152d4] border border-slate-200 hover:border-[#1152d4] px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        Suallar
                      </Link>
                      <Link
                        href={`/admin/exam/${exam._id}/edit`}
                        className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#1152d4] border border-slate-200 hover:border-[#1152d4] px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Düzəliş
                      </Link>
                      <DeleteExamButton examId={exam._id} examTitle={exam.title as string} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
