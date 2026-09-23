import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/study-abroad/Hero";
import JourneyTimeline from "@/components/study-abroad/JourneyTimeline";
import CountriesSection from "@/components/study-abroad/CountriesSection";
import CTASection from "@/components/study-abroad/CTASection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const tStudy = await getTranslations({ locale, namespace: 'StudyAbroadData' });
  return pageMetadata({
    locale,
    path: 'study-abroad',
    title: t('studyAbroadTitle'),
    description: tStudy('hero.description'),
  });
}

export default async function StudyAbroadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen flex flex-col font-sans bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <JourneyTimeline locale={locale} />
      <CountriesSection locale={locale} />
      <CTASection />
      <Footer />
    </main>
  );
}
