import { client } from "./sanity";

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
  mainImage?: { asset: { url: string } };
  publishedAt: string;
  excerpt?: string;
  body: any; // Block content
}

// Interface for FAQ
export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order?: number;
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


export async function getServices(): Promise<Service[]> {
  try {
    const services = await client.fetch(`*[_type == "service"]`);
    return services.length > 0 ? services : MOCK_SERVICES;
  } catch (error) {
    console.warn("Failed to fetch services from Sanity, using mock data.", error);
    return MOCK_SERVICES;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts from Sanity:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
    return post || null;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const faqs = await client.fetch(`*[_type == "faq"] | order(order asc)`);
    return faqs;
  } catch (error) {
    console.error("Failed to fetch FAQs from Sanity:", error);
    return [];
  }
}
