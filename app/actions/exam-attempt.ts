"use server";

import dbConnect from "@/lib/db";
import ExamAttempt from "@/models/ExamAttempt";
import ExamPurchase from "@/models/ExamPurchase";
import Question from "@/models/Question";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// SAT section durations in seconds
const SECTION_DURATIONS: Record<string, number> = {
  rw_m1: 32 * 60,   // 32 minutes
  rw_m2: 32 * 60,   // 32 minutes
  math_m1: 35 * 60, // 35 minutes
  math_m2: 35 * 60, // 35 minutes
};

// Adaptive threshold: 60% correct in M1 → hard M2, else easy M2
const ADAPTIVE_THRESHOLD = 0.6;

function serializeAttempt(attempt: Record<string, unknown>) {
  return {
    ...attempt,
    _id: attempt._id?.toString(),
    examId: attempt.examId?.toString(),
    purchaseId: attempt.purchaseId?.toString(),
    startedAt: attempt.startedAt instanceof Date
      ? attempt.startedAt.toISOString()
      : attempt.startedAt,
    completedAt: attempt.completedAt instanceof Date
      ? (attempt.completedAt as Date).toISOString()
      : attempt.completedAt,
    answers: Array.isArray(attempt.answers)
      ? (attempt.answers as Array<{ questionId: unknown; selectedAnswer: string | null; isFlagged: boolean }>).map((a) => ({
          ...a,
          questionId: a.questionId?.toString(),
        }))
      : [],
  };
}

function serializeQuestion(q: Record<string, unknown>) {
  return {
    ...q,
    _id: q._id?.toString(),
    examId: q.examId?.toString(),
    createdAt: q.createdAt instanceof Date ? q.createdAt.toISOString() : q.createdAt,
    updatedAt: q.updatedAt instanceof Date ? q.updatedAt.toISOString() : q.updatedAt,
  };
}

export async function startAttempt(
  examId: string,
  purchaseId: string,
  userId: string
) {
  try {
    await dbConnect();

    // Verify purchase belongs to user
    const purchase = await ExamPurchase.findOne({
      _id: purchaseId,
      userId,
      examId,
      status: "completed",
    });
    if (!purchase) {
      return { success: false, error: "Purchase not verified" };
    }

    // Check for existing in_progress attempt
    const existing = await ExamAttempt.findOne({
      userId,
      examId,
      purchaseId,
      status: "in_progress",
    }).lean();

    if (existing) {
      // Load questions for current section
      const questions = await loadSectionQuestions(
        examId,
        existing.currentSection as string,
        existing.rwModule2Variant,
        existing.mathModule2Variant
      );
      return {
        success: true,
        attempt: serializeAttempt(existing as unknown as Record<string, unknown>),
        questions: questions.map((q) => serializeQuestion(q as unknown as Record<string, unknown>)),
        isResuming: true,
      };
    }

    // Load Module 1 RW questions
    const questions = await Question.find({
      examId,
      section: "reading_writing",
      module: 1 as 1 | 2,
      moduleVariant: "standard",
    })
      .sort({ questionNumber: 1 })
      .lean();

    if (questions.length === 0) {
      return { success: false, error: "No questions found for this exam" };
    }

    // Create attempt with initial answers array (one slot per M1 RW question)
    const answers = questions.map((q) => ({
      questionId: q._id,
      selectedAnswer: null,
      isFlagged: false,
    }));

    const attempt = await ExamAttempt.create({
      userId,
      examId,
      purchaseId,
      currentSection: "rw_m1",
      currentQuestionIndex: 0,
      answers,
      sectionStartTimes: { rwM1: new Date() },
      sectionTimeRemaining: { rwM1: SECTION_DURATIONS.rw_m1 },
      startedAt: new Date(),
    });

    return {
      success: true,
      attempt: serializeAttempt(attempt.toObject() as unknown as Record<string, unknown>),
      questions: questions.map((q) => serializeQuestion(q as unknown as Record<string, unknown>)),
      isResuming: false,
    };
  } catch (error) {
    console.error("startAttempt error:", error);
    return { success: false, error: "Failed to start attempt" };
  }
}

export async function saveAnswer(
  attemptId: string,
  questionId: string,
  selectedAnswer: string | null,
  isFlagged: boolean
) {
  try {
    await dbConnect();

    await ExamAttempt.updateOne(
      { _id: attemptId, "answers.questionId": new mongoose.Types.ObjectId(questionId) },
      {
        $set: {
          "answers.$.selectedAnswer": selectedAnswer,
          "answers.$.isFlagged": isFlagged,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error("saveAnswer error:", error);
    return { success: false, error: "Failed to save answer" };
  }
}

export async function saveCurrentPosition(
  attemptId: string,
  currentSection: string,
  currentQuestionIndex: number
) {
  try {
    await dbConnect();
    await ExamAttempt.updateOne(
      { _id: attemptId },
      { $set: { currentSection, currentQuestionIndex } }
    );
    return { success: true };
  } catch (error) {
    console.error("saveCurrentPosition error:", error);
    return { success: false };
  }
}

export async function saveTimeRemaining(
  attemptId: string,
  section: string,
  secondsLeft: number
) {
  try {
    await dbConnect();
    const sectionKey = section.replace("_m", "M").replace("rw", "rw").replace("math", "math");
    // Convert section key like "rw_m1" → "rwM1"
    const fieldKey = section
      .split("_")
      .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
      .join("");

    await ExamAttempt.updateOne(
      { _id: attemptId },
      { $set: { [`sectionTimeRemaining.${fieldKey}`]: secondsLeft } }
    );
    return { success: true };
  } catch (error) {
    console.error("saveTimeRemaining error:", error);
    return { success: false };
  }
}

export async function completeSection(attemptId: string, section: string) {
  try {
    await dbConnect();

    const attempt = await ExamAttempt.findById(attemptId).lean();
    if (!attempt) return { success: false, error: "Attempt not found" };

    const examId = attempt.examId.toString();

    // Determine next section and adaptive variant
    let nextSection: string | null = null;
    let updateData: Record<string, unknown> = {};
    let nextQuestions: unknown[] = [];

    if (section === "rw_m1") {
      // Calculate M1 RW score to assign adaptive M2
      const m1Questions = await Question.find({
        examId,
        section: "reading_writing",
        module: 1 as 1 | 2,
        moduleVariant: "standard",
      }).lean();

      const m1QuestionIds = new Set(m1Questions.map((q) => q._id.toString()));
      const m1Answers = attempt.answers.filter((a) =>
        m1QuestionIds.has(a.questionId.toString())
      );

      let correct = 0;
      for (const q of m1Questions) {
        const ans = m1Answers.find(
          (a) => a.questionId.toString() === q._id.toString()
        );
        if (ans?.selectedAnswer === q.correctAnswer) correct++;
      }

      const score = m1Questions.length > 0 ? correct / m1Questions.length : 0;
      const variant = score >= ADAPTIVE_THRESHOLD ? "hard" : "easy";

      nextSection = "rw_m2";
      updateData = {
        currentSection: "rw_m2",
        currentQuestionIndex: 0,
        rwModule2Variant: variant,
        "sectionStartTimes.rwM2": new Date(),
        [`sectionTimeRemaining.rwM2`]: SECTION_DURATIONS.rw_m2,
      };

      // Load M2 RW questions
      const m2Questions = await Question.find({
        examId,
        section: "reading_writing",
        module: 2 as 1 | 2,
        moduleVariant: variant,
      })
        .sort({ questionNumber: 1 })
        .lean();

      // Append M2 answer slots to attempt
      const newAnswerSlots = m2Questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: null,
        isFlagged: false,
      }));

      await ExamAttempt.updateOne(
        { _id: attemptId },
        {
          $set: updateData,
          $push: { answers: { $each: newAnswerSlots } },
        }
      );

      nextQuestions = m2Questions;
    } else if (section === "rw_m2") {
      // Break before math - just update section
      nextSection = "math_m1";
      updateData = {
        currentSection: "math_m1",
        currentQuestionIndex: 0,
        "sectionStartTimes.mathM1": new Date(),
        [`sectionTimeRemaining.mathM1`]: SECTION_DURATIONS.math_m1,
      };

      const mathQuestions = await Question.find({
        examId,
        section: "math",
        module: 1 as 1 | 2,
        moduleVariant: "standard",
      })
        .sort({ questionNumber: 1 })
        .lean();

      const newAnswerSlots = mathQuestions.map((q) => ({
        questionId: q._id,
        selectedAnswer: null,
        isFlagged: false,
      }));

      await ExamAttempt.updateOne(
        { _id: attemptId },
        {
          $set: updateData,
          $push: { answers: { $each: newAnswerSlots } },
        }
      );

      nextQuestions = mathQuestions;
    } else if (section === "math_m1") {
      // Calculate Math M1 score for adaptive
      const m1Questions = await Question.find({
        examId,
        section: "math",
        module: 1 as 1 | 2,
        moduleVariant: "standard",
      }).lean();

      const m1QuestionIds = new Set(m1Questions.map((q) => q._id.toString()));
      const m1Answers = attempt.answers.filter((a) =>
        m1QuestionIds.has(a.questionId.toString())
      );

      let correct = 0;
      for (const q of m1Questions) {
        const ans = m1Answers.find(
          (a) => a.questionId.toString() === q._id.toString()
        );
        if (ans?.selectedAnswer === q.correctAnswer) correct++;
      }

      const score = m1Questions.length > 0 ? correct / m1Questions.length : 0;
      const variant = score >= ADAPTIVE_THRESHOLD ? "hard" : "easy";

      nextSection = "math_m2";
      updateData = {
        currentSection: "math_m2",
        currentQuestionIndex: 0,
        mathModule2Variant: variant,
        "sectionStartTimes.mathM2": new Date(),
        [`sectionTimeRemaining.mathM2`]: SECTION_DURATIONS.math_m2,
      };

      const m2Questions = await Question.find({
        examId,
        section: "math",
        module: 2 as 1 | 2,
        moduleVariant: variant,
      })
        .sort({ questionNumber: 1 })
        .lean();

      const newAnswerSlots = m2Questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: null,
        isFlagged: false,
      }));

      await ExamAttempt.updateOne(
        { _id: attemptId },
        {
          $set: updateData,
          $push: { answers: { $each: newAnswerSlots } },
        }
      );

      nextQuestions = m2Questions;
    }

    return {
      success: true,
      nextSection,
      questions: (nextQuestions as Array<Record<string, unknown>>).map(serializeQuestion),
    };
  } catch (error) {
    console.error("completeSection error:", error);
    return { success: false, error: "Failed to complete section" };
  }
}

export async function submitExam(attemptId: string, _unusedUserId: string, slug: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Not authenticated" };

    await dbConnect();

    const attempt = await ExamAttempt.findOne({ _id: attemptId, userId }).lean();
    if (!attempt) return { success: false, error: "Attempt not found" };
    if (attempt.status === "completed") {
      return { success: true, attemptId };
    }

    const examId = attempt.examId.toString();

    // Load all questions for this attempt
    const allQuestions = await Question.find({ examId }).lean();
    const questionMap = new Map(
      allQuestions.map((q) => [q._id.toString(), q])
    );

    // Separate RW and Math answers
    let rwCorrect = 0;
    let rwTotal = 0;
    let mathCorrect = 0;
    let mathTotal = 0;

    for (const answer of attempt.answers) {
      const question = questionMap.get(answer.questionId.toString());
      if (!question) continue;

      if (question.section === "reading_writing") {
        rwTotal++;
        if (answer.selectedAnswer === question.correctAnswer) rwCorrect++;
      } else if (question.section === "math") {
        mathTotal++;
        if (answer.selectedAnswer === question.correctAnswer) mathCorrect++;
      }
    }

    // Calculate scaled scores (200-800 each)
    const rwScore = rwTotal > 0 ? 200 + Math.round((rwCorrect / rwTotal) * 600) : 200;
    const mathScore =
      mathTotal > 0 ? 200 + Math.round((mathCorrect / mathTotal) * 600) : 200;
    const totalScore = rwScore + mathScore;

    await ExamAttempt.findByIdAndUpdate(attemptId, {
      status: "completed",
      currentSection: "completed",
      completedAt: new Date(),
      scores: { rw: rwScore, math: mathScore, total: totalScore },
    });

    revalidatePath(`/exam/${slug}/results/${attemptId}`);
    revalidatePath("/profile");

    return { success: true, attemptId };
  } catch (error) {
    console.error("submitExam error:", error);
    return { success: false, error: "Failed to submit exam" };
  }
}

// Helper: load questions for a given section
async function loadSectionQuestions(
  examId: string,
  section: string,
  rwVariant?: string,
  mathVariant?: string
) {
  const sectionMap: Record<
    string,
    { section: string; module: number; moduleVariant: string }
  > = {
    rw_m1: { section: "reading_writing", module: 1, moduleVariant: "standard" },
    rw_m2: {
      section: "reading_writing",
      module: 2 as 1 | 2,
      moduleVariant: rwVariant || "easy",
    },
    math_m1: { section: "math", module: 1, moduleVariant: "standard" },
    math_m2: { section: "math", module: 2, moduleVariant: mathVariant || "easy" },
  };

  const params = sectionMap[section];
  if (!params) return [];

  return Question.find({
    examId,
    section: params.section,
    module: params.module as 1 | 2,
    moduleVariant: params.moduleVariant,
  }).sort({ questionNumber: 1 }).lean();
}
