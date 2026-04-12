"use server";

import Stripe from "stripe";
import dbConnect from "@/lib/db";
import TuitionPayment from "@/models/TuitionPayment";
import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createTuitionPaymentSession(
  amount: number, // in qəpik
  description?: string
) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to make a payment" };
  }

  // Validate amount: 1₼ (100 qəpik) to 5000₼ (500000 qəpik)
  if (!amount || amount < 100 || amount > 500000) {
    return { success: false, error: "Amount must be between ₼1 and ₼5,000" };
  }

  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  try {
    await dbConnect();

    const reqHeaders = await headers();
    const host = reqHeaders.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "azn",
      line_items: [
        {
          price_data: {
            currency: "azn",
            unit_amount: amount,
            product_data: {
              name: description || "Tuition Payment — VaranColleges",
              description: `Online payment via VaranColleges`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail || undefined,
      metadata: {
        userId,
        paymentType: "tuition",
        description: description || "",
      },
      success_url: `${baseUrl}/payment?payment=success`,
      cancel_url: `${baseUrl}/payment?payment=cancelled`,
    });

    await TuitionPayment.create({
      userId,
      stripeSessionId: session.id,
      amount,
      currency: "azn",
      status: "pending",
      description: description || "",
      paidAt: new Date(),
    });

    return { success: true, sessionUrl: session.url };
  } catch (error) {
    console.error("createTuitionPaymentSession error:", error);
    return { success: false, error: "Failed to create payment session" };
  }
}
