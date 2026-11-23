import { Suspense } from 'react';
import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';

import { API } from '@/lib/api';

/** Each restaurant's menu gets its own title and description ("Saffron Courtyard menu · Jaipur") for Google and link previews. */
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  try {
    const r = await fetch(`${API}/api/menu/${encodeURIComponent(code)}`, { next: { revalidate: 300 } });
    if (!r.ok) return { title: 'Menu', robots: { index: false } };
    const j = await r.json();
    const rest = j.restaurant || {};
    const where = [rest.city, rest.cuisine].filter(Boolean).join(' · ');
    const n = (j.items || []).length;
    const title = `${rest.name || 'Menu'} menu${rest.city ? ` · ${rest.city}` : ''}`;
    const description = `${rest.name || 'Our'} menu${where ? ` (${where})` : ''}: ${n ? `${n} dishes with prices, ` : ''}veg and non-veg marked. ${rest.theme?.welcome || rest.tagline || 'Order from your table.'}`.slice(0, 160);
    return {
      title: { absolute: title }, description, alternates: { canonical: `/m/${code}` },
      openGraph: { title, description, type: 'website', ...(rest.theme?.coverUrl ? { images: [rest.theme.coverUrl] } : {}) },
      robots: { index: rest.live !== false, follow: true },
    };
  } catch {
    return { title: 'Menu' };
  }
}

/** Permanent QR link: /m/<short code>. The code never changes, so printed QR codes never break. */
export default async function MenuPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f4f4f2]" />}>
      <MenuClient code={code} />
    </Suspense>
  );
}
