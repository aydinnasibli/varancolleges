import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  BookOpen,
  Globe,
  GraduationCap,
  Calculator,
  Languages,
  Mic,
  BarChart2,
  Flag,
  BookMarked,
  Award,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { servicesData } from "@/lib/services-data";
import { LucideIcon } from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  sat: Calculator,
  ielts: Languages,
  gmat: BarChart2,
  toefl: Mic,
  yos: Flag,
  gre: BookMarked,
  ab: GraduationCap,
  ib: Award,
  "general-english": MessageCircle,
};

const HomeFeatures = () => {
  const tServices = useTranslations("ServicesPage");
  const tStudyAbroad = useTranslations("StudyAbroad");
  const tData = useTranslations("ServicesData");

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">
            {tServices("borderlessEducation") || "Borderless Education"}
          </p>
          <h3 className="text-4xl font-serif text-white">
            {tServices("heroTitle") || "Our Services"}
          </h3>
        </div>

        {/* Study Abroad — Featured full-width card */}
        <div className="mb-5 group relative rounded-2xl overflow-hidden h-60 md:h-72 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07101e]/95 via-[#07101e]/65 to-transparent" />
          <div className="relative h-full flex items-center px-8 md:px-12">
            <div className="max-w-lg">
              <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-[#07101e] transition-all duration-300 text-accent">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-2xl md:text-3xl font-serif text-white mb-3 group-hover:text-accent transition-colors drop-shadow">
                {tStudyAbroad("title") || "Study Abroad Services"}
              </h4>
              <p className="text-slate-300 text-sm md:text-base mb-6 font-light max-w-md leading-relaxed drop-shadow-sm">
                {tStudyAbroad("heroDesc") ||
                  "Guiding students to universities in the USA, Canada, Australia, Europe, and Turkey."}
              </p>
              <Link
                href="/study-abroad"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent/10 border border-accent/30 backdrop-blur-sm rounded-lg text-sm font-medium text-accent hover:bg-accent hover:text-[#07101e] transition-all uppercase tracking-wider"
              >
                {tStudyAbroad("title") || "Study Abroad"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* All exam prep services — dynamic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {servicesData.map((service) => {
            const Icon = serviceIcons[service.slug] ?? BookOpen;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-start gap-4 bg-[#0c1d35] border border-white/[0.07] hover:border-accent/40 rounded-xl p-5 transition-all duration-300 hover:bg-[#112244]"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#07101e] transition-all duration-300 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white mb-1.5 group-hover:text-accent transition-colors text-sm leading-snug">
                    {tData(`${service.slug}.title`)}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {tData(`${service.slug}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-medium text-slate-500 group-hover:text-accent transition-colors uppercase tracking-wider">
                    {tData("details")}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="rounded-2xl p-px bg-gradient-to-r from-transparent via-accent/25 to-transparent overflow-hidden">
          <div className="w-full bg-[#07101e] rounded-2xl px-6 md:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-5 hover:bg-[#0c1d35] transition-colors duration-500">
            <div className="flex items-center gap-5">
              <div className="w-11 h-11 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-white mb-0.5">
                  {tServices("languageCourses") || "Language Courses & Exam Prep"}
                </h4>
                <p className="text-slate-400 text-sm font-light">
                  {tServices("coursesDesc") || "Professional programs to improve your skills."}
                </p>
              </div>
            </div>
            <Link
              href="/services"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-[#07101e] font-semibold rounded-lg hover:bg-accent-light transition-all shadow-lg uppercase tracking-widest text-sm w-full md:w-auto"
            >
              {tServices("services") || "View All Services"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeFeatures;
