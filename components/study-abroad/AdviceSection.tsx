const adviceSteps = [
  {
    number: "01",
    title: "Analiz",
    description: "Akademik göstəricilər və potensialın dəqiq təhlili.",
  },
  {
    number: "02",
    title: "Planlama",
    description: "Maraqlarınıza və büdcənizə uyğun mükəmməl yol xəritəsi.",
  },
  {
    number: "03",
    title: "Seçim",
    description: "Sizin üçün ən doğru ölkə və universitetin müəyyənləşdirilməsi.",
  },
];

const AdviceSection = () => {
  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
              Hədəfinizə <br />
              <span className="text-accent italic">Peşəkar Baxış</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
              Biz qərarı sizin əvəzinizə vermirik. Biz sizə ən doğru qərarı vermək üçün lazım olan bütün obyektiv məlumatları təqdim edirik.
            </p>
          </div>

          <div className="space-y-8">
            {adviceSteps.map((step, index) => (
              <div key={index} className="group flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10">
                <span className="text-5xl font-serif text-white/10 group-hover:text-accent transition-colors duration-300">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-xl text-white font-medium mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 font-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdviceSection;
