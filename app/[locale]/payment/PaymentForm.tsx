"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import { createTuitionPaymentSession } from "@/app/actions/tuition-payment";

const PRESET_AMOUNTS = [50, 100, 150, 200, 250];

export default function PaymentForm() {
  const t = useTranslations("Payment");

  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Resolved amount in ₼ (from preset or custom input)
  const resolvedAmount =
    selectedPreset !== null ? selectedPreset : parseFloat(customAmount) || 0;

  const handlePreset = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset(null);
    setCustomAmount(e.target.value);
  };

  const handlePay = async () => {
    if (resolvedAmount < 1) {
      toast.error(t("validationMin"));
      return;
    }
    if (resolvedAmount > 5000) {
      toast.error(t("validationMax"));
      return;
    }

    setLoading(true);
    try {
      const amountInQepik = Math.round(resolvedAmount * 100);
      const result = await createTuitionPaymentSession(
        amountInQepik,
        description.trim() || undefined
      );

      if (!result.success || !result.sessionUrl) {
        toast.error(result.error || "Payment session could not be created");
        setLoading(false);
        return;
      }

      window.location.href = result.sessionUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
      {/* Preset amounts */}
      <div>
        <p className="text-sm font-medium text-slate-300 mb-3">
          {t("selectAmount")}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => handlePreset(amount)}
              className={`py-3 rounded-xl text-sm font-semibold border transition-colors ${
                selectedPreset === amount
                  ? "bg-accent text-primary border-accent"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-accent/50 hover:text-white"
              }`}
            >
              ₼{amount}
            </button>
          ))}
        </div>
      </div>

      {/* Custom amount */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t("customAmount")}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
            ₼
          </span>
          <input
            type="number"
            min={1}
            max={5000}
            step={1}
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder={t("customAmountPlaceholder")}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>
      </div>

      {/* Description / note */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t("note")}
        </label>
        <input
          type="text"
          maxLength={120}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("notePlaceholder")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
      </div>

      {/* Summary + Pay button */}
      <div className="pt-2 border-t border-white/5">
        {resolvedAmount > 0 && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-400">Total</span>
            <span className="text-2xl font-bold text-white">
              ₼{resolvedAmount.toFixed(2)}
            </span>
          </div>
        )}
        <button
          onClick={handlePay}
          disabled={loading || resolvedAmount < 1}
          className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-3.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("paying")}
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              {t("payButton")}
              {resolvedAmount >= 1 && ` — ₼${resolvedAmount.toFixed(2)}`}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
