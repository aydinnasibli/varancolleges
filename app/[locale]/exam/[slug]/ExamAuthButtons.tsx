"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface ExamAuthButtonsProps {
  signInLabel: string;
  signUpLabel: string;
}

// The app has no /sign-in or /sign-up routes — auth is handled entirely through
// Clerk's modal, same as ExamNavbar and ExamHeroCta.
export default function ExamAuthButtons({ signInLabel, signUpLabel }: ExamAuthButtonsProps) {
  return (
    <div className="flex gap-2">
      <SignInButton mode="modal">
        <button
          type="button"
          className="flex-1 text-center bg-surface hover:bg-surface-hover text-navy py-2.5 rounded-xl text-sm font-medium transition-colors border border-border cursor-pointer"
        >
          {signInLabel}
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button
          type="button"
          className="flex-1 text-center bg-navy hover:bg-navy-light text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
        >
          {signUpLabel}
        </button>
      </SignUpButton>
    </div>
  );
}
