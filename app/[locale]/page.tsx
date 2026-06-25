import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import HomeFeatures from "@/components/sections/HomeFeatures";
import StudyAbroadTeaser from "@/components/sections/StudyAbroadTeaser";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com' : `https://www.varancolleges.com/${locale}`;
  const description = t('description');
  const title = t('title');

  return {
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: '/images/varan-office.webp', width: 1200, height: 630, alt: 'VaranColleges' }],
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
        'x-default': 'https://www.varancolleges.com',
        'az': 'https://www.varancolleges.com',
        'en': 'https://www.varancolleges.com/en',
      }
    }
  };
}

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-white font-sans overflow-x-hidden">
        <Hero />
        <HomeFeatures />
        <StudyAbroadTeaser />
        <BlogPreview />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
