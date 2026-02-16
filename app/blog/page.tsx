import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPosts } from "@/lib/data";
import { urlFor } from "@/lib/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Varan Colleges",
  description: "Xaricdə təhsil, imtahanlara hazırlıq və təqaüd proqramları haqqında son məlumatlar.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95">
          <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Blog & Xəbərlər
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Xaricdə təhsil, imtahanlara hazırlıq və təqaüd proqramları haqqında ən son məlumatları buradan oxuyun.
          </p>
          <div className="mt-12 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Səhifə
            </Link>
            <span className="text-accent">•</span>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
             <div className="text-center py-20">
                <p className="text-xl text-slate-500 font-light">Hazırda heç bir yazı yoxdur.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-6 h-64 bg-[#0f1623]">
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
