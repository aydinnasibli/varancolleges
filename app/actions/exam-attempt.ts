"use server";

import dbConnect from "@/lib/db";
import ExamAttempt from "@/models/ExamAttempt";
import ExamPurchase from "@/models/ExamPurchase";
import Question from "@/models/Question";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { answersMatch } from "@/lib/answer-utils";

// SAT section durations in seconds
const SECTION_DURATIONS: Record<string, number> = {
  rw_m1: 32 * 60,
  rw_m2: 32 * 60,
  math_m1: 35 * 60,
  math_m2: 35 * 60,
};

const SECTION_ORDER = ["rw_m1", "rw_m2", "math_m1", "math_m2"];

// Maps section key → Question query params
const SECTION_QUERY: Record<string, { section: "reading_writing" | "math"; module: 1 | 2 }> = {
  rw_m1:   { section: "reading_writing", module: 1 },
  rw_m2:   { section: "reading_writing", module: 2 },
  math_m1: { section: "math",            module: 1 },
  math_m2: { section: "math",            module: 2 },
};

// Maps section key → sectionTimeRemaining field name
const TIMING_KEY: Record<string, string> = {
  rw_m1: "rwM1", rw_m2: "rwM2", math_m1: "mathM1", math_m2: "mathM2",
};

function serializeAttempt(attempt: Record<string, unknown>) {
  return {
    ...attempt,
    _id: attempt._id?.toString(),
    examId: attempt.examId?.toString(),
    purchaseId: attempt.purchaseId?.toString(),
    startedAt:
      attempt.startedAt instanceof Date
        ? attempt.startedAt.toISOString()
        : attempt.startedAt,
    completedAt:
      attempt.completedAt instanceof Date
        ? (attempt.completedAt as Date).toISOString()
        : attempt.completedAt,
    answers: Array.isArray(attempt.answers)
      ? (
          attempt.answers as Array<{
            questionId: unknown;
            selectedAnswer: string | null;
            isFlagged: boolean;
          }>
        ).map((a) => ({ ...a, questionId: a.questionId?.toString() }))
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

async function loadQuestionsForSection(examId: string, section: string) {
  const params = SECTION_QUERY[section];
  if (!params) return [];
  return Question.find({ examId, ...params }).sort({ questionNumber: 1 }).lean();
}

// ─── startAttempt ─────────────────────────────────────────────────────────────
export async function startAttempt(examId: string, purchaseId: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  try {
    await dbConnect();

    // Verify the purchase belongs to this user and is completed
    const purchase = await ExamPurchase.findOne({
      _id: purchaseId,
      userId,
      examId,
      status: "completed",
    });
    if (!purchase) return { success: false, error: "Purchase not verified" };

    // Resume any existing in-progress attempt
    const existing = await ExamAttempt.findOne({
      userId,
      examId,
      purchaseId,
      status: "in_progress",
    }).lean();

    if (existing) {
      const questions = await loadQuestionsForSection(
        examId,
        existing.currentSection as string
      );
      return {
        success: true,
        attempt: serializeAttempt(existing as unknown as Record<string, unknown>),
        questions: questions.map((q) =>
          serializeQuestion(q as unknown as Record<string, unknown>)
        ),
        isResuming: true,
      };
    }

    // Start fresh — load Module 1 R&W
    const questions = await loadQuestionsForSection(examId, "rw_m1");
    if (questions.length === 0) {
      return { success: false, error: "No questions found for this exam" };
    }

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
      attempt: serializeAttempt(
        attempt.toObject() as unknown as Record<string, unknown>
      ),
      questions: questions.map((q) =>
        serializeQuestion(q as unknown as Record<string, unknown>)
      ),
      isResuming: false,
    };
  } catch (error) {
    console.error("startAttempt error:", error);
    return { success: false, error: "Failed to start attempt" };
  }
}

// ─── saveAnswer ───────────────────────────────────────────────────────────────
export async function saveAnswer(
  attemptId: string,
  questionId: string,
  selectedAnswer: string | null,
  isFlagged: boolean
) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  try {
    await dbConnect();
    // Filter by userId so users can only modify their own attempts
    await ExamAttempt.updateOne(
      {
        _id: attemptId,
        userId,
        "answers.questionId": new mongoose.Types.ObjectId(questionId),
      },
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

// ─── saveCurrentPosition ─────────────────────────────────────────────────────
export async function saveCurrentPosition(
  attemptId: string,
  currentSection: string,
  currentQuestionIndex: number
) {
  const { userId } = await auth();
  if (!userId) return { success: false };

  try {
    await dbConnect();
    await ExamAttempt.updateOne(
      { _id: attemptId, userId },
      { $set: { currentSection, currentQuestionIndex } }
    );
    return { success: true };
  } catch (error) {
    console.error("saveCurrentPosition error:", error);
    return { success: false };
  }
}

// ─── saveTimeRemaining ───────────────────────────────────────────────────────
export async function saveTimeRemaining(
  attemptId: string,
  section: string,
  secondsLeft: number
) {
  const { userId } = await auth();
  if (!userId) return { success: false };

  try {
    await dbConnect();
    const fieldKey = TIMING_KEY[section];
    if (!fieldKey) return { success: false };

    await ExamAttempt.updateOne(
      { _id: attemptId, userId },
      { $set: { [`sectionTimeRemaining.${fieldKey}`]: secondsLeft } }
    );
    return { success: true };
  } catch (error) {
    console.error("saveTimeRemaining error:", error);
    return { success: false };
  }
}

// ─── completeSection ─────────────────────────────────────────────────────────
export async function completeSection(attemptId: string, section: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  try {
    await dbConnect();

    // Verify ownership
    const attempt = await ExamAttempt.findOne({ _id: attemptId, userId }).lean();
    if (!attempt) return { success: false, error: "Attempt not found" };

    const examId = attempt.examId.toString();
    const sectionIdx = SECTION_ORDER.indexOf(section);
    if (sectionIdx === -1) return { success: false, error: "Invalid section" };

    const nextSection = SECTION_ORDER[sectionIdx + 1];
    if (!nextSection) return { success: false, error: "No next section" };

    const timingKey = TIMING_KEY[nextSection];

    // Load next section questions
    const nextQuestions = await loadQuestionsForSection(examId, nextSection);
    const newAnswerSlots = nextQuestions.map((q) => ({
      questionId: q._id,
      selectedAnswer: null,
      isFlagged: false,
    }));

    await ExamAttempt.updateOne(
      { _id: attemptId, userId },
      {
        $set: {
          currentSection: nextSection,
          currentQuestionIndex: 0,
          [`sectionStartTimes.${timingKey}`]: new Date(),
          [`sectionTimeRemaining.${timingKey}`]: SECTION_DURATIONS[nextSection],
        },
        $push: { answers: { $each: newAnswerSlots } },
      }
    );

    return {
      success: true,
      nextSection,
      questions: nextQuestions.map((q) =>
        serializeQuestion(q as unknown as Record<string, unknown>)
      ),
    };
  } catch (error) {
    console.error("completeSection error:", error);
    return { success: false, error: "Failed to complete section" };
  }
}

// ─── submitExam ───────────────────────────────────────────────────────────────
export async function submitExam(attemptId: string, slug: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  try {
    await dbConnect();

    const attempt = await ExamAttempt.findOne({ _id: attemptId, userId }).lean();
    if (!attempt) return { success: false, error: "Attempt not found" };
    if (attempt.status === "completed") return { success: true, attemptId };

    const examId = attempt.examId.toString();

    // Score — only count questions that belong to this attempt
    const attemptQuestionIds = attempt.answers.map((a) => a.questionId);
    const allQuestions = await Question.find({
      examId,
      _id: { $in: attemptQuestionIds },
    }).lean();

    const questionMap = new Map(
      allQuestions.map((q) => [q._id.toString(), q])
    );

    let rwCorrect = 0, rwTotal = 0, mathCorrect = 0, mathTotal = 0;

    for (const answer of attempt.answers) {
      const question = questionMap.get(answer.questionId.toString());
      if (!question) continue;
      const isFR = question.questionType === "free_response";
      const isCorrect = isFR
        ? answersMatch(answer.selectedAnswer ?? "", question.correctAnswer)
        : answer.selectedAnswer === question.correctAnswer;

      if (question.section === "reading_writing") {
        rwTotal++;
        if (isCorrect) rwCorrect++;
      } else if (question.section === "math") {
        mathTotal++;
        if (isCorrect) mathCorrect++;
      }
    }

    const rwScore   = rwTotal   > 0 ? 200 + Math.round((rwCorrect   / rwTotal)   * 600) : 200;
    const mathScore = mathTotal > 0 ? 200 + Math.round((mathCorrect / mathTotal) * 600) : 200;

    await ExamAttempt.findByIdAndUpdate(attemptId, {
      status: "completed",
      currentSection: "completed",
      completedAt: new Date(),
      scores: { rw: rwScore, math: mathScore, total: rwScore + mathScore },
    });

    revalidatePath(`/exam/${slug}/results/${attemptId}`);
    revalidatePath("/profile");

    return { success: true, attemptId };
  } catch (error) {
    console.error("submitExam error:", error);
    return { success: false, error: "Failed to submit exam" };
  }
}
