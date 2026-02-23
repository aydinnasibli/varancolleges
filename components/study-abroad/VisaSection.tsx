import { FileCheck, Landmark, Globe, UserCheck } from "lucide-react";

const visaItems = [
  {
    icon: FileCheck,
    text: "Sənədlərin düzgün hazırlanması",
  },
  {
    icon: Landmark,
    text: "Bank sənədləri və maliyyə sübutu üzrə istiqamət",
  },
  {
    icon: Globe,
    text: "Viza formalarının doldurulması",
  },
  {
    icon: UserCheck,
    text: "Müsahibəyə hazırlıq",
  },
];

const VisaSection = () => {
  return (
    <section className="py-20 bg-background-dark/50 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Viza <span className="text-accent">Dəstəyi</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto italic">
            Biz viza qərarını verən tərəf deyilik, lakin sənədlərin düzgün təqdim olunması üçün prosesi tam şəkildə idarə edirik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visaItems.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-xl flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-8 h-8 text-accent" />
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaSection;
