import { generalFaqs } from "@/lib/data/faqs";
import FAQAccordion from "./FAQAccordion";
import { MessageCircle } from "lucide-react";

const FAQ = async () => {
  const faqs = generalFaqs;

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">Sual-Cavab</h2>
            <h3 className="text-4xl font-serif text-white mb-6">Tez-tez Verilən Suallar</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Təhsiliniz və gələcəyinizlə bağlı sizi narahat edən sualların cavablarını burada tapa bilərsiniz. Əlavə suallarınız varsa, bizimlə əlaqə saxlayın.
            </p>
            <a href="/contact" className="inline-flex items-center px-6 py-3 border border-accent/30 text-accent text-sm font-medium rounded-sm hover:bg-accent hover:text-primary transition-all duration-300 group">
              Bizimlə Əlaqə
              <MessageCircle className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="w-full md:w-2/3 lg:w-1/2">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
