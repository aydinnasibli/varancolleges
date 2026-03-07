import { MetadataRoute } from 'next';

const host = 'https://www.varancolleges.com';

function getEntry(path: string, priority: number, changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'always' | 'hourly' | 'daily' | 'never'): MetadataRoute.Sitemap[0] {
  // Determine if it's root
  const isRoot = path === '';

  const azUrl = isRoot ? host : `${host}/${path}`;
  const enUrl = isRoot ? `${host}/en` : `${host}/en/${path}`;

  return {
    url: azUrl, // The default locale URL serves as the main entry
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        az: azUrl,
        en: enUrl,
        // x-default tells search engines which page to show when no other language matches
        'x-default': azUrl,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry('', 1, 'yearly'),
    getEntry('about', 0.8, 'monthly'),
    getEntry('services', 0.8, 'weekly'),
    getEntry('contact', 0.5, 'yearly'),
    getEntry('study-abroad', 0.9, 'weekly'),
    getEntry('blog', 0.7, 'weekly'),
  ];
}
