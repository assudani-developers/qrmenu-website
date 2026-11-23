import Link from 'next/link';
import { Check, Crown, Lock, ShieldCheck } from 'lucide-react';
import { bullets, fetchCatalog } from '@/lib/api';
import Reveal from './Reveal';

/** The three plans, live from the database (server-rendered, refreshed every minute). The plan marked
 *  "best value" in the admin panel gets the dark hero card. */
export default async function Plans() {
  const c = await fetchCatalog();
  if (!c) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="font-extrabold">Plans could not be loaded right now.</p>
        <p className="mt-1 text-sm text-muted">Refresh in a minute, or open the app to see every plan and price.</p>
        <Link href="/download" className="mt-5 inline-block rounded-2xl bg-ink px-6 py-3 text-sm font-extrabold text-white">Get the app</Link>
      </div>
    );
  }
  const trial = c.trialEnabled !== false && c.trialDays > 0;
  return (
    <div>
      {trial && (
        <p className="mx-auto mb-12 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-white px-5 py-2 text-sm font-bold text-muted shadow-sm">
          <span className="size-2 rounded-full bg-mint" />{c.trialDays} days free on every plan<span className="text-faint">No card</span><span className="text-faint">No autopay</span>
        </p>
      )}
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {c.plans.map((p, i) => {
          const hero = !!p.popular;
          const list = bullets(p, c.featureCatalog);
          return (
            <Reveal key={p.id} delay={i * 0.08}
              className={`relative flex h-full flex-col rounded-[30px] p-7 ${hero ? 'jamun shadow-[0_40px_90px_-30px_rgba(34,21,46,.7)] ring-2 ring-[#f2cd7a]/60 md:-my-4 md:py-11' : 'card'}`}>
              {hero && <span className="haldi absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold shadow-lg"><Crown size={13} />{p.badge || 'Best value'}</span>}
              <div className={`font-display text-2xl font-extrabold ${hero ? 'text-lux' : ''}`}>{p.name}</div>
              <p className={`mt-1 text-sm ${hero ? 'text-white/70' : 'text-muted'}`}>{p.tagline}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-5xl font-extrabold leading-none">₹{p.price}</span>
                <span className={`pb-1 text-sm ${hero ? 'text-white/60' : 'text-muted'}`}>/ month</span>
              </div>
              {p.bestFor && <p className={`mt-2 text-xs ${hero ? 'text-white/60' : 'text-muted'}`}>For {p.bestFor.toLowerCase()}</p>}
              <ul className="my-7 flex-1 space-y-2.5">
                {list.map((b) => (
                  <li key={b.text} className={`flex items-start gap-2.5 text-sm font-semibold ${b.on ? '' : hero ? 'text-white/35' : 'text-faint/70'}`}>
                    {b.on ? <Check size={16} className={`mt-0.5 shrink-0 ${hero ? 'text-lux' : 'text-mint'}`} /> : <Lock size={14} className="mt-0.5 shrink-0 opacity-50" />}
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/download" className={`rounded-2xl py-3.5 text-center font-extrabold transition-transform hover:-translate-y-0.5 ${hero ? 'haldi shadow-[0_14px_30px_-10px_rgba(245,181,10,.7)]' : 'bg-ink text-white'}`}>
                {trial ? `Start ${p.name} free` : `Get ${p.name}`}
              </Link>
              <p className={`mt-3 flex items-center justify-center gap-1.5 text-xs ${hero ? 'text-white/55' : 'text-muted'}`}><ShieldCheck size={13} />Pay by UPI only when you choose to</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
