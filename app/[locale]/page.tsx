import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import HomeFeatures from "@/components/sections/HomeFeatures";
import StudyAbroadTeaser from "@/components/sections/StudyAbroadTeaser";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";

import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return pageMetadata({
    locale,
    path: '',
    title: t('homeTitle'),
    absoluteTitle: true,
    description: t('description'),
  });
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
