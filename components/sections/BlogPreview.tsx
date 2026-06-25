import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/data";
import { getTranslations } from "next-intl/server";

const BlogPreview = async () => {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);
  const t = await getTranslations("BlogPreview");

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white border-t border-border">
      <div className="container-main">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-text-muted uppercase mb-3">
              {t("subtitle")}
            </p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-navy leading-[1.05]">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex shrink-0 border border-border px-6 py-2.5 rounded-md text-[13px] font-semibold text-navy hover:border-navy/25 transition-colors"
          >
            {t("allPosts")} →
          </Link>
        </div>

        <div className="border border-border rounded-lg overflow-hidden bg-white">
          {recentPosts.map((post, i) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-8 px-6 md:px-8 py-6 hover:bg-surface transition-colors group ${
                i < recentPosts.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold tracking-[0.12em] text-navy-light uppercase">
                  {t("subtitle")}
                </span>
                <h3 className="font-serif text-lg md:text-[21px] font-bold text-navy leading-[1.35] line-clamp-2 mt-1 group-hover:text-navy-light transition-colors">
                  {post.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <time className="text-xs text-text-muted" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('az-AZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-navy group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-navy-light transition-colors"
          >
            {t("allPosts")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
