"use client";

import { Trash2 } from "lucide-react";
import { deletePost } from "@/app/actions/blog";
import { toast } from "sonner";
import { useState } from "react";

export default function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      try {
        const result = await deletePost(id);
        if (result.success) {
          toast.success("Post deleted successfully");
        } else {
          toast.error(result.error || "Failed to delete post");
        }
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-slate-400 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
    >
      <Trash2 className="h-[20px] w-[20px]" />
    </button>
  );
}
