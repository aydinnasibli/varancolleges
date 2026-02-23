import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95">
          <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Əlaqə
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Suallarınız var? Bizimlə əlaqə saxlayın və ya ofisimizə yaxınlaşın.
            Sizi eşitməkdən məmnun olarıq.
          </p>
          <div className="mt-12 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Səhifə
            </Link>
            <span className="text-accent">•</span>
            <span className="text-white">Əlaqə</span>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-20 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {/* Address */}
                <div className="bg-card p-8 rounded-2xl border border-white/5 text-center group hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-serif text-white mb-4">Ünvan</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        137A Samad Vurgun,<br/>
                        Baku 1022, Azerbaijan
                    </p>
                </div>

                {/* Phone */}
                <div className="bg-card p-8 rounded-2xl border border-white/5 text-center group hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-serif text-white mb-4">Telefon</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        <a href="tel:+994771885050" className="hover:text-accent transition-colors">+994 77 188 50 50</a>
                    </p>
                </div>

                {/* Email */}
                <div className="bg-card p-8 rounded-2xl border border-white/5 text-center group hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300">
                        <Mail className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-4">Email</h3>
                    <p className="text-slate-400 leading-relaxed text-sm break-all">
                        <a href="mailto:info@varancolleges.com" className="hover:text-accent transition-colors">info@varancolleges.com</a>
                    </p>
                </div>

                 {/* Social Media */}
                 <div className="bg-card p-8 rounded-2xl border border-white/5 text-center group hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-serif text-white mb-4">Sosial Media</h3>
                    <div className="flex justify-center gap-6 items-center">
                        <a
                            href="https://www.instagram.com/varancollegesltd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform hover:scale-110 duration-300"
                            aria-label="Instagram"
                        >
                            <InstagramIcon className="w-8 h-8" />
                        </a>
                        <a
                            href="https://wa.me/994771885050"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform hover:scale-110 duration-300"
                            aria-label="WhatsApp"
                        >
                            <WhatsAppIcon className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">Biz sizə zəng edək</h2>
                    <p className="text-slate-400">Əlaqə məlumatlarınızı qeyd edin, ən qısa zamanda sizinlə əlaqə saxlayaq.</p>
                </div>
                <ContactForm />
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
