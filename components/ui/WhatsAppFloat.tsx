"use client";

import { WhatsAppIcon } from "@/components/ui/custom-icons";
import { useTranslations } from "next-intl";

const WhatsAppFloat = () => {
  const t = useTranslations("General");

  return (
    <a
      href="https://wa.me/994771885050"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-[#20BD5A] transition-colors group"
      aria-label={t("whatsappCta")}
    >
      <WhatsAppIcon className="w-5 h-5" />
      <span className="text-[13px] font-semibold hidden sm:inline">
        {t("whatsappCta")}
      </span>
    </a>
  );
};

export default WhatsAppFloat;
