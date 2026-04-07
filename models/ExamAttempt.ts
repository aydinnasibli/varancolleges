import mongoose, { Document, Model } from "mongoose";

export type SectionKey = "rwM1" | "rwM2" | "mathM1" | "mathM2";
export type CurrentSection = "rw_m1" | "rw_m2" | "math_m1" | "math_m2" | "completed";

export interface IAnswerEntry {
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: "A" | "B" | "C" | "D" | null;
  isFlagged: boolean;
}

export interface IExamAttempt extends Document {
  userId: string; // Clerk user ID
  examId: mongoose.Types.ObjectId;
  purchaseId: mongoose.Types.ObjectId;
  status: "in_progress" | "completed" | "abandoned";

  // Adaptive module 2 variant (assigned after completing module 1)
  rwModule2Variant: "easy" | "hard";
  mathModule2Variant: "easy" | "hard";

  // Current position
  currentSection: CurrentSection;
  currentQuestionIndex: number;

  // Answers indexed by questionId string
  answers: IAnswerEntry[];

  // Section timing
  sectionStartTimes: {
    rwM1?: Date;
    rwM2?: Date;
    mathM1?: Date;
    mathM2?: Date;
  };
  sectionTimeRemaining: {
    rwM1?: number;
    rwM2?: number;
    mathM1?: number;
    mathM2?: number;
  };

  // Final scores (populated on submit)
  scores: {
    rw?: number;   // 200-800
    math?: number; // 200-800
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
    selectedAnswer: {
      type: String,
      enum: ["A", "B", "C", "D", null],
      default: null,
    },
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

    rwModule2Variant: { type: String, enum: ["easy", "hard"] },
    mathModule2Variant: { type: String, enum: ["easy", "hard"] },

    currentSection: {
      type: String,
      enum: ["rw_m1", "rw_m2", "math_m1", "math_m2", "completed"],
      default: "rw_m1",
    },
    currentQuestionIndex: { type: Number, default: 0 },

    answers: { type: [AnswerEntrySchema], default: [] },

    sectionStartTimes: {
      rwM1: { type: Date },
      rwM2: { type: Date },
      mathM1: { type: Date },
      mathM2: { type: Date },
    },
    sectionTimeRemaining: {
      rwM1: { type: Number },
      rwM2: { type: Number },
      mathM1: { type: Number },
      mathM2: { type: Number },
    },

    scores: {
      rw: { type: Number },
      math: { type: Number },
      total: { type: Number },
    },

    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

ExamAttemptSchema.index({ userId: 1, examId: 1 });

const ExamAttempt: Model<IExamAttempt> =
  mongoose.models.ExamAttempt ||
  mongoose.model<IExamAttempt>("ExamAttempt", ExamAttemptSchema);

export default ExamAttempt;
