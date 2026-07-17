import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/ui/ShareButtons";
import { getPostBySlug } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  const canonical = locale === 'az' ? `https://www.varancolleges.com/blog/${slug}` : `https://www.varancolleges.com/${locale}/blog/${slug}`;

  if (!post) {
    return {
      title: "Yazı tapılmadı - Varan Colleges",
    };
  }

  const description = post.excerpt || post.title;
  const ogImage = post.mainImage
    ? [{ url: post.mainImage, width: 1200, height: 630, alt: post.title }]
    : [{ url: '/images/og-image.png', width: 1200, height: 630, alt: post.title }];

  return {
    title: `${post.title} - Varan Colleges`,
    description,
    openGraph: {
      title: `${post.title} - Varan Colleges`,
      description,
      url: canonical,
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - Varan Colleges`,
      description,
      images: post.mainImage ? [post.mainImage] : ['/images/og-image.png'],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': `https://www.varancolleges.com/blog/${slug}`,
        'az': `https://www.varancolleges.com/blog/${slug}`,
        'en': `https://www.varancolleges.com/en/blog/${slug}`,
      }
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-navy">
        <div className="absolute inset-0">
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover opacity-10"
              priority
            />
          )}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6">
            {new Date(post.publishedAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"></div>

          <div className="mt-8 flex justify-center gap-2 text-sm text-white/50 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Səhifə
            </Link>
            <span className="text-white/40">•</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-white/40">•</span>
            <span className="text-white truncate max-w-[150px]">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl mt-[-80px] relative z-20">
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-navy-light hover:prose-a:text-navy prose-img:rounded-xl prose-img:shadow-lg prose-p:text-text-secondary prose-p:leading-relaxed">
              {post.body ? (
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              ) : (
                <p className="text-text-muted italic">Bu yazı üçün məzmun yoxdur.</p>
              )}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <ShareButtons title={post.title} />

            <Link href="/blog" className="flex items-center text-navy-light hover:text-navy transition-colors">
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
