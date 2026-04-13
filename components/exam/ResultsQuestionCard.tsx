"use client";

import { CheckCircle, XCircle, MinusCircle, ChevronDown, PenLine } from "lucide-react";
import MathRenderer from "@/components/MathRenderer";

interface ResultsQuestionCardProps {
  id?: string;
  index: number;
  question: {
    questionNumber: number;
    module: number;
    questionText: string;
    passageText?: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    questionType?: string;
    explanation?: string;
    domain?: string;
  };
  selected: string | null | undefined;
  isCorrect: boolean;
  isSkipped: boolean;
}

export default function ResultsQuestionCard({
  id,
  index,
  question,
  selected,
  isCorrect,
  isSkipped,
}: ResultsQuestionCardProps) {
  const isFR = question.questionType === "free_response";

  const statusIcon = isSkipped ? (
    <MinusCircle className="h-5 w-5 text-slate-500 flex-shrink-0" />
  ) : isCorrect ? (
    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
  ) : (
    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
  );

  const borderColor = isSkipped
    ? "border-white/10"
    : isCorrect
    ? "border-green-500/30"
    : "border-red-500/30";

  const bgColor = isSkipped
    ? "bg-white/[0.03]"
    : isCorrect
    ? "bg-green-500/[0.04]"
    : "bg-red-500/[0.04]";

  return (
    <details id={id} className={`group ${bgColor} border ${borderColor} rounded-xl overflow-hidden`}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none hover:bg-white/5 transition-colors">
        {statusIcon}

        {/* Question meta + preview */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-semibold text-slate-500">Q{index}</span>
            {isFR && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                <PenLine className="h-2.5 w-2.5" />
                FR
              </span>
            )}
            {question.domain && (
              <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full truncate max-w-[140px]">
                {question.domain}
              </span>
            )}
          </div>
          <p
            className="text-sm text-white/80 line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: question.questionText
                .replace(/<[^>]+>/g, "")
                .replace(/\$\$?[^$]*\$\$?/g, "…"),
            }}
          />
        </div>

        {/* Answer summary chips */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isSkipped ? (
            <span className="text-xs text-slate-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              Skipped
            </span>
          ) : (
            <>
              {/* Student's choice */}
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  isCorrect
                    ? "bg-green-500/15 border-green-500/30 text-green-400"
                    : "bg-red-500/15 border-red-500/30 text-red-400 line-through"
                }`}
              >
                {isFR ? (selected ?? "—") : selected}
              </span>
              {/* Correct answer — only shown if wrong */}
              {!isCorrect && (
                <span className="text-xs font-bold bg-green-500/15 border border-green-500/30 text-green-400 px-2.5 py-1 rounded-lg">
                  {isFR ? question.correctAnswer : question.correctAnswer}
                </span>
              )}
            </>
          )}
          <ChevronDown className="h-4 w-4 text-slate-500 group-open:rotate-180 transition-transform ml-1" />
        </div>
      </summary>

      {/* Expanded body */}
      <div className="px-5 pb-5 pt-3 border-t border-white/5">
        {question.passageText && (
          <div className="mb-4 p-4 bg-white/5 rounded-xl text-sm text-slate-300 leading-relaxed max-h-52 overflow-y-auto border border-white/5">
            <MathRenderer content={question.passageText} />
          </div>
        )}

        <MathRenderer
          content={question.questionText}
          className="text-sm text-white/90 mb-4 leading-relaxed"
        />

        {isFR ? (
          /* Free-response comparison */
          <div className="space-y-2 mb-4">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                isSkipped
                  ? "bg-white/5 border border-white/10 text-slate-400"
                  : isCorrect
                  ? "bg-green-500/15 border border-green-500/35 text-green-300"
                  : "bg-red-500/15 border border-red-500/35 text-red-300"
              }`}
            >
              <span className="text-xs font-semibold text-slate-400 w-24 flex-shrink-0">
                Your answer
              </span>
              <span className="font-mono">
                {selected || <span className="italic text-slate-500">Skipped</span>}
              </span>
              {!isSkipped && isCorrect && (
                <CheckCircle className="h-3.5 w-3.5 text-green-400 ml-auto flex-shrink-0" />
              )}
              {!isSkipped && !isCorrect && (
                <XCircle className="h-3.5 w-3.5 text-red-400 ml-auto flex-shrink-0" />
              )}
            </div>
            {!isCorrect && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-green-500/15 border border-green-500/35 text-green-300">
                <span className="text-xs font-semibold text-slate-400 w-24 flex-shrink-0">
                  Correct
                </span>
                <MathRenderer content={question.correctAnswer} className="font-mono" />
                <CheckCircle className="h-3.5 w-3.5 text-green-400 ml-auto flex-shrink-0" />
              </div>
            )}
            <p className="text-xs text-slate-500 pt-1">
              Equivalent forms like{" "}
              <span className="font-mono text-slate-400">1/2</span> and{" "}
              <span className="font-mono text-slate-400">0.5</span> count as correct.
            </p>
          </div>
        ) : (
          /* Multiple-choice options */
          <div className="space-y-2 mb-4">
            {(["A", "B", "C", "D"] as const).map((opt) => {
              const isThisCorrect = question.correctAnswer === opt;
              const isThisSelected = selected === opt;
              const isWrongSelected = isThisSelected && !isThisCorrect;
              return (
                <div
                  key={opt}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm border ${
                    isThisCorrect
                      ? "bg-green-500/15 border-green-500/35 text-green-200"
                      : isWrongSelected
                      ? "bg-red-500/15 border-red-500/35 text-red-200"
                      : "bg-white/[0.03] border-white/5 text-slate-400"
                  }`}
                >
                  <span
                    className={`font-bold flex-shrink-0 w-5 ${
                      isThisCorrect
                        ? "text-green-400"
                        : isWrongSelected
                        ? "text-red-400"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </span>
                  <MathRenderer content={question.options[opt]} className="flex-1" />
                  {isThisCorrect && (
                    <CheckCircle className="h-4 w-4 text-green-400 ml-auto flex-shrink-0 mt-0.5" />
                  )}
                  {isWrongSelected && (
                    <XCircle className="h-4 w-4 text-red-400 ml-auto flex-shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {question.explanation && (
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mt-2">
            <p className="text-xs font-semibold text-accent mb-1.5">Explanation</p>
            <MathRenderer content={question.explanation} className="text-sm text-slate-300 leading-relaxed" />
          </div>
        )}
      </div>
    </details>
  );
}
