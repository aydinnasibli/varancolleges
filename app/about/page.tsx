import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Stats from "@/components/sections/Stats";
import Map from "@/components/ui/Map";
import Link from "next/link";
import { ArrowRight, CheckCircle, Quote } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-background-dark z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9_nE0QdxBZUviHeVSyuwfsGUBIQA4ffD7Rmj7UfFh6wX90Pom06l6Sk8zalGCGNSkEcP0YT7IHGFAmjIG5Ejg0_wZUMIE8unx5GkhKQeYj2ihm8DslFwNW38a-65g3tnL0b2G762LPILq50zNVkhQMY9X3uF0YejTMQykWD56O6IM6LRk-k1g7xLQ2UhLSy9cANKvvQw3pCBPKrYhqWU5Oq9nLWOi9haSC1RcXtm5QE2y6CSLicTy0bEsUYAYj4Q9lk9NQQ_--b2h')] bg-cover bg-center opacity-10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight animate-in slide-in-from-bottom duration-700 fade-in">
            Haqqımızda
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom duration-700 delay-100 fade-in">
            Biz sadəcə bir təhsil mərkəzi deyilik, biz gələcəyinizi inşa edən
            tərəfdaşıq. <span className="text-accent">VaranColleges</span> ilə
            arzularınızın sərhədlərini aşın.
          </p>
        </div>
      </section>

      <Stats />

      {/* Main Content Section (Redesigned - Split Layout) */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column: Title & Key Statement */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="inline-flex items-center px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-8 border border-accent/20">
                  <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                  Biz Kimik?
                </div>

                <h2 className="text-4xl lg:text-6xl font-serif text-white mb-8 leading-tight">
                  Təhsildə Yeni <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#b38728]">
                    Standartlar
                  </span>
                </h2>

                <div className="relative p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-24 h-24 text-accent" />
                  </div>
                  <Quote className="w-8 h-8 text-accent mb-4 opacity-80" />
                  <p className="text-xl text-slate-200 font-serif italic leading-relaxed relative z-10">
                    &quot;Hədəfimiz sadəcə bilik vermək deyil, tələbələrimizə
                    dünyanı dəyişdirə biləcək potensiallarını kəşf
                    etdirməkdir.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Content */}
            <div className="space-y-8 pt-4 lg:pt-0">
              <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">
                    VaranColleges
                  </strong>
                  , Azərbaycanda təhsil sahəsində keyfiyyət və yenilikçilik
                  standartlarını müəyyən edən aparıcı təhsil mərkəzidir.
                  İllərdir ki, tələbələrimizə həm yerli, həm də beynəlxalq
                  səviyyədə uğur qazanmaq üçün lazım olan bilik və bacarıqları
                  təqdim edirik.
                </p>
                <p>
                  Təcrübəli müəllim heyətimiz, müasir tədris metodlarımız və
                  fərdi yanaşmamızla hər bir tələbənin potensialını maksimum
                  dərəcədə üzə çıxarmağı hədəfləyirik. Biz sadəcə dərs keçmirik,
                  biz gələcəyin liderlərini yetişdiririk.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Peşəkar Müəllim Heyəti",
                  "Müasir Tədris Metodikası",
                  "Fərdi İnkişaf Proqramları",
                  "Beynəlxalq Sertifikatlar",
                  "Qlobal Əməkdaşlıqlar",
                  "Karyera Dəstəyi",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-slate-300 bg-white/5 rounded-lg p-4 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
                  >
                    <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-accent text-background-dark font-medium rounded-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20 group w-full sm:w-auto justify-center"
                >
                  Bizimlə Əlaqə
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-background-dark border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Bizi Ziyarət Edin
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Ofisimizə yaxınlaşın, gələcəyiniz haqqında danışaq.
            </p>
          </div>
          <Map />
        </div>
      </section>

      <Footer />
    </main>
  );
}
