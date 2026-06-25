"use client";

import { ApplicationModal } from "@/components/ui/ApplicationModal";

export default function FAQContactButton({ label }: { label: string }) {
  return (
    <ApplicationModal>
      <button className="bg-navy text-white border-none cursor-pointer px-8 py-[13px] rounded text-[13px] font-semibold hover:bg-navy-light transition-colors">
        {label}
      </button>
    </ApplicationModal>
  );
}
