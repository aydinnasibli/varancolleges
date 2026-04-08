import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Hero = async () => {
  const t = await getTranslations("StudyAbroad");

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background image — visible and impactful */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop"
          alt="Study abroad campus"
          fill
          className="object-cover scale-105"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background-dark/70"></div>
        {/* Directional gradient — fades left side dark for text, shows image on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent"></div>
        {/* Bottom fade into page */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
      </div>

      {/* Decorative glow blobs */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-40 w-64 h-64 bg-secondary/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t("subtitle")}
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-tight mb-6">
            {t("heroTitle")}{" "}
            <span className="text-accent italic">{t("heroSubtitle")}</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent mb-6"></div>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed border-l-2 border-accent/40 pl-5">
            {t("heroDesc")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
