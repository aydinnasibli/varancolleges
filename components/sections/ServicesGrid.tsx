"use client";

import {
  Languages,
  BookOpen,
  Calculator,
  Mic,
  TrendingUp,
  Globe,
  GraduationCap,
  Scroll,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { servicesData } from "@/lib/services-data";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
  const t = useTranslations("ServicesPage");
  const tData = useTranslations("ServicesData");

  const featured = servicesData.slice(0, 2);
  const rest = servicesData.slice(2);

  const getTitle = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.title`) ? tData(`${service.slug}.title`) : service.title;

  const getDesc = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.description`) ? tData(`${service.slug}.description`) : service.description;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-10 bg-accent"></div>
              <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">
                {t("academicDevelopment")}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
              {t("languageCourses")}
            </h2>
          </div>
          <p className="text-slate-400 text-base leading-relaxed font-light max-w-sm border-l border-white/10 pl-6">
            {t("coursesDesc")}
          </p>
        </div>

        {/* ── FEATURED CARDS (1 + 1) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featured.map((service, index) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || BookOpen;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl min-h-[420px] flex flex-col justify-end cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.heroImage}
                    alt={getTitle(service)}
                    fill
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay: top is transparent, bottom is dark */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e] via-[#060e1e]/60 to-transparent"></div>
                  {/* Gold accent border on hover */}
                  <div className="absolute inset-0 border border-white/5 group-hover:border-accent/30 rounded-2xl transition-colors duration-500 pointer-events-none z-10"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10">
                  {/* Number badge */}
                  <div className="absolute top-8 left-10 text-6xl font-serif text-white/10 group-hover:text-accent/20 transition-colors duration-500 leading-none select-none">
                    {["I", "II"][index]}
                  </div>

                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-accent/40 flex items-center justify-center text-accent/70 group-hover:text-accent transition-all duration-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-accent/70 transition-colors">
                      {tData("details")}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight mb-3 tracking-tight">
                    {getTitle(service)}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-light max-w-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {getDesc(service)}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 group-hover:text-accent transition-colors duration-300">
                    <span className="tracking-wide">{tData("details")}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── GLASS CARD GRID (remaining services) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rest.map((service) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || BookOpen;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="glass-card p-8 rounded-xl group relative overflow-hidden block"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Icon className="w-24 h-24 text-white" />
                </div>

                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 text-accent">
                  <Icon className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-serif text-white mb-3">
                  {getTitle(service)}
                </h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light min-h-[60px]">
                  {getDesc(service)}
                </p>

                <div className="inline-flex items-center text-sm font-medium text-accent hover:text-white transition-colors uppercase tracking-wider">
                  {tData("details")}
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;
