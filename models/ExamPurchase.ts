import mongoose, { Document, Model } from "mongoose";

export interface IExamPurchase extends Document {
  userId: string; // Clerk user ID
  examId: mongoose.Types.ObjectId;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  amount: number; // in qəpik
  currency: string;
  status: "pending" | "completed" | "refunded" | "cancelled";
  purchasedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExamPurchaseSchema = new mongoose.Schema<IExamPurchase>(
  {
    userId: { type: String, required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    stripeSessionId: { type: String, required: true, unique: true },
    stripePaymentIntentId: { type: String, default: "" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "azn" },
    status: {
      type: String,
      enum: ["pending", "completed", "refunded", "cancelled"],
      default: "pending",
    },
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ExamPurchaseSchema.index({ userId: 1, examId: 1 });

const ExamPurchase: Model<IExamPurchase> =
  mongoose.models.ExamPurchase ||
  mongoose.model<IExamPurchase>("ExamPurchase", ExamPurchaseSchema);

export default ExamPurchase;
