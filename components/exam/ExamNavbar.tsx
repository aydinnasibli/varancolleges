"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { BookOpen, Phone, Mail, Clock, CreditCard, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ExamNavbar() {
  const { isSignedIn, isLoaded, user } = useUser();
  const t = useTranslations("Exam.nav");
  const tGen = useTranslations("General");

  return (
    <>
      {/* ── Top info bar (not sticky, scrolls away) ─────────────────── */}
      <div className="bg-[#070e1b] border-b border-white/[0.06] hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          {/* Left: contact info */}
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a
              href="tel:+994771885050"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="h-3 w-3 text-accent/70" />
              +994 77 188 50 50
            </a>
            <a
              href="mailto:info@varancolleges.com"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="h-3 w-3 text-accent/70" />
              info@varancolleges.com
            </a>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="h-3 w-3 text-accent/70" />
              {tGen("workingHours")}
            </span>
          </div>

          {/* Right: payment CTA */}
          <Link
            href="/payment"
            className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            <CreditCard className="h-3 w-3" />
            Pay Online
          </Link>
        </div>
      </div>

      {/* ── Main sticky header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="VaranColleges"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Center: mock exams nav link */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/exam"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-accent transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              {t("mockExams")}
            </Link>
          </nav>

          {/* Right: auth */}
          {isLoaded && (
            <div className="flex items-center gap-2.5">
              {isSignedIn ? (
                <>
                  {/* Panel button — links to profile dashboard */}
                  <Link
                    href="/profile"
                    className="hidden sm:flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-[#07101e] text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Panel
                  </Link>
                  {/* Mobile profile link */}
                  <Link
                    href="/profile"
                    className="sm:hidden flex items-center gap-1.5 text-accent text-sm font-semibold"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                  </Link>

                  {/* Static avatar — display only, no Clerk menu */}
                  <div className="pointer-events-none select-none">
                    {user?.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.imageUrl}
                        alt={user.fullName ?? "User"}
                        className="w-8 h-8 rounded-full border-2 border-accent/30 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-sm font-bold text-accent">
                        {user?.firstName?.[0] ?? "U"}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-sm text-slate-300 hover:text-white transition-colors font-medium border border-white/20 hover:border-white/40 px-3.5 py-1.5 rounded-lg">
                      {t("signIn")}
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="text-sm bg-accent hover:bg-accent/90 text-[#07101e] px-3.5 py-1.5 rounded-lg font-semibold transition-colors">
                      {t("signUp")}
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
