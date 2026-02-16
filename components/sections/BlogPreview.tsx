import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/data";
import { urlFor } from "@/lib/sanity";

const BlogPreview = async () => {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-background-dark relative">
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
          {recentPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-64 bg-card border border-white/5">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                {post.mainImage && (
                  <Image
                    alt={post.title}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    src={urlFor(post.mainImage).url()}
                    fill
                  />
                )}
                <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs text-white border border-white/10">
                  {new Date(post.publishedAt).toLocaleDateString('az-AZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <h4 className="text-xl font-serif text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h4>
              {post.excerpt && (
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-light">
                  {post.excerpt}
                </p>
              )}
              <span className="inline-flex items-center text-accent text-sm font-medium opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                Oxumağa davam et
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
