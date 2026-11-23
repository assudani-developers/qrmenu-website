import Link from 'next/link';
import { Camera, QrCode, Palette, ConciergeBell, BellRing, Star, Boxes, Mic, Users } from 'lucide-react';
import Plans from '@/components/Plans';

const steps = [
  [Camera, 'Photograph your menu', 'Snap each page of your paper menu. Our scanner reads dishes, prices, veg / non-veg marks and sections — fully offline, no cloud AI.'],
  [Palette, 'Review & style it', 'Fix anything in one tap, pick a template, colours and fonts. A live phone preview shows exactly what guests will see.'],
  [QrCode, 'Print your QR & go live', 'Your menu is hosted automatically. The QR is permanent — rename or restyle anytime and printed tents keep working.'],
];

const features = [
  [ConciergeBell, 'Table QR ordering', 'Guests order from their phone with zero app download. Real-time bill calculation, dish add-ons and live order tracking.'],
  [BellRing, 'Kitchen display & sound alerts', 'Every order lands on the kitchen tablet or phone instantly with chime alerts. Move orders from New → Cooking → Ready → Served.'],
  [Boxes, 'Live Inventory & Auto-PO (Ultra)', 'Track raw materials (Paneer, Butter, Rice) with automated depletion on orders, low-stock warnings and 1-click vendor PO generator.'],
  [Mic, '“Bolna” Voice AI Assistant (Master)', 'Hands-free kitchen speaker mode loudly announces incoming order details in Hindi or English so chefs stay focused on cooking.'],
  [Users, 'CRM, Loyalty & WhatsApp (Master)', 'Segment VIP diners, reward visit points, and send 1-click personalized WhatsApp promotions to win back at-risk guests.'],
  [Star, 'Google Review booster', '4–5★ ratings are redirected straight to Google Maps reviews, while 1–3★ feedback stays private with you to fix service quickly.'],
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="glow -left-20 -top-20 size-[420px] bg-violet-500" /><div className="glow -right-24 top-24 size-[380px] bg-rose-400" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 text-center">
          <span className="inline-block rounded-full border border-line bg-white px-4 py-1.5 text-xs font-extrabold text-gold">7-Day 100% Free Trial On All Plans</span>
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl font-bold leading-[1.05] sm:text-7xl">Snap your menu.<br />Go live in a minute.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">A beautiful digital menu, permanent QR code, live table ordering, KOT kitchen display, Live Inventory (Ultra) and Voice AI &amp; CRM (Master) — built for Indian restaurants, cafés and chains.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/download" className="gold-grad rounded-2xl px-8 py-4 font-extrabold text-[#1a1206] shadow-[0_12px_30px_rgba(229,154,47,.4)]">Get the app</Link>
            <Link href="/contact" className="rounded-2xl border border-line bg-white px-8 py-4 font-extrabold">Request a demo</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-center font-serif text-4xl font-bold">How it works</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([I, t, d]: any, i) => (
            <div key={t} className="card p-7"><div className="gold-grad mb-5 grid size-12 place-items-center rounded-2xl text-[#1a1206]"><I size={24} /></div><div className="text-xs font-extrabold text-gold">STEP {i + 1}</div><h3 className="mt-1 text-xl font-extrabold">{t}</h3><p className="mt-2 text-muted">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-center font-serif text-4xl font-bold">Everything a modern restaurant needs</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([I, t, d]: any) => (
            <div key={t} className="card p-7">
              <I className="text-gold" size={26} />
              <h3 className="mt-4 text-lg font-extrabold">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-center font-serif text-4xl font-bold">Simple, transparent pricing</h2>
        <p className="mb-10 mt-2 text-center text-muted">Pick a plan. Change or cancel anytime. Bina autopay ke 7 din bilkul free.</p>
        <Plans />
      </section>
    </main>
  );
}
