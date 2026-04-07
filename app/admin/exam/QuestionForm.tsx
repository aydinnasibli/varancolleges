"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuestion, updateQuestion } from "@/app/actions/question-admin";
import { uploadImage } from "@/app/actions/upload-image";
import { toast } from "sonner";
import { Loader2, Upload, X, Info } from "lucide-react";
import Image from "next/image";

interface QuestionFormProps {
  examId: string;
  initialData?: {
    _id: string;
    section: string;
    module: number;
    questionNumber: number;
    passageText: string;
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    explanation: string;
    domain: string;
    difficulty: string;
    image: string;
  };
}

export default function QuestionForm({ examId, initialData }: QuestionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [section, setSection] = useState(initialData?.section || "reading_writing");
  const [module, setModule] = useState(initialData?.module?.toString() || "1");
  const [questionNumber, setQuestionNumber] = useState(
    initialData?.questionNumber?.toString() || "1"
  );
  const [passageText, setPassageText] = useState(initialData?.passageText || "");
  const [questionText, setQuestionText] = useState(initialData?.questionText || "");
  const [optionA, setOptionA] = useState(initialData?.options?.A || "");
  const [optionB, setOptionB] = useState(initialData?.options?.B || "");
  const [optionC, setOptionC] = useState(initialData?.options?.C || "");
  const [optionD, setOptionD] = useState(initialData?.options?.D || "");
  const [correctAnswer, setCorrectAnswer] = useState(initialData?.correctAnswer || "A");
  const [explanation, setExplanation] = useState(initialData?.explanation || "");
  const [domain, setDomain] = useState(initialData?.domain || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "medium");
  const [image, setImage] = useState(initialData?.image || "");

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
        setImage(result.url);
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
    if (!questionText.trim() || !optionA || !optionB || !optionC || !optionD) {
      toast.error("Sual mətni və bütün variantlar məcburidir");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("section", section);
    formData.append("module", module);
    formData.append("questionNumber", questionNumber);
    formData.append("passageText", passageText);
    formData.append("questionText", questionText);
    formData.append("optionA", optionA);
    formData.append("optionB", optionB);
    formData.append("optionC", optionC);
    formData.append("optionD", optionD);
    formData.append("correctAnswer", correctAnswer);
    formData.append("explanation", explanation);
    formData.append("domain", domain);
    formData.append("difficulty", difficulty);
    formData.append("image", image);

    try {
      let result;
      if (isEditing) {
        result = await updateQuestion(initialData._id, examId, formData);
      } else {
        result = await createQuestion(examId, formData);
      }

      if (result.success) {
        toast.success(isEditing ? "Sual yeniləndi" : "Sual əlavə edildi");
        router.push(`/admin/exam/${examId}/questions`);
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
      {/* Main content */}
      <div className="lg:col-span-2 space-y-5">
        {/* Passage text (optional, for RW) */}
        {section === "reading_writing" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Mətn (Passage) <span className="text-slate-400 font-normal">— ixtiyari</span>
            </label>
            <textarea
              value={passageText}
              onChange={(e) => setPassageText(e.target.value)}
              placeholder="Reading passage mətni buraya yazın..."
              rows={6}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] resize-none font-mono"
            />
          </div>
        )}

        {/* Question text */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Sual mətni <span className="text-red-500">*</span>
          </label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Sualı buraya yazın..."
            rows={4}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] resize-none"
            required
          />
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Cavab variantları</h3>
          {[
            { label: "A", value: optionA, setter: setOptionA },
            { label: "B", value: optionB, setter: setOptionB },
            { label: "C", value: optionC, setter: setOptionC },
            { label: "D", value: optionD, setter: setOptionD },
          ].map(({ label, value, setter }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-[80px]">
                <input
                  type="radio"
                  name="correctAnswer"
                  value={label}
                  checked={correctAnswer === label}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="h-4 w-4 text-[#1152d4] cursor-pointer"
                  id={`answer-${label}`}
                />
                <label
                  htmlFor={`answer-${label}`}
                  className={`text-sm font-semibold cursor-pointer px-2.5 py-0.5 rounded-full ${
                    correctAnswer === label
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {label}
                </label>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Variant ${label}`}
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
                required
              />
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
            <Info className="h-3.5 w-3.5 flex-shrink-0" />
            Düzgün cavabı sol tərəfdəki radio düyməsini seçərək işarələyin
          </div>
        </div>

        {/* Optional image */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Şəkil <span className="text-slate-400 font-normal">— ixtiyari (riyaziyyat diaqramları üçün)</span>
          </label>
          {image ? (
            <div className="relative inline-block">
              <Image
                src={image}
                alt="Question image"
                width={400}
                height={200}
                className="max-h-48 object-contain rounded-lg border border-slate-200"
              />
              <button
                type="button"
                onClick={() => setImage("")}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-slate-100"
              >
                <X className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#1152d4] transition-colors">
              {isUploading ? (
                <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
              ) : (
                <>
                  <Upload className="h-5 w-5 text-slate-400 mb-1.5" />
                  <span className="text-xs text-slate-500">Şəkil yüklə</span>
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

        {/* Explanation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            İzahat <span className="text-slate-400 font-normal">— nəticə səhifəsində göstəriləcək</span>
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Bu sualın cavabını necə tapmaq olar..."
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] resize-none"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Bölmə <span className="text-red-500">*</span>
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] bg-white"
            >
              <option value="reading_writing">Reading &amp; Writing</option>
              <option value="math">Math</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Modul <span className="text-red-500">*</span>
            </label>
            <select
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] bg-white"
            >
              <option value="1">Modul 1</option>
              <option value="2">Modul 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Sual nömrəsi <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(e.target.value)}
              min="1"
              max={section === "reading_writing" ? 27 : 22}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
              required
            />
            <p className="text-xs text-slate-400 mt-1">
              {section === "reading_writing" ? "R&W: 1-27" : "Math: 1-22"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Mövzu / Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={
                section === "reading_writing"
                  ? "Reading Comprehension, Grammar..."
                  : "Algebra, Geometry, Data Analysis..."
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Çətinlik səviyyəsi
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] bg-white"
            >
              <option value="easy">Asan</option>
              <option value="medium">Orta</option>
              <option value="hard">Çətin</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1152d4] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0e42b0] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? "Yadda saxla" : "Sual əlavə et"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/exam/${examId}/questions`)}
            className="w-full border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Ləğv et
          </button>
        </div>
      </div>
    </form>
  );
}
