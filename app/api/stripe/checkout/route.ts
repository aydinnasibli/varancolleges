import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import ExamPurchase from "@/models/ExamPurchase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { examId, userId, userEmail } = body;

    if (!examId || !userId) {
      return NextResponse.json(
        { error: "examId and userId are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify exam exists and is active
    const exam = await Exam.findOne({ _id: examId, isActive: true });
    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // Check if user already has a completed purchase
    const existingPurchase = await ExamPurchase.findOne({
      userId,
      examId,
      status: "completed",
    });
    if (existingPurchase) {
      return NextResponse.json(
        { error: "Already purchased" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.varancolleges.com";

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
              description: `${exam.type} Mock Exam - VaranColleges`,
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
      success_url: `${baseUrl}/sinaq/${exam.slug}?payment=success`,
      cancel_url: `${baseUrl}/sinaq/${exam.slug}?payment=cancelled`,
    });

    // Create pending purchase record
    await ExamPurchase.create({
      userId,
      examId,
      stripeSessionId: session.id,
      amount: exam.price,
      currency: "azn",
      status: "pending",
      purchasedAt: new Date(),
    });

    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
