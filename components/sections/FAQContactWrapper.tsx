"use client";

import dynamic from "next/dynamic";

const FAQContactButton = dynamic(() => import("./FAQContactButton"), { ssr: false });

export default function FAQContactWrapper({ label }: { label: string }) {
  return <FAQContactButton label={label} />;
}
