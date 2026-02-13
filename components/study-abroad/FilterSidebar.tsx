"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Filter } from "lucide-react";

const DEGREES = [
  { id: "bachelor", label: "Bakalavr" },
  { id: "master", label: "Magistratura" },
  { id: "phd", label: "Doktorantura (PhD)" },
  { id: "language", label: "Dil Kursları" },
];

const COUNTRIES = [
  { id: "usa", label: "ABŞ" },
  { id: "uk", label: "Böyük Britaniya" },
  { id: "canada", label: "Kanada" },
  { id: "germany", label: "Almaniya" },
  { id: "turkey", label: "Türkiyə" },
];

const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(name)?.split(",") || [];

      if (current.includes(value)) {
        // Remove
        const next = current.filter((c) => c !== value);
        if (next.length === 0) {
          params.delete(name);
        } else {
          params.set(name, next.join(","));
        }
      } else {
        // Add
        current.push(value);
        params.set(name, current.join(","));
      }

      return params.toString();
    },
    [searchParams]
  );

  const clearFilters = () => {
    router.push("/study-abroad");
  };

  const handleCheckboxChange = (name: string, value: string) => {
    router.push(`/study-abroad?${createQueryString(name, value)}`, { scroll: false });
  };

  const isChecked = (name: string, value: string) => {
    const params = searchParams.get(name)?.split(",") || [];
    return params.includes(value);
  };

  return (
    <div className="glass-panel p-6 rounded-lg sticky top-24">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h3 className="text-xl font-serif text-white">Filterləmə</h3>
        <Filter className="w-5 h-5 text-accent" />
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
          Təhsil Dərəcəsi
        </h4>
        <div className="space-y-3">
          {DEGREES.map((degree) => (
            <label key={degree.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked("degree", degree.id)}
                onChange={() => handleCheckboxChange("degree", degree.id)}
                className="form-checkbox h-4 w-4 text-accent border-slate-600 rounded bg-transparent focus:ring-accent accent-accent transition duration-200"
              />
              <span className="text-slate-400 group-hover:text-white transition-colors text-sm">
                {degree.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
          Ölkələr
        </h4>
        <div className="space-y-3">
          {COUNTRIES.map((country) => (
            <label key={country.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked("country", country.id)}
                onChange={() => handleCheckboxChange("country", country.id)}
                className="form-checkbox h-4 w-4 text-accent border-slate-600 rounded bg-transparent focus:ring-accent accent-accent transition duration-200"
              />
              <span className="text-slate-400 group-hover:text-white transition-colors text-sm">
                {country.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm text-sm font-medium transition-all cursor-pointer"
      >
        Filteri Təmizlə
      </button>
    </div>
  );
};

export default FilterSidebar;
