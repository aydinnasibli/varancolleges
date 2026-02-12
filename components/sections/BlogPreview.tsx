import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BlogPreview = () => {
  const posts = [
    {
      title: "Kanadada Təhsil və İş İmkanları: Tam Bələdçi",
      excerpt: "Kanada universitetlərinə qəbul qaydaları, təqaüd proqramları və məzun olduqdan sonra iş vizası haqqında ətraflı məlumat.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAfsuUczNweenZKGyfM3D2YPjROUD5C1GbSuBD6VEVeJPL__wON1KhxC4rNQVRFUkRm22b2rasb0n6eyFqPeSYGWH3SYKEI7vBmqZf1SDvav6oD-OQx42825V9QqIhJoGL-ATZFoO4oUpTrN_quNLx_a-k6Cipel0d7_3mKJyWS0lBDb__rjFoM5QZkTUqACiMYe_4kFgTmL8bQhntLNKWHj68hxtxyqIVbwjIaIyJIWm3s7VtGZ9lXrLsdhbqF2xHHMPzD4JuN5I0",
      date: "15 May, 2023",
    },
    {
      title: "IELTS yoxsa TOEFL? Hansı İmtahanı Seçməli?",
      excerpt: "Beynəlxalq dil sertifikatları arasındakı fərqlər və sizin hədəfinizə ən uyğun olan imtahan növünün seçilməsi.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7hFWkFEt8rghcjqHaTvPKWl7zHwvPblRsjKpHjyUJb62IiO0r1Ks6ATo3LIyYoJLqf2PzkLNmiuu3ndp6iAj73hWxR5FLnstHlRnhD-SVJF_Pc6BDUjb7GD_d98r0e7t1sLZuVz1mjReZdFqOVxWldHeT8qKDtETYxv7vJiQDOTkvSzRLpUXd7y8owLRE_8swEj-CR8E1F8IQo1jHm_hSMT0i9NJdHoEf-YqiGloKzkgsswGlyAgJbGO0_bE3m1czLkdlHji-_r8e",
      date: "10 May, 2023",
    },
    {
      title: "Avropada Pulsuz Təhsil: Mif yoxsa Reallıq?",
      excerpt: "Almaniya, İtaliya və digər Avropa ölkələrində təqaüdlü və ödənişsiz təhsil proqramları haqqında nələri bilməlisiniz.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7p664vBGLYJcwQm6wHyALmUWmEctdyRayS9raqr6C82rmxOiaDoNCSzT1ysK68suwWLhgDgY-QtVhb8QElG1PyrFE8X4W3twPb-xRsjSWjlAm6trq4qOPa3PDdilTmHuJqPaZcwkFDqYH7ST3XKaSDUfLKao7NoAi_-Kc7AI2ZIzve0vW_DI3cNSxuwRqA0C07t5d1ugB9k-lkLZ0ERCI3LqfOX5Su34bk0Nl8m62zBRHrGkYfHOHjJG8ZtIWVNwKL2_Tfm2CgygK",
      date: "02 May, 2023",
    },
  ];

  return (
    <section className="py-24 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">Blog & Xəbərlər</h2>
            <h3 className="text-4xl font-serif text-white">Son Məlumatlar</h3>
          </div>
          <Link href="/blog" className="hidden md:flex items-center text-sm font-medium text-slate-400 hover:text-accent transition-colors">
            Bütün yazılar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-64">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                <Image
                  alt={post.title}
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  src={post.image}
                  fill
                />
                <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs text-white border border-white/10">
                  {post.date}
                </div>
              </div>
              <h4 className="text-xl font-serif text-white mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h4>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-light">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center text-accent text-sm font-medium opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                Oxumağa davam et
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
