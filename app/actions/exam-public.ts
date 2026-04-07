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
        createdAt: (e.createdAt as Date).toISOString(),
        updatedAt: (e.updatedAt as Date).toISOString(),
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
        createdAt: (exam.createdAt as Date).toISOString(),
        updatedAt: (exam.updatedAt as Date).toISOString(),
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
      status: "completed",
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
    const purchases = await ExamPurchase.find({ userId, status: "completed" })
      .populate("examId")
      .sort({ purchasedAt: -1 })
      .lean();

    return {
      success: true,
      purchases: purchases.map((p) => {
        // After populate+lean, p.examId is the exam document object
        const examDoc = p.examId as unknown as {
          _id: { toString(): string };
          title: string;
          slug: string;
          type: string;
          totalDuration: number;
          coverImage: string;
        };
        return {
          _id: p._id.toString(),
          examId: examDoc._id.toString(),
          amount: p.amount,
          currency: p.currency,
          status: p.status,
          purchasedAt: (p.purchasedAt as Date).toISOString(),
          exam: examDoc,
        };
      }),
    };
  } catch (error) {
    console.error("getUserPurchases error:", error);
    return { success: false, purchases: [] };
  }
}
