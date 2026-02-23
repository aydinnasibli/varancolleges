import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative py-24 bg-background-dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsUiePLbzFLOD_5nw2nZ696u1sKa8i3jUxmKgLjW_gi0hudjeXMKPvrO_-34vCwk737b2nMH0os1Qrrcn2MAdrbvyvS78U8oQDfh4itUutv-TsRXDTrqKHfFqjh3DbhHK8ALHL5OycSPzEyPK9hlSQ8OzDniQFpz__Ykw6uNdHShTOyt8oRhIOHJMt3TRvndA_Vf1K9ZCtXsqoNBNFq5pH6Ao9S19glDeF4cRt6xNx3XnZSlWQeVbMDIc4cgZFT_BTQyBFHza5sA3N"
          alt="World map background abstract"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/90 to-background-dark"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-tight mb-6">
          Sərhədsiz <span className="text-highlight italic">Təhsil</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-4xl mx-auto font-light leading-relaxed">
          Varan Colleges olaraq tələbələrimizi ABŞ, Kanada, Avstraliya, Avropa ölkələri və Türkiyədə yerləşən universitet və kolleclərə yönləndiririk. Məqsədimiz yalnız qəbul almaq deyil, tələbənin düzgün ölkə, düzgün ixtisas və düzgün universitet seçməsinə peşəkar şəkildə dəstək olmaqdır.
        </p>
      </div>
    </section>
  );
};

export default Hero;
