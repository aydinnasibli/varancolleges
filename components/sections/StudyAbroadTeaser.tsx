import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const destinationKeys = ["usa", "canada", "uk", "australia", "europe", "turkey"] as const;

const StudyAbroadTeaser = async () => {
  const t = await getTranslations("StudyAbroad");
  const tCountries = await getTranslations("StudyAbroadData.countries");

  return (
    <section className="py-24 bg-white border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-text-faint uppercase mb-4">
              {t("subtitle")}
            </p>
            <h2 className="font-serif text-5xl md:text-[72px] font-bold text-navy leading-[0.92]">
              {t("title")}
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-[15px] text-text-secondary max-w-[300px] leading-[1.75] mb-5">
              {t("heroDesc")}
            </p>
            <Link
              href="/study-abroad"
              className="bg-navy text-white border-none cursor-pointer px-8 py-[13px] rounded text-[13px] font-semibold tracking-[0.02em] hover:bg-navy-light transition-colors inline-block"
            >
              {t("title")} →
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          {destinationKeys.map((key, i) => (
            <Link
              key={key}
              href="/study-abroad"
              className={`flex items-center gap-6 px-8 py-5 bg-white hover:bg-surface transition-colors group ${
                i < destinationKeys.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="font-serif text-xl md:text-[28px] font-bold text-navy min-w-[180px] md:min-w-[220px] leading-none">
                {tCountries(`${key}.name`)}
              </span>
              <span className="text-[13px] text-text-muted flex-1 hidden sm:block">
                {tCountries(`${key}.shortDesc`)}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-navy-light shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyAbroadTeaser;
