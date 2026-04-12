import Link from "next/link";
import { ChevronLeft, Plus, Edit, Trash2, PenLine } from "lucide-react";
import { getExamById } from "@/app/actions/exam-admin";
import { getQuestionsByExam } from "@/app/actions/question-admin";
import { notFound } from "next/navigation";
import { DeleteQuestionButton } from "./DeleteQuestionButton";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<string, string> = {
  reading_writing: "Reading & Writing",
  math: "Math",
};


export default async function QuestionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ section?: string; module?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const [examResult, questionsResult] = await Promise.all([
    getExamById(id),
    getQuestionsByExam(
      id,
      sp.section,
      sp.module ? parseInt(sp.module) : undefined
    ),
  ]);

  if (!examResult.success || !examResult.exam) notFound();

  const exam = examResult.exam as { title: string };
  const questions = questionsResult.success ? questionsResult.questions ?? [] : [];

  // Group by section > module
  const grouped: Record<string, typeof questions> = {};
  for (const q of questions) {
    const key = `${q.section}__${q.module}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(q);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/exam"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Geri
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Suallar</h1>
            <p className="text-sm text-slate-500 mt-0.5">{exam.title}</p>
          </div>
        </div>
        <Link
          href={`/admin/exam/${id}/questions/new${sp.section ? `?section=${sp.section}&module=${sp.module}` : ""}`}
          className="flex items-center gap-2 bg-[#1152d4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0e42b0] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Sual əlavə et
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: "Hamısı", section: undefined, module: undefined },
          { label: "RW – Modul 1", section: "reading_writing", module: "1" },
          { label: "RW – Modul 2", section: "reading_writing", module: "2" },
          { label: "Math – Modul 1", section: "math", module: "1" },
          { label: "Math – Modul 2", section: "math", module: "2" },
        ].map((f) => {
          const isActive =
            sp.section === f.section && sp.module === f.module;
          const href = f.section
            ? `/admin/exam/${id}/questions?section=${f.section}&module=${f.module}`
            : `/admin/exam/${id}/questions`;
          return (
            <Link
              key={f.label}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[#1152d4] text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-[#1152d4] hover:text-[#1152d4]"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {questions.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 font-medium">Bu filtrdə sual tapılmadı</p>
          <Link
            href={`/admin/exam/${id}/questions/new${sp.section ? `?section=${sp.section}&module=${sp.module}` : ""}`}
            className="inline-flex items-center gap-2 mt-4 text-sm text-[#1152d4] hover:underline"
          >
            <Plus className="h-4 w-4" />
            İlk sualı əlavə et
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([key, qs]) => {
            const [section, module] = key.split("__");
            return (
              <div key={key} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {SECTION_LABELS[section]} — Modul {module}
                  </h3>
                  <span className="text-xs text-slate-400">{qs.length} sual</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-6 py-2.5 text-xs text-slate-400 font-medium w-12">#</th>
                      <th className="text-left px-6 py-2.5 text-xs text-slate-400 font-medium">Sual</th>
                      <th className="text-left px-6 py-2.5 text-xs text-slate-400 font-medium w-24">Cavab</th>
                      <th className="text-left px-6 py-2.5 text-xs text-slate-400 font-medium w-24">Çətinlik</th>
                      <th className="text-right px-6 py-2.5 text-xs text-slate-400 font-medium w-32">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {qs.map((q) => (
                      <tr key={q._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 text-sm text-slate-500">{q.questionNumber}</td>
                        <td className="px-6 py-3">
                          <p
                            className="text-sm text-slate-700 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: q.questionText?.replace(/<[^>]+>/g, "") || "",
                            }}
                          />
                          {q.domain && (
                            <span className="text-xs text-slate-400">{q.domain}</span>
                          )}
                        </td>
                        <td className="px-6 py-3">
                          {q.questionType === "free_response" ? (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                              <PenLine className="h-3 w-3" />
                              FR
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                              {q.correctAnswer}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              q.difficulty === "easy"
                                ? "bg-green-100 text-green-700"
                                : q.difficulty === "hard"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {q.difficulty === "easy" ? "Asan" : q.difficulty === "hard" ? "Çətin" : "Orta"}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/exam/${id}/questions/${q._id}/edit`}
                              className="flex items-center gap-1 text-xs text-slate-600 hover:text-[#1152d4] border border-slate-200 hover:border-[#1152d4] px-2 py-1 rounded-lg transition-colors"
                            >
                              <Edit className="h-3.5 w-3.5" />
                              Düzəliş
                            </Link>
                            <DeleteQuestionButton
                              questionId={q._id}
                              examId={id}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
