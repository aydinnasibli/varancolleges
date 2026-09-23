import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/ui/ShareButtons";
import { getPostBySlug } from "@/lib/data";
import { Metadata } from "next";
import { pageMetadata, postDescription, localeUrl, breadcrumbJsonLd, jsonLdGraph, ORGANIZATION_ID, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  // Posts are written in Azerbaijani only, so /en/blog/<slug> serves the same
  // article — canonicalise both to the AZ URL instead of claiming an EN version.
  return pageMetadata({
    locale,
    path: `blog/${slug}`,
    title: post.title,
    description: postDescription(post),
    languages: 'az',
    type: 'article',
    publishedTime: post.publishedAt,
    image: post.mainImage ? { url: post.mainImage, alt: post.title } : undefined,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Posts canonicalise to the AZ URL, so the breadcrumb trail does too.
  const tNav = await getTranslations({ locale: "az", namespace: "Navigation" });
  const url = localeUrl("az", `blog/${slug}`);
  const structuredData = jsonLdGraph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: post.title,
      description: postDescription(post),
      image: post.mainImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "az",
      author: post.author
        ? { "@type": "Person", name: post.author }
        : { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
    },
    breadcrumbJsonLd("az", tNav("home"), [
      [tNav("blog"), "blog"],
      [post.title, `blog/${slug}`],
    ])
  );

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <JsonLd data={structuredData} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-navy">
        <div className="absolute inset-0">
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt=""
              fill
              className="object-cover opacity-10"
              priority
            />
          )}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <time dateTime={post.publishedAt} className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6">
            {new Date(post.publishedAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"></div>

          <nav aria-label="Breadcrumb" className="mt-8 flex justify-center gap-2 text-sm text-white/50 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Səhifə
            </Link>
            <span className="text-white/40">•</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-white/40">•</span>
            <span className="text-white truncate max-w-[150px]" aria-current="page">{post.title}</span>
          </nav>
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
