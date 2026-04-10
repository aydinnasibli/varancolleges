"use client";

import { CheckCircle, XCircle, MinusCircle, ChevronDown } from "lucide-react";
import MathRenderer from "@/components/MathRenderer";

interface ResultsQuestionCardProps {
  index: number;
  question: {
    questionNumber: number;
    module: number;
    questionText: string;
    passageText?: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    explanation?: string;
    domain?: string;
  };
  selected: string | null | undefined;
  isCorrect: boolean;
  isSkipped: boolean;
}

export default function ResultsQuestionCard({
  index,
  question,
  selected,
  isCorrect,
  isSkipped,
}: ResultsQuestionCardProps) {
  const statusIcon = isSkipped ? (
    <MinusCircle className="h-5 w-5 text-slate-400 flex-shrink-0" />
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

  return (
    <details className={`group bg-white/5 border ${borderColor} rounded-xl overflow-hidden`}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none hover:bg-white/5 transition-colors">
        {statusIcon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-semibold text-slate-500">Q{index}</span>
            {question.domain && (
              <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                {question.domain}
              </span>
            )}
          </div>
          <p
            className="text-sm text-white line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: question.questionText.replace(/<[^>]+>/g, "").replace(/\$\$?[^$]*\$\$?/g, "…"),
            }}
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {!isSkipped && !isCorrect && (
            <span className="text-xs text-red-400">
              You: {selected}
            </span>
          )}
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isCorrect ? "bg-green-500/20 text-green-400" : "bg-accent/20 text-accent"
          }`}>
            {question.correctAnswer}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
        </div>
      </summary>

      <div className="px-5 pb-5 pt-2 border-t border-white/5">
        {question.passageText && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg text-sm text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
            <MathRenderer content={question.passageText} />
          </div>
        )}

        <MathRenderer
          content={question.questionText}
          className="text-sm text-slate-300 mb-4 leading-relaxed"
        />

        <div className="space-y-2 mb-4">
          {(["A", "B", "C", "D"] as const).map((opt) => {
            const isThisCorrect = question.correctAnswer === opt;
            const isThisSelected = selected === opt;
            return (
              <div
                key={opt}
                className={`flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm ${
                  isThisCorrect
                    ? "bg-green-500/15 border border-green-500/40 text-green-300"
                    : isThisSelected && !isThisCorrect
                    ? "bg-red-500/15 border border-red-500/40 text-red-300"
                    : "bg-white/5 border border-transparent text-slate-400"
                }`}
              >
                <span className={`font-bold flex-shrink-0 ${
                  isThisCorrect ? "text-green-400" : isThisSelected ? "text-red-400" : "text-slate-500"
                }`}>
                  {opt})
                </span>
                <MathRenderer content={question.options[opt]} className="flex-1" />
                {isThisCorrect && (
                  <CheckCircle className="h-3.5 w-3.5 text-green-400 ml-auto flex-shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {question.explanation && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
            <p className="text-xs font-semibold text-accent mb-1">Explanation</p>
            <MathRenderer content={question.explanation} className="text-sm text-slate-300" />
          </div>
        )}
      </div>
    </details>
  );
}
