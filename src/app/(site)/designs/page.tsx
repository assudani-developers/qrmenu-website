import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchCatalog, type Catalog } from '@/lib/api';
import { SITE } from '@/lib/site';
import MenuDesign, { type MenuTemplate } from '@/components/showcase/MenuDesign';
import QrDesign, { type QrTheme } from '@/components/showcase/QrDesign';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Menu & QR designs',
  description: 'Every ready-made QR menu design and printable QR card design in QR Menu Pro: classic, café, street food, fine dining, neon bar and more.',
  alternates: { canonical: '/designs' },
};

/** The cheapest plan that includes a design, e.g. "Starter". */
function planFor(c: Catalog, key: 'templates' | 'qrThemes', id: string) {
  const p = [...c.plans].sort((a, b) => a.price - b.price).find((x) => (x.features[key] || []).includes(id));
  return p ? { name: p.name, top: p.id === [...c.plans].sort((a, b) => b.price - a.price)[0].id } : null;
}

const Tag = ({ p }: { p: { name: string; top: boolean } | null }) =>
  p ? <span className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-extrabold ${p.top ? 'haldi' : 'bg-white text-muted shadow-sm'}`}>{p.top ? `${p.name} only` : `From ${p.name}`}</span> : null;

export default async function Designs() {
  const c = await fetchCatalog();
  if (!c) return <main className="mx-auto max-w-6xl px-5 py-20"><h1 className="font-display text-5xl font-extrabold">Designs</h1><p className="mt-4 text-muted">Designs could not load right now. Refresh in a minute.</p></main>;
  const tpls = c.templates as unknown as MenuTemplate[];
  const qrs = c.qrThemes as unknown as QrTheme[];
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:pt-20">
        <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[1] sm:text-6xl">Pick a look. It works on every phone.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{tpls.length} menu designs and {qrs.length} printable QR designs, made by us. Switch any time from the app: your printed QR keeps working.</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10" aria-labelledby="menu-designs">
        <h2 id="menu-designs" className="font-display text-3xl font-extrabold sm:text-4xl">Menu designs</h2>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {tpls.map((t, i) => (
            <Reveal key={t.id} delay={(i % 4) * 0.06}>
              <MenuDesign t={t} />
              <div className="mt-4 flex items-center justify-between gap-2 px-1"><h3 className="text-lg font-extrabold">{t.name}</h3><Tag p={planFor(c, 'templates', t.id)} /></div>
              <p className="px-1 text-sm text-muted">{t.blurb}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10" aria-labelledby="qr-designs">
        <h2 id="qr-designs" className="font-display text-3xl font-extrabold sm:text-4xl">QR designs</h2>
        <p className="mt-2 max-w-xl text-muted">Real codes: scan any of them with your phone camera.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {qrs.map((t, i) => (
            <Reveal key={t.id} delay={(i % 5) * 0.05}>
              <QrDesign t={t} url={`${SITE}/designs`} />
              <div className="mt-3 flex items-center justify-between gap-2 px-1"><h3 className="font-extrabold">{t.name}</h3><Tag p={planFor(c, 'qrThemes', t.id)} /></div>
              <p className="px-1 text-sm text-muted">{t.blurb}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="jamun flex flex-wrap items-center justify-between gap-6 rounded-[32px] p-8 sm:p-10">
          <div><h2 className="font-display text-3xl font-extrabold">See your own menu in these designs</h2><p className="mt-2 text-white/70">Start a free trial, photograph your menu and switch designs in one tap.</p></div>
          <Link href="/download" className="haldi inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-extrabold">Start free<ArrowRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
