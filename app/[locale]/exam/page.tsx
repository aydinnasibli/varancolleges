import { getActiveExams } from "@/app/actions/exam-public";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  BookOpen,
  ChevronRight,
  Layers,
  BarChart2,
  Award,
  Languages,
  Calculator,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export default async function ExamListingPage() {
  const [result, t] = await Promise.all([
    getActiveExams(),
    getTranslations("Exam.listing"),
  ]);
  const exams = result.success ? result.exams : [];

  const SAT_MODULES = [
    { label: "R&W Module 1", time: "32", questions: "27", color: "accent" },
    { label: "R&W Module 2", time: "32", questions: "27", color: "accent" },
    { label: "Math Module 1", time: "35", questions: "22", color: "secondary" },
    { label: "Math Module 2", time: "35", questions: "22", color: "secondary" },
  ] as const;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-dark">

        {/* ─── HERO ─── */}
        <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
          {/* Watermark "1600" */}
          <div
            className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none z-0 overflow-hidden"
            aria-hidden="true"
          >
            <span className="text-[20rem] font-bold text-white opacity-[0.025] leading-none tracking-tighter">
              1600
            </span>
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-10 right-[15%] w-96 h-96 bg-accent/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {t("label")}
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-5 leading-[1.05]">
                  {t("title")}
                </h1>
                <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent mb-5" />
                <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-8">
                  {t("description")}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#exams"
                    className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors"
                  >
                    {t("browseExams")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/12 transition-colors"
                  >
                    {t("howItWorks")}
                  </a>
                </div>
              </div>

              {/* Right: Score visualization card — lg+ only */}
              <div className="hidden lg:block">
                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
                  {/* Card header */}
                  <div className="bg-gradient-to-r from-accent/10 to-secondary/5 border-b border-white/8 px-6 py-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      Digital SAT
                    </span>
                    <Award className="h-4 w-4 text-accent/60" />
                  </div>

                  <div className="p-6">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{t("yourTargetScore")}</p>
                    <p className="text-5xl font-bold text-white mb-6">1600</p>

                    {/* Score bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>400</span>
                        <span className="text-accent font-semibold">1600</span>
                      </div>
                      <div className="relative h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary via-accent to-accent"
                          style={{ width: "100%" }}
                        />
                      </div>
                      {/* Score marker */}
                      <div className="flex justify-end mt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-xs text-accent font-semibold">Max</span>
                        </div>
                      </div>
                    </div>

                    {/* Section breakdown */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-accent/8 border border-accent/15 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Languages className="h-4 w-4 text-accent" />
                          <span className="text-xs text-slate-400">{t("readingWriting")}</span>
                        </div>
                        <p className="text-2xl font-bold text-accent">800</p>
                      </div>
                      <div className="bg-secondary/8 border border-secondary/15 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="h-4 w-4 text-secondary" />
                          <span className="text-xs text-slate-400">{t("math")}</span>
                        </div>
                        <p className="text-2xl font-bold text-secondary">800</p>
                      </div>
                    </div>

                    <p className="text-center text-xs text-slate-600 mt-4">Digital SAT · 134 min · 98 {t("questions")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SAT MODULE STRIP ─── */}
        <div className="bg-white/[0.02] border-b border-white/5 py-6 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {SAT_MODULES.map((mod, idx) => (
                <div key={mod.label} className="flex items-center gap-2 md:gap-3">
                  <div className={`flex flex-col border-l-2 ${
                    mod.color === "accent" ? "border-accent" : "border-secondary"
                  } bg-white/5 rounded-r-xl px-4 py-3 min-w-[130px]`}>
                    <span className={`text-xs font-semibold ${
                      mod.color === "accent" ? "text-accent" : "text-secondary"
                    }`}>
                      {mod.label}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {mod.time} min · {mod.questions} {t("questions")}
                    </span>
                  </div>
                  {idx < SAT_MODULES.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-slate-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── EXAM CARDS ─── */}
        <section id="exams" className="max-w-7xl mx-auto px-6 py-16">
          {exams.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg">{t("noExams")}</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Featured card (first exam) */}
              {(() => {
                const exam = exams[0];
                return (
                  <div
                    key={exam._id as string}
                    className="group flex flex-col lg:flex-row bg-white/5 border border-white/12 border-l-4 border-l-accent rounded-2xl overflow-hidden hover:bg-white/8 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/8"
                  >
                    {/* Left visual panel */}
                    {exam.coverImage ? (
                      <div className="relative lg:w-72 h-56 lg:h-auto flex-shrink-0 overflow-hidden">
                        <Image
                          src={exam.coverImage as string}
                          alt={exam.title as string}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background-dark/60" />
                      </div>
                    ) : (
                      <div className="lg:w-72 flex-shrink-0 bg-gradient-to-br from-primary/80 to-background-dark/80 flex items-center justify-center p-6 h-56 lg:h-auto">
                        {/* SAT module grid */}
                        <div className="grid grid-cols-2 gap-2 w-full max-w-[180px]">
                          {[
                            { label: "R&W M1", color: "accent" },
                            { label: "R&W M2", color: "accent" },
                            { label: "Math M1", color: "secondary" },
                            { label: "Math M2", color: "secondary" },
                          ].map((tile) => (
                            <div
                              key={tile.label}
                              className={`flex flex-col items-center justify-center rounded-lg p-3 ${
                                tile.color === "accent"
                                  ? "bg-accent/15 border border-accent/25"
                                  : "bg-secondary/15 border border-secondary/25"
                              }`}
                            >
                              <span className={`text-xs font-semibold ${
                                tile.color === "accent" ? "text-accent" : "text-secondary"
                              }`}>{tile.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Right: content */}
                    <div className="flex flex-col flex-1 p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-3 gap-4">
                        <div className="flex-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/15 text-accent mb-3">
                            {exam.type as string}
                          </span>
                          <h2 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-accent transition-colors leading-snug">
                            {exam.title as string}
                          </h2>
                        </div>
                        <span className="text-3xl font-bold text-accent flex-shrink-0">
                          ₼{((exam.price as number) / 100).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
                        {exam.description as string}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6 pb-5 border-b border-white/8">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-accent" />
                          {exam.totalDuration as number} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-secondary" />
                          98 {t("questions")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-blue-400" />
                          / 1600
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Languages className="h-4 w-4 text-accent" />
                          R&W: 2 modules · 54q
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calculator className="h-4 w-4 text-secondary" />
                          Math: 2 modules · 44q
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <Link
                          href={`/exam/${exam.slug}`}
                          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                        >
                          {t("viewDetails")}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Additional exams (if any) — 2-column grid */}
              {exams.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                  {exams.slice(1).map((exam, index) => {
                    const isEven = index % 2 === 0;
                    const topBorderColor = isEven ? "border-t-secondary/50" : "border-t-accent/50";
                    const badgeClass = isEven ? "bg-secondary/15 text-secondary" : "bg-accent/15 text-accent";
                    const btnClass = isEven
                      ? "bg-secondary/10 hover:bg-secondary text-secondary hover:text-white border-secondary/30 hover:border-secondary"
                      : "bg-accent/10 hover:bg-accent text-accent hover:text-primary border-accent/30 hover:border-accent";

                    return (
                      <div
                        key={exam._id as string}
                        className={`group flex flex-col bg-white/5 border border-white/10 border-t-2 ${topBorderColor} rounded-2xl overflow-hidden hover:bg-white/8 transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
                      >
                        {exam.coverImage ? (
                          <div className="relative h-44 overflow-hidden">
                            <Image
                              src={exam.coverImage as string}
                              alt={exam.title as string}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent" />
                            <div className="absolute bottom-3 left-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
                                {exam.type as string}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className={`h-44 relative flex items-center justify-center ${isEven ? "bg-gradient-to-br from-secondary/15 via-primary/40 to-primary/60" : "bg-gradient-to-br from-accent/15 via-primary/40 to-primary/60"}`}>
                            <BookOpen className={`h-12 w-12 relative z-10 ${isEven ? "text-secondary/60" : "text-accent/60"}`} />
                            <div className="absolute bottom-3 left-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
                                {exam.type as string}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug flex-1 pr-3">
                              {exam.title as string}
                            </h3>
                            <span className="text-xl font-bold text-white flex-shrink-0">
                              ₼{((exam.price as number) / 100).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
                            {exam.description as string}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-white/5">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {exam.totalDuration as number} min
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="h-3.5 w-3.5" />
                              98 {t("questions")}
                            </span>
                          </div>
                          <Link
                            href={`/exam/${exam.slug}`}
                            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${btnClass}`}
                          >
                            {t("viewDetails")}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ─── FEATURES STRIP ─── */}
        <section id="features" className="border-t border-white/5 bg-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/4 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/4 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
              {([
                { key: "timedModules", icon: Clock, iconBg: "bg-accent/15", iconColor: "text-accent" },
                { key: "timedSections", icon: Layers, iconBg: "bg-secondary/15", iconColor: "text-secondary" },
                { key: "detailedResults", icon: BarChart2, iconBg: "bg-blue-500/15", iconColor: "text-blue-400" },
              ] as const).map(({ key, icon: Icon, iconBg, iconColor }) => (
                <div key={key} className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-4 px-6 py-6 first:pl-0 last:pr-0">
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1.5">{t(`features.${key}.title`)}</h3>
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
