import { getActiveExams } from "@/app/actions/exam-public";
import Link from "next/link";
import { Clock, BookOpen, ChevronRight, Timer, BarChart3, Zap } from "lucide-react";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Exam.listing' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com/exam' : `https://www.varancolleges.com/${locale}/exam`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        'x-default': 'https://www.varancolleges.com/exam',
        az: 'https://www.varancolleges.com/exam',
        en: 'https://www.varancolleges.com/en/exam',
      },
    },
  };
}

export default async function ExamListingPage() {
  const [result, t] = await Promise.all([
    getActiveExams(),
    getTranslations("Exam.listing"),
  ]);
  const exams = result.success ? result.exams : [];

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background-dark to-background-dark" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Left — editorial text */}
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
                <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {t("description")}
                </p>
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
                <div className="flex gap-4 text-sm text-slate-400 mt-1">
                  <span className="flex flex-col items-center">
                    <span className="text-white font-semibold text-lg">800</span>
                    <span className="text-xs text-slate-500">R&amp;W</span>
                  </span>
                  <span className="text-slate-600 self-center">+</span>
                  <span className="flex flex-col items-center">
                    <span className="text-white font-semibold text-lg">800</span>
                    <span className="text-xs text-slate-500">Math</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STATS STRIP ──────────────────────────────────────────── */}
        <div className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {[
                { value: "4", label: "Timed Modules" },
                { value: "98", label: "Questions" },
                { value: "2h 14m", label: "Full Duration" },
                { value: "∞", label: "Retakes" },
              ].map((stat) => (
                <div key={stat.label} className="py-5 px-6 text-center">
                  <p className="text-2xl font-bold text-white font-serif">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EXAM CARDS ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          {exams.length === 0 ? (
            <div className="text-center py-28">
              <div className="w-20 h-20 rounded-2xl surface-1 border border-white/5 flex items-center justify-center mx-auto mb-6">
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
                    className="group surface-1 border border-white/[0.07] hover:border-accent/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col"
                  >
                    {/* Card header — styled gradient with large initial */}
                    <div className="relative h-36 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/60 to-[#07101e]">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/5" />
                      {/* Huge outlined letter */}
                      <span
                        className="absolute text-[9rem] font-serif font-bold leading-none select-none transition-transform duration-500 group-hover:scale-110"
                        style={{
                          WebkitTextStroke: "1.5px rgba(212,175,55,0.2)",
                          color: "transparent",
                          right: "-1rem",
                          bottom: "-1.5rem",
                        }}
                      >
                        {initial}
                      </span>
                      {/* Exam type badge */}
                      <span className="relative z-10 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                        {exam.type as string}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-serif font-bold text-white group-hover:text-accent transition-colors leading-snug flex-1 pr-4">
                          {exam.title as string}
                        </h3>
                        <span className="text-xl font-bold text-white shrink-0">
                          ₼{((exam.price as number) / 100).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
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
                      </div>

                      <Link
                        href={`/exam/${exam.slug}`}
                        className="flex items-center justify-center gap-2 w-full bg-transparent hover:bg-accent text-accent hover:text-[#07101e] border border-accent/30 hover:border-accent py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      >
                        {t("viewDetails")}
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── FEATURES SECTION ─────────────────────────────────────── */}
        <section className="section-alt border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(
                [
                  { key: "timedModules", icon: Timer },
                  { key: "timedSections", icon: Clock },
                  { key: "detailedResults", icon: BarChart3 },
                ] as const
              ).map(({ key, icon: Icon }) => (
                <div key={key} className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl surface-2 border border-white/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t(`features.${key}.title`)}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{t(`features.${key}.desc`)}</p>
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
