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
    <section className="border-t border-border bg-surface" aria-label="Key statistics">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="py-8 md:py-10 text-center first:pl-0 last:pr-0"
            >
              <span className="font-serif text-3xl md:text-[44px] font-bold text-navy leading-none">
                {stat.value}
              </span>
              <span className="block text-[11px] text-text-muted mt-2 tracking-[0.14em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
