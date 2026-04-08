import { getActiveExams } from "@/app/actions/exam-public";
import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ChevronRight, Layers, BarChart2 } from "lucide-react";
import ExamNavbar from "@/components/exam/ExamNavbar";
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
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">
        {/* Hero */}
        <section className="relative pt-24 pb-16 bg-gradient-to-b from-primary/80 to-background-dark border-b border-white/5 overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-secondary/8 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              {t("label")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </section>

        {/* Exam cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          {exams.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">{t("noExams")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam, index) => {
                const isEven = index % 2 === 0;
                const topBorderColor = isEven ? "border-t-accent/50" : "border-t-secondary/50";
                return (
                  <div
                    key={exam._id as string}
                    className={`group bg-white/5 border border-white/10 border-t-2 ${topBorderColor} rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:bg-white/8`}
                  >
                    {exam.coverImage ? (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={exam.coverImage as string}
                          alt={exam.title as string}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                      </div>
                    ) : (
                      <div className={`h-44 flex items-center justify-center ${isEven ? "bg-gradient-to-br from-accent/20 to-primary/40" : "bg-gradient-to-br from-secondary/20 to-primary/40"}`}>
                        <BookOpen className={`h-16 w-16 ${isEven ? "text-accent/50" : "text-secondary/50"}`} />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${isEven ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"}`}>
                          {exam.type as string}
                        </span>
                        <span className="text-xl font-bold text-white">
                          ₼{((exam.price as number) / 100).toFixed(2)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {exam.title as string}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                        {exam.description as string}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
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
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${isEven ? "bg-accent/10 hover:bg-accent text-accent hover:text-primary border-accent/30 hover:border-accent" : "bg-secondary/10 hover:bg-secondary text-secondary hover:text-white border-secondary/30 hover:border-secondary"}`}
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

        {/* Info section */}
        <section className="border-t border-white/5 bg-primary/20">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { key: "timedModules", icon: Clock, iconBg: "bg-accent/15", iconColor: "text-accent" },
              { key: "timedSections", icon: Layers, iconBg: "bg-secondary/15", iconColor: "text-secondary" },
              { key: "detailedResults", icon: BarChart2, iconBg: "bg-blue-500/15", iconColor: "text-blue-400" },
            ] as const).map(({ key, icon: Icon, iconBg, iconColor }) => (
              <div key={key} className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-xl p-6 gap-4">
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-white font-semibold">{t(`features.${key}.title`)}</h3>
                  <p className="text-slate-400 text-sm">{t(`features.${key}.desc`)}</p>
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
