"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ExamNavbar() {
  const { isSignedIn, isLoaded } = useUser();
  const t = useTranslations("Exam.nav");

  return (
    <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="VaranColleges"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/exam"
            className="flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            <BookOpen className="h-4 w-4" />
            {t("mockExams")}
          </Link>
        </nav>

        {/* Auth */}
        {isLoaded && (
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link
                  href="/profile"
                  className="hidden sm:block text-sm text-slate-300 hover:text-white transition-colors font-medium"
                >
                  {t("myExams")}
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm text-slate-300 hover:text-white transition-colors font-medium border border-white/20 px-3 py-1.5 rounded-lg">
                    {t("signIn")}
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm bg-accent text-primary px-3 py-1.5 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                    {t("signUp")}
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
