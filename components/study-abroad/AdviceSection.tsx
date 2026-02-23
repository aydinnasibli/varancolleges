import { BarChart3, Compass, Scale, Wallet } from "lucide-react";

const adviceItems = [
  {
    icon: BarChart3,
    text: "Tələbənin akademik göstəricilərinin təhlili",
  },
  {
    icon: Compass,
    text: "Maraqlarına və gələcək planlarına uyğun ixtisas seçimi",
  },
  {
    icon: Scale,
    text: "Ölkə və universitet müqayisəsi",
  },
  {
    icon: Wallet,
    text: "Büdcəyə uyğun seçimlərin təqdim olunması",
  },
];

const AdviceSection = () => {
  return (
    <section className="py-20 bg-background-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Akademik Məsləhət və <span className="text-accent">Karyera Planlaması</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Biz qərarı tələbənin əvəzinə vermirik – düzgün qərar verməsi üçün real və obyektiv məlumat təqdim edirik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adviceItems.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-xl flex flex-col items-center text-center group hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-8 h-8 text-accent" />
              </div>
              <p className="text-slate-300 font-medium text-lg leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdviceSection;
