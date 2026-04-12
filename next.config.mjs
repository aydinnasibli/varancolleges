import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // CDN caches for 24 h, stale-while-revalidate for 7 days.
    // max-age=0 so browsers always revalidate; s-maxage is for CDN/Vercel edge.
    const STATIC  = 'public, max-age=0, s-maxage=86400,  stale-while-revalidate=604800';
    // CDN caches for 1 h (content changes more often — blog, exam listings).
    const DYNAMIC = 'public, max-age=0, s-maxage=3600,   stale-while-revalidate=86400';
    // Never store — auth-required pages that require a logged-in user.
    const PRIVATE = 'private, no-store, max-age=0';

    // Helper: produces rules for both AZ (no prefix, e.g. /about)
    //         and EN (/en/about) versions of the same page.
    const both = (path, value) => [
      { source: `/${path}`,     headers: [{ key: 'Cache-Control', value }] },
      { source: `/en/${path}`,  headers: [{ key: 'Cache-Control', value }] },
    ];

    return [
      // ── Homepages (AZ = /, EN = /en) ──────────────────────────────────
      { source: '/',    headers: [{ key: 'Cache-Control', value: STATIC }] },
      { source: '/en',  headers: [{ key: 'Cache-Control', value: STATIC }] },

      // ── Static marketing pages ─────────────────────────────────────────
      ...both('about',        STATIC),
      ...both('contact',      STATIC),
      ...both('services',     STATIC),
      ...both('study-abroad', STATIC),
      ...both('services/:slug',     STATIC),
      ...both('study-abroad/:slug', STATIC),

      // ── Blog (shorter TTL — posts update regularly) ────────────────────
      ...both('blog',        DYNAMIC),
      ...both('blog/:slug',  DYNAMIC),

      // ── Exam public listing + detail ───────────────────────────────────
      ...both('exam',        DYNAMIC),
      ...both('exam/:slug',  DYNAMIC),

      // ── Auth-required pages — must never be publicly cached ────────────
      // Clerk already sets Cache-Control: private for authenticated sessions;
      // these rules guard unauthenticated hits (redirected to sign-in).
      ...both('profile',                          PRIVATE),
      ...both('payment',                          PRIVATE),
      ...both('exam/:slug/take',                  PRIVATE),
      ...both('exam/:slug/results/:attemptId',    PRIVATE),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
