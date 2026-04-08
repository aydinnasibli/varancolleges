import { GraduationCap, Users, Building, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations("Stats");

  const stats = [
    {
      value: "10+",
      label: t("years"),
      icon: Clock,
      iconBg: "bg-accent/15",
      iconColor: "text-accent",
    },
    {
      value: "500+",
      label: t("graduates"),
      icon: GraduationCap,
      iconBg: "bg-secondary/15",
      iconColor: "text-secondary",
    },
    {
      value: "50+",
      label: t("partners"),
      icon: Building,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
    },
    {
      value: "24/7",
      label: t("support"),
      icon: Users,
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-primary/60 via-primary/40 to-primary/60 border-y border-white/5 backdrop-blur-md relative z-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="py-8 text-center group cursor-default flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="text-3xl md:text-4xl font-serif text-white group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs tracking-widest uppercase text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
