import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard | VaranColleges",
  description: "VaranColleges Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="font-sans antialiased text-slate-900 bg-[#f6f6f8] min-h-screen">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="flex h-full grow flex-col">
            <AdminHeader />
            <div className="flex flex-1 overflow-hidden">
              <AdminSidebar />
              <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:px-12 bg-[#f6f6f8]">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
