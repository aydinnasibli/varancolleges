import { Link } from "@/i18n/routing";
import { ArrowRight, Languages, Calculator, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { servicesData } from "@/lib/services-data";

const highlightIcons: Record<string, typeof Calculator> = {
  sat: Calculator,
  ielts: Languages,
  gmat: TrendingUp,
};

const HomeFeatures = () => {
  const tServices = useTranslations("ServicesPage");
  const tData = useTranslations("ServicesData");

  const highlights = servicesData.slice(0, 3);

  const getTitle = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.title`) ? tData(`${service.slug}.title`) : service.title;

  const getDesc = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.description`) ? tData(`${service.slug}.description`) : service.description;

  const getCategory = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.category`) ? tData(`${service.slug}.category`) : "";

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-border">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-text-muted uppercase mb-3">
              {tServices("academicDevelopment")}
            </p>
            <h2 className="font-sans text-3xl md:text-[40px] font-extrabold text-navy leading-[1.1] tracking-tight">
              {tServices("heroTitle")}
            </h2>
          </div>
          <Link
            href="/services"
            className="shrink-0 border border-border px-6 py-2.5 rounded-md text-[13px] font-semibold text-navy hover:border-navy/25 transition-colors whitespace-nowrap"
          >
            {tServices("services")} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((service) => {
            const Icon = highlightIcons[service.slug] || ArrowRight;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-xl bg-surface border border-border/60 p-8 hover:border-navy/15 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-navy/6 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-navy/60" />
                </div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-text-muted uppercase mb-2">
                  {getCategory(service)}
                </p>
                <h3 className="font-serif text-[22px] font-bold text-navy leading-[1.2] mb-3 group-hover:text-navy-light transition-colors">
                  {getTitle(service)}
                </h3>
                <p className="text-[14px] leading-[1.7] text-text-secondary line-clamp-2 mb-5">
                  {getDesc(service)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-light group-hover:gap-2.5 transition-all">
                  {tData("details")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
