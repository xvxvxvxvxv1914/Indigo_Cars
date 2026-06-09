import type { MetadataRoute } from 'next';

const BASE = 'https://indigocars.eu';
const LOCALES = ['bg', 'ro', 'en', 'ru'];

const PAGES: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/b2b', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const page of PAGES) {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}${page.path}`]));
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }
  return entries;
}
