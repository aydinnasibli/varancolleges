import { getActiveExams } from "@/app/actions/exam-public";
import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ChevronRight, Layers, BarChart2, Award, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export default async function ExamListingPage() {
  const [result, t] = await Promise.all([
    getActiveExams(),
    getTranslations("Exam.listing"),
  ]);
  const exams = result.success ? result.exams : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-dark">
        {/* Hero */}
        <section className="relative pt-16 pb-20 overflow-hidden border-b border-white/5">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop"
              alt="Mock exam preparation"
              fill
              className="object-cover opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-background-dark/80 to-background-dark" />
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-10 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-secondary/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10 pt-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t("label")}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              {t("title")}
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-5"></div>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>

            {/* Quick stats row */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                Digital SAT Format
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" />
                134 min
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                98 Questions
              </span>
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-secondary" />
                Score up to 1600
              </span>
            </div>
          </div>
        </section>

        {/* Exam cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          {exams.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg">{t("noExams")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam, index) => {
                const isEven = index % 2 === 0;
                const topBorderColor = isEven ? "border-t-accent/50" : "border-t-secondary/50";
                const badgeClass = isEven ? "bg-accent/15 text-accent" : "bg-secondary/15 text-secondary";
                const btnClass = isEven
                  ? "bg-accent/10 hover:bg-accent text-accent hover:text-primary border-accent/30 hover:border-accent"
                  : "bg-secondary/10 hover:bg-secondary text-secondary hover:text-white border-secondary/30 hover:border-secondary";

                return (
                  <div
                    key={exam._id as string}
                    className={`group flex flex-col bg-white/5 border border-white/10 border-t-2 ${topBorderColor} rounded-2xl overflow-hidden hover:bg-white/8 transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
                  >
                    {exam.coverImage ? (
                      <div className="relative h-48 overflow-hidden">
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
                      <div className={`h-48 relative flex items-center justify-center ${isEven ? "bg-gradient-to-br from-accent/15 via-primary/40 to-primary/60" : "bg-gradient-to-br from-secondary/15 via-primary/40 to-primary/60"}`}>
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                          backgroundSize: "24px 24px"
                        }} />
                        <BookOpen className={`h-14 w-14 relative z-10 ${isEven ? "text-accent/60" : "text-secondary/60"}`} />
                        <div className="absolute bottom-3 left-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
                            {exam.type as string}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
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

                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-5 pb-4 border-b border-white/5">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {exam.totalDuration as number} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5" />
                          98 {t("questions")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5" />
                          / 1600
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
        </section>

        {/* Features section */}
        <section className="border-t border-white/5 bg-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {([
              { key: "timedModules", icon: Clock, iconBg: "bg-accent/15", iconColor: "text-accent", border: "border-accent/20" },
              { key: "timedSections", icon: Layers, iconBg: "bg-secondary/15", iconColor: "text-secondary", border: "border-secondary/20" },
              { key: "detailedResults", icon: BarChart2, iconBg: "bg-blue-500/15", iconColor: "text-blue-400", border: "border-blue-500/20" },
            ] as const).map(({ key, icon: Icon, iconBg, iconColor, border }) => (
              <div key={key} className={`flex flex-col items-center text-center bg-white/5 border ${border} rounded-2xl p-6 gap-4`}>
                <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-7 w-7 ${iconColor}`} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-white font-semibold text-base">{t(`features.${key}.title`)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(`features.${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
