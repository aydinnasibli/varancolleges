"use client";

import { Link } from "@/i18n/routing";
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
      <div className="bg-navy border-b border-navy-light/20 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          {/* Left: contact info */}
          <div className="flex items-center gap-5 text-xs text-white/60">
            <a
              href="tel:+994771885050"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-white/50" />
              +994 77 188 50 50
            </a>
            <a
              href="mailto:info@varancolleges.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3 w-3 text-white/50" />
              info@varancolleges.com
            </a>
            <span className="flex items-center gap-1.5 text-white/40">
              <Clock className="h-3 w-3 text-white/50" />
              {tGen("workingHours")}
            </span>
          </div>

          {/* Right: payment CTA */}
          <Link
            href="/payment"
            className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors"
          >
            <CreditCard className="h-3 w-3" />
            {tGen("payOnline")}
          </Link>
        </div>
      </div>

      {/* ── Main sticky header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-xl font-bold text-navy tracking-tight">
              Varan<span className="font-normal ml-1">Colleges</span>
            </span>
          </Link>

          {/* Center: mock exams nav link */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/exam"
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-navy transition-colors"
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
                    className="hidden sm:flex items-center gap-1.5 bg-navy hover:bg-navy-light text-white text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    {t("panel")}
                  </Link>
                  {/* Mobile profile link */}
                  <Link
                    href="/profile"
                    className="sm:hidden flex items-center gap-1.5 text-navy-light text-sm font-semibold"
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
                        className="w-8 h-8 rounded-full border-2 border-navy/20 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-navy/10 border-2 border-navy/20 flex items-center justify-center text-sm font-bold text-navy-light">
                        {user?.firstName?.[0] ?? "U"}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-sm text-text-secondary hover:text-navy transition-colors font-medium border border-border hover:border-navy/30 px-3.5 py-1.5 rounded-lg">
                      {t("signIn")}
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="text-sm bg-navy hover:bg-navy-light text-white px-3.5 py-1.5 rounded-lg font-semibold transition-colors">
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
