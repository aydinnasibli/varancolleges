"use server";

import { Resend } from "resend";
import connectToDatabase from "@/lib/db";
import Contact from "@/models/Contact";
import { contactSchema } from "@/lib/validations";
import { EmailTemplate } from "@/components/email-template";

interface EmailResponse {
  success?: boolean;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  // 1. Validate Input with Zod
  const validation = contactSchema.safeParse(rawData);

  if (!validation.success) {
    const errorMessage = validation.error.issues[0]?.message || "Məlumatlar düzgün deyil.";
    return { error: errorMessage };
  }

  const { name, email, phone, message } = validation.data;

  try {
    await connectToDatabase();

    // 2. Rate Limiting (Check DB)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const existingSubmission = await Contact.findOne({
      $or: [{ email }, { phone }],
      createdAt: { $gte: tenMinutesAgo },
    });

    if (existingSubmission) {
      return {
        error: "Siz artıq müraciət etmisiniz. Zəhmət olmasa bir az gözləyin və yenidən cəhd edin."
      };
    }

    // 3. Save to MongoDB
    await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // 4. Send Email via Resend
    // Fallback text content
    const textContent = `
Yeni Müraciət:
Ad: ${name}
Email: ${email}
Telefon: ${phone}
Mesaj: ${message || 'Yoxdur'}
    `;

    const { error } = await resend.emails.send({
      from: 'VaranColleges Form <onboarding@resend.dev>',
      to: ['info@varancolleges.com'],
      subject: `Yeni Müraciət: ${name}`,
      react: await EmailTemplate({ name, email, phone, message }),
      text: textContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: "Email göndərilərkən xəta baş verdi. (Resend Error)" };
    }

    return { success: true };

  } catch (error) {
    console.error("Submission Error:", error);
    return {
      error: `Xəta baş verdi: ${error instanceof Error ? error.message : "Naməlum xəta"}`
    };
  }
}
