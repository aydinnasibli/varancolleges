import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const CTABanner = async () => {
  const t = await getTranslations("CTA");

  return (
    <section className="bg-navy py-16 lg:py-20 border-t border-white/5 relative overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="160" stroke="white" strokeWidth="1" fill="none" />
        <ellipse cx="200" cy="200" rx="160" ry="30" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="200" cy="200" rx="30" ry="160" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="200" cy="200" rx="80" ry="160" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="200" cy="200" rx="130" ry="160" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="200" cy="170" rx="120" ry="22" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="200" cy="230" rx="120" ry="22" stroke="white" strokeWidth="0.6" fill="none" />
      </svg>

      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-[40px] font-bold text-white leading-[1.1] mb-3">
            {t("title")}
          </h2>
          <p className="text-[15px] text-white/55 max-w-[440px] leading-[1.75]">
            {t("description")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/contact"
            className="shrink-0 bg-white text-navy px-10 py-3.5 rounded-md text-[13px] font-bold tracking-[0.02em] hover:bg-white/90 transition-colors text-center"
          >
            {t("button")} →
          </Link>
          <a
            href="https://wa.me/994771885050"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white/70 px-8 py-3.5 rounded-md text-[13px] font-semibold hover:border-white/40 hover:text-white transition-colors text-center"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
