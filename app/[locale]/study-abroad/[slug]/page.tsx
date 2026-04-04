import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { getStudyAbroadData } from "@/lib/data/study-abroad";
import { getCountryFaqs } from "@/lib/data/faqs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/study-abroad/CTASection";
import FAQ from "@/components/sections/FAQ";
import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const studyAbroadData = await getStudyAbroadData(locale);
  const country = studyAbroadData.countries.find((c) => c.slug === slug);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  if (!country) {
    return { title: t('studyAbroad') };
  }

  const canonical = locale === 'az' ? `https://www.varancolleges.com/study-abroad/${slug}` : `https://www.varancolleges.com/${locale}/study-abroad/${slug}`;

  const title = `${country.name} - ${t('studyAbroad')}`;
  const description = country.description || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: country.flagUrl, alt: country.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [country.flagUrl],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': `https://www.varancolleges.com/study-abroad/${slug}`,
        'az': `https://www.varancolleges.com/study-abroad/${slug}`,
        'en': `https://www.varancolleges.com/en/study-abroad/${slug}`,
      }
    }
  };
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { slug, locale } = await params;
  const studyAbroadData = await getStudyAbroadData(locale);
  const country = studyAbroadData.countries.find((c) => c.slug === slug);
  const tGen = await getTranslations({ locale, namespace: 'General' });
  const tData = await getTranslations({ locale, namespace: 'StudyAbroadData' });
  const tFaqData = await getTranslations({ locale, namespace: 'FAQData' });

  if (!country) {
    notFound();
  }

  const countryFaqs = getCountryFaqs(slug, tFaqData);

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src={country.flagUrl}
            alt={`${country.name} background`}
            fill
            className="object-cover opacity-[0.03] grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/study-abroad"
            className="inline-flex items-center text-sm font-medium text-accent hover:text-white transition-colors uppercase tracking-wider mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {tData("goBack")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-12 rounded overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-5xl md:text-7xl font-serif text-white">
                  {country.name}
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl border-l-2 border-accent pl-6 mb-10">
                {country.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <ApplicationModal>
                  <button className="bg-accent text-primary px-8 py-4 rounded-sm font-medium hover:bg-white hover:text-primary transition-colors text-lg">
                    {tGen("applyNow")}
                  </button>
                </ApplicationModal>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/5">
              <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
                <MapPin className="text-accent w-6 h-6" />
                {tData("advantages")}
              </h3>
              <ul className="space-y-4">
                {country.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="font-light text-slate-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pass countryFaqs array if there are specific faqs */}
      <FAQ customFaqs={countryFaqs.length > 0 ? countryFaqs : undefined} />

      <CTASection />

      <Footer />
    </main>
  );
}
