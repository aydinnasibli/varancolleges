// Interface for Service
export interface Service {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  icon?: string;
}

// Interface for Blog Post
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: string; // Simplied image URL string
  publishedAt: string;
  excerpt?: string;
  body: string; // Simplified HTML or markdown string
}

// Mock Data
const MOCK_SERVICES: Service[] = [
  {
    _id: "1",
    title: "IELTS Hazırlığı",
    description: "Academic və General Training modulları üzrə peşəkar hazırlıq.",
    slug: { current: "ielts-hazirligi" },
    icon: "languages",
  },
  {
    _id: "2",
    title: "SAT Riyaziyyat & Verbal",
    description: "Xarici universitetlərə qəbul üçün SAT imtahanına tam hazırlıq.",
    slug: { current: "sat-hazirligi" },
    icon: "calculator",
  },
];

import connectToDatabase from "./db";
import MongoPost from "@/models/Post";

export async function getServices(): Promise<Service[]> {
  return MOCK_SERVICES;
}

export async function getPosts(): Promise<Post[]> {
  try {
    await connectToDatabase();
    const posts = await MongoPost.find({ status: "published" })
      .sort({ date: -1 })
      .lean();

    return posts.map((post: any) => ({
      _id: post._id.toString(),
      title: post.title,
      slug: { current: post.slug },
      mainImage: post.image,
      publishedAt: post.date.toISOString(),
      excerpt: post.excerpt,
      body: post.content,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    await connectToDatabase();
    const post = await MongoPost.findOne({ slug, status: "published" }).lean() as any;

    if (!post) {
      return null;
    }

    return {
      _id: post._id.toString(),
      title: post.title,
      slug: { current: post.slug },
      mainImage: post.image,
      publishedAt: post.date.toISOString(),
      excerpt: post.excerpt,
      body: post.content,
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}
