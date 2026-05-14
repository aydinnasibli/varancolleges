"use server";

import Stripe from "stripe";
import dbConnect from "@/lib/db";
import TuitionPayment from "@/models/TuitionPayment";
import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { tuitionPaymentSchema } from "@/lib/validations";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createTuitionPaymentSession(
  amount: number,
  description?: string
) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to make a payment" };
  }

  if (rateLimit(`tuition:${userId}`, 10, 60 * 60 * 1000)) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  const parsed = tuitionPaymentSchema.safeParse({ amount, description });
  if (!parsed.success) {
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
              name: parsed.data.description || "Tuition Payment — VaranColleges",
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
        description: parsed.data.description || "",
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
      description: parsed.data.description || "",
      // paidAt is intentionally omitted — set by the Stripe webhook on confirmation
    });

    return { success: true, sessionUrl: session.url };
  } catch (error) {
    console.error("createTuitionPaymentSession error:", error);
    return { success: false, error: "Failed to create payment session" };
  }
}
