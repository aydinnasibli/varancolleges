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

const MOCK_FAQS: FAQ[] = [
  {
    _id: "f1",
    question: "Xaricdə təhsil üçün hansı sənədlər tələb olunur?",
    answer: "Tələb olunan sənədlər ölkə və universitetə görə dəyişir. Ümumi olaraq: Pasport, Transkript (qiymət cədvəli), Dil sertifikatı (IELTS/TOEFL), Tövsiyə məktubları və Motivasiya məktubu.",
    order: 1
  },
  {
    _id: "f2",
    question: "SAT imtahanına nə qədər vaxt ayırmalıyam?",
    answer: "Optimal hazırlıq müddəti tələbənin ilkin səviyyəsindən asılı olaraq 3-6 aydır. İntensiv proqramlarla bu müddəti qısaltmaq mümkündür.",
    order: 2
  },
  {
    _id: "f3",
    question: "Təqaüd proqramlarına necə müraciət edə bilərəm?",
    answer: "Təqaüd proqramlarına müraciət universitet qəbulu ilə paralel aparılır. Bizim mütəxəssislər sizə uyğun təqaüdləri araşdırıb müraciət prosesində dəstək olurlar.",
    order: 3
  },
  {
      _id: "f4",
      question: "Sınaq dərsləri mövcuddurmu?",
      answer: "Bəli, kurslarımıza qeydiyyatdan əvvəl keyfiyyəti yoxlamaq üçün ödənişsiz sınaq dərslərində iştirak edə bilərsiniz.",
      order: 4
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

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const faqs = await client.fetch(`*[_type == "faq"] | order(order asc)`);
    return faqs.length > 0 ? faqs : MOCK_FAQS;
  } catch (error) {
    console.warn("Failed to fetch FAQs from Sanity, using mock data.", error);
    return MOCK_FAQS;
  }
}
