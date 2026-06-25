import { getGeneralFaqs } from "@/lib/data/faqs";
import { getTranslations } from "next-intl/server";
import FAQContactWrapper from "./FAQContactWrapper";

interface FAQProps {
  customFaqs?: { question: string, answer: string }[];
}

const FAQ = async ({ customFaqs }: FAQProps) => {
  const t = await getTranslations("FAQ");
  const tFaqData = await getTranslations("FAQData");

  const faqs = customFaqs || getGeneralFaqs(tFaqData);

  return (
    <section className="section-padding bg-surface border-t border-border">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-text-muted uppercase mb-3">
              {t("subtitle")}
            </p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-navy leading-[1.05] mb-5">
              {t("title")}
            </h2>
            <p className="text-[14px] leading-[1.75] text-text-secondary mb-8">
              {t("description")}
            </p>
            <FAQContactWrapper label={t("contactUs")} />
          </div>

          <div className="border border-border rounded-lg overflow-hidden bg-white">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-border last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="px-6 py-5 flex justify-between items-start gap-4 hover:bg-surface/60 transition-colors select-none cursor-pointer">
                  <span className="text-[14px] font-semibold text-navy leading-snug">
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="shrink-0 mt-0.5 text-text-muted transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <line x1="8" y1="2" x2="8" y2="14" />
                    <line x1="2" y1="8" x2="14" y2="8" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 border-t border-border/60">
                  <p className="text-[13px] leading-[1.85] text-text-secondary pt-4">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
