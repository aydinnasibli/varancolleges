import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ad və Soyad ən azı 2 simvol olmalıdır."),
  email: z.string().email("Keçərli email ünvanı daxil edin."),
  phone: z.string().min(9, "Telefon nömrəsi keçərli deyil."),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
