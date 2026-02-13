"use client";

import { useState } from "react";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Təşəkkür edirik! Sizinlə tezliklə əlaqə saxlayacağıq.");
    setFormData({ name: "", phone: "", country: "" });
  };

  return (
    <section className="py-24 relative bg-background-card border-t border-white/5" id="consultation">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Pulsuz Konsultasiya
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Xəyallarınızı Planlamağa Başlayın
        </h2>
        <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
          Mütəxəssislərimizlə 30 dəqiqəlik pulsuz konsultasiya zamanı sizin profilinizə uyğun ən ideal təhsil yolunu müəyyənləşdirək.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#05080f] p-8 rounded-lg border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative group text-left">
              <input
                type="text"
                placeholder="Ad və Soyad"
                required
                className="block py-3 px-4 w-full text-sm text-white bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="relative group text-left">
              <input
                type="tel"
                placeholder="Əlaqə Nömrəsi"
                required
                className="block py-3 px-4 w-full text-sm text-white bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="relative group text-left mb-8">
            <input
              type="text"
              placeholder="Maraqlandığınız Ölkə (İstəyə bağlı)"
              className="block py-3 px-4 w-full text-sm text-white bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-[#b38728] hover:to-accent text-primary font-bold py-4 px-8 rounded-sm transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:-translate-y-1 cursor-pointer"
          >
            Konsultasiya Sifariş Et
          </button>
          <p className="text-xs text-slate-500 mt-4">
            Məlumatlarınız məxfi saxlanılır və üçüncü tərəflərlə paylaşılmır.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ConsultationForm;
