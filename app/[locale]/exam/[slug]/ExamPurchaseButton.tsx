"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";

interface ExamPurchaseButtonProps {
  examId: string;
  examTitle: string;
  price: number;
}

export default function ExamPurchaseButton({
  examId,
  examTitle,
  price,
}: ExamPurchaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handlePurchase = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId,
          userId: user.id,
          userEmail: user.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.sessionUrl;
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error instanceof Error ? error.message : "Purchase failed. Please try again."
      );
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
