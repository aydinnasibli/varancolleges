import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/db";
import ExamPurchase from "@/models/ExamPurchase";
import TuitionPayment from "@/models/TuitionPayment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const paymentType = session.metadata?.paymentType;

    try {
      await dbConnect();

      if (paymentType === "tuition") {
        await TuitionPayment.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            status: "completed",
            stripePaymentIntentId: session.payment_intent?.toString() || "",
            paidAt: new Date(),
          }
        );
        console.log(
          `Tuition payment completed for session ${session.id}, user ${session.metadata?.userId}`
        );
      } else {
        // "exam" or legacy sessions without paymentType
        await ExamPurchase.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            status: "completed",
            stripePaymentIntentId: session.payment_intent?.toString() || "",
            purchasedAt: new Date(),
          }
        );
        console.log(
          `Exam purchase completed for session ${session.id}, user ${session.metadata?.userId}`
        );
      }
    } catch (error) {
      console.error("Failed to update payment status:", error);
      return NextResponse.json(
        { error: "Failed to process payment" },
        { status: 500 }
      );
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    try {
      await dbConnect();

      // Try tuition payment first, then exam purchase
      const tuitionUpdated = await TuitionPayment.findOneAndUpdate(
        { stripePaymentIntentId: charge.payment_intent?.toString() },
        { status: "refunded" }
      );

      if (!tuitionUpdated) {
        await ExamPurchase.findOneAndUpdate(
          { stripePaymentIntentId: charge.payment_intent?.toString() },
          { status: "refunded" }
        );
      }
    } catch (error) {
      console.error("Failed to process refund:", error);
    }
  }

  return NextResponse.json({ received: true });
}
