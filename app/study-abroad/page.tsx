import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/study-abroad/Hero";
import FilterSidebar from "@/components/study-abroad/FilterSidebar";
import ProgramList from "@/components/study-abroad/ProgramList";
import ConsultationForm from "@/components/study-abroad/ConsultationForm";

export default function StudyAbroadPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />
      <Hero />

      <section className="py-12 bg-background-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="w-full lg:w-1/4">
              <Suspense>
                <FilterSidebar />
              </Suspense>
            </aside>
            <div className="w-full lg:w-3/4">
              <Suspense fallback={<div className="text-white">Loading programs...</div>}>
                <ProgramList searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <ConsultationForm />
      <Footer />
    </main>
  );
}
