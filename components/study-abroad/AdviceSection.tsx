const adviceSteps = [
  {
    number: "01",
    title: "Analiz",
    description: "Akademik potensialın dəqiq təhlili.",
  },
  {
    number: "02",
    title: "Planlama",
    description: "Sizə ən uyğun yol xəritəsi.",
  },
  {
    number: "03",
    title: "Nəticə",
    description: "Dünyanın top universitetlərinə qəbul.",
  },
];

const AdviceSection = () => {
  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-20">
          Peşəkar <span className="text-accent italic">Yanaşma</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {adviceSteps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="w-24 h-24 mx-auto bg-background-dark border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500">
                <span className="text-3xl font-serif text-white/20 group-hover:text-accent transition-colors duration-300">
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl text-white font-medium mb-4 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-slate-400 font-light max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdviceSection;
