"use client";

import { ApplicationModal } from "@/components/ui/ApplicationModal";

export default function FAQContactButton({ label }: { label: string }) {
  return (
    <ApplicationModal>
      <button className="inline-flex items-center text-accent hover:text-white transition-colors font-medium text-sm tracking-wider uppercase">
        {label}
        <span className="w-8 h-[1px] bg-accent ml-4 inline-block"></span>
      </button>
    </ApplicationModal>
  );
}
