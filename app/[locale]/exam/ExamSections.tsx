"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Clock, BookOpen, ChevronRight, Calendar, History } from "lucide-react";

interface Exam {
  _id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  totalDuration: number;
  slug: string;
  examDate: string;
}

interface ExamSectionsProps {
  upcomingExams: Exam[];
  pastExams: Exam[];
  labels: {
    upcomingExams: string;
    activeSession: string;
    pastExams: string;
    questions: string;
    adaptive: string;
    viewDetails: string;
    noExams: string;
    noPastExams: string;
    examDate: string;
    showPastExams: string;
    hidePastExams: string;
  };
}

function ExamCard({ exam, isPast, labels }: { exam: Exam; isPast: boolean; labels: ExamSectionsProps["labels"] }) {
  const initial = exam.type?.[0]?.toUpperCase() ?? "E";
  const dateStr = new Date(exam.examDate).toLocaleDateString("az-AZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`group bg-white/[0.03] border ${isPast ? "border-white/[0.08]" : "border-accent/20 bg-white/[0.04] shadow-lg shadow-accent/5"} hover:border-accent/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-0.5 flex flex-col`}>
      <div className="relative h-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/60 to-[#07101e]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/5" />
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
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="px-4 py-1.5 rounded-full border border-accent/50 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            {exam.type}
          </span>
          {isPast ? (
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium backdrop-blur-sm flex items-center gap-1.5">
              <History className="h-3 w-3" />
              {dateStr}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-medium backdrop-blur-sm flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {dateStr}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between mb-3 gap-3">
          <h3 className="text-lg font-serif font-bold text-white group-hover:text-accent transition-colors leading-snug flex-1">
            {exam.title}
          </h3>
          <div className="shrink-0 text-right">
            <span className="text-2xl font-bold text-white">
              ₼{(exam.price / 100).toFixed(0)}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-5 flex-1">
          {exam.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-5 pb-5 border-b border-white/5">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent/60" />
            {exam.totalDuration} min
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-accent/60" />
            98 {labels.questions}
          </span>
        </div>

        <Link
          href={`/exam/${exam.slug}`}
          className="flex items-center justify-center gap-2 w-full bg-transparent hover:bg-accent text-accent hover:text-[#07101e] border border-accent/40 hover:border-accent py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group/btn"
        >
          {labels.viewDetails}
          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function ExamSections({ upcomingExams, pastExams, labels }: ExamSectionsProps) {
  const [showPast, setShowPast] = useState(false);

  return (
    <div className="space-y-16">
      {/* Upcoming */}
      <div className="relative">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -left-12 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 w-fit">
              <Calendar className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-accent text-xs font-semibold tracking-wider uppercase">{labels.activeSession}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
              {labels.upcomingExams}
            </h2>
            <p className="text-slate-400 text-base">
              {upcomingExams.length} {labels.upcomingExams.toLowerCase()}
            </p>
          </div>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-9 w-9 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg">{labels.noExams}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} isPast={false} labels={labels} />
            ))}
          </div>
        )}
      </div>

      {/* Past Exams Toggle */}
      {pastExams.length > 0 && (
        <div>
          <button
            onClick={() => setShowPast((p) => !p)}
            className="flex items-center gap-3 group w-full text-left"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                <History className="h-4 w-4 text-slate-400 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white group-hover:text-accent transition-colors">
                  {labels.pastExams}
                </h2>
                <p className="text-slate-500 text-sm">{pastExams.length} imtahan</p>
              </div>
            </div>
            <ChevronRight
              className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${showPast ? "rotate-90" : ""}`}
            />
          </button>

          {showPast && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {pastExams.map((exam) => (
                <ExamCard key={exam._id} exam={exam} isPast={true} labels={labels} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
