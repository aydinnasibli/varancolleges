"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/app/actions/blog";
import { uploadImage } from "@/app/actions/upload-image";
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function BlogForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [date, setDate] = useState(() => {
    if (initialData?.date) {
      const d = new Date(initialData.date);
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
      }
    }
    return new Date().toISOString().split('T')[0];
  });

  const [isUploading, setIsUploading] = useState(false);

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
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (error) {
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("image", image);
    formData.append("status", status);
    formData.append("date", date);

    if (slug.trim() !== "") {
        formData.append("slug", slug.trim());
    } else if (initialData?.slug) {
        formData.append("slug", initialData.slug);
    }

    try {
      const result = initialData
        ? await updatePost(initialData._id, formData)
        : await createPost(formData);

      if (result.success) {
        toast.success(initialData ? "Post updated successfully" : "Post created successfully");
        router.push("/admin/blog");
      } else {
        toast.error(result.error || "Failed to save post");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-[#1152d4] focus:border-[#1152d4] outline-none text-slate-900 bg-white"
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Slug (Optional)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-[#1152d4] focus:border-[#1152d4] outline-none text-slate-900 bg-white"
              placeholder="custom-url-slug (leave blank to auto-generate from title)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Excerpt (Short Description)</label>
            <textarea
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-[#1152d4] focus:border-[#1152d4] outline-none text-slate-900 bg-white resize-none"
              placeholder="Brief summary for the blog listing..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900">Publishing</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-[#1152d4] focus:border-[#1152d4] outline-none text-slate-900 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Publish Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-[#1152d4] focus:border-[#1152d4] outline-none text-slate-900 bg-white"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900">Main Image</h3>
            {image && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200">
                <img src={image} alt="Cover preview" className="object-cover w-full h-full" />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#1152d4]/10 file:text-[#1152d4] hover:file:bg-[#1152d4]/20"
              />
              {isUploading && <p className="text-xs text-slate-500 mt-2">Uploading...</p>}
            </div>
             <input type="hidden" name="image" value={image} />
          </div>

          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="w-full flex justify-center items-center gap-2 overflow-hidden rounded-lg h-12 px-5 bg-[#1152d4] text-white font-medium leading-normal hover:bg-[#1152d4]/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (initialData ? "Update Post" : "Create Post")}
          </button>
        </div>
      </div>
    </form>
  );
}
