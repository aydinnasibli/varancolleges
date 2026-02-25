"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/app/actions/send-email";
import { toast } from "sonner";

interface ApplicationModalProps {
  children?: React.ReactNode;
}

export function ApplicationModal({ children }: ApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
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

        setTimeout(() => {
          setStatus("idle");
          setOpen(false);
        }, 3000);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="accent">Müraciət et</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background-dark border-white/10 text-slate-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white">Müraciət et</DialogTitle>
          <DialogDescription className="text-slate-400">
            Təhsiliniz üçün ilk addımı atın. Məlumatlarınızı daxil edin, sizinlə əlaqə saxlayaq.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-300">Ad və Soyad</Label>
            <Input
              id="name"
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nümunə@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="text-slate-300">Əlaqə Nömrəsi</Label>
            <Input
              id="phone"
              placeholder="+994 50 123 45 67"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-slate-300">Əlavə Qeydlər (İstəyə bağlı)</Label>
            <Textarea
              id="message"
              placeholder="Sizi maraqlandıran suallar..."
              value={formData.message}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <Button
                variant="accent"
                type="submit"
                className="w-full sm:w-auto"
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? "Göndərilir..." : status === "success" ? "Göndərildi!" : "Göndər"}
              </Button>
            </div>
            {status === "success" && (
              <p className="text-green-500 text-sm text-center">
                Müraciətiniz qəbul edildi!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                Xəta baş verdi.
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
