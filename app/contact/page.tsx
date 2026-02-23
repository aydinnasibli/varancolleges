import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import ContactForm from "@/components/sections/ContactForm";
import Map from "@/components/ui/Map";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-background-dark z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Contact Info */}
            <div className="space-y-12 animate-in slide-in-from-left duration-700">
              <div>
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                  Bizimlə <span className="text-accent">Əlaqə</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  Sualınız var? Bizimlə əlaqə saxlamaqdan çəkinməyin.
                  Komandamız sizə kömək etməkdən məmnunluq duyacaq.
                </p>
              </div>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-lg shadow-black/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-accent transition-colors">Ünvan</h3>
                    <p className="text-slate-400 leading-relaxed">
                      137A Samad Vurgun,<br/>
                      Baku 1022, Azerbaijan
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-lg shadow-black/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-accent transition-colors">Telefon</h3>
                    <p className="text-slate-400 leading-relaxed">
                      <a href="tel:+994771885050" className="hover:text-accent transition-colors block mb-1">+994 77 188 50 50</a>
                    </p>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Bazar ertəsi - Şənbə, 09:00 - 18:00</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-lg shadow-black/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-accent transition-colors">Email</h3>
                    <p className="text-slate-400 leading-relaxed break-all">
                      <a href="mailto:info@varancolleges.com" className="hover:text-accent transition-colors">info@varancolleges.com</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-lg font-serif text-white mb-6">Sosial Media Hesablarımız</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/varancollegesltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="https://wa.me/994771885050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary hover:scale-110 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative animate-in slide-in-from-right duration-700 delay-200">
               {/* Decorative blob behind form */}
               <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-2xl -z-10 opacity-30"></div>

               <div className="relative">
                  <ContactForm />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-background-dark/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif text-white mb-8 text-center">Bizi Xəritədə Tapın</h2>
            <Map />
        </div>
      </section>

      <Footer />
    </main>
  );
}
