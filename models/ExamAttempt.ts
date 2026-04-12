import mongoose, { Document, Model } from "mongoose";

export type CurrentSection = "rw_m1" | "rw_m2" | "math_m1" | "math_m2" | "completed";

export interface IAnswerEntry {
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: string | null; // "A"/"B"/"C"/"D" for MC, arbitrary text for FR
  isFlagged: boolean;
}

export interface IExamAttempt extends Document {
  userId: string;
  examId: mongoose.Types.ObjectId;
  purchaseId: mongoose.Types.ObjectId;
  status: "in_progress" | "completed" | "abandoned";

  currentSection: CurrentSection;
  currentQuestionIndex: number;

  answers: IAnswerEntry[];

  sectionStartTimes: {
    rwM1?: Date; rwM2?: Date; mathM1?: Date; mathM2?: Date;
  };
  sectionTimeRemaining: {
    rwM1?: number; rwM2?: number; mathM1?: number; mathM2?: number;
  };

  scores: {
    rw?: number;    // 200-800
    math?: number;  // 200-800
    total?: number; // 400-1600
  };

  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerEntrySchema = new mongoose.Schema<IAnswerEntry>(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    selectedAnswer: { type: String, default: null },
    isFlagged: { type: Boolean, default: false },
  },
  { _id: false }
);

const ExamAttemptSchema = new mongoose.Schema<IExamAttempt>(
  {
    userId: { type: String, required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    purchaseId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamPurchase", required: true },
    status: {
      type: String,
      enum: ["in_progress", "completed", "abandoned"],
      default: "in_progress",
    },
    currentSection: {
      type: String,
      enum: ["rw_m1", "rw_m2", "math_m1", "math_m2", "completed"],
      default: "rw_m1",
    },
    currentQuestionIndex: { type: Number, default: 0 },
    answers: { type: [AnswerEntrySchema], default: [] },
    sectionStartTimes: {
      rwM1: Date, rwM2: Date, mathM1: Date, mathM2: Date,
    },
    sectionTimeRemaining: {
      rwM1: Number, rwM2: Number, mathM1: Number, mathM2: Number,
    },
    scores: {
      rw:    Number,
      math:  Number,
      total: Number,
    },
    startedAt:   { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

ExamAttemptSchema.index({ userId: 1, examId: 1 });

const ExamAttempt: Model<IExamAttempt> =
  mongoose.models.ExamAttempt ||
  mongoose.model<IExamAttempt>("ExamAttempt", ExamAttemptSchema);

export default ExamAttempt;
