import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-slate-900 text-3xl font-bold leading-tight">
            Create New Blog Post
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the details below to publish a new post.
          </p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
