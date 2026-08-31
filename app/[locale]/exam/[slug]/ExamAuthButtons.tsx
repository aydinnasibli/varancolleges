"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface ExamAuthButtonsProps {
  signInLabel: string;
  signUpLabel: string;
}

// The app has no /sign-in or /sign-up routes — auth is handled entirely through
// Clerk's modal, same as ExamNavbar and ExamHeroCta.
export default function ExamAuthButtons({ signInLabel, signUpLabel }: ExamAuthButtonsProps) {
  // next/navigation's usePathname (not next-intl's) — we want the real browser
  // path including the /en prefix, so the user lands back on the same locale.
  const pathname = usePathname();

  // Force the return trip to this exam page. Without it Clerk falls back to "/",
  // which is what happens when an OAuth sign-up transfers out to the Account
  // Portal mid-flow. Forcing it also makes completion a real navigation, so this
  // server-rendered card re-renders with the purchase button instead of staying
  // stuck on the signed-out state.
  return (
    <div className="flex gap-2">
      <SignInButton
        mode="modal"
        forceRedirectUrl={pathname}
        signUpForceRedirectUrl={pathname}
      >
        <button
          type="button"
          className="flex-1 text-center bg-surface hover:bg-surface-hover text-navy py-2.5 rounded-xl text-sm font-medium transition-colors border border-border cursor-pointer"
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
          className="flex-1 text-center bg-navy hover:bg-navy-light text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
        >
          {signUpLabel}
        </button>
      </SignUpButton>
    </div>
  );
}
