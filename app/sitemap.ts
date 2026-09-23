import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/data';
import { servicesData } from '@/lib/services-data';
import { getStudyAbroadData } from '@/lib/data/study-abroad';
import { getActiveExams } from '@/app/actions/exam-public';
import { localeUrl, languageAlternates } from '@/lib/seo';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

// A page that exists in both AZ and EN: one <url> per locale, each listing
// both as hreflang alternates. lastModified is only set when we actually know
// it — a "now" timestamp on every request teaches Google to ignore lastmod.
function bilingual(path: string, priority: number, changeFrequency: ChangeFrequency, lastModified?: Date): MetadataRoute.Sitemap {
  const alternates = { languages: languageAlternates(path) };
  return (['az', 'en'] as const).map((locale) => ({
    url: localeUrl(locale, path),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
    alternates,
  }));
}

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, studyAbroad, examsResult] = await Promise.all([
    getPosts(),
    getStudyAbroadData('az'),
    getActiveExams(),
  ]);

  const latestPost = posts.reduce<Date | undefined>((latest, post) => {
    const d = new Date(post.publishedAt);
    return !latest || d > latest ? d : latest;
  }, undefined);

  const staticEntries = [
    ...bilingual('', 1, 'weekly'),
    ...bilingual('services', 0.9, 'monthly'),
    ...bilingual('study-abroad', 0.9, 'monthly'),
    ...bilingual('about', 0.7, 'yearly'),
    ...bilingual('contact', 0.7, 'yearly'),
    ...bilingual('blog', 0.8, 'weekly', latestPost),
    ...bilingual('exam', 0.7, 'weekly'),
  ];

  const serviceEntries = servicesData.flatMap((service) =>
    bilingual(`services/${service.slug}`, 0.8, 'monthly')
  );

  const studyAbroadEntries = studyAbroad.countries.flatMap((country) =>
    bilingual(`study-abroad/${country.slug}`, 0.8, 'monthly')
  );

  const examEntries = (examsResult.success ? examsResult.exams : [])
    .filter((exam) => typeof exam.slug === 'string' && exam.slug)
    .flatMap((exam) =>
      bilingual(
        `exam/${exam.slug}`,
        0.5,
        'weekly',
        exam.updatedAt ? new Date(exam.updatedAt) : undefined
      )
    );

  // Posts are Azerbaijani-only; /en/blog/<slug> canonicalises to the AZ URL,
  // so only the canonical URL belongs in the sitemap.
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: localeUrl('az', `blog/${post.slug.current}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...studyAbroadEntries,
    ...examEntries,
    ...postEntries,
  ];
}
