import type { Metadata } from "next";

export const SITE_URL = "https://www.varancolleges.com";
export const SITE_NAME = "VaranColleges";
export const DEFAULT_OG_IMAGE = "/images/og-image.png";
export const LOGO_URL = `${SITE_URL}/images/logo.png`;

export type Locale = "az" | "en";

const OG_LOCALE: Record<Locale, string> = { az: "az_AZ", en: "en_US" };

function asLocale(locale: string): Locale {
  return locale === "en" ? "en" : "az";
}

/** Absolute URL of `path` in `locale`. AZ is the default locale and has no prefix. */
export function localeUrl(locale: string, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = asLocale(locale) === "en" ? "/en" : "";
  if (!clean) return `${SITE_URL}${prefix}`;
  return `${SITE_URL}${prefix}/${clean}`;
}

/** hreflang map for a page that exists in both languages. */
export function languageAlternates(path = "") {
  return {
    az: localeUrl("az", path),
    en: localeUrl("en", path),
    "x-default": localeUrl("az", path),
  };
}

/**
 * Unsplash hero images are ~2700px wide. Ask the CDN for an exact 1200x630
 * crop so the size we declare in og:image:width/height is the size served.
 */
export function ogImageFromUnsplash(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname !== "images.unsplash.com") return url;
    u.search = "";
    u.searchParams.set("w", "1200");
    u.searchParams.set("h", "630");
    u.searchParams.set("fit", "crop");
    u.searchParams.set("auto", "format");
    u.searchParams.set("q", "80");
    return u.toString();
  } catch {
    return url;
  }
}

type OgImage = { url: string; width?: number; height?: number; alt?: string };

interface PageMetadataOptions {
  locale: string;
  /** Route path without locale prefix, e.g. "about" or "blog/my-post". "" for home. */
  path: string;
  title: string;
  description: string;
  /** Use `title` as-is instead of appending the "| VaranColleges" template. */
  absoluteTitle?: boolean;
  image?: OgImage;
  type?: "website" | "article";
  /** For articles: ISO dates. */
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * "both": page exists in AZ and EN (default).
   * "az": content is Azerbaijani only (e.g. blog posts) — every locale
   *   canonicalises to the AZ URL and no hreflang is emitted.
   */
  languages?: "both" | "az";
  noindex?: boolean;
}

/**
 * Builds a complete Metadata object. Next.js replaces (not merges) nested
 * objects like `openGraph` between layout and page, so every page must set
 * siteName/locale/type itself — this keeps that consistent.
 */
export function pageMetadata(opts: PageMetadataOptions): Metadata {
  const locale = asLocale(opts.locale);
  const languages = opts.languages ?? "both";
  const canonical = languages === "az" ? localeUrl("az", opts.path) : localeUrl(locale, opts.path);
  const image: OgImage = opts.image ?? {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} — Language & Education Center, Baku`,
  };
  const socialTitle = opts.absoluteTitle ? opts.title : `${opts.title} | ${SITE_NAME}`;
  // Google truncates snippets at ~160 characters; cut on a word boundary ourselves.
  const description = truncate(opts.description.replace(/\s+/g, " ").trim(), 160);

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description,
    alternates: {
      canonical,
      ...(languages === "both" ? { languages: languageAlternates(opts.path) } : {}),
    },
    openGraph: {
      type: opts.type ?? "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[languages === "az" ? "az" : locale],
      ...(languages === "both"
        ? { alternateLocale: [OG_LOCALE[locale === "az" ? "en" : "az"]] }
        : {}),
      url: canonical,
      title: socialTitle,
      description,
      images: [image],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ───────────────────────────── JSON-LD ───────────────────────────── */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd(locale: string) {
  const isEn = asLocale(locale) === "en";
  return {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "Varan Colleges",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 522,
      height: 640,
      caption: SITE_NAME,
    },
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    description: isEn
      ? "Study abroad consultancy and exam preparation center in Baku: IELTS, SAT, TOEFL, GRE, GMAT courses and university admissions support."
      : "Bakıda xaricdə təhsil üzrə məsləhət və imtahan hazırlığı mərkəzi: IELTS, SAT, TOEFL, GRE, GMAT kursları və universitetlərə qəbul dəstəyi.",
    foundingDate: "2016",
    telephone: "+994771885050",
    email: "info@varancolleges.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "22:00",
    },
    hasMap: "https://maps.google.com/maps?q=137A%20Samad%20Vurgun,%20Baku",
    address: {
      "@type": "PostalAddress",
      streetAddress: "137A Samad Vurgun",
      addressLocality: "Baku",
      postalCode: "AZ1022",
      addressCountry: "AZ",
    },
    areaServed: { "@type": "Country", name: "Azerbaijan" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+994771885050",
      email: "info@varancolleges.com",
      contactType: "customer service",
      areaServed: "AZ",
      availableLanguage: ["az", "en", "ru"],
    },
    sameAs: ["https://www.instagram.com/varancollegesltd/"],
  };
}

export function websiteJsonLd(locale: string) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "Varan Colleges",
    inLanguage: asLocale(locale),
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** `items` are [name, path] pairs after Home; path "" is not allowed here. */
export function breadcrumbJsonLd(locale: string, homeName: string, items: [string, string][]) {
  const all: [string, string][] = [[homeName, ""], ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: localeUrl(locale, path),
    })),
  };
}

export function jsonLdGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Plain-text meta description for a post: excerpt, else the start of the body. */
export function postDescription(post: { title: string; excerpt?: string; body?: string }): string {
  const source = post.excerpt?.trim() || stripHtml(post.body ?? "") || post.title;
  return truncate(source, 160);
}

function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—-]+$/, "")}…`;
}
