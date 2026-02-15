import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95">
             <Image
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9_nE0QdxBZUviHeVSyuwfsGUBIQA4ffD7Rmj7UfFh6wX90Pom06l6Sk8zalGCGNSkEcP0YT7IHGFAmjIG5Ejg0_wZUMIE8unx5GkhKQeYj2ihm8DslFwNW38a-65g3tnL0b2G762LPILq50zNVkhQMY9X3uF0YejTMQykWD56O6IM6LRk-k1g7xLQ2UhLSy9cANKvvQw3pCBPKrYhqWU5Oq9nLWOi9haSC1RcXtm5QE2y6CSLicTy0bEsUYAYj4Q9lk9NQQ_--b2h"
               className="object-cover opacity-20 mix-blend-overlay"
               fill
               alt="Contact Hero Background"
               priority
             />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                Əlaqə
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Suallarınız var? Bizimlə əlaqə saxlayın və ya ofisimizə yaxınlaşın. Sizi eşitməkdən məmnun olarıq.
            </p>
            <div className="mt-12 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
                <Link href="/" className="hover:text-white transition-colors">Ana Səhifə</Link>
                <span className="text-accent">•</span>
                <span className="text-white">Əlaqə</span>
            </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </main>
  );
}
