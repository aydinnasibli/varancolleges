"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveAnswer, saveTimeRemaining, saveCurrentPosition, completeSection, submitExam } from "@/app/actions/exam-attempt";
import { Flag, ChevronLeft, ChevronRight, List, X, Clock, AlertTriangle, Loader2, PenLine } from "lucide-react";
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
  rw_m1: "Reading & Writing — Module 1",
  rw_m2: "Reading & Writing — Module 2",
  math_m1: "Math — Module 1",
  math_m2: "Math — Module 2",
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

// Section key to sectionTimeRemaining field map
function getSectionTimingKey(section: string): string {
  const map: Record<string, string> = {
    rw_m1: "rwM1",
    rw_m2: "rwM2",
    math_m1: "mathM1",
    math_m2: "mathM2",
  };
  return map[section] || section;
}

// ─── Free Response Input ────────────────────────────────────────────────────
function FreeResponseInput({
  questionId,
  value,
  onChange,
}: {
  questionId: string;
  value: string | null;
  onChange: (val: string) => void;
}) {
  // Use a local ref so we can debounce saves without React re-render delays
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val); // update local state immediately
    // debounce the actual save
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
        <PenLine className="h-4 w-4 text-accent" />
        <span>Enter your answer below</span>
      </div>
      <input
        key={questionId}
        type="text"
        defaultValue={value ?? ""}
        onChange={handleChange}
        placeholder="Type your answer here..."
        autoComplete="off"
        className="w-full bg-white/5 border-2 border-white/20 focus:border-accent rounded-xl px-5 py-4 text-white text-lg placeholder:text-slate-600 focus:outline-none transition-colors"
      />
      <p className="text-xs text-slate-500">
        Fractions and decimals are both accepted — e.g. <span className="text-slate-400 font-mono">1/2</span> and <span className="text-slate-400 font-mono">0.5</span> are equivalent.
      </p>
    </div>
  );
}

export default function ExamInterface({
  attempt,
  questions: initialQuestions,
  examId,
  examTitle,
  examSlug,
  isResuming,
}: ExamInterfaceProps) {
  const router = useRouter();
  const attemptId = attempt._id;

  // Current section + questions
  const [currentSection, setCurrentSection] = useState(attempt.currentSection);
  const [questions, setQuestions] = useState<QuestionData[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(attempt.currentQuestionIndex);

  // Answers state — keyed by questionId
  const [answers, setAnswers] = useState<Record<string, string | null>>(() => {
    const map: Record<string, string | null> = {};
    attempt.answers.forEach((a) => {
      map[a.questionId] = a.selectedAnswer;
    });
    return map;
  });
  const [flagged, setFlagged] = useState<Set<string>>(() => {
    const set = new Set<string>();
    attempt.answers.forEach((a) => {
      if (a.isFlagged) set.add(a.questionId);
    });
    return set;
  });

  // Timer
  const timingKey = getSectionTimingKey(currentSection);
  const savedTime = attempt.sectionTimeRemaining?.[timingKey as keyof typeof attempt.sectionTimeRemaining];
  const defaultTime = SECTION_DURATIONS[currentSection] ?? 32 * 60;
  const [timeLeft, setTimeLeft] = useState<number>(savedTime ?? defaultTime);
  const [timerWarning, setTimerWarning] = useState(false);

  // UI state
  const [showNav, setShowNav] = useState(false);
  const [phase, setPhase] = useState<"exam" | "section_break" | "submitting">("exam");
  const [breakType, setBreakType] = useState<SectionBreakType>("module");
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Refs to avoid stale closures in setInterval
  const timeLeftRef = useRef(timeLeft);
  const currentSectionRef = useRef(currentSection);
  const attemptIdRef = useRef(attemptId);
  timeLeftRef.current = timeLeft;
  currentSectionRef.current = currentSection;
  attemptIdRef.current = attemptId;

  const currentQuestion = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (phase !== "exam") return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 300) setTimerWarning(true); // 5 min warning
        if (next === 0) {
          clearInterval(interval);
          handleSectionComplete(true);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, currentSection]);

  // Save time remaining every 30 seconds
  useEffect(() => {
    if (phase !== "exam") return;
    const interval = setInterval(async () => {
      await saveTimeRemaining(attemptIdRef.current, currentSectionRef.current, timeLeftRef.current);
    }, 30000);
    return () => clearInterval(interval);
  }, [phase, currentSection]);

  // Save position on index change
  useEffect(() => {
    if (phase !== "exam") return;
    saveCurrentPosition(attemptId, currentSection, currentIndex).catch(console.error);
  }, [currentIndex, currentSection]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = useCallback(
    async (optionKey: string) => {
      if (!currentQuestion) return;
      const qId = currentQuestion._id;
      setAnswers((prev) => ({ ...prev, [qId]: optionKey }));
      // Fire-and-forget save
      saveAnswer(attemptId, qId, optionKey, flagged.has(qId)).catch(console.error);
    },
    [currentQuestion, attemptId, flagged]
  );

  const handleFlagToggle = useCallback(async () => {
    if (!currentQuestion) return;
    const qId = currentQuestion._id;
    const isFlagged = flagged.has(qId);
    setFlagged((prev) => {
      const next = new Set(prev);
      isFlagged ? next.delete(qId) : next.add(qId);
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

  const handleSectionComplete = async (timeExpired = false) => {
    if (submitting) return;
    setSubmitting(true);

    // Check if it's the last section
    const sectionIdx = SECTION_ORDER.indexOf(currentSection);
    const isLastSection = sectionIdx === SECTION_ORDER.length - 1;

    if (isLastSection) {
      // Submit the entire exam
      setPhase("submitting");
      const result = await submitExam(attemptId, examSlug);
      if (result.success) {
        router.push(`/exam/${examSlug}/results/${result.attemptId}`);
      } else {
        toast.error("Failed to submit exam. Please try again.");
        setPhase("exam");
        setSubmitting(false);
      }
      return;
    }

    // Move to next section
    const result = await completeSection(attemptId, currentSection);
    if (!result.success) {
      toast.error("Failed to advance to next section.");
      setSubmitting(false);
      return;
    }

    const nextSection = SECTION_ORDER[sectionIdx + 1];

    // Show appropriate break screen
    const isRwToMath = currentSection === "rw_m2" && nextSection === "math_m1";
    const bt = isRwToMath ? "sections" : "module";
    setBreakType(bt);
    setBreakTimeLeft(bt === "sections" ? 10 * 60 : 0);

    // Update questions for next section
    setQuestions((result.questions ?? []) as unknown as QuestionData[]);
    setCurrentSection(nextSection);
    setCurrentIndex(0);
    setTimeLeft(SECTION_DURATIONS[nextSection] ?? 35 * 60);
    setTimerWarning(false);
    setPhase("section_break");
    setSubmitting(false);
  };

  const handleBreakContinue = () => {
    setBreakTimeLeft(0);
    setPhase("exam");
  };

  // Countdown for the 10-minute R&W → Math break
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

  // Submit the final exam explicitly
  const handleFinalSubmit = async () => {
    setShowSubmitConfirm(false);
    setSubmitting(true);
    setPhase("submitting");

    const result = await submitExam(attemptId, examSlug);
    if (result.success) {
      router.push(`/exam/${examSlug}/results/${result.attemptId}`);
    } else {
      toast.error("Failed to submit exam. Please try again.");
      setPhase("exam");
      setSubmitting(false);
    }
  };

  const isLastSection = SECTION_ORDER.indexOf(currentSection) === SECTION_ORDER.length - 1;
  const isLastQuestion = currentIndex === questions.length - 1;

  // ─── Section Break Screen ────────────────────────────────────────────────
  if (phase === "section_break") {
    const nextSection = currentSection;
    const isMainBreak = breakType === "sections";
    const breakMins = Math.floor(breakTimeLeft / 60);
    const breakSecs = breakTimeLeft % 60;
    const breakProgress = isMainBreak ? (breakTimeLeft / (10 * 60)) * 100 : 0;

    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">{isMainBreak ? "☕" : "➡️"}</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isMainBreak ? "Section Break" : "Next Module"}
          </h2>
          {isMainBreak ? (
            <>
              <p className="text-slate-400 text-sm mb-6">
                You&apos;ve completed Reading &amp; Writing. Take a 10-minute break before Math.
              </p>
              {/* Countdown timer */}
              <div className="mb-2">
                <span className={`text-5xl font-mono font-bold tabular-nums ${breakTimeLeft <= 60 ? "text-red-400" : "text-white"}`}>
                  {String(breakMins).padStart(2, "0")}:{String(breakSecs).padStart(2, "0")}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-1000"
                  style={{ width: `${breakProgress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Next: <span className="text-white font-medium">{SECTION_LABELS[nextSection]}</span>
                {" · "}{Math.round((SECTION_DURATIONS[nextSection] ?? 0) / 60)} min
              </p>
            </>
          ) : (
            <p className="text-slate-400 text-sm mb-6">
              Next: <span className="text-white font-medium">{SECTION_LABELS[nextSection]}</span>
              {" · "}{Math.round((SECTION_DURATIONS[nextSection] ?? 0) / 60)} min
            </p>
          )}
          <button
            onClick={handleBreakContinue}
            className="w-full bg-accent hover:bg-accent/90 text-primary py-3 rounded-xl font-semibold transition-colors"
          >
            {isMainBreak ? "Start Early" : `Begin ${SECTION_LABELS[nextSection]}`}
          </button>
          {isMainBreak && (
            <p className="text-xs text-slate-600 mt-3">The exam will continue automatically when the timer ends.</p>
          )}
        </div>
      </div>
    );
  }

  // ─── Submitting Screen ───────────────────────────────────────────────────
  if (phase === "submitting") {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Submitting your exam...</p>
          <p className="text-slate-400 text-sm mt-2">Please don&apos;t close this tab</p>
        </div>
      </div>
    );
  }

  // ─── Exam UI ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-300 truncate">
          {SECTION_LABELS[currentSection]}
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold transition-colors ${
            timerWarning
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-white/5 text-white border border-white/10"
          }`}
        >
          <Clock className="h-4 w-4" />
          {formatTime(timeLeft)}
          {timerWarning && <AlertTriangle className="h-3.5 w-3.5" />}
        </div>

        {/* Nav toggle */}
        <button
          onClick={() => setShowNav(true)}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          <List className="h-4 w-4" />
          <span className="hidden sm:block">Questions</span>
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {currentQuestion ? (
            <>
              {/* Question counter */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <button
                  onClick={handleFlagToggle}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    flagged.has(currentQuestion._id)
                      ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  {flagged.has(currentQuestion._id) ? "Flagged" : "Flag for Review"}
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Passage (if RW) */}
              {currentQuestion.passageText && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 max-h-64 overflow-y-auto">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {currentQuestion.passageText}
                  </p>
                </div>
              )}

              {/* Question image */}
              {currentQuestion.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentQuestion.image}
                  alt="Question diagram"
                  className="max-w-full h-auto max-h-72 object-contain rounded-xl border border-white/10 mb-6"
                />
              )}

              {/* Question text */}
              <MathRenderer
                content={currentQuestion.questionText}
                className="text-white text-base leading-relaxed mb-8"
              />

              {/* Answer options */}
              {currentQuestion.questionType === "free_response" ? (
                <FreeResponseInput
                  questionId={currentQuestion._id}
                  value={answers[currentQuestion._id] ?? ""}
                  onChange={handleAnswerSelect}
                />
              ) : (
                <div className="space-y-3">
                  {(["A", "B", "C", "D"] as const).map((opt) => {
                    const isSelected = answers[currentQuestion._id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswerSelect(opt)}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-150 ${
                          isSelected
                            ? "bg-accent/15 border-accent/60 text-white"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/8"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                            isSelected
                              ? "border-accent bg-accent text-primary"
                              : "border-white/30 text-slate-400"
                          }`}
                        >
                          {opt}
                        </span>
                        <MathRenderer
                          content={currentQuestion.options[opt]}
                          className="text-sm leading-relaxed"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-slate-400">
              No questions available for this section.
            </div>
          )}
        </div>
      </div>

      {/* Footer navigation */}
      <footer className="sticky bottom-0 bg-background-dark/95 backdrop-blur-xl border-t border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => goToQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {/* Mini question dots (desktop) */}
        <div className="hidden sm:flex items-center gap-1 flex-wrap justify-center max-w-xs">
          {questions.slice(0, 10).map((_, i) => {
            const qId = questions[i]?._id;
            const answered = qId && answers[qId] !== null && answers[qId] !== undefined;
            const isFlagged = qId && flagged.has(qId);
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => goToQuestion(i)}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                  isCurrent
                    ? "bg-accent text-primary"
                    : isFlagged
                    ? "bg-yellow-500/40 text-yellow-300 border border-yellow-500/60"
                    : answered
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-slate-500 border border-white/10"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
          {questions.length > 10 && (
            <span className="text-xs text-slate-500">+{questions.length - 10}</span>
          )}
        </div>

        {isLastQuestion ? (
          <button
            onClick={() =>
              isLastSection ? setShowSubmitConfirm(true) : handleSectionComplete()
            }
            disabled={submitting}
            className="flex items-center gap-2 text-sm bg-accent hover:bg-accent/90 text-primary font-semibold px-5 py-2 rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLastSection ? "Submit Exam" : "Next Module"}
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => goToQuestion(currentIndex + 1)}
            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </footer>

      {/* Question Navigation Drawer */}
      {showNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNav(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-background-dark border-l border-white/10 flex flex-col h-full shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white">Question Overview</h3>
              <button onClick={() => setShowNav(false)}>
                <X className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </button>
            </div>

            <div className="px-5 py-3 border-b border-white/5 flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent inline-block" />
                Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-yellow-500/60 inline-block" />
                Flagged
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/10 border border-white/20 inline-block" />
                Unanswered
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <p className="text-xs text-slate-500 mb-3">
                {SECTION_LABELS[currentSection]}
              </p>
              <div className="grid grid-cols-6 gap-2">
                {questions.map((q, i) => {
                  const answered = answers[q._id] !== null && answers[q._id] !== undefined;
                  const isFlagged = flagged.has(q._id);
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q._id}
                      onClick={() => goToQuestion(i)}
                      className={`aspect-square rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? "ring-2 ring-accent bg-accent text-primary"
                          : isFlagged && answered
                          ? "bg-yellow-500/20 border-2 border-yellow-500/60 text-yellow-300"
                          : isFlagged
                          ? "bg-yellow-500/30 text-yellow-300"
                          : answered
                          ? "bg-accent/20 text-accent border border-accent/30"
                          : "bg-white/5 text-slate-500 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-3">
                {Object.values(answers).filter(Boolean).length}/{questions.length} answered
                {flagged.size > 0 && ` • ${flagged.size} flagged`}
              </p>
              {isLastQuestion ? (
                <button
                  onClick={() => {
                    setShowNav(false);
                    isLastSection ? setShowSubmitConfirm(true) : handleSectionComplete();
                  }}
                  className="w-full bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  {isLastSection ? "Submit Exam" : "Go to Next Module"}
                </button>
              ) : (
                <button
                  onClick={() => goToQuestion(questions.length - 1)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Go to Last Question
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSubmitConfirm(false)} />
          <div className="relative bg-background-dark border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white text-center mb-2">Submit Exam?</h3>
            <p className="text-sm text-slate-400 text-center mb-2">
              You are about to submit your final answers. This action cannot be undone.
            </p>
            {Object.values(answers).filter((a) => a === null || a === undefined).length > 0 && (
              <p className="text-xs text-amber-400 text-center mb-4 bg-amber-400/10 rounded-lg py-2">
                ⚠️ You have {Object.values(answers).filter((a) => !a).length} unanswered questions
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 border border-white/20 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="flex-1 bg-accent hover:bg-accent/90 text-primary py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
