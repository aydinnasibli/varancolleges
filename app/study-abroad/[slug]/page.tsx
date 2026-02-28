import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { studyAbroadData } from "@/lib/data/study-abroad";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/study-abroad/CTASection";
import { getCountryFaqs } from "@/lib/data/faqs";
import FAQAccordion from "@/components/sections/FAQAccordion";

export default async function CountryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const country = studyAbroadData.countries.find((c) => c.slug === params.slug);

  if (!country) {
    notFound();
  }

  const faqs = getCountryFaqs(params.slug);

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={country.flagUrl}
            alt={`${country.name} background`}
            fill
            className="object-cover opacity-20 blur-sm scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/80 to-background-dark" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Link
            href="/study-abroad"
            className="inline-flex items-center text-slate-400 hover:text-accent mb-8 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Geri qayıt
          </Link>

          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            {country.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto">
            {country.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl font-serif text-white mb-12 flex items-center gap-4">
                <MapPin className="w-8 h-8 text-accent" />
                Təhsil <span className="text-accent italic">İmkanları</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {country.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300 group border border-white/5 hover:border-accent/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-accent group-hover:text-background-dark transition-all duration-300">
                      <span className="text-accent font-serif text-lg group-hover:text-background-dark transition-colors duration-300">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-slate-300 group-hover:text-white transition-colors duration-300 text-lg font-light leading-relaxed pt-1.5">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="py-24 bg-background-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center mb-16 gap-6 text-center">
              <div className="max-w-2xl">
                <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">Sual-Cavab</h2>
                <h3 className="text-4xl font-serif text-white mb-6">Tez-tez Verilən Suallar</h3>
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </main>
  );
}
