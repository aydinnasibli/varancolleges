const countries = [
  {
    name: "ABŞ",
    description: "Dünya səviyyəli təhsil.",
  },
  {
    name: "Kanada",
    description: "Post-Graduation Work Permit (PGWP).",
  },
  {
    name: "Avstraliya",
    description: "Təhsil və iş təcrübəsi bir arada.",
  },
  {
    name: "Avropa",
    description: "Münasib qiymətlər, yüksək keyfiyyət.",
  },
  {
    name: "Türkiyə",
    description: "Yaxınlıq, mədəniyyət, peşəkarlıq.",
  },
];

const CountriesSection = () => {
  return (
    <section className="py-24 bg-background-dark/95 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">
          Populyar Ölkələr
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border border-white/10 p-8 h-48 flex flex-col justify-end transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 cursor-pointer">
              <div className="absolute top-4 right-4 text-4xl opacity-10 font-bold font-serif pointer-events-none group-hover:text-accent group-hover:opacity-20 transition-all">
                {country.name}
              </div>
              <h3 className="text-2xl text-white font-medium mb-2">{country.name}</h3>
              <p className="text-slate-400 font-light text-sm">{country.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
