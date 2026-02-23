import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Stats from "@/components/sections/Stats";
import Advantages from "@/components/sections/Advantages";
import Map from "@/components/ui/Map";
import Link from "next/link";
import Image from "next/image";
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

      {/* Main Content Section (Redesigned) */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-primary/10 blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
                Haqqımızda
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-6">
                Biz Kimik?
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                VaranColleges, Azərbaycanda təhsil sahəsində keyfiyyət və
                yenilikçilik standartlarını müəyyən edən aparıcı təhsil
                mərkəzidir. İllərdir ki, tələbələrimizə həm yerli, həm də
                beynəlxalq səviyyədə uğur qazanmaq üçün lazım olan bilik və
                bacarıqları təqdim edirik.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Təcrübəli müəllim heyətimiz, müasir tədris metodlarımız və fərdi
                yanaşmamızla hər bir tələbənin potensialını maksimum dərəcədə
                üzə çıxarmağı hədəfləyirik. Biz sadəcə dərs keçmirik, biz
                gələcəyin liderlərini yetişdiririk.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Peşəkar Müəllim Heyəti",
                  "Müasir Tədris Metodikası",
                  "Fərdi İnkişaf Proqramları",
                  "Beynəlxalq Sertifikatlar",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-slate-300">
                    <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-accent text-background-dark font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                Bizimlə Əlaqə
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
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
