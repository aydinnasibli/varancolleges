"use client";

import { SignUpButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const CTA_CLASSES =
  "inline-flex items-center gap-2 bg-white hover:bg-white/90 text-navy font-semibold px-7 py-3 rounded mt-8 text-sm transition-colors";

export default function ExamHeroCta({ label }: { label: string }) {
  const { isLoaded, isSignedIn } = useUser();

  // Already signed in — no point opening the sign-up modal, send them to the exam list
  if (isLoaded && isSignedIn) {
    return (
      <a href="#exams" className={CTA_CLASSES}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <SignUpButton mode="modal">
      <button type="button" className={CTA_CLASSES}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </button>
    </SignUpButton>
  );
}
