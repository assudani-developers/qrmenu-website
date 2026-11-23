import Link from 'next/link';
import { Camera, QrCode, Sparkles, ConciergeBell, ChefHat, Star, ImagePlus, BellRing, Printer, ArrowRight } from 'lucide-react';
import Plans from '@/components/Plans';
import HeroPhone from '@/components/HeroPhone';
import { fetchCatalog } from '@/lib/api';
import { SITE } from '@/lib/site';
import MenuDesign, { type MenuTemplate } from '@/components/showcase/MenuDesign';
import QrDesign, { type QrTheme } from '@/components/showcase/QrDesign';

const stepsFor = (nTpl: string, nQr: string) => [
  [Camera, 'Photograph your paper menu', 'Our offline reader picks up every dish, price, section and veg mark. It tells you straight away if a photo is blurry.'],
  [Sparkles, 'Pick a ready-made design', `${nTpl} premium menu designs made by us. No colour pickers to fight with: choose one and it looks right on every phone.`],
  [QrCode, 'Print your QR once', 'Every restaurant gets a permanent short link. Change prices or dishes anytime and the printed QR keeps working.'],
];
const featuresFor = (nTpl: string, nQr: string) => [
  [ImagePlus, 'Photos guests can swipe', 'Add a photo to every dish (up to 3 on Growth and Ultra) and guests swipe through them like a story.'],
  [ConciergeBell, 'Order from the table', 'Guests order from their phone with no app to install. Prices are checked by the server, never by the phone.'],
  [ChefHat, 'Live kitchen screen', 'Orders land in the app with a sound and a printed-slip animation. Move them from New to Cooking to Ready.'],
  [BellRing, 'Call waiter and ask for bill', 'One tap at the table and your phone rings with the table number.'],
  [Star, 'More Google reviews', 'Happy guests go to your Google page. Unhappy ones talk to you privately first.'],
  [Printer, 'QR designs worth framing', `${nQr} QR card designs, from plain to gold foil and table tents, ready to print.`],
];

const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const say = (n: number) => words[n] || String(n);

export default async function Home() {
  const c = await fetchCatalog();
  const nTpl = say(c?.templates?.length || 0), nQr = say(c?.qrThemes?.length || 0);
  const steps = stepsFor(c ? nTpl : 'Ready-made', nQr), features = featuresFor(nTpl, c ? nQr : 'Ready-made');
  const trial = c && c.trialEnabled !== false && c.trialDays > 0 ? `${c.trialDays} days free on every plan. No card needed.` : 'No card needed. Pay by UPI when you are ready.';
  // structured data for Google: the product, its plans (live prices) and who makes it
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', name: 'QR Menu Pro', url: SITE, logo: `${SITE}/icon.png?v=1`, brand: ['Assudani Developers', 'Bishnoi Digitals'] },
      {
        '@type': 'SoftwareApplication', name: 'QR Menu Pro', applicationCategory: 'BusinessApplication', operatingSystem: 'Android, iOS, Web', url: SITE,
        description: 'Digital QR menu, table ordering and live kitchen screen for restaurants.',
        offers: (c?.plans || []).map((p) => ({ '@type': 'Offer', name: p.name, price: p.price, priceCurrency: 'INR', url: `${SITE}/pricing` })),
      },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <section className="relative overflow-hidden">
        <div className="glow -right-24 -top-24 size-[480px] bg-[#f5b50a]" /><div className="glow -left-32 top-40 size-[420px] bg-[#b79ad6]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_.9fr] lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-muted shadow-sm"><span className="size-2 rounded-full bg-mint" />{trial}</p>
            <h1 className="mt-6 font-display text-[52px] font-extrabold leading-[.98] sm:text-7xl">Your menu, on every table, in a minute.</h1>
            <p className="mt-6 max-w-xl text-lg text-muted">Snap your paper menu, pick a design and print one QR. Guests see a menu that feels like an app, and you change prices from your phone whenever you like.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="haldi inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-extrabold shadow-[0_16px_34px_-12px_rgba(245,181,10,.8)] transition-transform hover:-translate-y-0.5">Get the app<ArrowRight size={18} /></Link>
              <Link href="/pricing" className="rounded-2xl bg-white px-8 py-4 font-extrabold shadow-sm">See plans</Link>
            </div>
          </div>
          <HeroPhone />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">Three steps. That’s it.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([I, t, d]: any, i) => (
            <div key={t} className="card p-7">
              <div className="flex items-center justify-between"><div className="haldi grid size-12 place-items-center rounded-2xl"><I size={22} /></div><span className="font-display text-5xl font-extrabold text-ink/10">{i + 1}</span></div>
              <h3 className="mt-6 text-xl font-extrabold">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {c && c.templates.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-14" aria-labelledby="looks">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="looks" className="font-display text-4xl font-extrabold sm:text-5xl">Looks you can switch in one tap</h2>
              <p className="mt-3 max-w-xl text-muted">From a calm café to a gold-and-black fine-dine. Same dishes, new feel.</p>
            </div>
            <Link href="/designs" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-extrabold shadow-sm">See all designs<ArrowRight size={17} /></Link>
          </div>
          <div className="-mx-5 mt-10 flex snap-x gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none]">
            {(['haveli', 'chaat', 'garden', 'luxe', 'maharaja', 'neon'].map((id) => c.templates.find((t) => t.id === id)).filter(Boolean) as unknown as MenuTemplate[]).map((t) => (
              <div key={t.id} className="shrink-0 snap-start"><MenuDesign t={t} /><p className="mt-3 text-center font-extrabold">{t.name}</p></div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(['classic', 'forest', 'noir', 'tent'].map((id) => c.qrThemes.find((t) => t.id === id)).filter(Boolean) as unknown as QrTheme[]).map((t) => (
              <div key={t.id}><QrDesign t={t} url={`${SITE}/designs`} /><p className="mt-2 text-center text-sm font-extrabold">{t.name}</p></div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="jamun overflow-hidden rounded-[36px] p-8 sm:p-12">
          <h2 className="max-w-xl font-display text-4xl font-extrabold sm:text-5xl">Built for busy Indian kitchens</h2>
          <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([I, t, d]: any) => (
              <div key={t}>
                <I className="text-lux" size={26} />
                <h3 className="mt-3 text-lg font-extrabold">{t}</h3>
                <p className="mt-1.5 text-sm text-white/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-center font-display text-4xl font-extrabold sm:text-5xl">Simple monthly plans</h2>
        <p className="mb-14 mt-3 text-center text-muted">Unlimited dishes and unlimited scans on every plan. Pay by UPI when you are ready.</p>
        <Plans />
      </section>
    </main>
  );
}
