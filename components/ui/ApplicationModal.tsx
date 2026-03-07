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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("ApplicationModal");
  const tGen = useTranslations("General");

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
        toast.success(t("success"));

        setTimeout(() => {
          setStatus("idle");
          setOpen(false);
        }, 3000);
      } else {
        setStatus("error");
        toast.error(response.error || t("error"));
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      toast.error(t("unexpectedError"));
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="accent">{tGen("applyNow")}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background-dark border-white/10 text-slate-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white">{t("title")}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {t("desc")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-300">{t("nameLabel")}</Label>
            <Input
              id="name"
              placeholder={t("namePlaceholder")}
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-300">{t("emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="text-slate-300">{t("phoneLabel")}</Label>
            <Input
              id="phone"
              placeholder={t("phonePlaceholder")}
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-slate-300">{t("messageLabel")}</Label>
            <Textarea
              id="message"
              placeholder={t("messagePlaceholder")}
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
                {status === "submitting" ? t("submitting") : status === "success" ? t("success") : t("submit")}
              </Button>
            </div>
            {status === "success" && (
              <p className="text-green-500 text-sm text-center">
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                {t("error")}
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
