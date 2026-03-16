import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

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

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const headersList = await headers();
  const rawPathname = headersList.get('x-pathname') || '/';

  // Strip '/en' prefix to get the bare path for canonical/hreflang calculation
  const barePath = rawPathname.startsWith('/en')
    ? rawPathname.replace('/en', '')
    : rawPathname;

  // Ensure we don't end up with an empty string, fallback to '/'
  const normalizedPath = barePath === '' ? '/' : barePath;

  const baseUrl = "https://www.varancolleges.com";
  const azUrl = normalizedPath === '/' ? baseUrl : `${baseUrl}${normalizedPath}`;
  const enUrl = normalizedPath === '/' ? `${baseUrl}/en` : `${baseUrl}/en${normalizedPath}`;

  const currentUrl = locale === 'az' ? azUrl : enUrl;

  return {
    metadataBase: new URL("https://www.varancolleges.com"),
    title: {
      default: t('title'),
      template: "%s | VaranColleges",
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: "VaranColleges" }],
    creator: "VaranColleges",
    publisher: "VaranColleges",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'az': azUrl,
        'en': enUrl,
        'x-default': azUrl,
      },
    },
    openGraph: {
      title: t('openGraphTitle'),
      description: t('openGraphDescription'),
      url: currentUrl,
      siteName: "VaranColleges",
      locale: locale === 'az' ? 'az_AZ' : 'en_US',
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
      title: t('twitterTitle'),
      description: t('twitterDescription'),
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
  };
}

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

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({locale});

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} font-sans antialiased bg-background-dark text-slate-300 selection:bg-accent selection:text-primary`}
      >
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {/* Cloudflare Web Analytics */}
          <script
            defer
            src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon='{"token": "1d9b481741fb4b02ac93c816ca4a0371"}'
          ></script>
          {/* End Cloudflare Web Analytics */}
          {children}
          <Toaster position="bottom-left" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
