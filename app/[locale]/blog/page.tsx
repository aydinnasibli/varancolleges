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
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
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
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const dateLocale = locale === 'az' ? 'az-AZ' : 'en-US';

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-navy">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            {t("desc")}
          </p>
          <div className="mt-12 flex justify-center gap-2 text-sm text-white/50 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              {tNav("home")}
            </Link>
            <span className="text-white/40">•</span>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-text-muted font-light">{t("noPosts")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-6 h-64 bg-surface border border-border">
                    <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors z-10"></div>
                    {post.mainImage && (
                      <Image
                        alt={post.title}
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        src={post.mainImage}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-xs text-navy border border-border">
                      {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <h4 className="text-xl font-serif text-navy mb-3 group-hover:text-navy-light transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2 font-light">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center text-navy-light text-sm font-medium opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    {t("readMore")}
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
