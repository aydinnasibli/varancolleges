import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const CTABanner = async () => {
  const t = await getTranslations("FAQ");
  const tGen = await getTranslations("General");

  return (
    <section className="bg-navy py-20 px-8 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div>
          <h2 className="font-serif text-3xl md:text-[52px] font-bold text-white leading-none mb-3">
            {t("contactUs")}
          </h2>
          <p className="text-base text-white/55 max-w-[500px] leading-[1.75]">
            {t("description")}
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-white text-navy border-none cursor-pointer px-12 py-[17px] rounded text-sm font-bold whitespace-nowrap tracking-[0.02em] hover:bg-surface-hover transition-colors text-center"
        >
          {tGen("applyNow")} →
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
