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
  body: any; // Block content
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

const MOCK_POSTS: Post[] = [
  {
    _id: "101",
    title: "Kanadada Təhsil və İş İmkanları",
    slug: { current: "canada-education" },
    publishedAt: "2023-05-15",
    body: [],
    mainImage: { asset: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAfsuUczNweenZKGyfM3D2YPjROUD5C1GbSuBD6VEVeJPL__wON1KhxC4rNQVRFUkRm22b2rasb0n6eyFqPeSYGWH3SYKEI7vBmqZf1SDvav6oD-OQx42825V9QqIhJoGL-ATZFoO4oUpTrN_quNLx_a-k6Cipel0d7_3mKJyWS0lBDb__rjFoM5QZkTUqACiMYe_4kFgTmL8bQhntLNKWHj68hxtxyqIVbwjIaIyJIWm3s7VtGZ9lXrLsdhbqF2xHHMPzD4JuN5I0" } }
  }
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
    const posts = await client.fetch(`*[_type == "post"]`);
    return posts.length > 0 ? posts : MOCK_POSTS;
  } catch (error) {
    console.warn("Failed to fetch posts from Sanity, using mock data.", error);
    return MOCK_POSTS;
  }
}
