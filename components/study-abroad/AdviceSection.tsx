import { Target, Users, PlaneTakeoff, GraduationCap } from "lucide-react";
import { getStudyAbroadData } from "@/lib/data/study-abroad";
import { getTranslations } from "next-intl/server";

const AdviceSection = async ({ locale }: { locale: string }) => {
  const tData = await getTranslations({ locale, namespace: "StudyAbroadData" });
  const studyAbroadData = await getStudyAbroadData(locale);

  return (
    <section className="py-24 bg-background-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                {studyAbroadData.academicAdvice.title}
              </h2>
              <ul className="space-y-4">
                {studyAbroadData.academicAdvice.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <span className="text-slate-300 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                {studyAbroadData.admissionProcess.title}
              </h2>
              <p className="text-slate-400 font-light mb-6">
                {studyAbroadData.admissionProcess.description}
              </p>
              <ul className="space-y-4">
                {studyAbroadData.admissionProcess.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <span className="text-slate-300 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-2xl mt-0 sm:mt-12 group hover:border-accent/30 transition-colors">
              <Users className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif text-white mb-4">{tData("individualApproach")}</h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                {tData("individualApproachDesc")}
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl group hover:border-accent/30 transition-colors">
              <PlaneTakeoff className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif text-white mb-4">{tData("fullSupport")}</h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                {tData("fullSupportDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdviceSection;
