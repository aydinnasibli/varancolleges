"use client";

import { useState } from "react";
import { toggleExamActive } from "@/app/actions/exam-admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ToggleActiveButton({
  examId,
  isActive,
}: {
  examId: string;
  isActive: boolean;
}) {
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    const newState = !active;
    setActive(newState);
    const result = await toggleExamActive(examId, newState);
    if (!result.success) {
      setActive(!newState);
      toast.error("Status dəyişdirilə bilmədi");
    } else {
      toast.success(newState ? "İmtahan aktivləşdirildi" : "İmtahan deaktivləşdirildi");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors disabled:opacity-50 ${
        active
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {active ? "Aktiv" : "Deaktiv"}
    </button>
  );
}
