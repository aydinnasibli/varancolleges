"use server";

import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/db";
import Contact from "@/models/Contact";
import { contactSchema } from "@/lib/validations";

interface EmailResponse {
  success?: boolean;
  error?: string;
}

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
    // Return the first error message
    const errorMessage = validation.error.issues[0]?.message || "Məlumatlar düzgün deyil.";
    return { error: errorMessage };
  }

  const { name, email, phone, message } = validation.data;

  try {
    await connectToDatabase();

    // 2. Rate Limiting (Check DB)
    // Check if the same email or phone submitted in the last 10 minutes
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

    // 4. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"VaranColleges Website Form" <${process.env.EMAIL_USER}>`,
      to: "info@varancolleges.com",
      subject: `Yeni Müraciət: ${name}`,
      html: `
        <h2>Yeni Müraciət</h2>
        <p><strong>Ad və Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message ? message.replace(/\n/g, '<br>') : "Mesaj yoxdur"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };

  } catch (error) {
    console.error("Submission Error:", error);

    // Distinguish between DB errors and Email errors if possible, or just return generic
    return {
      error: `Xəta baş verdi: ${error instanceof Error ? error.message : "Naməlum xəta"}`
    };
  }
}
