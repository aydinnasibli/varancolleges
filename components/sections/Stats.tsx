import { GraduationCap, Users, Building, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    { value: "10+", label: "İl Təcrübə", icon: Clock },
    { value: "500+", label: "Məzun", icon: GraduationCap },
    { value: "50+", label: "Partnyor", icon: Building },
    { value: "24/7", label: "Dəstək", icon: Users },
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
