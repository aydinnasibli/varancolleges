"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blog İdarəetmə", href: "/admin/blogs", icon: FileText },
  { name: "Müraciətlər", href: "/admin/inquiries", icon: Mail, badge: "3" },
  { name: "Settings", href: "/admin/settings", icon: Settings, pushDown: true },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col py-6 overflow-y-auto min-h-[calc(100vh-65px)]">
      <div className="flex flex-col gap-2 px-4 h-full">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                isActive
                  ? "bg-[#1152d4]/10 text-[#1152d4]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                item.pushDown && "mt-auto"
              )}
            >
              <Icon
                className={cn(
                  "h-[22px] w-[22px]",
                  isActive ? "text-[#1152d4]" : "text-slate-600 group-hover:text-slate-900"
                )}
              />
              <span className="text-sm font-medium leading-normal">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-[#1152d4] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
