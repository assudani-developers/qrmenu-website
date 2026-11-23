import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  return ['', '/pricing', '/download', '/contact', '/privacy', '/terms', '/refund'].map((p) => ({ url: base + p, lastModified: new Date() }));
}
