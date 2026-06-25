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
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-4 block">
                {t("programCount")}
              </span>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight">
                {t('heroTitle')}
              </h1>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              <p className="text-lg text-white/70 font-light leading-relaxed">
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
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                {t('borderlessEducation')}
              </h2>
              <p className="text-white/60 font-light">
                {t('worldIsYourCampus')}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-navy font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              {t('home') === 'Ana Səhifə' ? 'Əlaqə' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
