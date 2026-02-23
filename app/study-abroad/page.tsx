import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/study-abroad/Hero";
import AdviceSection from "@/components/study-abroad/AdviceSection";
import ProcessSection from "@/components/study-abroad/ProcessSection";
import CountriesSection from "@/components/study-abroad/CountriesSection";
import VisaSection from "@/components/study-abroad/VisaSection";
import AdditionalServices from "@/components/study-abroad/AdditionalServices";

export default function StudyAbroadPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <AdviceSection />
      <ProcessSection />
      <CountriesSection />
      <VisaSection />
      <AdditionalServices />
      <Footer />
    </main>
  );
}
