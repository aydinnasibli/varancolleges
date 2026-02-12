import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Briefcase } from "lucide-react";

const StudyAbroad = () => {
  return (
    <section className="py-24 bg-[#080c14] relative border-t border-white/5">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div>
            <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">Qlobal İmkanlar</h2>
            <h3 className="text-4xl font-serif text-white">Xaricdə Təhsil Xidmətləri</h3>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-white/10 mt-12"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="group relative bg-[#0f1623] border border-white/5 rounded-2xl p-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full flex flex-col md:flex-row gap-6 p-8 items-center md:items-start">
              <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  alt="University Campus"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7p664vBGLYJcwQm6wHyALmUWmEctdyRayS9raqr6C82rmxOiaDoNCSzT1ysK68suwWLhgDgY-QtVhb8QElG1PyrFE8X4W3twPb-xRsjSWjlAm6trq4qOPa3PDdilTmHuJqPaZcwkFDqYH7ST3XKaSDUfLKao7NoAi_-Kc7AI2ZIzve0vW_DI3cNSxuwRqA0C07t5d1ugB9k-lkLZ0ERCI3LqfOX5Su34bk0Nl8m62zBRHrGkYfHOHjJG8ZtIWVNwKL2_Tfm2CgygK"
                  fill
                />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-accent transition-colors">
                  Universitet Qəbulu
                </h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
                  ABŞ, Böyük Britaniya, Avropa və Kanada universitetlərinə bakalavr, magistr və doktorantura pillələri üzrə qəbul prosesinin tam idarə olunması.
                </p>
                <ul className="text-sm text-slate-500 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Sənədlərin hazırlanması</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Motivasiya məktubları</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Təqaüd müraciətləri</li>
                </ul>
                <Link href="#" className="inline-flex items-center px-6 py-3 border border-accent/30 text-accent text-sm font-medium rounded-sm hover:bg-accent hover:text-primary transition-all duration-300">
                  Müraciət Et
                </Link>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="group relative bg-[#0f1623] border border-white/5 rounded-2xl p-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full flex flex-col md:flex-row gap-6 p-8 items-center md:items-start">
              <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  alt="Students with documents"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7hFWkFEt8rghcjqHaTvPKWl7zHwvPblRsjKpHjyUJb62IiO0r1Ks6ATo3LIyYoJLqf2PzkLNmiuu3ndp6iAj73hWxR5FLnstHlRnhD-SVJF_Pc6BDUjb7GD_d98r0e7t1sLZuVz1mjReZdFqOVxWldHeT8qKDtETYxv7vJiQDOTkvSzRLpUXd7y8owLRE_8swEj-CR8E1F8IQo1jHm_hSMT0i9NJdHoEf-YqiGloKzkgsswGlyAgJbGO0_bE3m1czLkdlHji-_r8e"
                  fill
                />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-accent transition-colors">
                  Viza Dəstəyi
                </h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
                  Tələbə vizası üçün lazımi sənədlərin toplanması, anketlərin doldurulması və səfirlik müsahibəsinə hazırlıq prosesində peşəkar dəstək.
                </p>
                <ul className="text-sm text-slate-500 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Viza anketinin doldurulması</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Müsahibə simulyasiyası</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Sığorta və uçuş planlaması</li>
                </ul>
                <Link href="#" className="inline-flex items-center px-6 py-3 border border-accent/30 text-accent text-sm font-medium rounded-sm hover:bg-accent hover:text-primary transition-all duration-300">
                  Müraciət Et
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyAbroad;
