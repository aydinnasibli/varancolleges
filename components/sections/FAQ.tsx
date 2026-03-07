import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { getGeneralFaqs } from "@/lib/data/faqs";
import { getTranslations } from "next-intl/server";

interface FAQProps {
  customFaqs?: { question: string, answer: string }[];
}

const FAQ = async ({ customFaqs }: FAQProps) => {
  const t = await getTranslations("FAQ");
  const tFaqData = await getTranslations("FAQData");

  const faqs = customFaqs || getGeneralFaqs(tFaqData);

  return (
    <section className="py-24 bg-background-dark border-t border-white/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">{t("subtitle")}</h2>
            <h3 className="text-4xl font-serif text-white mb-6">{t("title")}</h3>
            <p className="text-slate-400 font-light leading-relaxed mb-8 max-w-lg">
              {t("description")}
            </p>
            <ApplicationModal>
              <button className="inline-flex items-center text-accent hover:text-white transition-colors font-medium text-sm tracking-wider uppercase">
                {t("contactUs")}
                <span className="w-8 h-[1px] bg-accent ml-4 inline-block"></span>
              </button>
            </ApplicationModal>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group glass-card border border-white/5 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-white font-medium pr-8">{faq.question}</h4>
                  <span className="relative flex-shrink-0 ml-4 w-6 h-6 flex items-center justify-center">
                    <span className="absolute w-3 h-[2px] bg-accent rounded-full transition-transform duration-300 group-open:rotate-180"></span>
                    <span className="absolute w-3 h-[2px] bg-accent rounded-full rotate-90 transition-transform duration-300 group-open:rotate-180 group-open:opacity-0"></span>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-slate-400 font-light leading-relaxed">
                  <div className="pt-4 border-t border-white/5">
                    {faq.answer}
                  </div>
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
