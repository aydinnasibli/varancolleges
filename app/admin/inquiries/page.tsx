import { getInquiries } from "@/app/actions/contact-actions";
import { InquiriesClient } from "./InquiriesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Müraciətlər | Admin Dashboard",
  description: "Bütün müraciətlərin siyahısı",
};

export default async function InquiriesPage() {
  const result = await getInquiries();

  if (!result.success || !result.inquiries) {
    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-xl font-bold">Xəta baş verdi</h2>
        <p>{result.error || "Müraciətləri yükləmək mümkün olmadı."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-slate-900 text-3xl font-bold leading-tight">
            Müraciətlər
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Saytdan gələn bütün müraciətlərin siyahısı
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <InquiriesClient initialInquiries={result.inquiries} />
      </div>
    </div>
  );
}
