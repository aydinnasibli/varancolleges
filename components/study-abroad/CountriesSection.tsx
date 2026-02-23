import { Check } from "lucide-react";

const countries = [
  {
    name: "ABŞ",
    flag: "🇺🇸",
    features: [
      "Universitet və kolleclərə qəbul",
      "Community college və transfer proqramları",
      "Şərti qəbul imkanları",
      "F1 viza prosesi üzrə tam dəstək",
    ],
  },
  {
    name: "Kanada",
    flag: "🇨🇦",
    features: [
      "Dövlət və özəl kolleclər",
      "Post-Graduation Work Permit (PGWP) uyğun proqram seçimi",
      "Universitet transfer imkanları",
      "Study Permit sənədlərinin hazırlanması",
    ],
  },
  {
    name: "Avstraliya",
    flag: "🇦🇺",
    features: [
      "Universitet və TAFE proqramları",
      "İngilis dili kursları",
      "Viza müraciəti və sənəd hazırlığı",
    ],
  },
  {
    name: "Avropa",
    flag: "🇪🇺",
    subtitle: "Almaniya, İtaliya, Macarıstan, Fransa, Niderland...",
    features: [
      "Dövlət və özəl universitetlər",
      "İngilis və yerli dildə proqramlar",
      "Hazırlıq (foundation) və birbaşa qəbul imkanları",
    ],
  },
  {
    name: "Türkiyə",
    flag: "🇹🇷",
    features: [
      "Dövlət və özəl universitetlər",
      "YÖS və beynəlxalq qəbul sistemləri",
      "Tibb, mühəndislik və digər ixtisaslar üzrə müraciət",
    ],
  },
];

const CountriesSection = () => {
  return (
    <section className="py-20 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Populyar Təhsil <span className="text-accent">İstiqamətləri</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dünyanın aparıcı ölkələrində təhsil imkanlarını kəşf edin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-2xl hover:border-accent/30 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none pointer-events-none grayscale">
                {country.flag}
              </div>

              <div className="relative z-10">
                <div className="text-6xl mb-6">{country.flag}</div>
                <h3 className="text-2xl font-serif text-white mb-2">
                  {country.name}
                </h3>
                {country.subtitle && (
                  <p className="text-slate-400 text-sm mb-4 italic">
                    {country.subtitle}
                  </p>
                )}

                <ul className="space-y-3 mt-6">
                  {country.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
