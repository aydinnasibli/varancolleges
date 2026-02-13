import Link from "next/link";
import Image from "next/image";
import { Program } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";
import { Flag, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const imageUrl = program.image ? urlFor(program.image).url() : "";

  return (
    <Link
      href={`/study-abroad/${program.slug?.current}`}
      className="glass-card rounded-xl overflow-hidden group cursor-pointer relative h-full flex flex-col"
    >
      <div className="relative h-56 overflow-hidden w-full">
        <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={program.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        )}
        {program.rank && (
          <div className="absolute top-4 right-4 z-20 bg-accent text-primary px-3 py-1 text-xs font-bold uppercase rounded-sm tracking-wide">
            {program.rank}
          </div>
        )}
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="w-4 h-4 text-accent" />
          <span className="text-accent text-xs font-bold uppercase tracking-widest">
            {program.country?.name}
          </span>
        </div>

        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors">
          {program.title}
        </h3>

        <p className="text-slate-400 text-sm font-light mb-6 flex-grow line-clamp-3">
          {program.description}
        </p>

        {program.features && program.features.length > 0 && (
          <ul className="space-y-2 mb-8 border-t border-white/5 pt-4">
            {program.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="inline-flex items-center text-white text-sm font-medium hover:text-accent transition-colors group/link mt-auto">
          Ətraflı bax
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
