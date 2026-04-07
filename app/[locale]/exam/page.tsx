import { getActiveExams } from "@/app/actions/exam-public";
import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ChevronRight } from "lucide-react";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";

export default async function ExamListingPage() {
  const result = await getActiveExams();
  const exams = result.success ? result.exams : [];

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-background-dark">
        {/* Hero */}
        <section className="relative pt-24 pb-16 bg-gradient-to-b from-primary/80 to-background-dark border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Mock Exams
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Practice Like It&apos;s the Real Thing
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Full-length digital SAT simulations with adaptive modules, timed sections, and
              detailed score reports — just like the real exam.
            </p>
          </div>
        </section>

        {/* Exam cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          {exams.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No exams available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <div
                  key={exam._id as string}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:bg-white/8"
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
                    <div className="h-44 bg-gradient-to-br from-accent/20 to-primary/40 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-accent/50" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent">
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
                        98 questions
                      </span>
                    </div>

                    <Link
                      href={`/exam/${exam.slug}`}
                      className="flex items-center justify-center gap-2 w-full bg-accent/10 hover:bg-accent text-accent hover:text-primary border border-accent/30 hover:border-accent py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Info section */}
        <section className="border-t border-white/5 bg-white/3">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Adaptive Modules",
                desc: "Just like the real Digital SAT — Module 2 difficulty adjusts based on your Module 1 performance.",
              },
              {
                title: "Timed Sections",
                desc: "Each section runs under real time constraints with a live countdown timer.",
              },
              {
                title: "Detailed Results",
                desc: "Get section scores, question-by-question review, and explanations for every answer.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
