import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Search, GraduationCap } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-10 py-3 sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <Link href="/admin" className="flex items-center gap-4 text-[#1152d4]">
          <div className="size-6 flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">
            VaranColleges Admin
          </h2>
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 bg-[#f6f6f8] focus-within:ring-2 focus-within:ring-[#1152d4]/50 transition-shadow">
            <div className="text-slate-500 flex items-center justify-center pl-4 rounded-l-lg">
              <Search className="h-5 w-5" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-slate-900 focus:outline-0 focus:ring-0 border-none bg-transparent placeholder:text-slate-500 px-4 pl-2 text-sm font-normal leading-normal"
              placeholder="Search"
              defaultValue=""
            />
          </div>
        </label>
        <div className="flex items-center justify-center">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
