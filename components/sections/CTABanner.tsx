import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const CTABanner = async () => {
  const t = await getTranslations("CTA");

  return (
    <section className="bg-navy py-16 lg:py-20 border-t border-white/5">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-[40px] font-bold text-white leading-[1.1] mb-3">
            {t("title")}
          </h2>
          <p className="text-[14px] text-white/50 max-w-[440px] leading-[1.75]">
            {t("description")}
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-white text-navy px-10 py-3.5 rounded-md text-[13px] font-bold tracking-[0.02em] hover:bg-white/90 transition-colors text-center"
        >
          {t("button")} →
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
