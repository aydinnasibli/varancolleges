"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveAnswer, saveTimeRemaining, saveCurrentPosition, completeSection, submitExam } from "@/app/actions/exam-attempt";
import { Flag, ChevronLeft, ChevronRight, Grid, X, Clock, Loader2, Bookmark } from "lucide-react";
import { toast } from "sonner";
import MathRenderer from "@/components/MathRenderer";

// SAT section durations in seconds
const SECTION_DURATIONS: Record<string, number> = {
  rw_m1: 32 * 60,
  rw_m2: 32 * 60,
  math_m1: 35 * 60,
  math_m2: 35 * 60,
};

const SECTION_LABELS: Record<string, string> = {
  rw_m1: "Section 1: Reading and Writing",
  rw_m2: "Section 1: Reading and Writing",
  math_m1: "Section 2: Math",
  math_m2: "Section 2: Math",
};

const SECTION_ORDER = ["rw_m1", "rw_m2", "math_m1", "math_m2"];
type SectionBreakType = "module" | "sections";

interface QuestionData {
  _id: string;
  questionText: string;
  passageText?: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  questionType?: string;
  domain?: string;
  difficulty?: string;
  questionNumber: number;
  image?: string;
}

interface AnswerEntry {
  questionId: string;
  selectedAnswer: string | null;
  isFlagged: boolean;
}

interface AttemptData {
  _id: string;
  currentSection: string;
  currentQuestionIndex: number;
  sectionTimeRemaining?: {
    rwM1?: number;
    rwM2?: number;
    mathM1?: number;
    mathM2?: number;
  };
  answers: AnswerEntry[];
}

interface ExamInterfaceProps {
  attempt: AttemptData;
  questions: QuestionData[];
  examId: string;
  examTitle: string;
  examSlug: string;
  isResuming: boolean;
}

function getSectionTimingKey(section: string): string {
  const map: Record<string, string> = {
    rw_m1: "rwM1",
    rw_m2: "rwM2",
    math_m1: "mathM1",
    math_m2: "mathM2",
  };
  return map[section] || section;
}

function FreeResponseInput({ questionId, value, onChange }: { questionId: string; value: string | null; onChange: (val: string) => void; }) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { onChange(val); }, 300);
  };

  return (
    <div className="mt-8 border border-slate-300 rounded-lg p-6 bg-white shadow-sm">
      <div className="font-bold text-slate-800 mb-4 text-sm">Student-Produced Response</div>
      <input
        key={questionId}
        type="text"
        defaultValue={value ?? ""}
        onChange={handleChange}
        placeholder="Enter your answer"
        autoComplete="off"
        className="w-full border-2 border-slate-300 hover:border-slate-400 focus:border-[#0052a3] focus:ring-1 focus:ring-[#0052a3] rounded-md px-4 py-3 text-slate-900 text-lg font-mono outline-none transition-all"
      />
    </div>
  );
}

export default function ExamInterface({ attempt, questions: initialQuestions, examId, examTitle, examSlug, isResuming }: ExamInterfaceProps) {
  const router = useRouter();
  const attemptId = attempt._id;

  const [currentSection, setCurrentSection] = useState(attempt.currentSection);
  const [questions, setQuestions] = useState<QuestionData[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(attempt.currentQuestionIndex);

  const [answers, setAnswers] = useState<Record<string, string | null>>(() => {
    const map: Record<string, string | null> = {};
    attempt.answers.forEach((a) => { map[a.questionId] = a.selectedAnswer; });
    return map;
  });
  const [flagged, setFlagged] = useState<Set<string>>(() => {
    const set = new Set<string>();
    attempt.answers.forEach((a) => { if (a.isFlagged) set.add(a.questionId); });
    return set;
  });

  const timingKey = getSectionTimingKey(currentSection);
  const savedTime = attempt.sectionTimeRemaining?.[timingKey as keyof typeof attempt.sectionTimeRemaining];
  const defaultTime = SECTION_DURATIONS[currentSection] ?? 32 * 60;
  const [timeLeft, setTimeLeft] = useState<number>(savedTime ?? defaultTime);

  const [showNav, setShowNav] = useState(false);
  const [phase, setPhase] = useState<"exam" | "section_break" | "submitting">("exam");
  const [breakType, setBreakType] = useState<SectionBreakType>("module");
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const timeLeftRef = useRef(timeLeft);
  const currentSectionRef = useRef(currentSection);
  const attemptIdRef = useRef(attemptId);
  timeLeftRef.current = timeLeft;
  currentSectionRef.current = currentSection;
  attemptIdRef.current = attemptId;

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (phase !== "exam") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          clearInterval(interval);
          handleSectionComplete();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentSection]);

  useEffect(() => {
    if (phase !== "exam") return;
    const interval = setInterval(async () => {
      await saveTimeRemaining(attemptIdRef.current, currentSectionRef.current, timeLeftRef.current);
    }, 30000);
    return () => clearInterval(interval);
  }, [phase, currentSection]);

  useEffect(() => {
    if (phase !== "exam") return;
    saveCurrentPosition(attemptId, currentSection, currentIndex).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, currentSection]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = useCallback(async (optionKey: string) => {
    if (!currentQuestion) return;
    const qId = currentQuestion._id;
    setAnswers((prev) => ({ ...prev, [qId]: optionKey }));
    saveAnswer(attemptId, qId, optionKey, flagged.has(qId)).catch(console.error);
  }, [currentQuestion, attemptId, flagged]);

  const handleFlagToggle = useCallback(async () => {
    if (!currentQuestion) return;
    const qId = currentQuestion._id;
    const isFlagged = flagged.has(qId);
    setFlagged((prev) => {
      const next = new Set(prev);
      if (isFlagged) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
    saveAnswer(attemptId, qId, answers[qId] ?? null, !isFlagged).catch(console.error);
  }, [currentQuestion, flagged, answers, attemptId]);

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
      setShowNav(false);
    }
  };

  const handleSectionComplete = async () => {
    if (submitting) return;
    setSubmitting(true);
    const sectionIdx = SECTION_ORDER.indexOf(currentSection);
    const isLastSection = sectionIdx === SECTION_ORDER.length - 1;

    if (isLastSection) {
      setPhase("submitting");
      const result = await submitExam(attemptId, examSlug);
      if (result.success) {
        router.push(`/exam/${examSlug}/results/${result.attemptId}`);
      } else {
        toast.error("Failed to submit exam.");
        setPhase("exam");
        setSubmitting(false);
      }
      return;
    }

    const result = await completeSection(attemptId, currentSection);
    if (!result.success) {
      toast.error("Failed to advance.");
      setSubmitting(false);
      return;
    }

    const nextSection = SECTION_ORDER[sectionIdx + 1];
    const isRwToMath = currentSection === "rw_m2" && nextSection === "math_m1";
    const bt = isRwToMath ? "sections" : "module";
    setBreakType(bt);
    setBreakTimeLeft(bt === "sections" ? 10 * 60 : 0);
    setQuestions((result.questions ?? []) as unknown as QuestionData[]);
    setCurrentSection(nextSection);
    setCurrentIndex(0);
    setTimeLeft(SECTION_DURATIONS[nextSection] ?? 35 * 60);
    setPhase("section_break");
    setSubmitting(false);
  };

  useEffect(() => {
    if (phase !== "section_break" || breakType !== "sections") return;
    if (breakTimeLeft <= 0) return;
    const id = setInterval(() => {
      setBreakTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setPhase("exam");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, breakType, breakTimeLeft]);

  // Section break screen (Sterile Bluebook Style)
  if (phase === "section_break") {
    const isMainBreak = breakType === "sections";
    const breakMins = Math.floor(breakTimeLeft / 60);
    const breakSecs = breakTimeLeft % 60;
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-sans">
        <h1 className="text-3xl font-bold mb-6">{isMainBreak ? "Break Details" : "Module Complete"}</h1>
        {isMainBreak ? (
          <div className="bg-white border border-slate-300 p-10 rounded-xl shadow-sm text-center max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">10-Minute Break</h2>
            <div className="text-5xl font-mono font-bold mb-6">
              {String(breakMins).padStart(2, "0")}:{String(breakSecs).padStart(2, "0")}
            </div>
            <p className="text-slate-600 mb-8">Do not close your device. When the break is over, the exam will resume automatically.</p>
            <button onClick={() => { setBreakTimeLeft(0); setPhase("exam"); }} className="px-8 py-3 bg-[#0052a3] hover:bg-[#004285] text-white font-bold rounded-full shadow-sm">
              Resume Testing
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-300 p-10 rounded-xl shadow-sm text-center max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Are you ready to move on?</h2>
            <p className="text-slate-600 mb-8">You have completed this module. Once you move on, you cannot return to these questions.</p>
            <button onClick={() => setPhase("exam")} className="px-8 py-3 bg-[#0052a3] hover:bg-[#004285] text-white font-bold rounded-full shadow-sm">
              Next Module
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === "submitting") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900 font-sans">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-[#0052a3] animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold">Submitting Score...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col text-slate-900 font-sans overflow-hidden">
      {/* HEADER */}
      <header className="h-[52px] bg-white border-b border-slate-300 flex items-center justify-between px-6 shrink-0 text-sm font-semibold text-slate-700">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center text-black font-bold">
          {SECTION_LABELS[currentSection]}
        </div>
        <div className="flex-1 flex justify-end gap-6 items-center">
          <span className="font-mono text-base tracking-widest font-bold">
            {formatTime(timeLeft)}
          </span>
          <button className="flex items-center justify-center border border-slate-400 p-1.5 rounded text-slate-600 hover:bg-slate-100">
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT ZONE — always book split */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* LEFT — question number + passage (if any) + question text */}
        <div className="md:w-1/2 h-full overflow-y-auto border-r border-dashed border-slate-300 bg-white p-8 md:p-12">
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-900 text-white w-7 h-7 flex items-center justify-center font-bold text-sm mb-6 rounded-sm">
              {currentIndex + 1}
            </div>
            {currentQuestion?.passageText && (
              <div className="mb-8 prose prose-slate">
                <p className="text-base leading-loose text-slate-700 whitespace-pre-wrap font-serif">
                  {currentQuestion.passageText}
                </p>
              </div>
            )}
            <MathRenderer
              content={currentQuestion?.questionText || ""}
              className="text-lg leading-relaxed text-slate-900 font-serif"
            />
            {currentQuestion?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentQuestion.image} alt="Diagram" className="max-w-full my-6 border border-slate-200" />
            )}
          </div>
        </div>

        {/* RIGHT — answers only */}
        <div className="md:w-1/2 h-full overflow-y-auto bg-white p-8 md:p-12 relative">
          <div className="max-w-xl mx-auto">
            {/* Flag button anchored to top-right of answer panel */}
            <div className="flex justify-end mb-6">
              <button
                onClick={handleFlagToggle}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border font-bold text-xs transition-colors ${
                  flagged.has(currentQuestion?._id || '')
                    ? "text-[#b20000] border-[#b20000]/30"
                    : "text-slate-600 border-transparent hover:text-black hover:border-slate-300"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${flagged.has(currentQuestion?._id || '') ? "fill-[#b20000]" : ""}`} />
                {flagged.has(currentQuestion?._id || '') ? "Clear mark" : "Mark for Review"}
              </button>
            </div>

            {currentQuestion?.questionType === "free_response" ? (
              <FreeResponseInput
                questionId={currentQuestion._id}
                value={answers[currentQuestion._id] ?? ""}
                onChange={handleAnswerSelect}
              />
            ) : (
              <div className="space-y-3">
                {(["A", "B", "C", "D"] as const).map((opt) => {
                  const isSelected = answers[currentQuestion?._id || ''] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSelect(opt)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border-[2.5px] text-left transition-colors ${
                        isSelected
                          ? "border-[#0052a3] bg-[#f0f6ff]"
                          : "border-slate-300 hover:border-slate-400 bg-white"
                      }`}
                    >
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold mt-0.5 ${
                        isSelected ? "border-[#0052a3] bg-[#0052a3] text-white" : "border-slate-400 text-slate-600"
                      }`}>
                        {opt}
                      </span>
                      <MathRenderer
                        content={currentQuestion?.options[opt] || ""}
                        className="text-base leading-relaxed text-slate-800 self-center"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="h-[64px] bg-white border-t border-slate-300 flex items-center justify-between px-6 shrink-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
         <div className="flex-1"></div>
         <div className="flex-1 flex justify-center">
            <button
               onClick={() => setShowNav(true)}
               className="font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-full transition-colors flex items-center gap-2"
            >
               Question {currentIndex + 1} of {questions.length}
               <Grid className="w-4 h-4" />
            </button>
         </div>
         <div className="flex-1 flex justify-end gap-4">
            <button
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="px-6 py-2 font-bold text-[#0052a3] disabled:text-slate-300 disabled:cursor-not-allowed hover:bg-slate-100 rounded-full transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => handleSectionComplete()}
              className="px-8 py-2 bg-[#0052a3] hover:bg-[#004285] text-white font-bold rounded-full transition-colors"
            >
              Next
            </button>
         </div>
      </footer>

      {/* QUESTION NAV OVERLAY (Sterile Drawer) */}
      {showNav && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          <header className="h-[52px] border-b border-slate-300 flex items-center justify-center font-bold text-black shrink-0 relative">
            <button onClick={() => setShowNav(false)} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full text-slate-600">
               <X className="w-6 h-6" />
            </button>
            Review Page
          </header>
          <div className="p-12 flex-1 overflow-y-auto">
             <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-8">Section {SECTION_ORDER.indexOf(currentSection) + 1} Overview</h3>
                <div className="flex gap-8 mb-10 text-sm font-bold text-slate-700">
                   <div className="flex items-center gap-2"><span className="block w-4 h-4 border border-slate-300 bg-white" /> Unanswered</div>
                   <div className="flex items-center gap-2"><span className="block w-4 h-4 bg-[#0052a3]" /> Answered</div>
                   <div className="flex items-center gap-2">
                       <Bookmark className="w-4 h-4 text-[#b20000] fill-[#b20000]" /> For Review
                   </div>
                </div>
                
                <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-20 gap-x-2 gap-y-4">
                   {questions.map((q, i) => {
                      const ans = answers[q._id];
                      const isAns = ans !== null && ans !== undefined;
                      const isFlagged = flagged.has(q._id);
                      return (
                         <div key={q._id} className="relative flex flex-col items-center gap-1 group">
                           {isFlagged && <Bookmark className="w-3 h-3 text-[#b20000] fill-[#b20000] absolute -top-3" />}
                           <button
                             onClick={() => goToQuestion(i)}
                             className={`w-8 h-8 flex items-center justify-center font-bold text-sm border-2 rounded-sm transition-colors ${
                               isAns ? "bg-[#0052a3] border-[#0052a3] text-white" : "border-slate-300 bg-white text-slate-700"
                             }`}
                           >
                             {i + 1}
                           </button>
                         </div>
                      )
                   })}
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
