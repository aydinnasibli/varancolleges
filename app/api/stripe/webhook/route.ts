import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import ExamPurchase from "@/models/ExamPurchase";
import TuitionPayment from "@/models/TuitionPayment";
import Exam from "@/models/Exam";
import User from "@/models/User";

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

        // Send marketing notification for upcoming exam purchases
        const examId = session.metadata?.examId;
        const userId = session.metadata?.userId;
        if (examId && userId) {
          try {
            const [exam, user] = await Promise.all([
              Exam.findById(examId).lean(),
              User.findOne({ clerkId: userId }).lean(),
            ]);
            if (exam && user && exam.examDate > new Date()) {
              const esc = (s: string) =>
                s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
              });
              await transporter.sendMail({
                from: `"VaranColleges" <${process.env.EMAIL_USER}>`,
                to: "marketing@varancolleges.com",
                subject: `Yeni İmtahan Qeydiyyatı: ${exam.title}`,
                html: `
                  <div style="font-family:sans-serif;line-height:1.6;color:#333;">
                    <h2 style="color:#0f2142;border-bottom:2px solid #d4af37;padding-bottom:10px;">
                      Yeni Mock İmtahan Qeydiyyatı
                    </h2>
                    <div style="background:#f9f9f9;padding:20px;border-radius:8px;">
                      <p><strong>Ad:</strong> ${esc(user.firstName)} ${esc(user.lastName)}</p>
                      <p><strong>Email:</strong> ${esc(user.email)}</p>
                      <p><strong>İmtahan:</strong> ${esc(exam.title)}</p>
                      <p><strong>İmtahan tarixi:</strong> ${exam.examDate.toLocaleDateString("az-AZ")}</p>
                      <p><strong>Ödəniş tarixi:</strong> ${new Date().toLocaleDateString("az-AZ")}</p>
                    </div>
                  </div>
                `,
              });
            }
          } catch (emailErr) {
            console.error("Marketing email failed:", emailErr);
          }
        }
      }
    } catch (error) {
      console.error("Failed to update payment status:", error);
      return NextResponse.json(
        { error: "Failed to process payment" },
        { status: 500 }
      );
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await dbConnect();
      await ExamPurchase.findOneAndUpdate(
        { stripeSessionId: session.id, status: "pending" },
        { status: "cancelled" }
      );
      await TuitionPayment.findOneAndUpdate(
        { stripeSessionId: session.id, status: "pending" },
        { status: "cancelled" }
      );
    } catch (error) {
      console.error("Failed to cancel expired session:", error);
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
