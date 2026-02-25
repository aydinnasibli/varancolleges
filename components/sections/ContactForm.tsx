"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/app/actions/send-email";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);

    try {
      const response = await sendEmail(data);

      if (response.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        toast.success("Müraciətiniz qəbul edildi!");

        // Reset status after a few seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        toast.error(response.error || "Xəta baş verdi.");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      toast.error("Gözlənilməz xəta baş verdi.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-card p-8 md:p-12 rounded-2xl border border-white/5 shadow-xl glass-panel">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Ad və Soyad</Label>
            <Input
              id="name"
              name="name"
              placeholder="Adınızı daxil edin"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-background-dark/50 border-white/10 text-white placeholder:text-slate-500 focus:border-accent focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Əlaqə Nömrəsi</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+994 XX XXX XX XX"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-background-dark/50 border-white/10 text-white placeholder:text-slate-500 focus:border-accent focus:ring-accent"
            />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nümunə@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-background-dark/50 border-white/10 text-white placeholder:text-slate-500 focus:border-accent focus:ring-accent"
            />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">Mesajınız (İstəyə bağlı)</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Sualınızı və ya mesajınızı bura yaza bilərsiniz..."
            value={formData.message}
            onChange={handleChange}
            className="bg-background-dark/50 border-white/10 text-white placeholder:text-slate-500 focus:border-accent focus:ring-accent min-h-[120px]"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full md:w-auto min-w-[200px]"
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? "Göndərilir..." : status === "success" ? "Göndərildi!" : "Müraciət et"}
          </Button>
          {status === "success" && (
            <p className="text-green-500 text-sm mt-3 text-center md:text-left animate-in fade-in slide-in-from-bottom-2">
              Müraciətiniz qəbul edildi! Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm mt-3 text-center md:text-left animate-in fade-in slide-in-from-bottom-2">
              Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
