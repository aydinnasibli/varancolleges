"use server";

import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import ExamPurchase from "@/models/ExamPurchase";
import { auth } from "@clerk/nextjs/server";
import { rateLimit } from "@/lib/rate-limit";
import { startAttempt } from "./exam-attempt";

export async function verifyAndStartAttempt(
  examId: string,
  purchaseId: string,
  password: string
) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  // 5 attempts per 15 minutes per user to prevent brute-force
  if (rateLimit(`exam-password:${userId}:${examId}`, 5, 15 * 60 * 1000)) {
    return { success: false, error: "rate_limited" };
  }

  try {
    await dbConnect();

    const exam = await Exam.findOne({ _id: examId, isActive: true }).lean();
    if (!exam) return { success: false, error: "Exam not found" };

    // If no password is set, deny — caller should use startAttempt directly
    if (!exam.examPassword) {
      return { success: false, error: "No password required for this exam" };
    }

    if (password !== exam.examPassword) {
      return { success: false, error: "wrong_password" };
    }

    // Verify the purchase belongs to this user
    const purchase = await ExamPurchase.findOne({
      _id: purchaseId,
      userId,
      examId,
      status: "completed",
    });
    if (!purchase) return { success: false, error: "Purchase not verified" };

    return await startAttempt(examId, purchaseId);
  } catch (error) {
    console.error("verifyAndStartAttempt error:", error);
    return { success: false, error: "Failed to verify password" };
  }
}
