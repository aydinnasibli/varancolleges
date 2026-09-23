import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'VaranColleges — Xaricdə Təhsil və İmtahan Hazırlığı',
    short_name: 'VaranColleges',
    description: 'Bakıda xaricdə təhsil üzrə məsləhət və IELTS, SAT, TOEFL, GRE, GMAT hazırlığı.',
    lang: 'az',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    // Matches the cream background baked into the icons so the splash screen is seamless.
    background_color: '#F7F2ED',
    theme_color: '#0C1F3F',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
