import { Suspense } from 'react';
import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';

export const metadata: Metadata = { title: 'Menu', robots: { index: false } };

/** Permanent QR link: /m/<short code>. The code never changes, so printed QR codes never break. */
export default async function MenuPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f4f4f2]" />}>
      <MenuClient code={code} />
    </Suspense>
  );
}
