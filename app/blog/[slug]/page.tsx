import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPostBySlug } from "@/lib/data";
import { urlFor } from "@/lib/sanity";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Yazı tapılmadı - Varan Colleges",
    };
  }

  return {
    title: `${post.title} - Varan Colleges`,
    description: post.excerpt || post.title,
  };
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-white mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-serif font-semibold text-white mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-serif font-medium text-white mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-slate-400 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 text-slate-300 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 text-slate-300 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a href={value.href} rel={rel} className="text-accent hover:underline transition-colors">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-64 md:h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95">
           {post.mainImage && (
             <Image
               src={urlFor(post.mainImage).url()}
               alt={post.title}
               fill
               className="object-cover opacity-20 mix-blend-overlay"
               priority
             />
           )}
           <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-accent/10 px-4 py-1.5 rounded-full text-accent text-sm font-medium mb-6">
             {new Date(post.publishedAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>

          <div className="mt-8 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Səhifə
            </Link>
            <span className="text-accent">•</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
             <span className="text-accent">•</span>
            <span className="text-white truncate max-w-[150px]">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            {post.body ? (
              <PortableText value={post.body} components={components} />
            ) : (
              <p className="text-slate-500 italic">Bu yazı üçün məzmun yoxdur.</p>
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
             <Link href="/blog" className="flex items-center text-accent hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Bütün yazılara qayıt
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
