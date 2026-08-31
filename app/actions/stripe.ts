"use server";

import Stripe from "stripe";
import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import ExamPurchase from "@/models/ExamPurchase";
import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { checkoutSessionSchema } from "@/lib/validations";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createCheckoutSession(examId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to purchase" };
  }

  if (rateLimit(`checkout:${userId}`, 5, 10 * 60 * 1000)) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  const parsed = checkoutSessionSchema.safeParse({ examId });
  if (!parsed.success) {
    return { success: false, error: "Invalid request" };
  }

  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  try {
    await dbConnect();

    const exam = await Exam.findOne({ _id: examId, isActive: true });
    if (!exam) {
      return { success: false, error: "Exam not found" };
    }

    const completedPurchase = await ExamPurchase.findOne({ userId, examId, status: "completed" });
    if (completedPurchase) {
      return { success: false, error: "You have already purchased this exam" };
    }

    const pendingPurchase = await ExamPurchase.findOne({ userId, examId, status: "pending" });
    if (pendingPurchase) {
      const stripeSession = await stripe.checkout.sessions.retrieve(pendingPurchase.stripeSessionId);
      if (stripeSession.status === "open") {
        return { success: true, sessionUrl: stripeSession.url };
      }
      await ExamPurchase.findByIdAndUpdate(pendingPurchase._id, { status: "cancelled" });
    }

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
            unit_amount: exam.price,
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
        paymentType: "exam",
      },
      success_url: `${baseUrl}/profile?payment=success`,
      cancel_url: `${baseUrl}/exam/${exam.slug}?payment=cancelled`,
    });

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

/**
 * Settles this user's pending exam purchases against Stripe.
 *
 * Stripe redirects the buyer back to /profile the moment checkout finishes,
 * which can beat the checkout.session.completed webhook. Without this, a paid
 * exam would be invisible on the dashboard until the webhook lands (and stay
 * invisible forever if the webhook is misconfigured).
 *
 * Only ever touches the caller's own rows, and treats Stripe as the authority:
 * payment_status "paid" is the one signal that releases access. Session status
 * "complete" is not enough — delayed payment methods report complete/unpaid.
 */
export async function reconcilePendingExamPurchases() {
  const { userId } = await auth();
  if (!userId) return { success: false, completed: 0 };

  try {
    await dbConnect();

    const pending = await ExamPurchase.find({ userId, status: "pending" })
      .sort({ purchasedAt: -1 })
      .limit(5);

    if (pending.length === 0) return { success: true, completed: 0 };

    // Checked only once there is real work to do, so ordinary profile loads
    // (no pending rows, no Stripe call) are never throttled.
    if (rateLimit(`reconcile:${userId}`, 20, 10 * 60 * 1000)) {
      return { success: false, completed: 0 };
    }

    let completed = 0;

    for (const purchase of pending) {
      try {
        const session = await stripe.checkout.sessions.retrieve(purchase.stripeSessionId);

        if (session.payment_status === "paid") {
          // Guarded on status so a concurrent webhook can't double-apply
          const res = await ExamPurchase.updateOne(
            { _id: purchase._id, status: "pending" },
            { status: "completed" }
          );
          if (res.modifiedCount > 0) completed++;
        } else if (session.status === "expired") {
          await ExamPurchase.updateOne(
            { _id: purchase._id, status: "pending" },
            { status: "cancelled" }
          );
        }
      } catch (error) {
        // One bad session must not block the rest
        console.error("reconcile: could not read session", purchase.stripeSessionId, error);
      }
    }

    return { success: true, completed };
  } catch (error) {
    console.error("reconcilePendingExamPurchases error:", error);
    return { success: false, completed: 0 };
  }
}
