"use client";

import { ApplicationModal } from "@/components/ui/ApplicationModal";

export default function FAQContactButton({ label }: { label: string }) {
  return (
    <ApplicationModal>
      <button className="bg-navy text-white px-7 py-3 rounded-md text-[13px] font-semibold hover:bg-navy-mid transition-colors">
        {label}
      </button>
    </ApplicationModal>
  );
}
