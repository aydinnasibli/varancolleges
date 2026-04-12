import mongoose, { Document, Model } from "mongoose";

export interface IQuestion extends Document {
  examId: mongoose.Types.ObjectId;
  section: "reading_writing" | "math";
  module: 1 | 2;
  questionNumber: number; // 1-27 for RW, 1-22 for Math
  questionType: "multiple_choice" | "free_response";
  passageText: string;    // optional HTML reading passage
  questionText: string;   // required HTML
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;  // "A"|"B"|"C"|"D" for MC, arbitrary text for FR
  explanation: string;
  domain: string;         // e.g. "Algebra", "Grammar"
  difficulty: "easy" | "medium" | "hard";
  image: string;          // optional ImageKit URL
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    section: { type: String, enum: ["reading_writing", "math"], required: true },
    module:  { type: Number, enum: [1, 2], required: true },
    questionNumber: { type: Number, required: true },
    questionType: {
      type: String,
      enum: ["multiple_choice", "free_response"],
      default: "multiple_choice",
    },
    passageText:  { type: String, default: "" },
    questionText: { type: String, required: true },
    options: {
      A: { type: String, default: "" },
      B: { type: String, default: "" },
      C: { type: String, default: "" },
      D: { type: String, default: "" },
    },
    // No enum restriction — stores "A"/"B"/"C"/"D" for MC, text for FR
    correctAnswer: { type: String, required: true },
    explanation: { type: String, default: "" },
    domain:      { type: String, default: "" },
    difficulty:  { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    image:       { type: String, default: "" },
  },
  { timestamps: true }
);

// One question number per section+module per exam
QuestionSchema.index(
  { examId: 1, section: 1, module: 1, questionNumber: 1 },
  { unique: true }
);

const Question: Model<IQuestion> =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
