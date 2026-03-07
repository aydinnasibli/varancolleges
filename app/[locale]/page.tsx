import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import HomeFeatures from "@/components/sections/HomeFeatures";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const canonical = locale === 'az' ? 'https://www.varancolleges.com' : `https://www.varancolleges.com/${locale}`;

  return {
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
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <HomeFeatures />
      <BlogPreview />
      <FAQ />
      <Footer />
    </main>
  );
}
