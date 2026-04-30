"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PlayCircle, RotateCcw } from "lucide-react";

interface ExamActionButtonProps {
  href: string;
  label: string;
  variant: "continue" | "retake" | "start";
}

export default function ExamActionButton({ href, label, variant }: ExamActionButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    router.push(href);
  };

  const Icon = variant === "continue" ? PlayCircle : RotateCcw;

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-70 disabled:cursor-not-allowed text-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Yüklənir...
        </>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
