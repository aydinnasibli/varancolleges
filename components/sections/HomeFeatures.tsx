import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { servicesData } from "@/lib/services-data";

const HomeFeatures = () => {
  const tServices = useTranslations("ServicesPage");
  const tData = useTranslations("ServicesData");

  const homeServices = servicesData.slice(0, 6);

  const getTitle = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.title`) ? tData(`${service.slug}.title`) : service.title;

  const getCategory = (service: typeof servicesData[0]) =>
    tData.has(`${service.slug}.category`) ? tData(`${service.slug}.category`) : "";

  return (
    <section className="section-padding bg-white border-t border-border">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-text-muted uppercase mb-3">
              {tServices("academicDevelopment")}
            </p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-navy leading-[1.05]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {homeServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="bg-white px-7 py-8 flex flex-col min-h-[180px] hover:bg-surface transition-colors group"
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-text-muted uppercase mb-4">
                {getCategory(service)}
              </p>
              <h3 className="font-serif text-[24px] font-bold text-navy leading-[1.15] flex-1 group-hover:text-navy-light transition-colors">
                {getTitle(service)}
              </h3>
              <div className="mt-5 flex items-center text-[12px] font-semibold text-navy-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
