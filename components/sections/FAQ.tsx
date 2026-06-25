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
    <section className="py-24 bg-white border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-serif text-4xl md:text-[52px] font-bold text-navy leading-none mb-[22px]">
              {t("title")}
            </h2>
            <p className="text-[15px] leading-[1.75] text-text-secondary mb-9">
              {t("description")}
            </p>
            <FAQContactWrapper label={t("contactUs")} />
          </div>

          <div className="flex flex-col gap-0 border border-border rounded-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-border last:border-b-0 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="px-7 py-[22px] flex justify-between items-start gap-4 bg-white hover:bg-surface transition-colors select-none">
                  <span className="text-[15px] font-semibold text-navy leading-normal">
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#1B3F8B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="shrink-0 mt-[3px] transition-transform duration-200 group-open:rotate-45"
                  >
                    <line x1="8" y1="2" x2="8" y2="14" />
                    <line x1="2" y1="8" x2="14" y2="8" />
                  </svg>
                </summary>
                <div className="px-7 pb-[22px] bg-surface border-t border-border">
                  <p className="text-sm leading-[1.8] text-text-secondary pt-[18px]">
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
