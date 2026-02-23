import Image from "next/image";

const countries = [
  {
    name: "ABŞ",
    code: "us",
    desc: "Qlobal təhsil və innovasiya mərkəzi.",
  },
  {
    name: "Kanada",
    code: "ca",
    desc: "Yüksək həyat keyfiyyəti və karyera.",
  },
  {
    name: "Böyük Britaniya",
    code: "gb",
    desc: "Əsrlərin təhsil ənənəsi.",
  },
  {
    name: "Avstraliya",
    code: "au",
    desc: "Macəra dolu akademik təcrübə.",
  },
  {
    name: "Almaniya",
    code: "de",
    desc: "Mühəndislik və texnologiya lideri.",
  },
  {
    name: "Türkiyə",
    code: "tr",
    desc: "Bizə ən yaxın keyfiyyətli təhsil.",
  },
];

const CountriesSection = () => {
  return (
    <section className="py-24 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-16">
          Dünya Sənin <span className="text-accent italic">Kampusundur</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-background-dark">
                <Image
                  src={`https://flagcdn.com/w1280/${country.code}.png`}
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
                  {country.desc}
                </p>
                <div className="w-12 h-1 bg-accent mt-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
