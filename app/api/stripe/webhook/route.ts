import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/db";
import ExamPurchase from "@/models/ExamPurchase";

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

    try {
      await dbConnect();

      await ExamPurchase.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: "completed",
          stripePaymentIntentId: session.payment_intent?.toString() || "",
          purchasedAt: new Date(),
        }
      );

      console.log(
        `Purchase completed for session ${session.id}, user ${session.metadata?.userId}`
      );
    } catch (error) {
      console.error("Failed to update purchase status:", error);
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
      await ExamPurchase.findOneAndUpdate(
        { stripePaymentIntentId: charge.payment_intent?.toString() },
        { status: "refunded" }
      );
    } catch (error) {
      console.error("Failed to process refund:", error);
    }
  }

  return NextResponse.json({ received: true });
}
