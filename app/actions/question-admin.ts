"use server";

import dbConnect from "@/lib/db";
import Question from "@/models/Question";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
}

export async function getQuestionsByExam(
  examId: string,
  section?: string,
  module?: number
) {
  await requireAdmin();
  try {
    await dbConnect();
    const sectionFilter = section as "reading_writing" | "math" | undefined;
    const moduleFilter = module as 1 | 2 | undefined;

    const questions = await Question.find({
      examId,
      ...(sectionFilter ? { section: sectionFilter } : {}),
      ...(moduleFilter !== undefined ? { module: moduleFilter } : {}),
    })
      .sort({ section: 1, module: 1, questionNumber: 1 })
      .lean();

    return {
      success: true,
      questions: questions.map((q) => ({
        ...q,
        _id: q._id.toString(),
        examId: q.examId.toString(),
        createdAt: (q.createdAt as Date).toISOString(),
        updatedAt: (q.updatedAt as Date).toISOString(),
      })),
    };
  } catch (error) {
    console.error("getQuestionsByExam error:", error);
    return { success: false, error: "Failed to fetch questions" };
  }
}

export async function getQuestionById(id: string) {
  await requireAdmin();
  try {
    await dbConnect();
    const question = await Question.findById(id).lean();
    if (!question) return { success: false, error: "Question not found" };
    return {
      success: true,
      question: {
        ...question,
        _id: question._id.toString(),
        examId: question.examId.toString(),
        createdAt: (question.createdAt as Date).toISOString(),
        updatedAt: (question.updatedAt as Date).toISOString(),
      },
    };
  } catch (error) {
    console.error("getQuestionById error:", error);
    return { success: false, error: "Failed to fetch question" };
  }
}

export async function createQuestion(examId: string, formData: FormData) {
  await requireAdmin();
  try {
    await dbConnect();

    const section = formData.get("section") as string;
    const module = parseInt(formData.get("module") as string);
    const questionNumber = parseInt(formData.get("questionNumber") as string);
    const questionType = (formData.get("questionType") as string) || "multiple_choice";
    const passageText = (formData.get("passageText") as string) || "";
    const questionText = formData.get("questionText") as string;
    const correctAnswer = formData.get("correctAnswer") as string;
    const explanation = (formData.get("explanation") as string) || "";
    const domain = (formData.get("domain") as string) || "";
    const difficulty = (formData.get("difficulty") as string) || "medium";
    const image = (formData.get("image") as string) || "";

    if (!section || !module || !questionText || !correctAnswer) {
      return { success: false, error: "Required fields missing" };
    }

    // Only require options for multiple choice
    const isMC = questionType === "multiple_choice";
    const optionA = isMC ? (formData.get("optionA") as string) : "";
    const optionB = isMC ? (formData.get("optionB") as string) : "";
    const optionC = isMC ? (formData.get("optionC") as string) : "";
    const optionD = isMC ? (formData.get("optionD") as string) : "";

    if (isMC && (!optionA || !optionB || !optionC || !optionD)) {
      return { success: false, error: "All four options are required for multiple choice questions" };
    }

    const question = await Question.create({
      examId,
      section: section as "reading_writing" | "math",
      module: module as 1 | 2,
      questionNumber,
      questionType: questionType as "multiple_choice" | "free_response",
      passageText,
      questionText,
      options: { A: optionA, B: optionB, C: optionC, D: optionD },
      correctAnswer,
      explanation,
      domain,
      difficulty,
      image,
    });

    revalidatePath(`/admin/exam/${examId}/questions`);
    return { success: true, id: question._id.toString() };
  } catch (error: unknown) {
    console.error("createQuestion error:", error);
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "A question with this number already exists in this module",
      };
    }
    return { success: false, error: "Failed to create question" };
  }
}

export async function updateQuestion(id: string, examId: string, formData: FormData) {
  await requireAdmin();
  try {
    await dbConnect();

    const section = formData.get("section") as string;
    const module = parseInt(formData.get("module") as string);
    const questionNumber = parseInt(formData.get("questionNumber") as string);
    const questionType = (formData.get("questionType") as string) || "multiple_choice";
    const passageText = (formData.get("passageText") as string) || "";
    const questionText = formData.get("questionText") as string;
    const correctAnswer = formData.get("correctAnswer") as string;
    const explanation = (formData.get("explanation") as string) || "";
    const domain = (formData.get("domain") as string) || "";
    const difficulty = (formData.get("difficulty") as string) || "medium";
    const image = (formData.get("image") as string) || "";

    const isMC = questionType === "multiple_choice";
    const optionA = isMC ? (formData.get("optionA") as string) : "";
    const optionB = isMC ? (formData.get("optionB") as string) : "";
    const optionC = isMC ? (formData.get("optionC") as string) : "";
    const optionD = isMC ? (formData.get("optionD") as string) : "";

    const question = await Question.findByIdAndUpdate(
      id,
      {
        section: section as "reading_writing" | "math",
        module: module as 1 | 2,
        questionNumber,
        questionType: questionType as "multiple_choice" | "free_response",
        passageText,
        questionText,
        options: { A: optionA, B: optionB, C: optionC, D: optionD },
        correctAnswer,
        explanation,
        domain,
        difficulty,
        image,
      },
      { new: true }
    );

    if (!question) return { success: false, error: "Question not found" };

    revalidatePath(`/admin/exam/${examId}/questions`);
    return { success: true };
  } catch (error) {
    console.error("updateQuestion error:", error);
    return { success: false, error: "Failed to update question" };
  }
}

export async function deleteQuestion(id: string, examId: string) {
  await requireAdmin();
  try {
    await dbConnect();
    await Question.findByIdAndDelete(id);
    revalidatePath(`/admin/exam/${examId}/questions`);
    return { success: true };
  } catch (error) {
    console.error("deleteQuestion error:", error);
    return { success: false, error: "Failed to delete question" };
  }
}

export async function getQuestionCounts(examId: string) {
  await requireAdmin();
  try {
    await dbConnect();
    const mongoose = await import("mongoose");
    const counts = await Question.aggregate([
      { $match: { examId: new mongoose.Types.ObjectId(examId) } },
      {
        $group: {
          _id: { section: "$section", module: "$module" },
          count: { $sum: 1 },
        },
      },
    ]);
    return { success: true, counts };
  } catch (error) {
    console.error("getQuestionCounts error:", error);
    return { success: false, counts: [] };
  }
}
