import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations("Stats");

  const stats = [
    { value: "8+", label: t("years") },
    { value: "1,000+", label: t("graduates") },
    { value: "50+", label: t("partners") },
    { value: "24/7", label: t("support") },
  ];

  return (
    <div className="bg-navy border-t border-white/6">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`py-11 text-center ${index < 3 ? "border-r border-white/6" : ""}`}
          >
            <div className="font-serif text-4xl md:text-[56px] font-bold text-white leading-none">
              {stat.value}
            </div>
            <div className="text-[10px] text-white/38 mt-[7px] tracking-[0.14em] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
