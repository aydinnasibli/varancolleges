import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getStudyAbroadData } from "@/lib/data/study-abroad";
import { getTranslations } from "next-intl/server";

const CountriesSection = async ({ locale }: { locale: string }) => {
  const studyAbroadData = await getStudyAbroadData(locale);
  const tServicesPage = await getTranslations({ locale, namespace: "ServicesPage" });
  const tData = await getTranslations({ locale, namespace: "StudyAbroadData" });

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-[0.2em] uppercase text-sm block mb-3">
            {tData("exploreDestinations")}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            {tServicesPage("worldIsYourCampus")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyAbroadData.countries.map((country, index) => {
            const isEven = index % 2 === 0;
            const accentClass = isEven ? "border-t-accent/50" : "border-t-secondary/50";
            const badgeClass = isEven
              ? "bg-accent/15 text-accent border-accent/20"
              : "bg-secondary/15 text-secondary border-secondary/20";
            const ctaClass = isEven
              ? "text-accent hover:text-white group-hover:bg-accent/10"
              : "text-secondary hover:text-white group-hover:bg-secondary/10";

            return (
              <Link
                key={index}
                href={`/study-abroad/${country.slug}`}
                className={`group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 border-t-2 ${accentClass} bg-white/5 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 cursor-pointer`}
              >
                {/* Flag image banner */}
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent" />
                  {/* Country name badge at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <h3 className="text-2xl font-serif text-white font-medium drop-shadow-md">
                      {country.name}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeClass} backdrop-blur-sm`}>
                      {country.slug.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    {country.description}
                  </p>

                  {/* Features — show first 2 */}
                  <ul className="space-y-1.5 flex-1">
                    {country.features.slice(0, 2).map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${isEven ? "text-accent" : "text-secondary"}`} />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                    {country.features.length > 2 && (
                      <li className="text-xs text-slate-500 pl-5">
                        +{country.features.length - 2} {tData("moreFeatures")}
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-sm font-medium transition-colors pt-1 ${ctaClass}`}>
                    {tData("exploreCountry")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
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
