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

    // 4. Send Email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create a Promise to send email with a timeout
    const sendMailPromise = transporter.sendMail({
      from: `"VaranColleges Form" <${process.env.EMAIL_USER}>`,
      to: "info@varancolleges.com",
      subject: `Yeni Müraciət: ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0f2142; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            Yeni Müraciət
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p style="margin: 10px 0;"><strong>Ad və Soyad:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${phone}</p>

            <div style="margin-top: 20px;">
              <strong>Mesaj:</strong>
              <p style="
                margin-top: 5px;
                white-space: pre-wrap;
                background-color: #fff;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
              ">
                ${message || 'Mesaj yoxdur'}
              </p>
            </div>
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
            <p>Bu mesaj VaranColleges veb saytından göndərilmişdir.</p>
          </div>
        </div>
      `,
    });

    // Race the sendMail promise against a timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timed out (10s)")), 10000)
    );

    await Promise.race([sendMailPromise, timeoutPromise]);

    return { success: true };

  } catch (error) {
    console.error("Submission Error:", error);
    // Even if email fails, data is saved in DB.
    // We return error so user knows to contact another way if urgent,
    // but data is safe.
    return {
      error: `Xəta baş verdi: ${error instanceof Error ? error.message : "Naməlum xəta"}`
    };
  }
}
