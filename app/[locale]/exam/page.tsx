import { getActiveExams } from "@/app/actions/exam-public";
import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
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
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <ExamNavbar />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            VaranColleges
          </p>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            {t("label")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-10 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">VaranColleges</Link>
            <span className="text-accent">•</span>
            <span className="text-white">{t("label")}</span>
          </div>
        </div>
      </section>

      {/* Exam grid */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {exams.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="h-14 w-14 text-slate-600 mx-auto mb-6" />
              <p className="text-xl text-slate-500 font-light">{t("noExams")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exams.map((exam) => (
                <Link
                  key={exam._id as string}
                  href={`/exam/${exam.slug}`}
                  className="group block cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg mb-6 h-56 bg-primary/40 border border-white/5">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                    {exam.coverImage ? (
                      <Image
                        src={exam.coverImage as string}
                        alt={exam.title as string}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-14 w-14 text-accent/30" />
                      </div>
                    )}
                    {/* Type badge */}
                    <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs text-accent border border-accent/20 font-semibold uppercase tracking-wider">
                      {exam.type as string}
                    </div>
                    {/* Price badge */}
                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-sm text-white border border-white/10 font-bold">
                      ₼{((exam.price as number) / 100).toFixed(2)}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-serif text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {exam.title as string}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-light leading-relaxed">
                    {exam.description as string}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-accent/60" />
                      {exam.totalDuration as number} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-accent/60" />
                      98 {t("questions")}
                    </span>
                  </div>

                  <span className="inline-flex items-center text-accent text-sm font-medium opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    {t("viewDetails")}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5 bg-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-white">{t("label")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {(["timedModules", "timedSections", "detailedResults"] as const).map((key) => (
              <div key={key} className="space-y-3">
                <h3 className="text-white font-serif font-semibold text-lg">{t(`features.${key}.title`)}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{t(`features.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
