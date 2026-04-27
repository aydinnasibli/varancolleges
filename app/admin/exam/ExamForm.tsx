"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createExam, updateExam } from "@/app/actions/exam-admin";
import { uploadImage } from "@/app/actions/upload-image";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

interface ExamFormProps {
  initialData?: {
    _id: string;
    title: string;
    description: string;
    type: string;
    price: number;
    isActive: boolean;
    coverImage: string;
    totalDuration: number;
    examDate: string;
  };
}

export default function ExamForm({ initialData }: ExamFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [type, setType] = useState(initialData?.type || "SAT");
  const [price, setPrice] = useState(
    initialData ? ((initialData.price) / 100).toFixed(2) : "10.00"
  );
  const [isActive, setIsActive] = useState(initialData?.isActive ?? false);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [totalDuration, setTotalDuration] = useState(
    initialData?.totalDuration?.toString() || "134"
  );
  const [examDate, setExamDate] = useState(
    initialData?.examDate ? initialData.examDate.slice(0, 10) : ""
  );

  const isEditing = !!initialData;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        setCoverImage(result.url);
        toast.success("Şəkil yükləndi");
      } else {
        toast.error(result.error || "Şəkil yüklənə bilmədi");
      }
    } catch {
      toast.error("Yükləmə zamanı xəta baş verdi");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !examDate) {
      toast.error("Ad, təsvir və imtahan tarixi məcburidir");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("isActive", isActive.toString());
    formData.append("coverImage", coverImage);
    formData.append("totalDuration", totalDuration);
    formData.append("examDate", examDate);

    try {
      let result;
      if (isEditing) {
        result = await updateExam(initialData._id, formData);
      } else {
        result = await createExam(formData);
      }

      if (result.success) {
        toast.success(isEditing ? "İmtahan yeniləndi" : "İmtahan yaradıldı");
        router.push("/admin/exam");
      } else {
        toast.error(result.error || "Xəta baş verdi");
      }
    } catch {
      toast.error("Xəta baş verdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main fields */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              İmtahan adı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="SAT Mock Test #1"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Təsvir <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bu imtahan haqqında qısa məlumat..."
              rows={4}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                İmtahan növü
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] bg-white"
              >
                {["SAT", "IELTS", "TOEFL", "GRE", "GMAT"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Müddət (dəqiqə)
              </label>
              <input
                type="number"
                value={totalDuration}
                onChange={(e) => setTotalDuration(e.target.value)}
                min="1"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              İmtahan tarixi <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
              required
            />
            <p className="text-xs text-slate-400 mt-1">
              Bu tarixdən əvvəl satın alınan istifadəçilər imtahanı bu tarixdə başlaya bilər
            </p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Üz şəkli
          </label>
          {coverImage ? (
            <div className="relative">
              <Image
                src={coverImage}
                alt="Cover"
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-slate-100"
              >
                <X className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#1152d4] transition-colors">
              {isUploading ? (
                <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
              ) : (
                <>
                  <Upload className="h-6 w-6 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-500">Şəkil yüklə</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Qiymət (AZN) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₼</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Status</span>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isActive ? "bg-[#1152d4]" : "bg-slate-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
            <p className="text-xs text-slate-400 mt-1">
              {isActive ? "Aktiv – tələbələr görə bilər" : "Deaktiv – gizli"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1152d4] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0e42b0] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? "Yadda saxla" : "İmtahan yarat"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/exam")}
            className="w-full border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Ləğv et
          </button>
        </div>
      </div>
    </form>
  );
}
