import Link from 'next/link';
import { Camera, QrCode, Sparkles, ConciergeBell, ChefHat, Star, ImagePlus, BellRing, Printer, ArrowRight } from 'lucide-react';
import Plans from '@/components/Plans';
import HeroPhone from '@/components/HeroPhone';

const steps = [
  [Camera, 'Photograph your paper menu', 'Our offline reader picks up every dish, price, section and veg mark. It tells you straight away if a photo is blurry.'],
  [Sparkles, 'Pick a ready-made design', 'Ten premium menu designs made by us. No colour pickers to fight with: choose one and it looks right on every phone.'],
  [QrCode, 'Print your QR once', 'Every restaurant gets a permanent short link. Change prices or dishes anytime and the printed QR keeps working.'],
];
const features = [
  [ImagePlus, 'Photos guests can swipe', 'Add a photo to every dish (up to 3 on Growth and Ultra) and guests swipe through them like a story.'],
  [ConciergeBell, 'Order from the table', 'Guests order from their phone with no app to install. Prices are checked by the server, never by the phone.'],
  [ChefHat, 'Live kitchen screen', 'Orders land in the app with a sound and a printed-slip animation. Move them from New to Cooking to Ready.'],
  [BellRing, 'Call waiter and ask for bill', 'One tap at the table and your phone rings with the table number.'],
  [Star, 'More Google reviews', 'Happy guests go to your Google page. Unhappy ones talk to you privately first.'],
  [Printer, 'QR designs worth framing', 'Ten QR card designs, from plain to gold foil and table tents, ready to print.'],
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="glow -right-24 -top-24 size-[480px] bg-[#f5b50a]" /><div className="glow -left-32 top-40 size-[420px] bg-[#b79ad6]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_.9fr] lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-muted shadow-sm"><span className="size-2 rounded-full bg-mint" />7 days free on every plan. No card needed.</p>
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
