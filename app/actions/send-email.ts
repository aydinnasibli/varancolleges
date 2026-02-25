"use server";

import nodemailer from "nodemailer";

interface EmailResponse {
  success?: boolean;
  error?: string;
}

export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !phone) {
    return { error: "Zəhmət olmasa bütün vacib xanaları doldurun." };
  }

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
      <p>${message || "Mesaj yoxdur"}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Detailed Email Error:", error);
    // Return the actual error message for debugging purposes (remove in production if needed)
    return {
      error: `Email göndərilmədi: ${error instanceof Error ? error.message : "Naməlum xəta"}`
    };
  }
}
