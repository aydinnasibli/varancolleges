import { getActiveExams } from "@/app/actions/exam-public";
import { Link } from "@/i18n/routing";
import {
  Clock,
  BookOpen,
  ChevronRight,
  Timer,
  BarChart3,
  Zap,
  ClipboardList,
  CreditCard,
  Pencil,
  ArrowRight,
} from "lucide-react";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Exam.listing" });
  const canonical =
    locale === "az"
      ? "https://www.varancolleges.com/exam"
      : `https://www.varancolleges.com/${locale}/exam`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://www.varancolleges.com/exam",
        az: "https://www.varancolleges.com/exam",
        en: "https://www.varancolleges.com/en/exam",
      },
    },
  };
}

export default async function ExamListingPage() {
  const [result, t] = await Promise.all([getActiveExams(), getTranslations("Exam.listing")]);
  const exams = result.success ? result.exams : [];

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background-dark to-background-dark" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Left */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                    {t("label")}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.05] mb-6">
                  {t("title")}
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                  {t("description")}
                </p>
                <a
                  href="#exams"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-[#07101e] font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {t("browseExams")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Right — score display */}
              <div className="shrink-0 flex flex-col items-center lg:items-end gap-2 select-none">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Target Score</p>
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[7rem] md:text-[9rem] font-serif font-bold leading-none"
                    style={{
                      WebkitTextStroke: "2px rgba(212,175,55,0.5)",
                      color: "transparent",
                    }}
                  >
                    1600
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-slate-400 mt-1">
                  <span className="flex flex-col items-center gap-0.5">
                    <span className="text-white font-bold text-2xl">800</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">R&amp;W</span>
                  </span>
                  <span className="text-slate-600 self-center text-2xl font-light">+</span>
                  <span className="flex flex-col items-center gap-0.5">
                    <span className="text-white font-bold text-2xl">800</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Math</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STATS STRIP ──────────────────────────────────────────────── */}
        <div className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {[
                { icon: Zap, value: "4", label: t("stats.timedModules") },
                { icon: BookOpen, value: "98", label: t("stats.questions") },
                { icon: Timer, value: "2h 14m", label: t("stats.fullDuration") },
                { icon: BarChart3, value: "∞", label: t("stats.retakes") },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="py-6 px-6 text-center flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-1">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-2xl font-bold text-white font-serif">{value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EXAM CARDS ───────────────────────────────────────────────── */}
        <section id="exams" className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">{t("availableExams")}</h2>
              <p className="text-slate-500 text-sm mt-1">
                {exams.length} {t("examsAvailable")}
              </p>
            </div>
          </div>

          {exams.length === 0 ? (
            <div className="text-center py-28">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-9 w-9 text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg">{t("noExams")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => {
                const initial = (exam.type as string)?.[0]?.toUpperCase() ?? "E";
                return (
                  <div
                    key={exam._id as string}
                    className="group bg-white/[0.03] border border-white/[0.08] hover:border-accent/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-0.5 flex flex-col"
                  >
                    {/* Card gradient header */}
                    <div className="relative h-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/60 to-[#07101e]">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/5" />
                      {/* Huge outlined letter */}
                      <span
                        className="absolute text-[9rem] font-serif font-bold leading-none select-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
                        style={{
                          WebkitTextStroke: "1.5px rgba(212,175,55,0.25)",
                          color: "transparent",
                          right: "-1rem",
                          bottom: "-1.5rem",
                        }}
                      >
                        {initial}
                      </span>
                      {/* Exam type badge */}
                      <span className="relative z-10 px-4 py-1.5 rounded-full border border-accent/50 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                        {exam.type as string}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-start justify-between mb-3 gap-3">
                        <h3 className="text-lg font-serif font-bold text-white group-hover:text-accent transition-colors leading-snug flex-1">
                          {exam.title as string}
                        </h3>
                        <div className="shrink-0 text-right">
                          <span className="text-2xl font-bold text-white">
                            ₼{((exam.price as number) / 100).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-5 flex-1">
                        {exam.description as string}
                      </p>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-5 pb-5 border-b border-white/5">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-accent/60" />
                          {exam.totalDuration as number} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-accent/60" />
                          98 {t("questions")}
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-accent/70 font-medium">
                          <Zap className="h-3 w-3" />
                          {t("adaptive")}
                        </span>
                      </div>

                      <Link
                        href={`/exam/${exam.slug}`}
                        className="flex items-center justify-center gap-2 w-full bg-transparent hover:bg-accent text-accent hover:text-[#07101e] border border-accent/40 hover:border-accent py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group/btn"
                      >
                        {t("viewDetails")}
                        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section className="border-t border-white/5 bg-white/[0.015]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif font-bold text-white mb-3">{t("howItWorks.title")}</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                {t("howItWorks.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
              {/* connector line (desktop) */}
              <div className="hidden sm:block absolute top-9 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

              {[
                {
                  step: "01",
                  icon: ClipboardList,
                  title: t("howItWorks.step1.title"),
                  desc: t("howItWorks.step1.desc"),
                },
                {
                  step: "02",
                  icon: CreditCard,
                  title: t("howItWorks.step2.title"),
                  desc: t("howItWorks.step2.desc"),
                },
                {
                  step: "03",
                  icon: Pencil,
                  title: t("howItWorks.step3.title"),
                  desc: t("howItWorks.step3.desc"),
                },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="flex flex-col items-center text-center gap-4 relative">
                  {/* Icon circle */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-[#07101e] text-xs font-bold flex items-center justify-center">
                      {step.slice(-1)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES SECTION ─────────────────────────────────────────── */}
        <section className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(
                [
                  { key: "timedModules", icon: Timer },
                  { key: "timedSections", icon: Clock },
                  { key: "detailedResults", icon: BarChart3 },
                ] as const
              ).map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex flex-col items-center text-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-accent/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t(`features.${key}.title`)}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t(`features.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
