import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
          Sərhədsiz Gələcək <br />
          <span className="text-accent italic">Buradan Başlayır</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 font-light">
          Xəyallarınızdakı universitetə qəbul olmağa hazırsınız? Elə isə, bu gün bizimlə əlaqə saxlayın.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-accent text-background-dark font-medium px-10 py-5 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 group"
        >
          <span className="text-lg">Müraciət Et</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
