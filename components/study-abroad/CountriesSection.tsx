import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStudyAbroadData } from "@/lib/data/study-abroad";
import { getTranslations } from "next-intl/server";

const CountriesSection = async ({ locale }: { locale: string }) => {
  const studyAbroadData = await getStudyAbroadData(locale);
  const tServicesPage = await getTranslations({ locale, namespace: "ServicesPage" });

  return (
    <section className="py-24 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-16">
          {tServicesPage("worldIsYourCampus")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyAbroadData.countries.map((country, index) => {
            return (
              <Link
                key={index}
                href={`/study-abroad/${country.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer block"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-background-dark">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent" />
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <h3 className="text-3xl font-serif text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {country.name}
                  </h3>
                  <p className="text-slate-300 font-light opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {country.description}
                  </p>
                  <div className="w-12 h-1 bg-accent mt-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100" />
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
