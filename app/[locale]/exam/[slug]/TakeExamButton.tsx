"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";

interface TakeExamButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "outline";
}

export default function TakeExamButton({ href, label, variant = "primary" }: TakeExamButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    router.push(href);
  };

  const base =
    "flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-70";
  const styles =
    variant === "primary"
      ? `${base} bg-accent hover:bg-accent-light text-[#07101e]`
      : `${base} border border-white/15 hover:border-white/30 text-white`;

  return (
    <button onClick={handleClick} disabled={loading} className={styles}>
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Yüklənir...</span>
        </>
      ) : (
        <>
          {label}
          {variant === "primary" && <ChevronRight className="h-4 w-4" />}
        </>
      )}
    </button>
  );
}
