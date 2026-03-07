import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import DeletePostButton from "./DeletePostButton";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  await connectToDatabase();
  const posts = await Post.find().sort({ date: -1 }).lean();

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-slate-900 text-3xl font-bold leading-tight">
            Blog Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your blog posts here.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-[#1152d4] text-white text-sm font-medium leading-normal hover:bg-[#1152d4]/90 transition-colors shadow-sm shadow-[#1152d4]/20"
        >
          <Plus className="h-[20px] w-[20px]" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Blog Table */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold first:pl-6">Title</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right last:pr-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {posts.map((post: any) => (
                <tr key={post._id.toString()} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 first:pl-6">
                    <div className="font-medium text-slate-900">{post.title}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[300px]">{post.slug}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right last:pr-6 flex justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post._id}/edit`}
                      className="text-slate-400 hover:text-[#1152d4] transition-colors p-1"
                    >
                      <Edit2 className="h-[20px] w-[20px]" />
                    </Link>
                    <DeletePostButton id={post._id.toString()} />
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                 <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No blog posts found. Create one to get started.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
