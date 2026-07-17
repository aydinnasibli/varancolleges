import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import ContactForm from "@/components/sections/ContactForm";
import Map from "@/components/ui/Map";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const tContact = await getTranslations({ locale, namespace: 'Contact' });
  const canonical = locale === 'az' ? 'https://www.varancolleges.com/contact' : `https://www.varancolleges.com/${locale}/contact`;
  const title = t('contact');
  const description = tContact('heroDesc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
    alternates: {
      canonical,
      languages: {
        'x-default': 'https://www.varancolleges.com/contact',
        'az': 'https://www.varancolleges.com/contact',
        'en': 'https://www.varancolleges.com/en/contact',
      }
    }
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tGen = await getTranslations("General");

  return (
    <main className="min-h-screen bg-white text-navy font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Contact Info */}
            <div className="space-y-10 animate-in slide-in-from-left duration-700">
              <div>
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                  {t("title1")} <span className="text-white/80">{t("title2")}</span>
                </h1>
                <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                  {t("heroDesc")}
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tGen("address")}</h3>
                    <p className="text-white/60 leading-relaxed">
                      137A Samad Vurgun,<br />
                      Baku 1022, Azerbaijan
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tGen("phone")}</h3>
                    <p className="text-white/60 leading-relaxed">
                      <a href="tel:+994771885050" className="hover:text-white transition-colors block mb-1">+994 77 188 50 50</a>
                    </p>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{tGen("workingHours")}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tGen("email")}</h3>
                    <p className="text-white/60 leading-relaxed break-all">
                      <a href="mailto:info@varancolleges.com" className="hover:text-white transition-colors">info@varancolleges.com</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6 border-t border-white/20">
                <h3 className="text-sm text-white/50 uppercase tracking-wider mb-4">{t("socialMedia")}</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/varancollegesltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/15 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/994771885050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/15 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="animate-in slide-in-from-right duration-700 delay-200">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-navy mb-8 text-center">{t("findUsOnMap")}</h2>
          <Map />
        </div>
      </section>

      <Footer />
    </main>
  );
}
