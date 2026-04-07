"use server";

import Stripe from "stripe";
import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import ExamPurchase from "@/models/ExamPurchase";
import { auth, currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createCheckoutSession(examId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to purchase" };
  }

  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  try {
    await dbConnect();

    // Verify exam exists and is active
    const exam = await Exam.findOne({ _id: examId, isActive: true });
    if (!exam) {
      return { success: false, error: "Exam not found" };
    }

    // Check if user already has a completed purchase
    const existingPurchase = await ExamPurchase.findOne({
      userId,
      examId,
      status: "completed",
    });
    if (existingPurchase) {
      return { success: false, error: "You have already purchased this exam" };
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.varancolleges.com";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "azn",
      line_items: [
        {
          price_data: {
            currency: "azn",
            unit_amount: exam.price, // already in qəpik
            product_data: {
              name: exam.title,
              description: `${exam.type} Mock Exam — VaranColleges`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail || undefined,
      metadata: {
        examId: examId.toString(),
        userId,
      },
      success_url: `${baseUrl}/exam/${exam.slug}?payment=success`,
      cancel_url: `${baseUrl}/exam/${exam.slug}?payment=cancelled`,
    });

    // Save pending purchase record
    await ExamPurchase.create({
      userId,
      examId,
      stripeSessionId: session.id,
      amount: exam.price,
      currency: "azn",
      status: "pending",
      purchasedAt: new Date(),
    });

    return { success: true, sessionUrl: session.url };
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    return { success: false, error: "Failed to create payment session" };
  }
}
