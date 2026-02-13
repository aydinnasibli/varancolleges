import { client } from "@/lib/sanity";
import { Program } from "@/types/sanity";
import ProgramCard from "./ProgramCard";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProgramListProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getPrograms(searchParams: Promise<{ [key: string]: string | string[] | undefined }>) {
  const params = await searchParams;
  const degrees = params.degree
    ? (Array.isArray(params.degree) ? params.degree : (params.degree as string).split(","))
    : null;
  const countries = params.country
    ? (Array.isArray(params.country) ? params.country : (params.country as string).split(","))
    : null;

  // GROQ Query
  // Note: This query assumes 'country' field in program is a reference to a 'country' document with a 'slug' field.
  // And 'degrees' is an array of strings.

  // If no filters, fetch all.
  let query = `*[_type == "program"]`;
  const queryParams: any = {};

  const filters = [];

  if (degrees && degrees.length > 0) {
    filters.push(`count(degrees[@ in $degrees]) > 0`);
    queryParams.degrees = degrees;
  }

  if (countries && countries.length > 0) {
    filters.push(`country->slug.current in $countries`);
    queryParams.countries = countries;
  }

  if (filters.length > 0) {
    query += `[${filters.join(" && ")}]`;
  }

  // Projection
  query += `{
    _id,
    title,
    slug,
    country->{name, slug},
    description,
    image,
    degrees,
    features,
    rank
  }`;

  // Execute query
  try {
    const data = await client.fetch<Program[]>(query, queryParams);
    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
}

export default async function ProgramList({ searchParams }: ProgramListProps) {
  const programs = await getPrograms(searchParams);

  if (!programs || programs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-serif text-white mb-2">Proqram tapılmadı</h3>
        <p className="text-slate-400 max-w-md">
          Seçilmiş kriteriyalara uyğun proqram yoxdur. Zəhmət olmasa filterləri dəyişdirin və ya bizimlə əlaqə saxlayın.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-slate-400 text-sm">
          Tapılan nəticələr: <span className="text-white font-semibold">{programs.length} Proqram</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Sıralama:</span>
          <select className="bg-transparent border-none text-white text-sm focus:ring-0 cursor-pointer p-0 font-medium">
            <option>Tövsiyə olunan</option>
            <option>Əlifba sırası (A-Z)</option>
            <option>Populyarlıq</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {programs.map((program) => (
          <ProgramCard key={program._id} program={program} />
        ))}

        {/* "Other Country" Card - Always visible as the last item or separate?
            Design shows it as a card in the grid.
            Let's append it if we have space or just at the end.
        */}
        <div className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col justify-center items-center text-center hover:border-accent transition-colors group h-full min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
            <Search className="w-8 h-8 text-slate-400 group-hover:text-accent transition-colors" />
          </div>
          <h3 className="text-2xl font-serif text-white mb-2">Başqa Ölkə Axtarırsınız?</h3>
          <p className="text-slate-400 text-sm font-light mb-6">
            Siyahıda olmayan ölkələr və proqramlar üçün bizimlə əlaqə saxlayın. Sizin üçün fərdi araşdırma aparaq.
          </p>
          <Link href="#consultation" className="text-accent hover:text-white font-medium text-sm flex items-center transition-colors">
            Müraciət et
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
