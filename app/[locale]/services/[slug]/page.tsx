import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { servicesData } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { Clock, CalendarDays, Award, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesData' });
  const tData = await getTranslations({ locale, namespace: `ServicesData.${slug}` });

  const canonical = locale === 'az' ? `https://www.varancolleges.com/services/${slug}` : `https://www.varancolleges.com/${locale}/services/${slug}`;

  // Use a fallback for the title since not all slugs might be in the translations yet (but we expect them to be)
  const title = tData('title') || 'VaranColleges';

  const description = tData('description') || '';
  const heroImage = servicesData.find(s => s.slug === slug)?.heroImage || '/images/varan-office.webp';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: heroImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': `https://www.varancolleges.com/services/${slug}`,
        'az': `https://www.varancolleges.com/services/${slug}`,
        'en': `https://www.varancolleges.com/en/services/${slug}`,
      }
    }
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { slug, locale } = await params;
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const t = await getTranslations({ locale, namespace: "ServicesData" });
  const tData = await getTranslations({ locale, namespace: `ServicesData.${slug}` });

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section — 58/42 split */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16">
            {/* Left side */}
            <div>
              {/* Breadcrumb */}
              <div className="mb-10 flex items-center gap-2 text-sm text-white/50 tracking-wide">
                <a href="/" className="hover:text-white transition-colors">{tNav("home")}</a>
                <span>/</span>
                <a href="/services" className="hover:text-white transition-colors">{tNav("services")}</a>
                <span>/</span>
                <span className="text-white">{tData("title")}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight">
                {tData("title")}
              </h1>
              <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl border-l-2 border-white/25 pl-[18px] mb-8">
                {tData("description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <ApplicationModal>
                  <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-white text-navy hover:bg-white/90 transition-all duration-300 font-medium">
                    {tNav("contact")}
                  </Button>
                </ApplicationModal>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all bg-transparent">
                  {t("freeConsultation")}
                </Button>
              </div>
            </div>

            {/* Right side — 2x2 stat grid */}
            <div className="grid grid-cols-2 border border-white/[0.07] rounded-lg overflow-hidden self-center">
              {[
                { label: t("duration"), value: t("personalPlan"), subtitle: t("duration") },
                { label: t("lessons"), value: t("twiceAWeek"), subtitle: t("lessons") },
                { label: t("result"), value: t("guaranteed"), subtitle: t("result") },
                { label: t("mockExam"), value: t("free"), subtitle: t("mockExam") },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 md:p-8 ${i % 2 === 0 ? "border-r border-white/[0.07]" : ""} ${i < 2 ? "border-b border-white/[0.07]" : ""}`}
                >
                  <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium mb-2">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-serif text-white mb-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content — Sidebar + Content (3fr + 5fr) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] gap-12 lg:gap-16">

            {/* Sidebar (sticky) */}
            <div className="hidden lg:block">
              <div className="sticky top-32 space-y-8">
                {/* Contents card */}
                <div className="border border-border rounded-xl p-6">
                  <h3 className="text-navy font-serif text-lg mb-5 pb-4 border-b border-border">{t("tableOfContents")}</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    {[t("generalInfo"), t("format"), t("grading"), t("whyUs"), t("process")].map((item, i) => (
                      <li key={i}>
                        <a href={`#section-${i}`} className="hover:text-navy-light transition-colors block py-1 pl-3 border-l-2 border-transparent hover:border-navy-light">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact CTA card */}
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h4 className="text-navy font-serif text-lg mb-2">{t("haveQuestion")}</h4>
                  <p className="text-text-secondary text-sm mb-6 font-light">
                    {t("expertsReady")}
                  </p>
                  <ApplicationModal>
                    <Button variant="accent" className="w-full bg-navy text-white hover:bg-navy-light">{t("contactUs")}</Button>
                  </ApplicationModal>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="space-y-20">

              {/* About the Exam */}
              <div id="section-0" className="scroll-mt-32">
                <span className="text-text-faint text-sm font-medium tracking-widest uppercase mb-3 block">{t("generalInfo")}</span>
                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-8">{t("aboutExam")}</h2>
                <div className="prose prose-lg max-w-none text-text-secondary font-light leading-loose">
                  <p>{tData("examInfo")}</p>
                </div>
              </div>

              {/* Format & Grading — 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="section-1" className="bg-surface p-8 rounded-xl border border-border scroll-mt-32">
                  <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center text-navy-light mb-5">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif text-navy mb-3">{t("format")}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">
                    {tData.has("format") ? tData("format") : tData("examInfo")}
                  </p>
                </div>
                <div id="section-2" className="bg-surface p-8 rounded-xl border border-border scroll-mt-32">
                  <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center text-navy-light mb-5">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif text-navy mb-3">{t("grading")}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">
                    {tData.has("grading") ? tData("grading") : tData("examInfo")}
                  </p>
                </div>
              </div>

              {/* Why Varan Colleges? — navy background card */}
              <div id="section-3" className="bg-navy rounded-xl p-8 md:p-12 scroll-mt-32">
                <h2 className="text-3xl font-serif text-white mb-4">{t("whyUs")}</h2>
                <p className="text-white/60 text-base leading-relaxed font-light mb-8">
                  {tData.has("whyUs") ? tData("whyUs") : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.raw("whyUsFeats")?.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className="w-5 h-5 text-white/60 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Process — numbered steps with timeline */}
              <div id="section-4" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-12">{t("process")}</h2>
                <div className="space-y-10 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-[2px] before:bg-border">
                  {t.raw("processSteps")?.map((step: any, i: number) => (
                    <div key={i} className="relative pl-14 group">
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-border flex items-center justify-center text-sm font-serif font-bold text-navy-light group-hover:border-navy-light transition-colors z-10">
                        {i + 1}
                      </div>
                      <h3 className="text-lg text-navy font-medium mb-1 group-hover:text-navy-light transition-colors">{step.title}</h3>
                      <p className="text-text-secondary text-sm font-light leading-relaxed">{step.desc || tData("preparationProcess")}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{t("ctaTitle")}</h2>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                {t("ctaDesc")}
              </p>
            </div>
            <div className="shrink-0">
              <ApplicationModal>
                <Button size="lg" variant="accent" className="h-14 px-10 text-lg rounded-full bg-white text-navy hover:bg-white/90">
                  {tNav("contact")}
                </Button>
              </ApplicationModal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
