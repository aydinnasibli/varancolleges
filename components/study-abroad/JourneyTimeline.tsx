import { Target, GraduationCap, FileText, Building, Users, PlaneTakeoff } from "lucide-react";
import { getStudyAbroadData } from "@/lib/data/study-abroad";
import { getTranslations } from "next-intl/server";

export default async function JourneyTimeline({ locale }: { locale: string }) {
  const data = await getStudyAbroadData(locale);
  const tData = await getTranslations({ locale, namespace: "StudyAbroadData" });

  const steps = [
    {
      numeral: "I",
      title: data.academicAdvice.title,
      description: "",
      items: data.academicAdvice.items,
      icon: Target
    },
    {
      numeral: "II",
      title: data.admissionProcess.title,
      description: data.admissionProcess.description,
      items: data.admissionProcess.items,
      icon: GraduationCap
    },
    {
      numeral: "III",
      title: data.visaSupport.title,
      description: data.visaSupport.description,
      items: data.visaSupport.items,
      icon: FileText
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a192f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-24">
          <h2 className="text-accent text-sm font-bold tracking-[0.25em] uppercase mb-4">
            {tData("individualApproach")}
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
             Step-by-Step Global Journey
          </h3>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-8 opacity-50"></div>
        </div>

        {/* The Golden Timeline Line */}
        <div className="absolute left-[35px] sm:left-[51px] top-[200px] bottom-0 w-[1px] bg-white/10 hidden md:block"></div>
        <div className="absolute left-[35px] sm:left-[51px] top-[200px] h-1/3 w-[1px] bg-gradient-to-b from-accent/0 via-accent to-accent/0 opacity-70 hidden md:block"></div>

        <div className="space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-16 group">
                {/* Timeline Axis / Icon */}
                <div className="relative z-10 flex-shrink-0 mt-2 hidden md:block">
                  <div className="w-14 h-14 rounded-full bg-[#0a192f] border border-white/10 group-hover:border-accent/50 flex items-center justify-center transition-colors duration-500 shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-accent transition-colors duration-500 relative z-10" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                     <span className="text-4xl sm:text-6xl font-serif text-white/5 select-none group-hover:text-accent/20 transition-colors duration-500 leading-none">
                       {step.numeral}
                     </span>
                     <h3 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                       {step.title}
                     </h3>
                  </div>
                  
                  {step.description && (
                    <p className="text-slate-400 text-lg leading-relaxed font-light mb-8 max-w-2xl border-l-[1px] border-white/10 pl-6">
                      {step.description}
                    </p>
                  )}

                  <div className="glass-card p-8 rounded-2xl border border-white/5 transition-colors">
                    <ul className="space-y-4">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                          <span className="text-slate-300 font-light leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Cards from the old design */}
        <div className="mt-32 pt-24 border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
              <Users className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-serif text-white mb-4">{tData("individualApproach")}</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                {tData("individualApproachDesc")}
              </p>
            </div>
            <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
              <PlaneTakeoff className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-serif text-white mb-4">{tData("fullSupport")}</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                {tData("fullSupportDesc")}
              </p>
            </div>
          </div>

          <div className="text-center mt-16 mb-8">
            <h3 className="text-2xl font-serif text-white uppercase tracking-widest text-accent mb-8">
              {data.additionalServices.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.additionalServices.items.map((item, i) => (
                 <div key={i} className="glass-card p-6 rounded-xl flex items-center justify-center text-center">
                   <span className="font-light text-slate-300 text-sm tracking-wide">{item}</span>
                 </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
