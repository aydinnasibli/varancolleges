"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ShoppingCart, CheckCircle, AlertTriangle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { createCheckoutSession } from "@/app/actions/stripe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExamPurchaseButtonProps {
  examId: string;
  price: number;
  isUpcoming: boolean;
}

export default function ExamPurchaseButton({
  examId,
  price,
  isUpcoming,
}: ExamPurchaseButtonProps) {
  const t = useTranslations("Exam.detail.purchaseModal");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadyBought, setAlreadyBought] = useState(false);

  const handleAgreeAndPay = async () => {
    setLoading(true);
    try {
      const result = await createCheckoutSession(examId);

      if (!result.success || !result.sessionUrl) {
        if (result.error === "You have already purchased this exam") {
          setAlreadyBought(true);
          setOpen(false);
        } else {
          toast.error(result.error || "Payment session could not be created");
        }
        setLoading(false);
        return;
      }

      window.location.href = result.sessionUrl;
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (alreadyBought) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-2 w-full bg-surface border border-border text-text-muted py-3 rounded-xl text-sm font-semibold cursor-not-allowed"
      >
        <CheckCircle className="h-4 w-4 text-green-400" />
        <span>{t("agreeButton")}</span>
      </button>
    );
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 w-full bg-navy hover:bg-navy-light text-white py-3 rounded-xl text-sm font-semibold transition-colors"
      >
        <ShoppingCart className="h-4 w-4" />
        ₼{(price / 100).toFixed(2)}
      </button>

      {/* Disclaimer modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="bg-white border border-border text-navy max-w-lg p-0 overflow-hidden"
        >
          {/* Navy stripe */}
          <div className="h-1 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />

          <div className="p-6 space-y-5">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-serif font-bold text-navy">
                  {t("title")}
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-muted hover:text-text-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </DialogHeader>

            {/* Physical attendance warning — only for upcoming exams */}
            {isUpcoming && (
              <div className="flex gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-300">
                    {t("physicalAttendanceWarning")}
                  </p>
                  <p className="text-xs text-amber-200/70 mt-1 leading-relaxed">
                    {t("physicalAttendanceDetail")}
                  </p>
                </div>
              </div>
            )}

            {/* Terms list */}
            <ul className="space-y-3">
              {(["term1", "term2", "term3", "term4"] as const).map((key) => (
                <li key={key} className="flex gap-2.5 text-xs text-text-secondary leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-navy/40 shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleAgreeAndPay}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full bg-navy hover:bg-navy-light text-white py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>...</span>
                  </>
                ) : (
                  t("agreeButton")
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="w-full border border-border text-text-secondary hover:text-navy hover:border-navy/30 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                {t("cancelButton")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
