import { studyAbroadData } from "@/lib/data/study-abroad";

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

          {/* Viza Dəstəyi */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300 group">
            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              Viza <span className="text-accent italic">Dəstəyi</span>
            </h2>
            <p className="text-slate-400 mb-8 font-light leading-relaxed">
              {studyAbroadData.visaSupport.description}
            </p>
            <ul className="space-y-4">
              {studyAbroadData.visaSupport.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-accent group-hover:text-background-dark transition-all duration-300">
                    <span className="text-accent text-sm group-hover:text-background-dark transition-colors duration-300">✓</span>
                  </div>
                  <span className="text-slate-300 font-light group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Əlavə Xidmətlər */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300 group">
            <h2 className="text-3xl font-serif text-white mb-6">
              Əlavə <span className="text-accent italic">Xidmətlər</span>
            </h2>
            <ul className="space-y-4 mt-8">
              {studyAbroadData.additionalServices.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-accent group-hover:text-background-dark transition-all duration-300">
                    <span className="text-accent text-sm group-hover:text-background-dark transition-colors duration-300">+</span>
                  </div>
                  <span className="text-slate-300 font-light group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
