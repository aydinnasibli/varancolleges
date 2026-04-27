import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

const CTASection = async () => {
  const t = await getTranslations("StudyAbroad");
  const tGen = await getTranslations("General");

  return (
    <section className="py-20 bg-[#0a192f] relative">
      {/* Thin gold divider at top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-3 mb-6">
          <div className="h-[1px] w-8 bg-accent/50"></div>
          <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Varan Colleges</span>
          <div className="h-[1px] w-8 bg-accent/50"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight tracking-tight">
          {t("ctaTitle")} <span className="text-accent italic">{t("ctaSubtitle")}</span>
        </h2>
        <p className="text-slate-400 text-base font-light max-w-xl mx-auto mb-10 leading-relaxed">
          {t("ctaDesc")}
        </p>

        <ApplicationModal>
          <button className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b38728] text-[#0a192f] text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 transition-all duration-300 tracking-wide uppercase">
            {tGen("applyNow")}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </ApplicationModal>
      </div>

      {/* Thin gold divider at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
    </section>
  );
};

export default CTASection;
