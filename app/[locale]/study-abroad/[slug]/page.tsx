import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CheckCircle, ShieldCheck, Star, Home, Plane, BookOpen, Phone } from "lucide-react";
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

const additionalServiceIcons = [Home, Plane, ShieldCheck, Phone];

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

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/5">
        {/* Flag background — subtle color tint */}
        <div className="absolute inset-0 z-0">
          <Image
            src={country.flagUrl}
            alt={`${country.name} background`}
            fill
            className="object-cover opacity-[0.12]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

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
              <div className="flex items-center gap-5 mb-4">
                <div className="relative w-20 h-14 rounded-sm overflow-hidden shadow-2xl ring-2 ring-white/15 flex-shrink-0">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-serif text-white leading-none">
                    {country.name}
                  </h1>
                </div>
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

      {/* Section 2 — Why Study Here */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
            {tData("whyStudyHere")}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent" />
        </div>
        <div className={`grid gap-4 ${
          country.features.length <= 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}>
          {country.features.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`bg-white/5 border border-white/10 border-t-2 ${
                  isEven ? "border-t-accent/40" : "border-t-secondary/40"
                } rounded-xl p-5 flex flex-col gap-4`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isEven ? "bg-accent/15" : "bg-secondary/15"
                }`}>
                  <CheckCircle className={`h-5 w-5 ${isEven ? "text-accent" : "text-secondary"}`} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{feature}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3 — How We Help You (Admission Process) */}
      <section className="bg-primary/20 border-y border-white/5 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/4 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              {tData("howWeHelpYou")}
            </h2>
            <p className="text-slate-400 text-base max-w-2xl">
              {studyAbroadData.admissionProcess.description}
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-secondary to-transparent mt-4" />
          </div>

          {/* Steps — vertical on mobile, horizontal grid on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {studyAbroadData.admissionProcess.items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4">
                {/* Number badge with connecting line on desktop */}
                <div className="relative flex items-center justify-center w-full">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary font-bold text-base flex items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-accent/20">
                    {idx + 1}
                  </div>
                  {/* Connector line — hidden on mobile, visible on md */}
                  {idx < studyAbroadData.admissionProcess.items.length - 1 && (
                    <div className="hidden md:block absolute left-[calc(50%+24px)] right-0 top-1/2 -translate-y-1/2 h-px border-t border-dashed border-white/20" />
                  )}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — What's Included */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
            {tData("whatsIncluded")}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Visa Support */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-white font-semibold text-lg">{studyAbroadData.visaSupport.title}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6 pl-[52px]">{studyAbroadData.visaSupport.description}</p>
            <ul className="space-y-3">
              {studyAbroadData.visaSupport.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Additional Services */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-white font-semibold text-lg">{studyAbroadData.additionalServices.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {studyAbroadData.additionalServices.items.map((item, idx) => {
                const Icon = additionalServiceIcons[idx] ?? BookOpen;
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`bg-white/5 border ${
                      isEven ? "border-accent/15" : "border-secondary/15"
                    } rounded-xl p-4 flex flex-col gap-3`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isEven ? "bg-accent/15" : "bg-secondary/15"
                    }`}>
                      <Icon className={`h-4 w-4 ${isEven ? "text-accent" : "text-secondary"}`} />
                    </div>
                    <span className="text-slate-300 text-xs leading-relaxed">{item}</span>
                  </div>
                );
              })}
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
