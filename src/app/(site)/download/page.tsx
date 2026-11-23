import Link from 'next/link';
import { Smartphone, Globe, Share, SquarePlus, BellRing, ArrowRight } from 'lucide-react';
import { PLAY_STORE_URL } from '@/lib/api';
import OpenOnPhone from '@/components/OpenOnPhone';

export const metadata = { title: 'Get the app', description: 'Use QR Menu Pro on Android, iPhone, iPad or any laptop browser. Install it on your iPhone home screen in two taps.', alternates: { canonical: '/download' } };

const iphone = [
  [Globe, 'Open the app in Safari', 'Tap “Open the app” on your iPhone.'],
  [Share, 'Tap Share', 'The square with an arrow, at the bottom of Safari.'],
  [SquarePlus, 'Add to Home Screen', 'It now opens full screen, like any other app.'],
  [BellRing, 'Switch on order alerts', 'Profile → Order alerts on this device.'],
] as const;

export default function Download() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <h1 className="max-w-2xl font-display text-5xl font-extrabold leading-[1] sm:text-6xl">Run your restaurant from any phone</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">Same app, same account on Android, iPhone, iPad and laptop. Sign up, photograph your menu and your QR is ready.</p>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        <section className="card flex flex-col p-7 sm:p-8">
          <div className="haldi grid size-12 place-items-center rounded-2xl"><Smartphone size={22} /></div>
          <h2 className="mt-6 font-display text-3xl font-extrabold">Android</h2>
          <p className="mt-2 text-muted">The Android app rings for new orders even when it is closed.</p>
          <div className="mt-auto pt-8">
            {PLAY_STORE_URL
              ? <a href={PLAY_STORE_URL} className="inline-flex items-center gap-2 rounded-2xl bg-ink px-7 py-4 font-extrabold text-white transition-transform hover:-translate-y-0.5">Get it on Google Play<ArrowRight size={18} /></a>
              : <div className="space-y-4"><p className="rounded-2xl bg-surface2 px-5 py-4 text-sm font-semibold text-muted">Coming to Google Play soon. Until then, use the web app: it works on Android too.</p><Link href="/app/" prefetch={false} className="inline-flex items-center gap-2 rounded-2xl bg-ink px-7 py-4 font-extrabold text-white transition-transform hover:-translate-y-0.5">Open the web app<ArrowRight size={18} /></Link></div>}
          </div>
        </section>

        <section className="jamun flex flex-col rounded-[30px] p-7 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-lux"><Globe size={22} /></div>
              <h2 className="mt-6 font-display text-3xl font-extrabold">iPhone, iPad and laptop</h2>
              <p className="mt-2 max-w-sm text-white/70">Open it in the browser. No App Store, nothing to download.</p>
            </div>
            <OpenOnPhone />
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {iphone.map(([I, t, d], i) => (
              <li key={t} className="flex gap-3.5 rounded-2xl bg-white/[.06] p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-extrabold text-lux">{i + 1}</span>
                <div><div className="flex items-center gap-2 font-extrabold"><I size={16} className="text-lux" />{t}</div><p className="mt-1 text-sm text-white/60">{d}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/app/" prefetch={false} className="haldi inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-extrabold shadow-[0_16px_34px_-12px_rgba(245,181,10,.8)] transition-transform hover:-translate-y-0.5">Open the app<ArrowRight size={18} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
