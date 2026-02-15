import { servicesData } from "@/lib/services-data";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary">
      <Navbar />

      {/* Header Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/services" className="inline-flex items-center text-accent hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Xidmətlərə qayıt
             </Link>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                {service.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                {service.description}
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

            {/* Exam Info */}
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/5">
                <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">İmtahan Haqqında</h2>
                <p className="text-slate-300 leading-loose text-lg font-light">
                    {service.content.examInfo}
                </p>
            </div>

            {/* Format */}
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/5">
                <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">İmtahan Formatı</h2>
                <p className="text-slate-300 leading-loose text-lg font-light">
                    {service.content.format}
                </p>
            </div>

            {/* Grading */}
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/5">
                <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">Qiymətləndirmə</h2>
                <p className="text-slate-300 leading-loose text-lg font-light">
                    {service.content.grading}
                </p>
            </div>

        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
