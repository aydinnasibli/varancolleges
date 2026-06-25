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

const getCategory = (slug: string, tData: ReturnType<typeof useTranslations>) =>
  tData.has(`${slug}.category`) ? tData(`${slug}.category`) : slug;


const ServicesGrid = () => {
  const t = useTranslations("ServicesPage");
  const tData = useTranslations("ServicesData");

  const getTitle = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.title`) ? tData(`${service.slug}.title`) : service.title;

  const getDesc = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.description`) ? tData(`${service.slug}.description`) : service.description;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="bg-white p-10 hover:bg-surface transition-colors cursor-pointer group block"
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-faint block mb-3">
                {getCategory(service.slug, tData)}
              </span>
              <h3 className="text-2xl font-serif text-navy mb-3">
                {getTitle(service)}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light mb-6">
                {getDesc(service)}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-navy-light group-hover:text-navy transition-colors">
                {tData("details")} <span className="ml-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
