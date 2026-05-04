"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface TakeExamButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "outline";
}

export default function TakeExamButton({ href, label, variant = "primary" }: TakeExamButtonProps) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Exam.nav");

  const base =
    "flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200";
  const styles =
    variant === "primary"
      ? `${base} bg-accent hover:bg-accent-light text-[#07101e]`
      : `${base} border border-white/15 hover:border-white/30 text-white`;

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      className={styles}
      aria-disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t("loading")}</span>
        </>
      ) : (
        <>
          {label}
          {variant === "primary" && <ChevronRight className="h-4 w-4" />}
        </>
      )}
    </Link>
  );
}
