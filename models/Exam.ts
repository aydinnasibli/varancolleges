import mongoose, { Document, Model } from "mongoose";

export interface IExam extends Document {
  title: string;
  slug: string;
  description: string;
  type: "SAT" | "IELTS" | "TOEFL" | "GRE" | "GMAT";
  price: number; // in qəpik (e.g. 1000 = 10.00 AZN)
  isActive: boolean;
  coverImage: string;
  totalDuration: number; // total minutes
  examDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new mongoose.Schema<IExam>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["SAT", "IELTS", "TOEFL", "GRE", "GMAT"],
      default: "SAT",
    },
    price: { type: Number, required: true }, // in qəpik
    isActive: { type: Boolean, default: false },
    coverImage: { type: String, default: "" },
    totalDuration: { type: Number, default: 134 }, // SAT: 134 minutes
    examDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Exam: Model<IExam> =
  mongoose.models.Exam || mongoose.model<IExam>("Exam", ExamSchema);

export default Exam;
