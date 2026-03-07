import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/data';
import { servicesData } from '@/lib/services-data';

const host = 'https://www.varancolleges.com';

function getEntry(path: string, priority: number, changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'always' | 'hourly' | 'daily' | 'never', lastModified?: Date): MetadataRoute.Sitemap[0] {
  // Determine if it's root
  const isRoot = path === '';

  const azUrl = isRoot ? host : `${host}/${path}`;
  const enUrl = isRoot ? `${host}/en` : `${host}/en/${path}`;

  return {
    url: azUrl, // The default locale URL serves as the main entry
    lastModified: lastModified || new Date(),
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

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const studyAbroadDestinations = ['usa', 'canada', 'australia', 'europe', 'turkey', 'uk'];

  const staticEntries = [
    getEntry('', 1, 'yearly'),
    getEntry('about', 0.8, 'monthly'),
    getEntry('services', 0.8, 'weekly'),
    getEntry('contact', 0.5, 'yearly'),
    getEntry('study-abroad', 0.9, 'weekly'),
    getEntry('blog', 0.7, 'weekly'),
  ];

  const serviceEntries = servicesData.map((service) =>
    getEntry(`services/${service.slug}`, 0.8, 'monthly')
  );

  const studyAbroadEntries = studyAbroadDestinations.map((dest) =>
    getEntry(`study-abroad/${dest}`, 0.8, 'monthly')
  );

  const postEntries = posts.map((post) =>
    getEntry(`blog/${post.slug.current}`, 0.7, 'weekly', new Date(post.publishedAt))
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...studyAbroadEntries,
    ...postEntries,
  ];
}
