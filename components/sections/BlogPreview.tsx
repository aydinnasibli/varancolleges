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
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-[52px]">
          <h2 className="font-serif text-4xl md:text-[56px] font-bold text-navy leading-none">
            {t("title")}
          </h2>
          <Link
            href="/blog"
            className="hidden md:inline-flex shrink-0 bg-transparent border-[1.5px] border-border cursor-pointer px-7 py-[11px] rounded text-[13px] font-semibold text-navy hover:border-navy transition-colors"
          >
            {t("allPosts")} →
          </Link>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          {recentPosts.map((post, i) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className={`bg-white hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center gap-4 md:gap-9 px-6 md:px-9 py-6 md:py-[26px] group ${
                i < recentPosts.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold tracking-[0.12em] text-navy-light uppercase mb-[7px]">
                  {t("subtitle")}
                </div>
                <div className="font-serif text-lg md:text-[22px] font-bold text-navy leading-[1.3] line-clamp-2 group-hover:text-navy-light transition-colors">
                  {post.title}
                </div>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <span className="text-xs text-text-muted">
                  {new Date(post.publishedAt).toLocaleDateString('az-AZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <ArrowRight className="w-4 h-4 text-navy-light" />
              </div>
            </Link>
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-navy-light transition-colors"
          >
            {t("allPosts")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
