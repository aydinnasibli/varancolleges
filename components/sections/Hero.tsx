import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");
  const tData = useTranslations("ServicesData");
  const tStudyAbroad = useTranslations("StudyAbroad");
  const tCountries = useTranslations("StudyAbroadData.countries");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[min(calc(100vh-100px),800px)]">
      {/* LEFT — Editorial introduction */}
      <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-10 xl:pl-[max(40px,calc((100vw-1240px)/2+40px))] lg:pr-16 py-14 lg:py-20">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-text-muted uppercase mb-8">
          {t("subtitle")}
        </p>

        <h1 className="font-serif text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.92] text-navy tracking-tight mb-7">
          {t("title1")}
          <br />
          <em className="italic text-navy/70">{t("title2")}</em>
        </h1>

        <div className="w-10 h-px bg-border mb-7" aria-hidden="true" />

        <p className="text-[15px] leading-[1.85] text-text-secondary max-w-[400px] mb-10">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="bg-navy text-white px-9 py-3.5 rounded-md text-[13px] font-semibold tracking-[0.03em] hover:bg-navy-mid transition-colors text-center"
          >
            {t("button1")}
          </Link>
          <Link
            href="/services"
            className="text-text-secondary border border-border px-9 py-3.5 rounded-md text-[13px] font-semibold hover:border-navy/25 hover:text-navy transition-colors text-center"
          >
            {t("button2")}
          </Link>
        </div>
      </div>

      {/* RIGHT — Dark navy services panel */}
      <div className="bg-navy flex flex-col justify-center px-5 sm:px-8 lg:px-14 py-12 lg:py-20 lg:pr-[max(40px,calc((100vw-1240px)/2+40px))]">
        {/* Exam Prep */}
        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-5">
            {tData("details")}
          </p>
          <div className="space-y-1.5">
            <Link href="/services/ielts" className="block hover:translate-x-1 transition-transform duration-200">
              <span className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold text-white leading-none tracking-tight">
                IELTS
              </span>
            </Link>
            <Link href="/services/toefl" className="block hover:translate-x-1 transition-transform duration-200">
              <span className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-white/70 leading-none">
                TOEFL · SAT
              </span>
            </Link>
            <Link href="/services" className="block hover:translate-x-1 transition-transform duration-200">
              <span className="font-serif text-[clamp(1.125rem,2vw,1.75rem)] font-semibold text-white/50 leading-none">
                GMAT · GRE · AP · IB
              </span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-10" aria-hidden="true" />

        {/* Study Abroad */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-5">
            {tStudyAbroad("title")}
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {["usa", "canada", "uk", "europe", "australia", "turkey"].map((key) => (
              <Link
                key={key}
                href="/study-abroad"
                className="font-serif text-lg sm:text-xl font-semibold text-white/50 leading-[1.6] hover:text-white transition-colors"
              >
                {tCountries(`${key}.name`)}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom link */}
        <Link
          href="/study-abroad"
          className="mt-10 self-start border border-white/15 text-white/55 rounded-md px-5 py-2.5 text-[12px] font-semibold tracking-[0.04em] hover:border-white/30 hover:text-white/80 transition-colors"
        >
          {tStudyAbroad("title")} →
        </Link>
      </div>
    </section>
  );
};

export default Hero;
