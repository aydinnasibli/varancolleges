const SupportSection = () => {
  return (
    <section className="py-32 bg-background-dark relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Tam <span className="text-accent italic">Dəstək</span>
        </h2>
        <p className="text-slate-400 font-light max-w-2xl mx-auto mb-20 text-lg leading-relaxed">
          Viza sənədləşməsindən tutmuş, hava limanında qarşılanmağa qədər – hər mərhələdə sizinləyik.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-300">
            <h3 className="text-xl text-white font-serif mb-4 group-hover:text-accent transition-colors">Viza & Sənədlər</h3>
            <p className="text-slate-400 font-light text-sm leading-relaxed">Bank, maliyyə, və rəsmi formaların idarəsi.</p>
          </div>
          <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-300">
            <h3 className="text-xl text-white font-serif mb-4 group-hover:text-accent transition-colors">Yaşayış Yeri</h3>
            <p className="text-slate-400 font-light text-sm leading-relaxed">Kampus və ya rezidensiya seçimi.</p>
          </div>
          <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-300">
            <h3 className="text-xl text-white font-serif mb-4 group-hover:text-accent transition-colors">Qarşılanma</h3>
            <p className="text-slate-400 font-light text-sm leading-relaxed">Hava limanında qarşılama və transfer.</p>
          </div>
          <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-300">
            <h3 className="text-xl text-white font-serif mb-4 group-hover:text-accent transition-colors">Sığorta</h3>
            <p className="text-slate-400 font-light text-sm leading-relaxed">Tibbi sığorta və qeydiyyat.</p>
          </div>
        </div>

        <a
          href="/contact"
          className="inline-block bg-accent text-background-dark font-medium px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          Bizimlə Əlaqə
        </a>
      </div>
    </section>
  );
};

export default SupportSection;
