import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Stats from "@/components/sections/Stats";
import Advantages from "@/components/sections/Advantages";
import Map from "@/components/ui/Map";
import Link from "next/link";
import { ArrowRight, Target, Lightbulb, CheckCircle } from "lucide-react";

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

      {/* Mission & Vision Section (New) */}
      <section className="py-20 bg-background-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-accent/20 hover:to-primary/20 transition-all duration-500">
              <div className="bg-[#0a0f18] h-full p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Target className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">
                    Missiyamız
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    VaranColleges olaraq missiyamız, gənclərin akademik və
                    peşəkar inkişafına dəstək olaraq, onların dünya səviyyəsində
                    rəqabətədavamlı kadr kimi yetişməsini təmin etməkdir. Biz
                    hər bir tələbənin potensialını üzə çıxarmaq üçün çalışırıq.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-accent/20 hover:to-primary/20 transition-all duration-500">
              <div className="bg-[#0a0f18] h-full p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Lightbulb className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">
                    Vizyonumuz
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Təhsildə innovativ yanaşmalar tətbiq edərək, Azərbaycanın ən
                    qabaqcıl və etibarlı təhsil mərkəzi olmaq. Tələbələrimizə
                    qlobal dünyanın qapılarını açmaq və onların uğur
                    hekayələrinin bir hissəsi olmaq.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section (Redesigned - Centered Layout) */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Centered Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[120px] -z-10 rounded-full"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6 border border-accent/20">
            Haqqımızda
          </div>

          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-8">
            Biz Kimik?
          </h2>

          <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
            <p>
              VaranColleges, Azərbaycanda təhsil sahəsində keyfiyyət və
              yenilikçilik standartlarını müəyyən edən aparıcı təhsil
              mərkəzidir. İllərdir ki, tələbələrimizə həm yerli, həm də
              beynəlxalq səviyyədə uğur qazanmaq üçün lazım olan bilik və
              bacarıqları təqdim edirik.
            </p>
            <p>
              Təcrübəli müəllim heyətimiz, müasir tədris metodlarımız və fərdi
              yanaşmamızla hər bir tələbənin potensialını maksimum dərəcədə
              üzə çıxarmağı hədəfləyirik. Biz sadəcə dərs keçmirik, biz
              gələcəyin liderlərini yetişdiririk.
            </p>
          </div>

          <div className="bg-[#0a0f18]/50 border border-white/5 rounded-2xl p-8 mb-12 backdrop-blur-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {[
                "Peşəkar Müəllim Heyəti",
                "Müasir Tədris Metodikası",
                "Fərdi İnkişaf Proqramları",
                "Beynəlxalq Sertifikatlar",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-slate-300 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-accent text-background-dark font-medium rounded-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20 group"
          >
            Bizimlə Əlaqə
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Advantages />

      {/* Map Section */}
      <section className="py-20 bg-background-dark border-t border-white/5">
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
