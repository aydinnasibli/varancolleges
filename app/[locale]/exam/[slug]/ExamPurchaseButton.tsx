"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";

interface ExamPurchaseButtonProps {
  examId: string;
  price: number;
}

export default function ExamPurchaseButton({
  examId,
  price,
}: ExamPurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const result = await createCheckoutSession(examId);

      if (!result.success || !result.sessionUrl) {
        toast.error(result.error || "Payment session could not be created");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = result.sessionUrl;
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-primary py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Redirecting to payment...
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Purchase for ₼{(price / 100).toFixed(2)}
        </>
      )}
    </button>
  );
}
