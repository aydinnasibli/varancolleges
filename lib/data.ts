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

const MOCK_POSTS: Post[] = [];

export async function getServices(): Promise<Service[]> {
  return MOCK_SERVICES;
}

export async function getPosts(): Promise<Post[]> {
  return MOCK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = MOCK_POSTS.find(p => p.slug.current === slug);
  return post || null;
}
