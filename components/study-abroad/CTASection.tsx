import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { getTranslations } from "next-intl/server";

const CTASection = async () => {
  const t = await getTranslations("StudyAbroad");
  const tGen = await getTranslations("General");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
          {t("ctaTitle")} <br />
          <span className="text-accent italic">{t("ctaSubtitle")}</span>
        </h2>
        <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
          {t("ctaDesc")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <ApplicationModal>
            <button className="w-full sm:w-auto px-10 py-5 bg-accent text-primary text-lg font-medium rounded-sm hover:bg-white hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_var(--accent)] transition-all duration-300">
              {tGen("applyNow")}
            </button>
          </ApplicationModal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
