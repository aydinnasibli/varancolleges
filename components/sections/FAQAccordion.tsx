"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/lib/data/faqs";

const FAQAccordion = ({ faqs }: { faqs: FAQ[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          className={`border rounded-lg overflow-hidden transition-colors duration-300 ${activeIndex === index ? 'border-accent bg-accent/5' : 'border-white/5 bg-card'}`}
        >
          <button
            onClick={() => toggleIndex(index)}
            className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
          >
            <span className={`font-serif text-lg ${activeIndex === index ? 'text-accent' : 'text-white group-hover:text-accent'} transition-colors`}>
              {faq.question}
            </span>
            <div className={`p-2 rounded-full ${activeIndex === index ? 'bg-accent text-primary' : 'bg-white/5 text-slate-400 group-hover:text-white'} transition-colors`}>
              {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-accent/10 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
