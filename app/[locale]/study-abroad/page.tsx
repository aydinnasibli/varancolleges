import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/study-abroad/Hero";
import AdviceSection from "@/components/study-abroad/AdviceSection";
import CountriesSection from "@/components/study-abroad/CountriesSection";
import ServicesSection from "@/components/study-abroad/ServicesSection";
import CTASection from "@/components/study-abroad/CTASection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const tStudy = await getTranslations({ locale, namespace: 'StudyAbroadData' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com/study-abroad' : `https://www.varancolleges.com/${locale}/study-abroad`;
  const title = t('studyAbroad');
  const description = tStudy('hero.description');

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
        'x-default': 'https://www.varancolleges.com/study-abroad',
        'az': 'https://www.varancolleges.com/study-abroad',
        'en': 'https://www.varancolleges.com/en/study-abroad',
      }
    }
  };
}

export default async function StudyAbroadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <AdviceSection locale={locale} />
      <ServicesSection locale={locale} />
      <CountriesSection locale={locale} />
      <CTASection />
      <Footer />
    </main>
  );
}
