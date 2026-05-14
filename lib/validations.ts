import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ad və Soyad ən azı 2 simvol olmalıdır."),
  email: z.string().email("Keçərli email ünvanı daxil edin."),
  phone: z.string().min(9, "Telefon nömrəsi keçərli deyil."),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ID");

export const checkoutSessionSchema = z.object({
  examId: objectId,
});

export const tuitionPaymentSchema = z.object({
  amount: z.number().int().min(100).max(500000),
  description: z.string().max(500).optional(),
});

export const startAttemptSchema = z.object({
  examId: objectId,
  purchaseId: objectId,
});
