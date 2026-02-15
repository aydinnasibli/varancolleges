import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Stats from "@/components/sections/Stats";
import Advantages from "@/components/sections/Advantages";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/80 to-[#05080f]/95">
             <Image
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9_nE0QdxBZUviHeVSyuwfsGUBIQA4ffD7Rmj7UfFh6wX90Pom06l6Sk8zalGCGNSkEcP0YT7IHGFAmjIG5Ejg0_wZUMIE8unx5GkhKQeYj2ihm8DslFwNW38a-65g3tnL0b2G762LPILq50zNVkhQMY9X3uF0YejTMQykWD56O6IM6LRk-k1g7xLQ2UhLSy9cANKvvQw3pCBPKrYhqWU5Oq9nLWOi9haSC1RcXtm5QE2y6CSLicTy0bEsUYAYj4Q9lk9NQQ_--b2h"
               className="object-cover opacity-20 mix-blend-overlay"
               fill
               alt="About Hero Background"
               priority
             />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                Haqqımızda
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Biz sadəcə bir təhsil mərkəzi deyilik, biz gələcəyinizi inşa edən tərəfdaşıq. VaranColleges ilə arzularınızın sərhədlərini aşın.
            </p>
            <div className="mt-12 flex justify-center gap-2 text-sm text-slate-400 uppercase tracking-widest font-medium">
                <Link href="/" className="hover:text-white transition-colors">Ana Səhifə</Link>
                <span className="text-accent">•</span>
                <span className="text-white">Haqqımızda</span>
            </div>
        </div>
      </section>

      <Stats />

      {/* Main Content Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-tl-3xl -z-10"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-br-3xl -z-10"></div>
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsUiePLbzFLOD_5nw2nZ696u1sKa8i3jUxmKgLjW_gi0hudjeXMKPvrO_-34vCwk737b2nMH0os1Qrrcn2MAdrbvyvS78U8oQDfh4itUutv-TsRXDTrqKHfFqjh3DbhHK8ALHL5OycSPzEyPK9hlSQ8OzDniQFpz__Ykw6uNdHShTOyt8oRhIOHJMt3TRvndA_Vf1K9ZCtXsqoNBNFq5pH6Ao9S19glDeF4cRt6xNx3XnZSlWQeVbMDIc4cgZFT_BTQyBFHza5sA3N"
                        alt="About Us Image"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full h-auto object-cover aspect-[4/3]"
                    />
                </div>
                <div>
                    <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">Biz Kimik?</h2>
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">
                        Təhsildə Yeni Standartlar <br/> <span className="text-slate-400">VaranColleges</span>
                    </h3>
                    <div className="space-y-6 text-slate-400 font-light leading-relaxed">
                        <p>
                            VaranColleges, Azərbaycanda beynəlxalq təhsil standartlarını tətbiq edən və tələbələrə qlobal imkanlar yaradan aparıcı təhsil mərkəzidir. Bizim missiyamız, gənclərin akademik və peşəkar inkişafına dəstək olaraq, onların dünya səviyyəsində rəqabətədavamlı kadr kimi yetişməsini təmin etməkdir.
                        </p>
                        <p>
                            Təcrübəli komandamız, hər bir tələbəyə fərdi yanaşaraq onların potensialını kəşf etməyə və ən uyğun təhsil yolunu seçməyə kömək edir. Xaricdə təhsil proqramlarından tutmuş, dil hazırlığı kurslarına qədər geniş xidmət spektrimizlə sizin yanınızdayıq.
                        </p>
                        <p>
                             Dünyanın aparıcı universitetləri ilə əməkdaşlığımız sayəsində tələbələrimiz üçün eksklüziv qəbul imkanları və təqaüd proqramları təklif edirik.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Advantages />

      {/* Parallax Quote Section */}
      <div
        className="h-64 md:h-80 w-full relative overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAfsuUczNweenZKGyfM3D2YPjROUD5C1GbSuBD6VEVeJPL__wON1KhxC4rNQVRFUkRm22b2rasb0n6eyFqPeSYGWH3SYKEI7vBmqZf1SDvav6oD-OQx42825V9QqIhJoGL-ATZFoO4oUpTrN_quNLx_a-k6Cipel0d7_3mKJyWS0lBDb__rjFoM5QZkTUqACiMYe_4kFgTmL8bQhntLNKWHj68hxtxyqIVbwjIaIyJIWm3s7VtGZ9lXrLsdhbqF2xHHMPzD4JuN5I0')" }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px] flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl font-serif text-white italic mb-6">&quot;Təhsil dünyanı dəyişdirmək üçün istifadə edə biləcəyiniz ən güclü silahdır.&quot;</p>
                <p className="text-accent text-sm tracking-widest uppercase font-medium">— Nelson Mandela</p>
            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
