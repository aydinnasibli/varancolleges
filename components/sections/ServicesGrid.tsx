import {
  ArrowRight,
  Languages,
  BookOpen,
  Calculator,
  Mic,
  TrendingUp,
  Globe,
  GraduationCap,
  Scroll,
  Award
} from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/lib/services-data";

const iconMap = {
  sat: Calculator,
  ielts: Languages,
  gmat: TrendingUp,
  toefl: Globe,
  yos: GraduationCap,
  gre: BookOpen,
  ab: Scroll,
  ib: Award,
  "general-english": Mic,
};

const ServicesGrid = () => {
  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">Akademik İnkişaf</h2>
            <h3 className="text-4xl font-serif text-white">Dil Kursları və İmtahanlar</h3>
          </div>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed text-right md:text-left">
            Beynəlxalq sertifikatlar və xarici dil biliklərinizi təkmilləşdirmək üçün peşəkar proqramlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || BookOpen;

            return (
              <div key={index} className="glass-card p-8 rounded-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Icon className="w-24 h-24 text-white" />
                </div>

                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 text-accent">
                  <Icon className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-serif text-white mb-3">{service.title}</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light min-h-[60px]">
                  {service.description}
                </p>

                <Link href={`/services/${service.slug}`} className="inline-flex items-center text-sm font-medium text-accent hover:text-white transition-colors uppercase tracking-wider">
                  Ətraflı
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
