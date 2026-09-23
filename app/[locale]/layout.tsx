import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

import { getTranslations } from "next-intl/server";

import { SITE_URL, SITE_NAME, jsonLdGraph, organizationJsonLd, websiteJsonLd, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#0C1F3F",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  // Defaults for any route that doesn't define its own metadata. Pages
  // override title/description/canonical/openGraph via pageMetadata().
  const defaults = pageMetadata({
    locale,
    path: "",
    title: t('homeTitle'),
    absoluteTitle: true,
    description: t('description'),
  });

  return {
    ...defaults,
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('homeTitle'),
      template: `%s | ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // Canonical/hreflang are page-specific; never inherit the homepage's.
    alternates: undefined,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    appleWebApp: {
      title: SITE_NAME,
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

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ClerkProvider } from "@clerk/nextjs";
import { ensureUserInDb } from "@/lib/ensure-user";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({locale});

  // Ensure signed-in user exists in DB (primary sync is via Clerk webhook;
  // this catches webhook failures, pre-existing users, and race conditions)
  await ensureUserInDb();

  return (
    // afterSignOutUrl is required here: Clerk v7 (Core 3) removed the
    // per-component sign-out redirect props from <UserButton>.
    <ClerkProvider afterSignOutUrl="/">
      <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth">
        <body
          className={`${cormorant.variable} ${plusJakarta.variable} font-sans antialiased bg-white text-navy selection:bg-accent/20 selection:text-navy`}
        >
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={jsonLdGraph(organizationJsonLd(locale), websiteJsonLd(locale))} />
            <Script
              strategy="afterInteractive"
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon='{"token": "1d9b481741fb4b02ac93c816ca4a0371"}'
            />
            {children}
            <WhatsAppFloat />
            <Toaster position="bottom-left" />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
