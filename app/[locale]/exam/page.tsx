import { getActiveExams } from "@/app/actions/exam-public";
import {
  Timer,
  BarChart3,
  Zap,
  ClipboardList,
  CreditCard,
  Pencil,
  ArrowRight,
  BookOpen,
  Clock,
} from "lucide-react";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import ExamSections from "./ExamSections";
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

export default async function ExamListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [result, t] = await Promise.all([
    getActiveExams(),
    getTranslations({ locale, namespace: "Exam.listing" }),
  ]);
  const allExams = result.success ? result.exams : [];
  const now = new Date();
  const upcomingExams = allExams.filter((e) => new Date((e as { examDate: string }).examDate) > now);
  const pastExams = allExams.filter((e) => new Date((e as { examDate: string }).examDate) <= now);

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

        {/* ── EXAM SECTIONS ────────────────────────────────────────────── */}
        <section id="exams" className="max-w-7xl mx-auto px-6 py-16">
          <ExamSections
            upcomingExams={upcomingExams as Parameters<typeof ExamSections>[0]["upcomingExams"]}
            pastExams={pastExams as Parameters<typeof ExamSections>[0]["pastExams"]}
            labels={{
              upcomingExams: t("availableExams"),
              activeSession: t("activeSession"),
              pastExams: t("pastExams"),
              questions: t("questions"),
              adaptive: t("adaptive"),
              viewDetails: t("viewDetails"),
              noExams: t("noExams"),
              noPastExams: t("noExams"),
              examDate: t("examDate"),
              showPastExams: t("pastExams"),
              hidePastExams: t("pastExams"),
            }}
          />
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
