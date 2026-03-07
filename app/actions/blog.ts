"use server";

import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    await connectToDatabase();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const image = formData.get("image") as string;
    const status = formData.get("status") as string;

    const slug = slugify(title, { lower: true, strict: true });

    // Ensure unique slug
    let uniqueSlug = slug;
    let counter = 1;
    while (await Post.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newPost = new Post({
      title,
      slug: uniqueSlug,
      content,
      excerpt,
      image,
      status,
      author: "Admin", // default since there's no auth handling requested yet for author
      date: new Date(),
    });

    await newPost.save();

    revalidatePath("/blog");
    revalidatePath("/en/blog");
    revalidatePath("/az/blog");
    revalidatePath("/admin/blog");

    return { success: true, slug: uniqueSlug };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    await connectToDatabase();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const image = formData.get("image") as string;
    const status = formData.get("status") as string;

    let slug = formData.get("slug") as string;

    if (!slug) {
        slug = slugify(title, { lower: true, strict: true });
    }

    // Ensure unique slug (excluding self)
    let uniqueSlug = slug;
    let counter = 1;
    let existingPost = await Post.findOne({ slug: uniqueSlug, _id: { $ne: id } });
    while (existingPost) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
      existingPost = await Post.findOne({ slug: uniqueSlug, _id: { $ne: id } });
    }

    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        slug: uniqueSlug,
        content,
        excerpt,
        image,
        status,
      },
      { new: true }
    );

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/en/blog");
    revalidatePath(`/en/blog/${post.slug}`);
    revalidatePath("/az/blog");
    revalidatePath(`/az/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    return { success: true, slug: uniqueSlug };
  } catch (error) {
    console.error("Failed to update post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deletePost(id: string) {
  try {
    await connectToDatabase();

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
        return { success: false, error: "Post not found" };
    }

    revalidatePath("/blog");
    revalidatePath("/en/blog");
    revalidatePath("/az/blog");
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
