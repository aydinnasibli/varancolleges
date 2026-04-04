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
    icons: [
      {
        src: '/images/logo.png',
        sizes: '248x220',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
