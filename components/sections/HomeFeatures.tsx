import { Link } from "@/i18n/routing";
import { ArrowRight, BookOpen, Globe, GraduationCap, Map, Calculator, Languages, Mic } from "lucide-react";
import { useTranslations } from "next-intl";

const HomeFeatures = () => {
  const tServices = useTranslations("ServicesPage");
  const tStudyAbroad = useTranslations("StudyAbroad");
  const tData = useTranslations("ServicesData");

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">
            {tServices("borderlessEducation") || "Borderless Education"}
          </h2>
          <h3 className="text-4xl font-serif text-white">
            {tServices("heroTitle") || "Our Services"}
          </h3>
        </div>

        {/* Bento Box Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">

          {/* Main Large Box - Study Abroad (Spans 2 cols, 2 rows) */}
          <div className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden shadow-xl bg-[#05080f]">
             {/* Background Image */}
             <div
               className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop')" }}
             ></div>
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/80 to-transparent"></div>
             <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors duration-500"></div>

             {/* Content */}
             <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="w-14 h-14 bg-accent/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-[#05080f] transition-all duration-300 text-accent">
                  <Globe className="w-7 h-7" />
                </div>
                <h4 className="text-3xl md:text-4xl font-serif text-white mb-3 group-hover:text-accent transition-colors drop-shadow-md">
                  {tStudyAbroad("title") || "Study Abroad Services"}
                </h4>
                <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed font-light max-w-lg drop-shadow-sm">
                  {tStudyAbroad("heroDesc") ||
                    "At Varan Colleges, we direct our students to universities and colleges located in the USA, Canada, Australia, European countries, and Turkey."}
                </p>
                <Link
                  href="/study-abroad"
                  className="inline-flex w-fit items-center px-6 py-3 bg-accent/10 border border-accent/20 backdrop-blur-sm rounded-lg text-sm font-medium text-accent hover:bg-accent hover:text-[#05080f] transition-all uppercase tracking-wider"
                >
                  {tStudyAbroad("title") || "Study Abroad"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
          </div>

          {/* Medium Box - SAT Preparation (Spans 1 col, 2 rows) */}
          <div className="md:col-span-1 lg:col-span-1 md:row-span-2 glass-card p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-accent/30 transition-all duration-500">
             <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12">
               <Calculator className="w-48 h-48 text-white" />
             </div>

             <div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 text-accent">
                  <Calculator className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-accent transition-colors">
                  {tData("sat.title")}
                </h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
                  {tData("sat.description")}
                </p>
             </div>
             <Link
               href="/services/sat"
               className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-accent transition-colors uppercase tracking-wider"
             >
               {tData("details")}
               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          {/* Small Box 1 - IELTS Preparation (Spans 1 col, 1 row) */}
          <div className="md:col-span-1 lg:col-span-1 md:row-span-1 glass-card p-6 md:p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-secondary/30 transition-all duration-500">
             <div className="absolute -bottom-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
               <Languages className="w-32 h-32 text-white" />
             </div>

             <div>
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 text-secondary">
                  <Languages className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-serif text-white mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                  {tData("ielts.title")}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-2">
                  {tData("ielts.description")}
                </p>
             </div>
             <Link
               href="/services/ielts"
               className="mt-4 inline-flex items-center text-xs font-medium text-slate-300 hover:text-secondary transition-colors uppercase tracking-wider"
             >
               {tData("details")}
               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          {/* Small Box 2 - General English (Spans 1 col, 1 row) */}
          <div className="md:col-span-1 lg:col-span-1 md:row-span-1 glass-card p-6 md:p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-accent/30 transition-all duration-500">
             <div className="absolute -bottom-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
               <Mic className="w-32 h-32 text-white" />
             </div>

             <div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 text-accent">
                  <Mic className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-serif text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">
                  {tData("general-english.title")}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-2">
                  {tData("general-english.description")}
                </p>
             </div>
             <Link
               href="/services/general-english"
               className="mt-4 inline-flex items-center text-xs font-medium text-slate-300 hover:text-accent transition-colors uppercase tracking-wider"
             >
               {tData("details")}
               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          {/* Wide CTA Box - View All Services */}
          <div className="md:col-span-3 lg:col-span-4 rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group cursor-pointer overflow-hidden">
             <div className="h-full w-full bg-[#05080f] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-[#0f2142]/40 transition-colors duration-500">
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div>
                   <h4 className="text-xl md:text-2xl font-serif text-white mb-1 group-hover:text-accent transition-colors">
                     {tServices("languageCourses") || "Language Courses & Exam Prep"}
                   </h4>
                   <p className="text-slate-400 text-sm font-light">
                     {tServices("coursesDesc") || "Professional programs to improve your skills."}
                   </p>
                 </div>
               </div>

               <Link
                 href="/services"
                 className="shrink-0 inline-flex items-center justify-center px-8 py-4 bg-accent text-[#05080f] font-medium rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-accent/20 uppercase tracking-widest text-sm w-full md:w-auto"
               >
                 {tServices("services") || "View All Services"}
                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;