"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, ImageIcon } from "lucide-react";
import { uploadImage } from "@/app/actions/upload-image";

export default function RichTextEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[300px] p-4 border border-slate-200 rounded-b-lg bg-white text-slate-900",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImage(formData);
        if (result.success && result.url) {
          editor.chain().focus().setImage({ src: result.url }).run();
        } else {
          alert("Failed to upload image");
        }
      }
    };
    input.click();
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex gap-2 p-2 bg-slate-50 border-b border-slate-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "bg-slate-200" : "hover:bg-slate-200"}`}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "bg-slate-200" : "hover:bg-slate-200"}`}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-slate-200" : "hover:bg-slate-200"}`}
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-slate-200" : "hover:bg-slate-200"}`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-slate-200"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
