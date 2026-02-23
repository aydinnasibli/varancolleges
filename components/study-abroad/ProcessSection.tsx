import { CheckCircle2, GraduationCap, School, BookOpen, ScrollText } from "lucide-react";

const processItems = [
  "Universitet və kolleclərə müraciət",
  "Motivasiya məktubunun hazırlanması",
  "CV və tövsiyə məktublarının redaktəsi",
  "Sənədlərin düzgün şəkildə toplanması və göndərilməsi",
  "Şərti və ya birbaşa qəbul prosesinin idarə olunması",
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-background-dark/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Qəbul Prosesi və <span className="text-accent">Sənədləşmə</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Biz bakalavr, magistr, doktorantura, foundation və dil proqramları üzrə müraciətləri həyata keçiririk.
              Hər bir mərhələdə peşəkar dəstək göstərərək, qəbul şansınızı maksimallaşdırırıq.
            </p>

            <div className="space-y-4">
              {processItems.map((item, index) => (
                <div key={index} className="flex items-center p-4 glass-panel rounded-lg hover:border-accent/50 transition-colors duration-300">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mr-4" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
             <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center aspect-square text-center transform translate-y-8">
                <GraduationCap className="w-12 h-12 text-accent mb-4" />
                <span className="text-white font-serif text-xl">Bakalavr & Magistr</span>
             </div>
             <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center aspect-square text-center">
                <School className="w-12 h-12 text-accent mb-4" />
                <span className="text-white font-serif text-xl">Foundation</span>
             </div>
             <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center aspect-square text-center transform translate-y-8">
                <BookOpen className="w-12 h-12 text-accent mb-4" />
                <span className="text-white font-serif text-xl">Dil Kursları</span>
             </div>
             <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center aspect-square text-center">
                <ScrollText className="w-12 h-12 text-accent mb-4" />
                <span className="text-white font-serif text-xl">Doktorantura</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
