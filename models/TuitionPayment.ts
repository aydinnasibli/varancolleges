import mongoose, { Document, Model } from "mongoose";

export interface ITuitionPayment extends Document {
  userId: string; // Clerk user ID
  stripeSessionId: string;
  stripePaymentIntentId: string;
  amount: number; // in qəpik
  currency: string;
  status: "pending" | "completed" | "refunded" | "cancelled";
  description: string;
  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TuitionPaymentSchema = new mongoose.Schema<ITuitionPayment>(
  {
    userId: { type: String, required: true },
    stripeSessionId: { type: String, required: true, unique: true },
    stripePaymentIntentId: { type: String, default: "" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "azn" },
    status: {
      type: String,
      enum: ["pending", "completed", "refunded", "cancelled"],
      default: "pending",
    },
    description: { type: String, default: "" },
    paidAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

TuitionPaymentSchema.index({ userId: 1, createdAt: -1 });

const TuitionPayment: Model<ITuitionPayment> =
  mongoose.models.TuitionPayment ||
  mongoose.model<ITuitionPayment>("TuitionPayment", TuitionPaymentSchema);

export default TuitionPayment;
