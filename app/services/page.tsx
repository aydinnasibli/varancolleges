import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Contact from "@/components/sections/Contact";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Services Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95">
             <img
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9_nE0QdxBZUviHeVSyuwfsGUBIQA4ffD7Rmj7UfFh6wX90Pom06l6Sk8zalGCGNSkEcP0YT7IHGFAmjIG5Ejg0_wZUMIE8unx5GkhKQeYj2ihm8DslFwNW38a-65g3tnL0b2G762LPILq50zNVkhQMY9X3uF0YejTMQykWD56O6IM6LRk-k1g7xLQ2UhLSy9cANKvvQw3pCBPKrYhqWU5Oq9nLWOi9haSC1RcXtm5QE2y6CSLicTy0bEsUYAYj4Q9lk9NQQ_--b2h"
               className="w-full h-full object-cover opacity-20 mix-blend-overlay absolute inset-0"
               alt="Hero Background"
             />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                Xidmətlərimiz
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Keyfiyyətli təhsil və parlaq gələcək üçün ehtiyacınız olan hər şey bir ünvanda. VaranColleges olaraq hədəflərinizə çatmağınız üçün yanınızdayıq.
            </p>
            <div className="mt-12 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
                <Link href="/" className="hover:text-white transition-colors">Ana Səhifə</Link>
                <span className="text-accent">•</span>
                <span className="text-white">Xidmətlər</span>
            </div>
        </div>
      </section>

      <ServicesGrid />

      {/* Parallax / Divider Section */}
      <div
        className="h-64 md:h-96 w-full relative overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAfsuUczNweenZKGyfM3D2YPjROUD5C1GbSuBD6VEVeJPL__wON1KhxC4rNQVRFUkRm22b2rasb0n6eyFqPeSYGWH3SYKEI7vBmqZf1SDvav6oD-OQx42825V9QqIhJoGL-ATZFoO4oUpTrN_quNLx_a-k6Cipel0d7_3mKJyWS0lBDb__rjFoM5QZkTUqACiMYe_4kFgTmL8bQhntLNKWHj68hxtxyqIVbwjIaIyJIWm3s7VtGZ9lXrLsdhbqF2xHHMPzD4JuN5I0')" }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="text-center px-4">
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">Sərhədsiz Təhsil</h3>
                <p className="text-accent-light text-lg font-light tracking-wide">Dünya Sizin Kampusunuzdur</p>
            </div>
        </div>
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
