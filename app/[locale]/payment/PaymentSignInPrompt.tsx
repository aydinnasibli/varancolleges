"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";

interface PaymentSignInPromptProps {
  title: string;
  subtitle: string;
  signInLabel: string;
  signUpLabel: string;
}

// The app has no /sign-in or /sign-up routes — auth is handled entirely through
// Clerk's modal, same as ExamNavbar and the exam purchase card.
export default function PaymentSignInPrompt({
  title,
  subtitle,
  signInLabel,
  signUpLabel,
}: PaymentSignInPromptProps) {
  // Return to this page after auth so the payment form is ready to use.
  const pathname = usePathname();

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy/10 mb-4">
        <Lock className="h-5 w-5 text-navy-light" />
      </div>
      <h2 className="text-lg font-semibold text-navy mb-2">{title}</h2>
      <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto mb-6">
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
        <SignInButton
          mode="modal"
          forceRedirectUrl={pathname}
          signUpForceRedirectUrl={pathname}
        >
          <button
            type="button"
            className="bg-navy hover:bg-navy-light text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            {signInLabel}
          </button>
        </SignInButton>
        <SignUpButton
          mode="modal"
          forceRedirectUrl={pathname}
          signInForceRedirectUrl={pathname}
        >
          <button
            type="button"
            className="bg-white hover:bg-surface-hover text-navy border border-border px-6 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            {signUpLabel}
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
