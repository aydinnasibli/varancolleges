import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPosts } from "@/lib/data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com/blog' : `https://www.varancolleges.com/${locale}/blog`;
  const title = t('blog');
  const description = tMeta('blogDescription');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: '/images/varan-office.webp', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/varan-office.webp'],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': 'https://www.varancolleges.com/blog',
        'az': 'https://www.varancolleges.com/blog',
        'en': 'https://www.varancolleges.com/en/blog',
      }
    }
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getPosts();
  const [t, tNav, tBlogPreview, tGen] = await Promise.all([
    getTranslations({ locale, namespace: 'Blog' }),
    getTranslations({ locale, namespace: 'Navigation' }),
    getTranslations({ locale, namespace: 'BlogPreview' }),
    getTranslations({ locale, namespace: 'General' }),
  ]);

  const dateLocale = locale === 'en' ? 'en-US' : 'az-AZ';

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-background-dark z-0">
          <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-30"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {tBlogPreview("subtitle")}
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {t("desc")}
          </p>
          <div className="mt-12 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              {tNav("home")}
            </Link>
            <span className="text-accent">•</span>
            <span className="text-white">{tNav("blog")}</span>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
             <div className="text-center py-20">
                <p className="text-xl text-slate-500 font-light">{tGen("noPosts")}</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-6 h-64 bg-card border border-white/5">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                    {post.mainImage && (
                      <Image
                        alt={post.title}
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        src={post.mainImage}
                        fill
                      />
                    )}
                    <div className="absolute top-4 left-4 z-20 bg-accent/15 backdrop-blur-md px-3 py-1 rounded text-xs text-accent border border-accent/20 font-medium">
                      {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
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
                    {tBlogPreview("readMore")}
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
