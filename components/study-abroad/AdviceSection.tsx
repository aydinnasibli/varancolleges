import { studyAbroadData } from "@/lib/data/study-abroad";

const AdviceSection = () => {
  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Akademik Məsləhət */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">
              Akademik <span className="text-accent italic">Məsləhət</span>
            </h2>
            <ul className="space-y-4">
              {studyAbroadData.academicAdvice.items.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2.5 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-slate-300 font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qəbul Prosesi */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">
              Qəbul <span className="text-accent italic">Prosesi</span>
            </h2>
            <p className="text-slate-400 mb-6 font-light">
              {studyAbroadData.admissionProcess.description}
            </p>
            <ul className="space-y-4">
              {studyAbroadData.admissionProcess.items.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2.5 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-slate-300 font-light leading-relaxed group-hover:text-white transition-colors duration-300">
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

export default AdviceSection;
