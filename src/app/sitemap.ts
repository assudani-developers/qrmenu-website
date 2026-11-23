import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['', 1, 'weekly'], ['/designs', 0.9, 'weekly'], ['/pricing', 0.9, 'weekly'], ['/download', 0.8, 'monthly'],
    ['/contact', 0.5, 'yearly'], ['/privacy', 0.3, 'yearly'], ['/terms', 0.3, 'yearly'], ['/refund', 0.3, 'yearly'],
  ];
  return pages.map(([p, priority, changeFrequency]) => ({ url: SITE + p, lastModified: new Date(), changeFrequency, priority }));
}
