import { Diamond, Globe, TrendingUp } from "lucide-react";

const Advantages = () => {
  const advantages = [
    {
      title: "Premium Konsultasiya",
      description: "Hər bir tələbə üçün eksklüziv yanaşma. Sizin hədəflərinizə uyğun, detallı düşünülmüş yol xəritəsi hazırlayırıq.",
      icon: Diamond,
      color: "from-accent to-[#b38728]",
    },
    {
      title: "Qlobal Şəbəkə",
      description: "Dünyanın ən nüfuzlu təhsil ocaqları ilə birbaşa əlaqələr. Qəbul prosesində eksklüziv üstünlüklər.",
      icon: Globe,
      color: "bg-[#1a2333] border border-accent/30 text-accent",
    },
    {
      title: "Zəmanətli Nəticə",
      description: "Analitik yanaşma və illərin təcrübəsi sayəsində riskləri minimuma endirir, uğuru maksimuma qaldırırıq.",
      icon: TrendingUp,
      color: "bg-[#1a2333] border border-accent/30 text-accent",
    },
  ];

  return (
    <section className="py-32 relative bg-background-dark overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0f1623] to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">Üstünlüklərimiz</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Mükəmməllik Detallardadır</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <div key={index} className="group relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>

              <div className="relative bg-[#0a0f18] border border-white/5 p-10 h-full rounded-2xl hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <item.icon className="w-24 h-24 text-white" />
                </div>

                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-8 shadow-lg shadow-accent/20 ${index === 0 ? 'bg-gradient-to-br from-accent to-[#b38728] text-background-dark' : 'bg-[#1a2333] border border-accent/30 text-accent'}`}>
                  <item.icon className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-serif text-white mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
