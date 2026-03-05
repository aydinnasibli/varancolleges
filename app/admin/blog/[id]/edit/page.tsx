import BlogForm from "../../BlogForm";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = await params;

  const post = await Post.findById(id).lean();

  if (!post) {
    notFound();
  }

  // Convert ObjectIds to strings to pass to client component safely
  const serializedPost = {
    ...post,
    _id: post._id.toString(),
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-slate-900 text-3xl font-bold leading-tight">
            Edit Blog Post
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Update the details of your blog post below.
          </p>
        </div>
      </div>

      <BlogForm initialData={serializedPost} />
    </div>
  );
}
