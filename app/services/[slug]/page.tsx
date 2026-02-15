import { servicesData } from "@/lib/services-data";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, CheckCircle2, Clock, CalendarDays, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ApplicationModal } from "@/components/ui/ApplicationModal";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Modern Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-40 scale-105 animate-pulse-slow"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
             <Link href="/services" className="inline-flex items-center text-accent/80 hover:text-accent mb-4 transition-colors text-sm font-medium tracking-wide uppercase">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Xidmətlərə qayıt
             </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl border-l-2 border-accent pl-6">
              {service.description}
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <ApplicationModal>
                <Button size="lg" variant="accent" className="text-lg px-8 py-6 rounded-full shadow-[0_0_30px_-5px_var(--accent)] hover:shadow-[0_0_50px_-10px_var(--accent)] transition-all duration-300">
                  Müraciət et
                </Button>
              </ApplicationModal>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all">
                Ödənişsiz Konsultasiya
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-slate-500">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Quick Stats / Highlights */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { icon: Clock, label: "Müddət", value: "Fərdi Plan" },
              { icon: CalendarDays, label: "Dərslər", value: "Həftədə 2-3 dəfə" },
              { icon: Award, label: "Nəticə", value: "Zəmanətli" },
              { icon: CheckCircle2, label: "Sınaq", value: "Ödənişsiz" },
            ].map((stat, i) => (
              <div key={i} className="py-8 px-6 flex items-center justify-center md:justify-start gap-4 group hover:bg-white/5 transition-colors cursor-default">
                <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                  <p className="text-lg text-white font-serif">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Sidebar / Navigation (Sticky) */}
            <div className="hidden lg:block col-span-3">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-white font-serif text-xl mb-6">Mündəricat</h3>
                  <ul className="space-y-4 text-sm text-slate-400 border-l border-white/10 pl-4">
                    {["İmtahan Haqqında", "Format və Struktur", "Qiymətləndirmə", "Niyə Varan Colleges?", "Hazırlıq Prosesi"].map((item, i) => (
                      <li key={i}>
                        <a href={`#section-${i}`} className="hover:text-accent transition-colors block py-1 relative group">
                          <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-background-dark border border-white/10">
                  <h4 className="text-white font-serif text-lg mb-2">Sualınız var?</h4>
                  <p className="text-slate-400 text-sm mb-6 font-light">
                    Mütəxəssislərimiz sizə kömək etməyə hazırdır.
                  </p>
                  <ApplicationModal>
                    <Button variant="accent" className="w-full">Əlaqə Saxlayın</Button>
                  </ApplicationModal>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="col-span-1 lg:col-span-9 space-y-24">

              {/* Exam Info */}
              <div id="section-0" className="scroll-mt-32">
                <span className="text-accent text-sm font-medium tracking-widest uppercase mb-3 block">Ümumi Məlumat</span>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">İmtahan Haqqında</h2>
                <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-light leading-loose">
                  <p>{service.content.examInfo}</p>
                </div>
              </div>

              {/* Format & Grading Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div id="section-1" className="glass-card p-8 rounded-2xl border border-white/5 scroll-mt-32 hover:border-accent/30 transition-colors duration-500">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-accent mb-6">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">Format və Struktur</h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {service.content.format}
                  </p>
                </div>
                <div id="section-2" className="glass-card p-8 rounded-2xl border border-white/5 scroll-mt-32 hover:border-accent/30 transition-colors duration-500">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-accent mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">Qiymətləndirmə</h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {service.content.grading}
                  </p>
                </div>
              </div>

              {/* Why Us */}
              <div id="section-3" className="relative py-12 px-8 md:px-12 rounded-3xl overflow-hidden scroll-mt-32">
                <div className="absolute inset-0 bg-accent/5 backdrop-blur-sm border border-accent/10"></div>
                <div className="relative z-10">
                   <h2 className="text-3xl font-serif text-white mb-6">Niyə Varan Colleges?</h2>
                   <p className="text-slate-300 text-lg leading-relaxed font-light mb-8">
                     {service.content.whyUs}
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Peşəkar Müəllim Heyəti", "Fərdi Yanaşma", "Müasir Metodika", "Zəmanətli Nəticə"].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-200">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Process */}
              <div id="section-4" className="scroll-mt-32">
                 <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">Hazırlıq Prosesi</h2>
                 <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-[2px] before:bg-white/5">
                    {[
                      { title: "Diaqnostik Qiymətləndirmə", desc: "İlkin səviyyənizin müəyyən edilməsi və hədəflərin qoyulması." },
                      { title: "Fərdi Plan", desc: "Zəif və güclü tərəflərinizə uyğun xüsusi dərs proqramının hazırlanması." },
                      { title: "İntensiv Tədris", desc: service.content.preparationProcess },
                      { title: "Sınaq İmtahanları", desc: "Real imtahan mühitində mütəmadi yoxlamalar və nəticələrin analizi." },
                      { title: "Hədəfə Çat", desc: "İmtahan günü üçün psixoloji hazırlıq və uğurlu nəticə." }
                    ].map((step, i) => (
                      <div key={i} className="relative pl-16 group">
                         <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background-dark border border-white/10 flex items-center justify-center text-sm font-serif font-bold text-accent group-hover:border-accent transition-colors z-10 shadow-[0_0_15px_-5px_black]">
                           {i + 1}
                         </div>
                         <h3 className="text-xl text-white font-medium mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                         <p className="text-slate-400 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Gələcəyinizi Bizimlə Planlayın</h2>
              <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">
                Peşəkar komandamız sizə ən uyğun təhsil yolunu seçməkdə kömək edəcək. İlk konsultasiya tamamilə ödənişsizdir.
              </p>
            </div>
            <div className="flex-shrink-0">
              <ApplicationModal>
                <Button size="lg" variant="accent" className="h-16 px-10 text-lg rounded-full shadow-2xl shadow-black/50">
                  Müraciət et
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
