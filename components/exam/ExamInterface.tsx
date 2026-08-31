"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveAnswer, saveTimeRemaining, saveCurrentPosition, completeSection, submitExam, prefetchNextSectionQuestions } from "@/app/actions/exam-attempt";
import { Flag, ChevronLeft, ChevronRight, Grid, X, Clock, Loader2, Bookmark } from "lucide-react";
import { toast } from "sonner";
import MathRenderer from "@/components/MathRenderer";
import { useTranslations } from "next-intl";

// SAT section durations in seconds
const SECTION_DURATIONS: Record<string, number> = {
  rw_m1: 32 * 60,
  rw_m2: 32 * 60,
  math_m1: 35 * 60,
  math_m2: 35 * 60,
};

const getSectionLabel = (section: string, t: any) => {
  return section.startsWith("rw") ? t("section1") : t("section2");
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
  const t = useTranslations("Exam.interface");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { onChange(val); }, 300);
  };

  return (
    <div className="mt-7 rounded-xl p-5" style={{ background: "var(--x-panel)", border: "1px solid var(--x-rule)" }}>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--x-ink-faint)" }}>{t("spr")}</div>
      <input
        key={questionId}
        type="text"
        defaultValue={value ?? ""}
        onChange={handleChange}
        placeholder={t("sprPlaceholder")}
        autoComplete="off"
        className="exam-field w-full rounded-lg px-4 py-3 text-[18px] font-mono outline-none transition-colors duration-150"
      />
    </div>
  );
}

export default function ExamInterface({ attempt, questions: initialQuestions, examId, examTitle, examSlug, isResuming }: ExamInterfaceProps) {
  const router = useRouter();
  const attemptId = attempt._id;
  const t = useTranslations("Exam.interface");

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
  const [timerHidden, setTimerHidden] = useState(false);
  const [phase, setPhase] = useState<"exam" | "section_break" | "submitting">("exam");
  const [breakType, setBreakType] = useState<SectionBreakType>("module");
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [nextQuestionsReady, setNextQuestionsReady] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const timeUpRef = useRef(false);
  const prefetchedQuestionsRef = useRef<QuestionData[] | null>(null);
  const prefetchingRef = useRef(false);

  const timeLeftRef = useRef(timeLeft);
  const currentSectionRef = useRef(currentSection);
  const attemptIdRef = useRef(attemptId);
  timeLeftRef.current = timeLeft;
  currentSectionRef.current = currentSection;
  attemptIdRef.current = attemptId;

  const currentQuestion = questions[currentIndex];

  // Timer countdown — sets a ref flag when time is up instead of
  // calling handleSectionComplete() directly inside a setState updater
  // (which would capture a stale closure over submitting).
  useEffect(() => {
    if (phase !== "exam") return;
    timeUpRef.current = false;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          clearInterval(interval);
          timeUpRef.current = true;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentSection]);

  // Separate effect watches for the time-up signal and fires section complete
  useEffect(() => {
    if (timeLeft !== 0 || phase !== "exam") return;
    if (!timeUpRef.current) return;
    timeUpRef.current = false;
    handleSectionComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

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

  // Prefetch next section questions when the student reaches the last question,
  // so the "Next Module" button is immediately ready on the break screen.
  useEffect(() => {
    if (phase !== "exam") return;
    if (currentIndex !== questions.length - 1) return;
    const sectionIdx = SECTION_ORDER.indexOf(currentSection);
    if (sectionIdx < 0 || sectionIdx >= SECTION_ORDER.length - 1) return;
    if (prefetchingRef.current || prefetchedQuestionsRef.current) return;

    prefetchingRef.current = true;
    prefetchNextSectionQuestions(examId, currentSection).then((qs) => {
      if (qs) prefetchedQuestionsRef.current = qs as unknown as QuestionData[];
      prefetchingRef.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length, currentSection, phase]);

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

  // Keyboard: A-D / 1-4 pick an answer, arrows move, F flags, Esc closes review.
  // Suppressed while typing so the free-response field keeps its letters.
  useEffect(() => {
    if (phase !== "exam") return;

    const onKeyDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Escape") { setShowNav(false); return; }
      if (showNav) return;

      const key = e.key.toUpperCase();

      if (currentQuestion?.questionType !== "free_response") {
        const byLetter = ["A", "B", "C", "D"].indexOf(key);
        const byNumber = ["1", "2", "3", "4"].indexOf(e.key);
        const choice = byLetter >= 0 ? byLetter : byNumber;
        if (choice >= 0) {
          e.preventDefault();
          handleAnswerSelect(["A", "B", "C", "D"][choice]);
          return;
        }
      }

      if (e.key === "ArrowLeft") { e.preventDefault(); goToQuestion(currentIndex - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goToQuestion(currentIndex + 1); }
      else if (key === "F") { e.preventDefault(); handleFlagToggle(); }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, showNav, currentIndex, currentQuestion, handleAnswerSelect, handleFlagToggle, questions.length]);

  const handleSectionComplete = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
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
        submittingRef.current = false;
        setSubmitting(false);
      }
      return;
    }

    // Capture before any state changes — closures in async code below need this
    const completingSection = currentSection;
    const nextSection = SECTION_ORDER[sectionIdx + 1];
    const isRwToMath = completingSection === "rw_m2" && nextSection === "math_m1";
    const bt = isRwToMath ? "sections" : "module";

    // If we prefetched questions already (user was on last question for ≥1s),
    // apply them immediately so the break screen button needs no spinner.
    const cached = prefetchedQuestionsRef.current;
    prefetchedQuestionsRef.current = null;
    prefetchingRef.current = false;

    if (cached) setQuestions(cached);

    // Transition to break screen immediately — no waiting for DB
    setBreakType(bt);
    setBreakTimeLeft(bt === "sections" ? 10 * 60 : 0);
    setCurrentSection(nextSection);
    setCurrentIndex(0);
    setTimeLeft(SECTION_DURATIONS[nextSection] ?? 35 * 60);
    setNextQuestionsReady(!!cached);
    setPhase("section_break");
    submittingRef.current = false;
    setSubmitting(false);

    // Always call completeSection for DB writes (answer slots + currentSection update).
    // If we already have questions from the prefetch, ignore the returned questions.
    const result = await completeSection(attemptId, completingSection);
    if (!result.success) {
      toast.error("Failed to load next section. Please refresh.");
      return;
    }
    if (!cached && result.questions) {
      setQuestions(result.questions as unknown as QuestionData[]);
    }
    setNextQuestionsReady(true);
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
      <div className="exam-root min-h-screen flex flex-col items-center justify-center p-6 font-sans exam-screen-enter">
        <h1 className="text-2xl font-semibold mb-6">{isMainBreak ? t("breakDetails") : t("moduleComplete")}</h1>
        {isMainBreak ? (
          <div className="p-10 rounded-2xl text-center max-w-lg w-full" style={{ background: "var(--x-panel)", border: "1px solid var(--x-rule)" }}>
            <h2 className="text-xl font-bold mb-4">{t("mainBreakLength")}</h2>
            <div className="text-5xl font-mono font-bold mb-6">
              {String(breakMins).padStart(2, "0")}:{String(breakSecs).padStart(2, "0")}
            </div>
            <p className="mb-8" style={{ color: "var(--x-ink-soft)" }}>{t("mainBreakDesc")}</p>
            <button
              onClick={() => { if (nextQuestionsReady) { setBreakTimeLeft(0); setPhase("exam"); } }}
              disabled={!nextQuestionsReady}
              className="px-7 py-3 rounded-xl text-[14px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 active:scale-[0.98] disabled:active:scale-100 motion-reduce:active:scale-100 flex items-center gap-2 mx-auto" style={{ background: "var(--x-accent)", color: "var(--x-panel)" }}
            >
              {!nextQuestionsReady && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("resumeTesting")}
            </button>
          </div>
        ) : (
          <div className="p-10 rounded-2xl text-center max-w-lg w-full" style={{ background: "var(--x-panel)", border: "1px solid var(--x-rule)" }}>
            <h2 className="text-xl font-bold mb-4">{t("readyToMoveOn")}</h2>
            <p className="mb-8" style={{ color: "var(--x-ink-soft)" }}>{t("moduleCompleteDesc")}</p>
            <button
              onClick={() => { if (nextQuestionsReady) setPhase("exam"); }}
              disabled={!nextQuestionsReady}
              className="px-7 py-3 rounded-xl text-[14px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 active:scale-[0.98] disabled:active:scale-100 motion-reduce:active:scale-100 flex items-center gap-2 mx-auto" style={{ background: "var(--x-accent)", color: "var(--x-panel)" }}
            >
              {!nextQuestionsReady && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("nextModule")}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === "submitting") {
    return (
      <div className="exam-root min-h-screen flex items-center justify-center font-sans exam-screen-enter">
        <div className="text-center">
          <Loader2 className="h-9 w-9 animate-spin mx-auto mb-4" style={{ color: "var(--x-accent)" }} />
          <p className="text-xl font-bold">{t("submittingScore")}</p>
        </div>
      </div>
    );
  }

  const hasPassage = Boolean(currentQuestion?.passageText);
  const isFlagged = flagged.has(currentQuestion?._id || "");
  const selected = answers[currentQuestion?._id || ""];

  // Built once and placed by whichever layout is active, so the split and
  // single-column views can never drift apart.
  const questionBlock = (
    <>
      <div className="flex items-start justify-between gap-4 mb-5">
        <span
          className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] pt-1"
          style={{ color: "var(--x-ink-faint)" }}
        >
          {currentIndex + 1} / {questions.length}
        </span>
        <button
          onClick={handleFlagToggle}
          aria-pressed={isFlagged}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-150"
          style={{
            color: isFlagged ? "var(--x-mark)" : "var(--x-ink-soft)",
            background: isFlagged ? "var(--x-mark-wash)" : "transparent",
            border: `1px solid ${isFlagged ? "var(--x-mark)" : "var(--x-rule)"}`,
          }}
        >
          <Bookmark className="w-3.5 h-3.5" style={isFlagged ? { fill: "currentColor" } : undefined} />
          {isFlagged ? t("clearMark") : t("markForReview")}
        </button>
      </div>

      <MathRenderer
        content={currentQuestion?.questionText || ""}
        className="exam-read text-[19px] leading-[1.55] font-medium"
      />
    </>
  );

  const answerBlock =
    currentQuestion?.questionType === "free_response" ? (
      <FreeResponseInput
        questionId={currentQuestion._id}
        value={answers[currentQuestion._id] ?? ""}
        onChange={handleAnswerSelect}
      />
    ) : (
      <div className="mt-7 space-y-2.5">
        {(["A", "B", "C", "D"] as const).map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => handleAnswerSelect(opt)}
              data-selected={isSelected}
              aria-pressed={isSelected}
              className="exam-choice w-full flex items-start gap-3.5 rounded-xl px-4 py-3.5 text-left active:scale-[0.995] motion-reduce:active:scale-100"
              style={{
                background: isSelected ? undefined : "var(--x-panel)",
                border: `1px solid ${isSelected ? "var(--x-accent)" : "var(--x-rule-strong)"}`,
              }}
            >
              <span
                className="shrink-0 w-7 h-7 rounded-lg grid place-items-center text-[13px] font-semibold mt-px transition-colors duration-150"
                style={
                  isSelected
                    ? { background: "var(--x-accent)", color: "var(--x-panel)" }
                    : { border: "1px solid var(--x-rule-strong)", color: "var(--x-ink-soft)" }
                }
              >
                {opt}
              </span>
              <MathRenderer
                content={currentQuestion?.options[opt] || ""}
                className="exam-read text-[17px] leading-[1.5] self-center"
              />
            </button>
          );
        })}
      </div>
    );

  return (
    <div className="exam-root h-screen w-screen flex flex-col font-sans overflow-hidden">
      {/* HEADER — module and position left, clock centred, controls right */}
      <header
        className="h-14 shrink-0 flex items-center gap-4 px-4 sm:px-6"
        style={{ background: "var(--x-panel)", borderBottom: "1px solid var(--x-rule)" }}
      >
        <div className="flex-1 min-w-0">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] truncate"
            style={{ color: "var(--x-ink-faint)" }}
          >
            {getSectionLabel(currentSection, t)}
          </p>
          <p className="text-[13px] font-semibold tabular-nums" style={{ color: "var(--x-ink-soft)" }}>
            {t("question")} {currentIndex + 1} {t("of")} {questions.length}
          </p>
        </div>

        {/* Amber under 5 minutes, red under 1. The one place on this screen
            where colour is allowed to raise the pulse. */}
        <div className="shrink-0 text-center tabular-nums">
          {timerHidden ? (
            <span className="text-[13px] font-medium" style={{ color: "var(--x-ink-faint)" }}>
              &middot;&middot;&middot;
            </span>
          ) : (
            <span
              className="font-mono text-[22px] leading-none font-semibold tracking-tight"
              style={{
                color:
                  timeLeft <= 60
                    ? "var(--x-crit)"
                    : timeLeft <= 300
                      ? "var(--x-warn)"
                      : "var(--x-ink)",
              }}
            >
              {formatTime(timeLeft)}
            </span>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setTimerHidden((v) => !v)}
            aria-pressed={timerHidden}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-150"
            style={{ color: "var(--x-ink-soft)", border: "1px solid var(--x-rule)" }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {timerHidden ? t("showTimer") : t("hideTimer")}
            </span>
          </button>
        </div>
      </header>

      {/* Progress — ambient, no numbers competing with the header */}
      <div className="h-[3px] shrink-0" style={{ background: "var(--x-rule)" }}>
        <div
          className="exam-progress-fill h-full"
          style={{
            width: `${((currentIndex + 1) / Math.max(questions.length, 1)) * 100}%`,
            background: "var(--x-accent)",
          }}
        />
      </div>

      {/* MAIN — split only when there is a passage to split against.
          Math questions have no passageText, so the old unconditional 50/50
          left half the screen holding a single line. */}
      <main className="flex-1 overflow-hidden">
        {hasPassage ? (
          <div className="h-full flex flex-col md:flex-row">
            {/* Passage */}
            <div
              className="md:w-1/2 min-h-0 flex-1 md:flex-none md:h-full overflow-y-auto px-6 py-8 sm:px-10 md:px-12"
              style={{ background: "var(--x-panel)", borderRight: "1px solid var(--x-rule)" }}
            >
              <div key={currentQuestion?._id} className="max-w-[62ch] mx-auto exam-question-enter">
                <MathRenderer
                  content={currentQuestion?.passageText || ""}
                  className="exam-read text-[17px] leading-[1.7] whitespace-pre-wrap"
                />
                {currentQuestion?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentQuestion.image}
                    alt=""
                    className="max-w-full my-7 rounded-lg"
                    style={{ border: "1px solid var(--x-rule)" }}
                  />
                )}
              </div>
            </div>

            {/* Question + answers */}
            <div
              className="md:w-1/2 min-h-0 flex-1 md:flex-none md:h-full overflow-y-auto px-6 py-8 sm:px-10 md:px-12"
              style={{ background: "var(--x-bg)" }}
            >
              <div key={currentQuestion?._id} className="max-w-[58ch] mx-auto exam-question-enter">
                {questionBlock}
                {answerBlock}
              </div>
            </div>
          </div>
        ) : (
          /* No passage: one centred column, the question given room to breathe */
          <div className="h-full overflow-y-auto px-6 py-10 sm:px-10" style={{ background: "var(--x-bg)" }}>
            <div key={currentQuestion?._id} className="max-w-[60ch] mx-auto exam-question-enter">
              {currentQuestion?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentQuestion.image}
                  alt=""
                  className="max-w-full mb-8 rounded-lg"
                  style={{ border: "1px solid var(--x-rule)" }}
                />
              )}
              {questionBlock}
              {answerBlock}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer
        className="h-16 shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6"
        style={{ background: "var(--x-panel)", borderTop: "1px solid var(--x-rule)" }}
      >
        <button
          onClick={() => setShowNav(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors duration-150 active:scale-[0.98] motion-reduce:active:scale-100"
          style={{ color: "var(--x-ink)", border: "1px solid var(--x-rule)" }}
        >
          <Grid className="w-4 h-4" style={{ color: "var(--x-ink-faint)" }} />
          <span className="hidden sm:inline">{t("reviewPage")}</span>
          <span className="sm:hidden tabular-nums">{currentIndex + 1}/{questions.length}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToQuestion(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] disabled:active:scale-100 motion-reduce:active:scale-100"
            style={{ color: "var(--x-ink)", border: "1px solid var(--x-rule)" }}
          >
            {t("back")}
          </button>
          <button
            onClick={() => {
              if (currentIndex < questions.length - 1) {
                goToQuestion(currentIndex + 1);
              } else {
                handleSectionComplete();
              }
            }}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] disabled:active:scale-100 motion-reduce:active:scale-100"
            style={{ background: "var(--x-accent)", color: "var(--x-panel)" }}
          >
            {submitting && currentIndex === questions.length - 1 && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {currentIndex < questions.length - 1 ? t("next") : t("finishSection")}
          </button>
        </div>
      </footer>

      {/* REVIEW OVERLAY */}
      {showNav && (
        <div
          className="absolute inset-0 z-50 flex flex-col exam-overlay-enter"
          style={{ background: "var(--x-bg)" }}
        >
          <header
            className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6"
            style={{ background: "var(--x-panel)", borderBottom: "1px solid var(--x-rule)" }}
          >
            <span className="text-[13px] font-semibold">
              {t("sectionOverview", { number: SECTION_ORDER.indexOf(currentSection) + 1 })}
            </span>
            <button
              onClick={() => setShowNav(false)}
              aria-label={t("reviewPage")}
              className="p-2 rounded-lg transition-colors duration-150"
              style={{ color: "var(--x-ink-soft)", border: "1px solid var(--x-rule)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
            <div className="max-w-3xl mx-auto">
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[12px] font-medium"
                style={{ color: "var(--x-ink-soft)" }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded"
                    style={{ background: "var(--x-panel)", border: "1px solid var(--x-rule-strong)" }}
                  />
                  {t("unanswered")}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded" style={{ background: "var(--x-accent)" }} />
                  {t("answered")}
                </span>
                <span className="flex items-center gap-2">
                  <Bookmark className="w-3.5 h-3.5" style={{ color: "var(--x-mark)", fill: "currentColor" }} />
                  {t("forReview")}
                </span>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
                {questions.map((q, i) => {
                  const ans = answers[q._id];
                  const isAns = ans !== null && ans !== undefined;
                  const isMarked = flagged.has(q._id);
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q._id}
                      onClick={() => goToQuestion(i)}
                      className="relative h-10 rounded-lg text-[13px] font-semibold tabular-nums transition-colors duration-150 active:scale-95 motion-reduce:active:scale-100"
                      style={{
                        background: isAns ? "var(--x-accent)" : "var(--x-panel)",
                        color: isAns ? "var(--x-panel)" : "var(--x-ink-soft)",
                        border: `1px solid ${isCurrent ? "var(--x-ink)" : isAns ? "var(--x-accent)" : "var(--x-rule-strong)"}`,
                        boxShadow: isCurrent ? "0 0 0 2px var(--x-accent-edge)" : undefined,
                      }}
                    >
                      {i + 1}
                      {isMarked && (
                        <Bookmark
                          className="w-3 h-3 absolute -top-1 -right-1"
                          style={{ color: "var(--x-mark)", fill: "currentColor" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
