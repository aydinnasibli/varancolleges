import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");
  const tData = useTranslations("ServicesData");
  const tStudyAbroad = useTranslations("StudyAbroad");
  const tCountries = useTranslations("StudyAbroadData.countries");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[calc(100vh-108px)]">
      {/* LEFT: White editorial */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-[52px] lg:pr-[72px] py-16 lg:py-24 lg:border-r border-border">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-text-muted uppercase mb-10 lg:mb-12">
          {t("subtitle")}
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-[88px] font-semibold leading-[0.9] text-navy tracking-tight mb-8 lg:mb-10">
          {t("title1")}<br />
          <em className="italic">{t("title2")}</em>
        </h1>
        <div className="w-[52px] h-px bg-border mb-8 lg:mb-9"></div>
        <p className="text-base leading-[1.9] text-text-secondary max-w-[380px] mb-10 lg:mb-[52px]">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="bg-navy text-white border-none cursor-pointer px-10 py-4 rounded-[3px] text-[13px] font-semibold tracking-[0.04em] hover:bg-navy-light transition-colors text-center"
          >
            {t("button1")}
          </Link>
          <Link
            href="/services"
            className="bg-transparent text-text-secondary border-[1.5px] border-border cursor-pointer px-10 py-[15px] rounded-[3px] text-[13px] font-semibold hover:border-text-faint hover:text-navy transition-colors text-center"
          >
            {t("button2")}
          </Link>
        </div>
      </div>

      {/* RIGHT: Dark navy panel */}
      <div className="bg-navy flex flex-col justify-center px-8 sm:px-14 py-12 lg:py-[72px]">
        {/* Exam Prep */}
        <div className="mb-12">
          <p className="text-[10px] font-bold tracking-[0.22em] text-white/32 uppercase mb-7">
            {tData("details") || "Exam Preparation"}
          </p>
          <Link href="/services/ielts" className="block mb-3.5 hover:opacity-70 transition-opacity">
            <span className="font-serif text-4xl sm:text-[54px] font-semibold text-white leading-none tracking-tight">
              IELTS
            </span>
          </Link>
          <Link href="/services/toefl" className="block mb-3.5 hover:opacity-70 transition-opacity">
            <span className="font-serif text-2xl sm:text-[40px] font-semibold text-white/60 leading-none">
              TOEFL · SAT
            </span>
          </Link>
          <Link href="/services" className="block hover:opacity-70 transition-opacity">
            <span className="font-serif text-xl sm:text-[28px] font-semibold text-white/[0.36] leading-none">
              GMAT · GRE · AP · IB
            </span>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.08] mb-12"></div>

        {/* Study Abroad */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.22em] text-white/32 uppercase mb-7">
            {tStudyAbroad("title") || "Study Abroad"}
          </p>
          <div className="grid grid-cols-2 gap-x-7 gap-y-2.5">
            {["usa", "canada", "uk", "europe", "australia", "turkey"].map((key) => (
              <Link
                key={key}
                href="/study-abroad"
                className="font-serif text-lg sm:text-2xl font-semibold text-white/60 leading-[1.5] hover:text-white transition-colors"
              >
                {tCountries(`${key}.name`)}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom link */}
        <Link
          href="/study-abroad"
          className="mt-11 self-start bg-transparent border border-white/[0.14] text-white/45 rounded-[3px] px-6 py-3 text-xs font-semibold tracking-[0.05em] hover:border-white/35 hover:text-white/80 transition-colors"
        >
          {tStudyAbroad("title") || "Explore All Destinations"} →
        </Link>
      </div>
    </section>
  );
};

export default Hero;
