import { GraduationCap, Users, Building, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations("Stats");

  const stats = [
    { value: "10+", label: t("years"), icon: Clock },
    { value: "500+", label: t("graduates"), icon: GraduationCap },
    { value: "50+", label: t("partners"), icon: Building },
    { value: "24/7", label: t("support"), icon: Users },
  ];

  return (
    <div className="bg-primary/50 border-y border-white/5 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat, index) => (
            <div key={index} className="py-8 text-center group cursor-default">
              <div className="text-3xl md:text-4xl font-serif text-white mb-1 group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase text-slate-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
