import { ArrowRight, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Müraciət",
    desc: "Universitet və kollec sənədləşməsinin idarə olunması.",
  },
  {
    step: "02",
    title: "CV & Motivasiya",
    desc: "Peşəkar redaktə və tövsiyə məktublarının hazırlanması.",
  },
  {
    step: "03",
    title: "Viza Dəstəyi",
    desc: "Bütün viza prosedurlarının detallı idarəsi.",
  },
  {
    step: "04",
    title: "Uçuş",
    desc: "Qarşılanma, yerləşmə və sığorta.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-24 bg-background-dark text-white relative border-y border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-20 text-center">
          Proses <span className="italic text-accent">Necə İşləyir?</span>
        </h2>

        <div className="relative">
          <div className="space-y-16">
            {processSteps.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Step Number Badge */}
                <div className="w-16 h-16 rounded-full bg-background-dark border border-accent/20 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.1)] flex-shrink-0">
                  <span className="font-serif text-xl text-accent">{item.step}</span>
                </div>

                {/* Content */}
                <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <h3 className="text-2xl font-serif text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed max-w-sm mx-auto md:mx-0 inline-block">
                    {item.desc}
                  </p>
                </div>

                {/* Spacer for symmetry */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
