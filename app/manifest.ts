import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VaranColleges',
    short_name: 'VaranColleges',
    description: 'Xaricdə təhsil üzrə peşəkar məsləhət xidməti',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1120',
    theme_color: '#0B1120',
    // Manifest icons must be square; the old 248x220 logo was not.
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
