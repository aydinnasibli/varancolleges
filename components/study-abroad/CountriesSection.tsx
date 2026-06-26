import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStudyAbroadData } from "@/lib/data/study-abroad";
import { getTranslations } from "next-intl/server";

const CountriesSection = async ({ locale }: { locale: string }) => {
  const studyAbroadData = await getStudyAbroadData(locale);
  const tServicesPage = await getTranslations({ locale, namespace: "ServicesPage" });

  return (
    <section className="py-16 relative overflow-hidden bg-surface">
      <svg
        viewBox="0 0 400 400"
        className="absolute right-[-100px] top-[-50px] w-[300px] h-[300px] opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" fill="none" className="text-navy" />
        <ellipse cx="200" cy="200" rx="160" ry="30" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-navy" />
        <ellipse cx="200" cy="200" rx="80" ry="160" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-navy" />
        <ellipse cx="200" cy="200" rx="130" ry="160" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-navy" />
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-navy-light text-xs font-bold tracking-[0.25em] uppercase mb-3">
            {tServicesPage("destinations") || "Destinations"}
          </h2>
          <h3 className="text-3xl md:text-4xl font-sans font-extrabold text-navy tracking-tight">
            {tServicesPage("worldIsYourCampus")}
          </h3>
          <div className="w-12 h-0.5 bg-navy mx-auto mt-6 opacity-30"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {studyAbroadData.countries.map((country, index) => {
            return (
              <Link
                key={index}
                href={`/study-abroad/${country.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[3/2] cursor-pointer block"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-navy">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-50"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <h3 className="text-xl font-serif text-white mb-1 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    {country.name}
                  </h3>
                  <p className="text-white/70 text-xs font-light opacity-0 group-hover:opacity-80 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 line-clamp-1">
                    {country.description}
                  </p>
                  <div className="w-8 h-[1px] bg-navy-light mt-3 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
