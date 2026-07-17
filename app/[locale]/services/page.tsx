import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const tServices = await getTranslations({ locale, namespace: 'ServicesPage' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com/services' : `https://www.varancolleges.com/${locale}/services`;
  const title = t('services');
  const description = tServices('heroDesc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': 'https://www.varancolleges.com/services',
        'az': 'https://www.varancolleges.com/services',
        'en': 'https://www.varancolleges.com/en/services',
      }
    }
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section — 2-column on bg-navy */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-12 flex items-center gap-2 text-sm text-white/50 tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
            <span>/</span>
            <span className="text-white">{t('services')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left column */}
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/55 mb-4 block">
                {t("programCount")}
              </span>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight">
                {t('heroTitle')}
              </h1>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              <p className="text-[15px] text-white/65 font-light leading-relaxed">
                {t('heroDesc')}
              </p>
              <div className="flex flex-wrap gap-2">
                {[t("tagLanguage"), t("tagAdmissions"), t("tagGraduate"), t("tagAcademic")].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/60 border border-white/20 rounded-full px-4 py-1.5 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* CTA Section */}
      <section className="bg-navy relative overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="200" cy="200" r="160" stroke="white" strokeWidth="1" fill="none" />
          <ellipse cx="200" cy="200" rx="160" ry="30" stroke="white" strokeWidth="0.6" fill="none" />
          <ellipse cx="200" cy="200" rx="30" ry="160" stroke="white" strokeWidth="0.6" fill="none" />
          <ellipse cx="200" cy="200" rx="80" ry="160" stroke="white" strokeWidth="0.6" fill="none" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight mb-2">
                {t('borderlessEducation')}
              </h2>
              <p className="text-white/60 text-[15px]">
                {t('worldIsYourCampus')}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-white text-navy font-semibold text-[13px] hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              {t('services')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
