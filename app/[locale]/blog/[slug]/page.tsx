import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/ui/ShareButtons";
import { getPostBySlug } from "@/lib/data";
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
               src={post.mainImage}
               alt={post.title}
               fill
               className="object-cover opacity-20 mix-blend-overlay"
               priority
             />
           )}
           <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="inline-block bg-accent/10 px-4 py-1.5 rounded-full text-accent text-sm font-medium mb-6">
             {new Date(post.publishedAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
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
      <section className="pb-20 bg-background-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl mt-[-80px] relative z-20">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-white prose-a:text-accent hover:prose-a:text-accent-light prose-img:rounded-xl prose-img:shadow-lg prose-p:text-slate-300 prose-p:leading-relaxed">
              {post.body ? (
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              ) : (
                <p className="text-slate-500 italic">Bu yazı üçün məzmun yoxdur.</p>
              )}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
             <ShareButtons title={post.title} />

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
