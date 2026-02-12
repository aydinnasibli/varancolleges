import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VaranColleges",
  description: "Xaricdə Təhsil və Hazırlıq Mərkəzi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} font-sans antialiased bg-background-dark text-slate-300 selection:bg-accent selection:text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
