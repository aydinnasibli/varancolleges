"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="relative bg-background-dark border-t border-white/5" id="contact">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[800px]">
        {/* Map Section */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <div className="absolute inset-0">
            <Image
              alt="Map showing Baku location in high detail"
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsUiePLbzFLOD_5nw2nZ696u1sKa8i3jUxmKgLjW_gi0hudjeXMKPvrO_-34vCwk737b2nMH0os1Qrrcn2MAdrbvyvS78U8oQDfh4itUutv-TsRXDTrqKHfFqjh3DbhHK8ALHL5OycSPzEyPK9hlSQ8OzDniQFpz__Ykw6uNdHShTOyt8oRhIOHJMt3TRvndA_Vf1K9ZCtXsqoNBNFq5pH6Ao9S19glDeF4cRt6xNx3XnZSlWQeVbMDIc4cgZFT_BTQyBFHza5sA3N"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background-dark"></div>
          </div>
          <div className="absolute bottom-10 left-10 p-6 bg-background-dark/90 backdrop-blur-md border border-white/10 max-w-sm rounded-sm z-10">
            <h4 className="text-accent font-serif text-xl mb-2">Baş Ofisimiz</h4>
            <p className="text-slate-300 text-sm mb-4">
              Bakı şəhəri, Nizami küçəsi 123, Caspian Plaza, 3-cü mərtəbə
            </p>
            <a href="#" className="text-white text-xs uppercase tracking-wider font-semibold hover:text-accent transition-colors flex items-center gap-2">
              Xəritədə bax <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex items-center bg-[#05080f]">
          <div className="max-w-lg w-full mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif text-white mb-2">Bizimlə Əlaqə</h2>
            <p className="text-slate-500 mb-10">Mütəxəssislərimiz sizə kömək etməyə hazırdır.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer rounded-none"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Ad
                  </label>
                </div>
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer rounded-none"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Soyad
                  </label>
                </div>
              </div>

              <div className="relative group">
                <Input
                  type="email"
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer rounded-none"
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email ünvanı
                </label>
              </div>

              <div className="relative group">
                <Input
                  type="tel"
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer rounded-none"
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Əlaqə nömrəsi
                </label>
              </div>

              <div className="pt-6">
                <Button
                  type="button"
                  variant="accent"
                  className="w-full font-bold py-6 px-8 rounded-sm transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:-translate-y-1"
                >
                  Müraciəti Göndər
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
