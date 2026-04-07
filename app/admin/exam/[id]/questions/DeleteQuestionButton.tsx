"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteQuestion } from "@/app/actions/question-admin";
import { useRouter } from "next/navigation";

export function DeleteQuestionButton({
  questionId,
  examId,
}: {
  questionId: string;
  examId: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    const result = await deleteQuestion(questionId, examId);
    if (result.success) {
      toast.success("Sual silindi");
      router.refresh();
    } else {
      toast.error(result.error || "Xəta baş verdi");
    }
    setLoading(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Silinir..." : "Bəli"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-slate-600 border border-slate-200 px-2 py-1 rounded-lg hover:bg-slate-50"
        >
          Xeyr
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1 text-xs text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-300 px-2 py-1 rounded-lg transition-colors"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Sil
    </button>
  );
}
