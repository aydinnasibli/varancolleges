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
      <a href="#main-content" className="fixed -top-full left-2 z-100 bg-navy text-white px-4 py-2 rounded-md text-sm font-semibold focus-visible:top-2">
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
