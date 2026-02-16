import { Quote } from "lucide-react";
import Image from "next/image";
import { getTestimonials } from "@/lib/data";
import { urlFor } from "@/lib/sanity";

const Testimonials = async () => {
  const testimonials = await getTestimonials();

  const getImageUrl = (image: any) => {
    if (image?.asset?.url) return image.asset.url;
    if (image) return urlFor(image).url();
    return "";
  };

  return (
    <section className="py-24 bg-[#080c14] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-3">Tələbələrimizin Uğurları</h2>
          <h3 className="text-4xl font-serif text-white">Bizim Haqqımızda Deyilənlər</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
             const imageUrl = getImageUrl(testimonial.image);

             return (
              <div key={testimonial._id} className="bg-[#0f1623] border border-white/5 p-8 rounded-2xl relative group hover:border-accent/30 transition-colors duration-300">
                <div className="absolute top-8 right-8 text-accent/20 group-hover:text-accent/40 transition-colors">
                  <Quote className="w-10 h-10" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-accent/20 group-hover:border-accent transition-colors">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white group-hover:text-accent transition-colors">{testimonial.name}</h4>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed italic relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
