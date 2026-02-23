import { Home, Plane, ShieldCheck, MessagesSquare } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Yaşayış Seçimi",
    description: "Kampus və ya rezidensiya seçimlərində dəstək",
  },
  {
    icon: Plane,
    title: "Qarşılanma",
    description: "Hava limanında qarşılanma və istiqamətləndirilmə",
  },
  {
    icon: ShieldCheck,
    title: "Sığorta və Qeydiyyat",
    description: "Tibbi sığorta və rəsmi qeydiyyat dəstəyi",
  },
  {
    icon: MessagesSquare,
    title: "Konsultasiya",
    description: "Təhsil müddətində davamlı dəstək və konsultasiya",
  },
];

const AdditionalServices = () => {
  return (
    <section className="py-20 bg-background-dark/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-16">
          Əlavə <span className="text-accent">Xidmətlər</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-xl hover:border-accent/30 transition-all duration-300 group text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
