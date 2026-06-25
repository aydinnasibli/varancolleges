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

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-[52px] gap-4">
          <h2 className="font-serif text-4xl md:text-[56px] font-bold text-navy leading-none">
            {tServices("heroTitle") || "Our Programs"}
          </h2>
          <Link
            href="/services"
            className="shrink-0 bg-transparent border-[1.5px] border-border cursor-pointer px-7 py-[11px] rounded text-[13px] font-semibold text-navy hover:border-navy transition-colors whitespace-nowrap"
          >
            {tServices("services") || "View All"} →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {homeServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="bg-white px-9 py-10 flex flex-col min-h-[190px] hover:bg-surface transition-colors group"
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-text-faint uppercase mb-[18px]">
                {tData.has(`${service.slug}.category`) ? tData(`${service.slug}.category`) : "Program"}
              </p>
              <h3 className="font-serif text-[28px] font-bold text-navy leading-[1.1] flex-1 group-hover:text-navy-light transition-colors">
                {getTitle(service)}
              </h3>
              <div className="mt-6 w-6 h-[1.5px] bg-border"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
