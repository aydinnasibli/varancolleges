"use client";

import { useState } from "react";
import { Lock, Loader2, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { verifyAndStartAttempt } from "@/app/actions/exam-access";
import ExamInterface from "@/components/exam/ExamInterface";

interface ExamPasswordGateProps {
  examId: string;
  examSlug: string;
  examTitle: string;
  purchaseId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AttemptData = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QuestionData = any;

export default function ExamPasswordGate({
  examId,
  examSlug,
  examTitle,
  purchaseId,
}: ExamPasswordGateProps) {
  const t = useTranslations("Exam.detail.passwordGate");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState<AttemptData | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [isResuming, setIsResuming] = useState(false);

  if (attempt) {
    return (
      <ExamInterface
        attempt={attempt}
        questions={questions}
        examId={examId}
        examTitle={examTitle}
        examSlug={examSlug}
        isResuming={isResuming}
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");

    const result = await verifyAndStartAttempt(examId, purchaseId, password.trim());

    if (!result.success) {
      const errorKey =
        result.error === "wrong_password"
          ? "wrongPassword"
          : result.error === "rate_limited"
          ? "rateLimited"
          : null;
      setError(errorKey ? t(errorKey) : result.error || t("wrongPassword"));
      setLoading(false);
      return;
    }

    // TypeScript can't narrow the union after the early return above because
    // verifyAndStartAttempt's inferred return type widens success to boolean.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ok = result as any;
    setAttempt(ok.attempt);
    setQuestions(ok.questions ?? []);
    setIsResuming(ok.isResuming ?? false);
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          <div className="h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
          <div className="surface-1 p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-accent" />
              </div>
              <h1 className="text-xl font-serif font-bold text-white mb-2">
                {t("title")}
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t("description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-widest">
                  {t("label")}
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder={t("placeholder")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 font-mono tracking-widest"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-primary py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("loading")}
                  </>
                ) : (
                  t("submit")
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-6">
              {t("help")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
