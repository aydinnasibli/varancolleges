import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Map from "@/components/ui/Map";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const tAbout = await getTranslations({ locale, namespace: 'About' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com/about' : `https://www.varancolleges.com/${locale}/about`;
  const title = t('about');
  const description = tAbout('heroDesc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: '/images/varan-office.webp', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/varan-office.webp'],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': 'https://www.varancolleges.com/about',
        'az': 'https://www.varancolleges.com/about',
        'en': 'https://www.varancolleges.com/en/about',
      }
    }
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const tFAQ = await getTranslations("FAQ");
  const tStats = await getTranslations("Stats");

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section — 50/50 split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        {/* Left: navy panel */}
        <div className="bg-navy flex flex-col justify-between px-10 py-32 lg:py-40 lg:px-16">
          <p className="text-[11px] font-bold tracking-[0.14em] text-white/55 uppercase">
            {t("whoWeAre")}
          </p>
          <div className="mt-auto">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              {t("title")}
            </h1>
            <p className="text-[15px] leading-[1.85] text-white/60 mt-6 max-w-md">
              {t("heroDesc")}
            </p>
          </div>
        </div>

        {/* Right: 2x2 stat grid */}
        <div className="bg-white grid grid-cols-2">
          {[
            { label: t("statExperience"), value: "8+", subtitle: t("statYearsActive") },
            { label: t("statPlaced"), value: "1,000+", subtitle: t("statGraduates") },
            { label: t("statNetwork"), value: "50+", subtitle: t("statPartnerUnis") },
            { label: t("statDestinations"), value: "6", subtitle: t("statCountries") },
          ].map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col justify-center px-10 py-14 lg:px-14 ${
                i % 2 === 0 ? "border-r border-border" : ""
              } ${i < 2 ? "border-b border-border" : ""}`}
            >
              <span className="text-[11px] font-bold tracking-[0.14em] text-text-faint uppercase">
                {stat.label}
              </span>
              <span className="font-serif text-[60px] font-bold text-navy leading-none mt-2">
                {stat.value}
              </span>
              <span className="text-[11px] font-bold tracking-[0.14em] text-text-faint uppercase mt-3">
                {stat.subtitle}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section — 50/50 grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: text content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-sans font-extrabold text-navy mb-10 leading-tight tracking-tight">
                {t("newStandards")} <br />
                <span className="text-navy-light">{t("standards")}</span>
              </h2>

              <div className="space-y-6">
                <p className="text-[15px] leading-[1.85] text-text-secondary">
                  {t("desc1")}
                </p>
                <p className="text-[15px] leading-[1.85] text-text-secondary">
                  {t("desc2")}
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition-all group"
                >
                  {tFAQ("contactUs")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: 3x2 feature grid */}
            <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
              {[
                { title: t("feat1"), desc: t("desc1").slice(0, 60) + "..." },
                { title: t("feat2"), desc: t("desc2").slice(0, 60) + "..." },
                { title: t("feat3"), desc: t("desc1").slice(0, 60) + "..." },
                { title: t("feat4"), desc: t("desc2").slice(0, 60) + "..." },
                { title: t("feat5"), desc: t("desc1").slice(0, 60) + "..." },
                { title: t("feat6"), desc: t("desc2").slice(0, 60) + "..." },
              ].map((feat, i) => (
                <div key={i} className="bg-white p-7">
                  <h3 className="text-[15px] font-semibold text-navy mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-text-secondary">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-surface border-t border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
              {t("visitUs")}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {t("visitUsDesc")}
            </p>
          </div>
          <Map />
        </div>
      </section>

      <Footer />
    </main>
  );
}
