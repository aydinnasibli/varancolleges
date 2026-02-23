import Link from "next/link";
import Image from "next/image";
import { ArrowRight, School, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="VaranColleges Office Environment"
          className="object-cover scale-105"
          src="/images/hero-bg.png"
          fill
          priority
        />
        <div className="absolute inset-0 bg-background-dark/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-2s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl lg:text-8xl font-serif font-medium text-white leading-tight mb-8">
            Gələcəyi <br />
            <span className="text-gold italic pr-2">Kəşf Edin</span>
          </h1>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-lg font-light border-l border-accent/30 pl-6">
            Qlobal təhsil standartları ilə sərhədləri aşın. VaranColleges sizin beynəlxalq karyeranızın memarıdır.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button variant="accent" size="lg" className="rounded-sm font-semibold tracking-wide uppercase" asChild>
              <Link href="/study-abroad">
                Xaricdə Təhsil
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-sm text-white border-white/20 hover:bg-accent hover:text-primary hover:border-accent font-semibold tracking-wide uppercase backdrop-blur-sm transition-all duration-300" asChild>
              <Link href="/services">Xidmətlər</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block h-[600px]">
          {/* Floating Card 1 */}
          <div className="absolute top-10 right-10 w-72 p-6 glass-card rounded-xl animate-float z-20 hover:scale-105 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <School className="text-accent h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-serif text-lg">Top Universitetlər</h4>
                <p className="text-xs text-slate-400">Dünya reytinqində ilk 100</p>
              </div>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-4/5"></div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-20 left-10 w-64 p-6 glass-card rounded-xl animate-float z-10 hover:scale-105 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: "-3s" }}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-4xl font-serif text-white">98%</span>
              <span className="text-accent text-sm mb-1 font-medium">Uğur</span>
            </div>
            <p className="text-xs text-slate-400">Viza müraciətlərinin təsdiq faizi</p>
          </div>

          {/* Abstract Shapes */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-accent/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
