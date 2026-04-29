"use server";

import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import ExamPurchase from "@/models/ExamPurchase";
import ExamAttempt from "@/models/ExamAttempt";

export async function getActiveExams() {
  try {
    await dbConnect();
    const exams = await Exam.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return {
      success: true,
      exams: exams.map((e) => ({
        ...e,
        _id: e._id.toString(),
        examDate: e.examDate ? (e.examDate as Date).toISOString() : null,
        createdAt: e.createdAt ? (e.createdAt as Date).toISOString() : null,
        updatedAt: e.updatedAt ? (e.updatedAt as Date).toISOString() : null,
      })),
    };
  } catch (error) {
    console.error("getActiveExams error:", error);
    return { success: false, exams: [] };
  }
}

export async function getExamBySlug(slug: string) {
  try {
    await dbConnect();
    const exam = await Exam.findOne({ slug, isActive: true }).lean();
    if (!exam) return { success: false, error: "Exam not found" };
    return {
      success: true,
      exam: {
        ...exam,
        _id: exam._id.toString(),
        examDate: exam.examDate ? (exam.examDate as Date).toISOString() : null,
        createdAt: exam.createdAt ? (exam.createdAt as Date).toISOString() : null,
        updatedAt: exam.updatedAt ? (exam.updatedAt as Date).toISOString() : null,
      },
    };
  } catch (error) {
    console.error("getExamBySlug error:", error);
    return { success: false, error: "Failed to fetch exam" };
  }
}

export async function getUserPurchaseForExam(userId: string, examId: string) {
  try {
    await dbConnect();
    const purchase = await ExamPurchase.findOne({
      userId,
      examId,
      status: { $in: ["pending", "completed"] },
    }).lean();
    if (!purchase) return { success: true, purchase: null };
    return {
      success: true,
      purchase: {
        ...purchase,
        _id: purchase._id.toString(),
        examId: purchase.examId.toString(),
        purchasedAt: (purchase.purchasedAt as Date).toISOString(),
      },
    };
  } catch (error) {
    console.error("getUserPurchaseForExam error:", error);
    return { success: false, purchase: null };
  }
}

export async function getUserAttempts(userId: string, examId?: string) {
  try {
    await dbConnect();
    const filter: Record<string, unknown> = { userId };
    if (examId) filter.examId = examId;

    const attempts = await ExamAttempt.find(filter)
      .sort({ startedAt: -1 })
      .lean();

    return {
      success: true,
      attempts: attempts.map((a) => ({
        ...a,
        _id: a._id.toString(),
        examId: a.examId.toString(),
        purchaseId: a.purchaseId.toString(),
        startedAt: (a.startedAt as Date).toISOString(),
        completedAt: a.completedAt ? (a.completedAt as Date).toISOString() : null,
        answers: a.answers.map((ans) => ({
          ...ans,
          questionId: ans.questionId.toString(),
        })),
      })),
    };
  } catch (error) {
    console.error("getUserAttempts error:", error);
    return { success: false, attempts: [] };
  }
}

export async function getAttemptById(attemptId: string, userId: string) {
  try {
    await dbConnect();
    const attempt = await ExamAttempt.findOne({ _id: attemptId, userId }).lean();
    if (!attempt) return { success: false, error: "Attempt not found" };
    return {
      success: true,
      attempt: {
        ...attempt,
        _id: attempt._id.toString(),
        examId: attempt.examId.toString(),
        purchaseId: attempt.purchaseId.toString(),
        startedAt: (attempt.startedAt as Date).toISOString(),
        completedAt: attempt.completedAt
          ? (attempt.completedAt as Date).toISOString()
          : null,
        answers: attempt.answers.map((ans) => ({
          ...ans,
          questionId: ans.questionId.toString(),
        })),
      },
    };
  } catch (error) {
    console.error("getAttemptById error:", error);
    return { success: false, error: "Failed to fetch attempt" };
  }
}

export async function getUserPurchases(userId: string) {
  try {
    await dbConnect();
    const purchases = await ExamPurchase.find({ userId, status: { $in: ["pending", "completed"] } })
      .sort({ purchasedAt: -1 })
      .lean();

    if (purchases.length === 0) return { success: true, purchases: [] };

    // Fetch exams manually to avoid populate crashing when a ref is null
    const examIds = [...new Set(purchases.map((p) => p.examId.toString()))];
    const exams = await Exam.find({ _id: { $in: examIds } }).lean();
    const examMap = new Map(exams.map((e) => [e._id.toString(), e]));

    const results = purchases
      .map((p) => {
        const examDoc = examMap.get(p.examId.toString());
        if (!examDoc) return null; // exam was deleted — skip
        return {
          _id: p._id.toString(),
          examId: p.examId.toString(),
          amount: p.amount,
          currency: p.currency,
          status: p.status,
          purchasedAt: (p.purchasedAt as Date).toISOString(),
          exam: {
            ...examDoc,
            _id: examDoc._id.toString(),
          },
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    return { success: true, purchases: results };
  } catch (error) {
    console.error("getUserPurchases error:", error);
    return { success: false, purchases: [] };
  }
}
