import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const destinationKeys = ["usa", "canada", "uk", "australia", "europe", "turkey"] as const;

const StudyAbroadTeaser = async () => {
  const t = await getTranslations("StudyAbroad");
  const tCountries = await getTranslations("StudyAbroadData.countries");

  return (
    <section className="py-20 lg:py-32 bg-surface border-t border-border">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-text-muted uppercase mb-3">
              {t("subtitle")}
            </p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-navy leading-[1.05]">
              {t("title")}
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-[15px] text-text-secondary max-w-[340px] leading-[1.75] mb-4">
              {t("heroDesc")}
            </p>
            <Link
              href="/study-abroad"
              className="bg-navy text-white px-7 py-3 rounded-md text-[13px] font-semibold tracking-[0.02em] hover:bg-navy-mid transition-colors inline-block"
            >
              {t("title")} →
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden bg-white">
          {destinationKeys.map((key, i) => (
            <Link
              key={key}
              href="/study-abroad"
              className={`flex items-center gap-5 px-6 md:px-8 py-5 hover:bg-surface transition-colors group ${
                i < destinationKeys.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="font-serif text-xl md:text-[26px] font-bold text-navy min-w-[160px] md:min-w-[200px] leading-none">
                {tCountries(`${key}.name`)}
              </span>
              <span className="text-[13px] text-text-secondary flex-1 hidden sm:block leading-relaxed">
                {tCountries(`${key}.shortDesc`)}
              </span>
              <ArrowRight className="w-4 h-4 text-text-muted shrink-0 group-hover:text-navy group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyAbroadTeaser;
