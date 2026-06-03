import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://autoimport.bg', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://autoimport.bg/b2b', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
