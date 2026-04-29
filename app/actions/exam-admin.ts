"use server";

import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import Question from "@/models/Question";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
}

export async function getAllExams() {
  await requireAdmin();
  try {
    await dbConnect();
    const exams = await Exam.find({}).sort({ createdAt: -1 }).lean();
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
    console.error("getAllExams error:", error);
    return { success: false, error: "Failed to fetch exams" };
  }
}

export async function getExamById(id: string) {
  await requireAdmin();
  try {
    await dbConnect();
    const exam = await Exam.findById(id).lean();
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
    console.error("getExamById error:", error);
    return { success: false, error: "Failed to fetch exam" };
  }
}

export async function createExam(formData: FormData) {
  await requireAdmin();
  try {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const priceAZN = parseFloat(formData.get("price") as string);
    const price = Math.round(priceAZN * 100);
    const isActive = formData.get("isActive") === "true";
    const coverImage = (formData.get("coverImage") as string) || "";
    const totalDuration = parseInt(formData.get("totalDuration") as string) || 134;
    const examDateStr = formData.get("examDate") as string;

    if (!title || !description || !examDateStr) {
      return { success: false, error: "Title, description and exam date are required" };
    }

    const examDate = new Date(examDateStr);

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await Exam.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const exam = await Exam.create({
      title, slug, description,
      type: type || "SAT",
      price, isActive, coverImage, totalDuration, examDate,
    });

    revalidatePath("/admin/exam");
    revalidatePath("/exam");
    return { success: true, id: exam._id.toString(), slug: exam.slug };
  } catch (error) {
    console.error("createExam error:", error);
    return { success: false, error: "Failed to create exam" };
  }
}

export async function updateExam(id: string, formData: FormData) {
  await requireAdmin();
  try {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const priceAZN = parseFloat(formData.get("price") as string);
    const price = Math.round(priceAZN * 100);
    const isActive = formData.get("isActive") === "true";
    const coverImage = (formData.get("coverImage") as string) || "";
    const totalDuration = parseInt(formData.get("totalDuration") as string) || 134;
    const examDateStr = formData.get("examDate") as string;

    if (!title || !description || !examDateStr) {
      return { success: false, error: "Title, description and exam date are required" };
    }

    const examDate = new Date(examDateStr);

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await Exam.findOne({ slug, _id: { $ne: id } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const exam = await Exam.findByIdAndUpdate(
      id,
      { title, slug, description, type, price, isActive, coverImage, totalDuration, examDate },
      { new: true }
    );
    if (!exam) return { success: false, error: "Exam not found" };

    revalidatePath("/admin/exam");
    revalidatePath(`/admin/exam/${id}/edit`);
    revalidatePath("/exam");
    return { success: true, id: exam._id.toString(), slug: exam.slug };
  } catch (error) {
    console.error("updateExam error:", error);
    return { success: false, error: "Failed to update exam" };
  }
}

export async function deleteExam(id: string) {
  await requireAdmin();
  try {
    await dbConnect();
    await Exam.findByIdAndDelete(id);
    await Question.deleteMany({ examId: id });
    revalidatePath("/admin/exam");
    revalidatePath("/exam");
    return { success: true };
  } catch (error) {
    console.error("deleteExam error:", error);
    return { success: false, error: "Failed to delete exam" };
  }
}

export async function toggleExamActive(id: string, isActive: boolean) {
  await requireAdmin();
  try {
    await dbConnect();
    await Exam.findByIdAndUpdate(id, { isActive });
    revalidatePath("/admin/exam");
    revalidatePath("/exam");
    return { success: true };
  } catch (error) {
    console.error("toggleExamActive error:", error);
    return { success: false, error: "Failed to update exam" };
  }
}
