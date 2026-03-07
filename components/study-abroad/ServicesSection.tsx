import { FileText, Building } from "lucide-react";
import { getStudyAbroadData } from "@/lib/data/study-abroad";

const ServicesSection = async ({ locale }: { locale: string }) => {
  const studyAbroadData = await getStudyAbroadData(locale);

  return (
    <section className="py-24 bg-primary text-slate-300 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif text-white flex items-center gap-4">
              <FileText className="w-10 h-10 text-accent" />
              {studyAbroadData.visaSupport.title}
            </h2>
            <p className="text-lg font-light leading-relaxed">
              {studyAbroadData.visaSupport.description}
            </p>
            <ul className="space-y-4">
              {studyAbroadData.visaSupport.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif text-white flex items-center gap-4">
              <Building className="w-10 h-10 text-accent" />
              {studyAbroadData.additionalServices.title}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {studyAbroadData.additionalServices.items.map((item, index) => (
                <li key={index} className="glass-card p-6 rounded-xl hover:border-accent/30 transition-colors">
                  <span className="font-light text-sm">{item}</span>
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
