"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function ExamNavbar() {
  const { isSignedIn, isLoaded } = useUser();
  const t = useTranslations("Exam.nav");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300 border-b border-white/5",
      isScrolled ? "glass-panel h-20" : "bg-transparent h-24 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="VaranColleges"
            width={666}
            height={375}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/exam" className="text-sm font-medium text-accent tracking-wide">
            {t("mockExams")}
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">
            VaranColleges
          </Link>
        </div>

        {/* Auth */}
        {isLoaded && (
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/profile"
                  className="hidden sm:block text-sm font-medium text-slate-300 hover:text-accent transition-colors tracking-wide"
                >
                  {t("myExams")}
                </Link>
                <div className="h-5 w-px bg-white/10 hidden sm:block" />
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors tracking-wide">
                    {t("signIn")}
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm bg-accent text-primary px-4 py-2 rounded font-semibold hover:bg-accent/90 transition-colors tracking-wide">
                    {t("signUp")}
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
