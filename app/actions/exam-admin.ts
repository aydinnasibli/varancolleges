"use server";

import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import ExamPurchase from "@/models/ExamPurchase";
import TuitionPayment from "@/models/TuitionPayment";
import Question from "@/models/Question";
import User from "@/models/User";
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
        examPassword: exam.examPassword ?? "",
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
    const examPassword = (formData.get("examPassword") as string) || "";

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
      price, isActive, coverImage, totalDuration, examDate, examPassword,
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
    const examPassword = (formData.get("examPassword") as string) || "";

    if (!title || !description || !examDateStr) {
      return { success: false, error: "Title, description and exam date are required" };
    }

    const examDate = new Date(examDateStr);

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await Exam.findOne({ slug, _id: { $ne: id } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const exam = await Exam.findByIdAndUpdate(
      id,
      { title, slug, description, type, price, isActive, coverImage, totalDuration, examDate, examPassword },
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

export async function getAllUsers() {
  await requireAdmin();
  try {
    await dbConnect();
    const users = await User.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
    return {
      success: true,
      users: users.map((u) => ({
        _id: u._id.toString(),
        clerkId: u.clerkId,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
      })),
    };
  } catch (error) {
    console.error("getAllUsers error:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function grantExamAccess(userId: string, examId: string, isInternal = false) {
  await requireAdmin();
  try {
    await dbConnect();

    const user = await User.findOne({ clerkId: userId, isDeleted: false });
    if (!user) return { success: false, error: "İstifadəçi tapılmadı" };

    const exam = await Exam.findById(examId);
    if (!exam) return { success: false, error: "İmtahan tapılmadı" };

    const existing = await ExamPurchase.findOne({ userId, examId, status: "completed" });
    if (existing) return { success: false, error: "İstifadəçi artıq bu imtahana girişə malikdir" };

    const uniqueId = `cash_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    await ExamPurchase.create({
      userId,
      examId,
      stripeSessionId: uniqueId,
      stripePaymentIntentId: "",
      amount: exam.price,
      currency: "azn",
      status: "completed",
      paymentMethod: "cash",
      isInternal,
      purchasedAt: new Date(),
    });

    revalidatePath("/admin/enrollments");
    revalidatePath("/admin/payments");
    return { success: true };
  } catch (error) {
    console.error("grantExamAccess error:", error);
    return { success: false, error: "Giriş vermək mümkün olmadı" };
  }
}

export async function revokeExamAccess(purchaseId: string) {
  await requireAdmin();
  try {
    await dbConnect();
    const purchase = await ExamPurchase.findById(purchaseId);
    if (!purchase) return { success: false, error: "Qeydiyyat tapılmadı" };
    if (purchase.paymentMethod !== "cash") {
      return { success: false, error: "Yalnız nağd ödəniş qeydiyyatlarını ləğv etmək olar" };
    }
    await ExamPurchase.findByIdAndUpdate(purchaseId, { status: "cancelled" });
    revalidatePath("/admin/enrollments");
    return { success: true };
  } catch (error) {
    console.error("revokeExamAccess error:", error);
    return { success: false, error: "Girişi ləğv etmək mümkün olmadı" };
  }
}

type PaymentRow = {
  _id: string;
  type: "exam" | "tuition";
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paidAt: string | null;
  user: { email: string; firstName: string; lastName: string } | null;
  exam: { _id: string; title: string; type: string } | null;
  description: string | null;
};

export async function getAllCompletedPayments() {
  await requireAdmin();
  try {
    await dbConnect();

    const [purchases, tuitions] = await Promise.all([
      ExamPurchase.find({
        status: "completed",
        isInternal: { $ne: true },
        stripeSessionId: { $not: /^cs_test_/ },
      })
        .populate("examId", "title type")
        .lean(),
      TuitionPayment.find({
        status: "completed",
        stripeSessionId: { $not: /^cs_test_/ },
      }).lean(),
    ]);

    const allUserIds = [
      ...new Set([
        ...purchases.map((p) => p.userId),
        ...tuitions.map((t) => t.userId),
      ]),
    ];
    const users = await User.find({ clerkId: { $in: allUserIds } }).lean();
    const userMap = Object.fromEntries(users.map((u) => [u.clerkId, u]));

    const examRows: PaymentRow[] = purchases.map((p) => {
      const exam = p.examId as unknown as { _id: { toString(): string }; title: string; type: string } | null;
      const user = userMap[p.userId];
      return {
        _id: p._id.toString(),
        type: "exam",
        userId: p.userId,
        amount: p.amount,
        currency: p.currency ?? "azn",
        paymentMethod: p.paymentMethod ?? "stripe",
        paidAt: p.purchasedAt ? (p.purchasedAt as Date).toISOString() : (p.createdAt ? (p.createdAt as Date).toISOString() : null),
        user: user ? { email: user.email, firstName: user.firstName, lastName: user.lastName } : null,
        exam: exam ? { _id: exam._id.toString(), title: exam.title, type: exam.type } : null,
        description: null,
      };
    });

    const tuitionRows: PaymentRow[] = tuitions.map((t) => {
      const user = userMap[t.userId];
      return {
        _id: t._id.toString(),
        type: "tuition",
        userId: t.userId,
        amount: t.amount,
        currency: t.currency ?? "azn",
        paymentMethod: "stripe",
        paidAt: t.paidAt ? (t.paidAt as Date).toISOString() : (t.createdAt ? (t.createdAt as Date).toISOString() : null),
        user: user ? { email: user.email, firstName: user.firstName, lastName: user.lastName } : null,
        exam: null,
        description: t.description || null,
      };
    });

    const all = [...examRows, ...tuitionRows].sort((a, b) => {
      const dateA = a.paidAt ? new Date(a.paidAt).getTime() : 0;
      const dateB = b.paidAt ? new Date(b.paidAt).getTime() : 0;
      return dateB - dateA;
    });

    return { success: true, payments: all };
  } catch (error) {
    console.error("getAllCompletedPayments error:", error);
    return { success: false, error: "Ödənişləri yükləmək mümkün olmadı" };
  }
}

export async function getExamPayments(examId: string) {
  await requireAdmin();
  try {
    await dbConnect();
    const purchases = await ExamPurchase.find({
      examId,
      status: "completed",
      isInternal: { $ne: true },
      stripeSessionId: { $not: /^cs_test_/ },
    })
      .sort({ purchasedAt: -1 })
      .lean();

    const userIds = [...new Set(purchases.map((p) => p.userId))];
    const users = await User.find({ clerkId: { $in: userIds } }).lean();
    const userMap = Object.fromEntries(users.map((u) => [u.clerkId, u]));

    return {
      success: true,
      payments: purchases.map((p) => {
        const user = userMap[p.userId];
        return {
          _id: p._id.toString(),
          userId: p.userId,
          amount: p.amount,
          currency: p.currency,
          paymentMethod: p.paymentMethod,
          stripeSessionId: p.stripeSessionId,
          purchasedAt: p.purchasedAt ? (p.purchasedAt as Date).toISOString() : null,
          createdAt: p.createdAt ? (p.createdAt as Date).toISOString() : null,
          user: user
            ? { email: user.email, firstName: user.firstName, lastName: user.lastName }
            : null,
        };
      }),
    };
  } catch (error) {
    console.error("getExamPayments error:", error);
    return { success: false, error: "Ödənişləri yükləmək mümkün olmadı" };
  }
}

export async function getManualEnrollments() {
  await requireAdmin();
  try {
    await dbConnect();
    const purchases = await ExamPurchase.find({ paymentMethod: "cash" })
      .populate("examId", "title type")
      .sort({ createdAt: -1 })
      .lean();

    const userIds = [...new Set(purchases.map((p) => p.userId))];
    const users = await User.find({ clerkId: { $in: userIds } }).lean();
    const userMap = Object.fromEntries(users.map((u) => [u.clerkId, u]));

    return {
      success: true,
      enrollments: purchases.map((p) => {
        const user = userMap[p.userId];
        const exam = p.examId as unknown as { _id: { toString(): string }; title: string; type: string } | null;
        return {
          _id: p._id.toString(),
          userId: p.userId,
          status: p.status,
          amount: p.amount,
          purchasedAt: p.purchasedAt ? (p.purchasedAt as Date).toISOString() : null,
          createdAt: p.createdAt ? (p.createdAt as Date).toISOString() : null,
          user: user
            ? { email: user.email, firstName: user.firstName, lastName: user.lastName }
            : null,
          exam: exam
            ? { _id: exam._id.toString(), title: exam.title, type: exam.type }
            : null,
        };
      }),
    };
  } catch (error) {
    console.error("getManualEnrollments error:", error);
    return { success: false, error: "Qeydiyyatları yükləmək mümkün olmadı" };
  }
}
