"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, PlayCircle, RotateCcw } from "lucide-react";

interface ExamActionButtonProps {
  href: string;
  label: string;
  variant: "continue" | "retake" | "start";
}

export default function ExamActionButton({ href, label, variant }: ExamActionButtonProps) {
  const [loading, setLoading] = useState(false);

  const Icon = variant === "continue" ? PlayCircle : RotateCcw;

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
      aria-disabled={loading}
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
    </Link>
  );
}
