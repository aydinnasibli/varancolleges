import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
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
  metadataBase: new URL("https://www.varancolleges.com"),
  title: {
    default: "VaranColleges - Xaricdə Təhsil və Hazırlıq Mərkəzi",
    template: "%s | VaranColleges",
  },
  description:
    "VaranColleges ilə xaricdə təhsil xəyallarınızı gerçəkləşdirin. IELTS, SAT hazırlığı və dünyanın nüfuzlu universitetlərinə qəbul zəmanəti.",
  keywords: [
    "Xaricdə təhsil",
    "IELTS kursları",
    "SAT hazırlığı",
    "Universitetlərə qəbul",
    "Təhsil mərkəzi",
    "Bakı",
    "Azərbaycan",
    "VaranColleges",
  ],
  authors: [{ name: "VaranColleges" }],
  creator: "VaranColleges",
  publisher: "VaranColleges",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VaranColleges - Gələcəyi Kəşf Edin",
    description:
      "VaranColleges ilə xaricdə təhsil xəyallarınızı gerçəkləşdirin. IELTS, SAT hazırlığı və dünyanın nüfuzlu universitetlərinə qəbul zəmanəti.",
    url: "https://www.varancolleges.com",
    siteName: "VaranColleges",
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: "/images/varan-office.webp",
        width: 1200,
        height: 630,
        alt: "VaranColleges Office",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VaranColleges - Xaricdə Təhsil",
    description:
      "VaranColleges ilə xaricdə təhsil xəyallarınızı gerçəkləşdirin. Peşəkar komanda və zəmanətli nəticələr.",
    images: ["/images/varan-office.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.varancolleges.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "VaranColleges",
  url: "https://www.varancolleges.com",
  logo: "https://www.varancolleges.com/images/logo.png",
  image: "https://www.varancolleges.com/images/varan-office.webp",
  description:
    "VaranColleges ilə xaricdə təhsil xəyallarınızı gerçəkləşdirin. IELTS, SAT hazırlığı və dünyanın nüfuzlu universitetlərinə qəbul zəmanəti.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "137A Samad Vurgun",
    addressLocality: "Baku",
    postalCode: "1022",
    addressCountry: "AZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+994-77-188-50-50",
    email: "info@varancolleges.com",
    contactType: "customer service",
    areaServed: "AZ",
    availableLanguage: ["Azerbaijani", "English", "Russian"],
  },
  sameAs: [
    "https://www.instagram.com/varancollegesltd/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
