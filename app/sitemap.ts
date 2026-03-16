import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/data';
import { servicesData } from '@/lib/services-data';

const host = 'https://www.varancolleges.com';

function getEntries(path: string, priority: number, changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'always' | 'hourly' | 'daily' | 'never', lastModified?: Date): MetadataRoute.Sitemap {
  // Determine if it's root
  const isRoot = path === '';

  const azUrl = isRoot ? host : `${host}/${path}`;
  const enUrl = isRoot ? `${host}/en` : `${host}/en/${path}`;

  const alternates = {
    languages: {
      az: azUrl,
      en: enUrl,
      // x-default tells search engines which page to show when no other language matches
      'x-default': azUrl,
    },
  };

  return [
    {
      url: azUrl,
      lastModified: lastModified || new Date(),
      changeFrequency,
      priority,
      alternates,
    },
    {
      url: enUrl,
      lastModified: lastModified || new Date(),
      changeFrequency,
      priority,
      alternates,
    }
  ];
}

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const studyAbroadDestinations = ['usa', 'canada', 'australia', 'europe', 'turkey', 'uk'];

  const staticEntries = [
    ...getEntries('', 1, 'yearly'),
    ...getEntries('about', 0.8, 'monthly'),
    ...getEntries('services', 0.8, 'weekly'),
    ...getEntries('contact', 0.5, 'yearly'),
    ...getEntries('study-abroad', 0.9, 'weekly'),
    ...getEntries('blog', 0.7, 'weekly'),
  ];

  const serviceEntries = servicesData.flatMap((service) =>
    getEntries(`services/${service.slug}`, 0.8, 'monthly')
  );

  const studyAbroadEntries = studyAbroadDestinations.flatMap((dest) =>
    getEntries(`study-abroad/${dest}`, 0.8, 'monthly')
  );

  const postEntries = posts.flatMap((post) =>
    getEntries(`blog/${post.slug.current}`, 0.7, 'monthly', new Date(post.publishedAt))
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...studyAbroadEntries,
    ...postEntries,
  ];
}
