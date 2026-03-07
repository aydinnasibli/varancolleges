import { Link } from "@/i18n/routing";
import { ArrowRight, BookOpen, Globe, GraduationCap, Map } from "lucide-react";
import { useTranslations } from "next-intl";

const HomeFeatures = () => {
  const tServices = useTranslations("ServicesPage");
  const tStudyAbroad = useTranslations("StudyAbroad");

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">
            {tServices("borderlessEducation") || "Borderless Education"}
          </h2>
          <h3 className="text-4xl font-serif text-white">
            {tServices("heroTitle") || "Our Services"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Services Card */}
          <div className="glass-card p-8 rounded-xl group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <BookOpen className="w-32 h-32 text-white" />
            </div>

            <div>
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 text-accent">
                <GraduationCap className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-accent transition-colors">
                {tServices("languageCourses") || "Language Courses"}
              </h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light min-h-[60px]">
                {tServices("coursesDesc") ||
                  "Professional programs to improve your international certificates and foreign language skills."}
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center text-sm font-medium text-accent hover:text-white transition-colors uppercase tracking-wider"
            >
              {tServices("services") || "Services"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Study Abroad Card */}
          <div className="glass-card p-8 rounded-xl group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Map className="w-32 h-32 text-white" />
            </div>

            <div>
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 text-accent">
                <Globe className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-accent transition-colors">
                {tStudyAbroad("title") || "Study Abroad Services"}
              </h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light min-h-[60px]">
                {tStudyAbroad("heroDesc") ||
                  "At Varan Colleges, we direct our students to universities and colleges located in the USA, Canada, Australia, European countries, and Turkey."}
              </p>
            </div>

            <Link
              href="/study-abroad"
              className="inline-flex items-center text-sm font-medium text-accent hover:text-white transition-colors uppercase tracking-wider"
            >
              {tStudyAbroad("title") || "Study Abroad"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;