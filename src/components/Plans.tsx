'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Lock, Crown, Sparkles, ShieldCheck } from 'lucide-react';
import { bullets, Catalog, DEFAULT_CATALOG, fetchCatalog } from '@/lib/api';

/** Live plans from the platform database with zero-delay static fallback */
export default function Plans() {
  const [c, setC] = useState<Catalog>(DEFAULT_CATALOG);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetchCatalog().then((res) => {
      if (res?.plans?.length) setC(res);
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* 7-Day Free Trial & No Autopay Banner */}
      <div className="mx-auto max-w-2xl rounded-2xl border border-amber-300/60 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 p-4 text-center shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-extrabold text-amber-900">
          <Sparkles className="size-4 text-amber-600" />
          <span>7 Days 100% Free Trial On All Plans</span>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs text-amber-800">No Credit Card</span>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-800">Zero Autopay</span>
        </div>
        <p className="mt-1 text-xs text-amber-900/80">
          Experience live QR ordering, kitchen display, inventory, and digital menu free for 7 days. Bina autopay ya deduction ke!
        </p>
      </div>

      {/* Monthly / Yearly Billing Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm font-bold ${billing === 'monthly' ? 'text-ink' : 'text-muted'}`}>Monthly</span>
        <button
          type="button"
          onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-8 w-14 items-center rounded-full bg-black/10 p-1 transition-colors hover:bg-black/15 focus:outline-none"
          aria-label="Toggle billing interval"
        >
          <span
            className={`inline-block size-6 rounded-full bg-gold shadow-md transition-transform duration-200 ${
              billing === 'yearly' ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`flex items-center gap-1.5 text-sm font-bold ${billing === 'yearly' ? 'text-ink' : 'text-muted'}`}>
          Yearly
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700">Save 20% (2 Months Free)</span>
        </span>
      </div>

      {/* 4 Plan Cards */}
      <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
        {c.plans.map((p, i) => {
          const isMaster = p.id === 'master';
          const isGrowth = p.popular || p.id === 'growth';
          const isUltra = p.id === 'ultra';
          const monthlyPrice = p.price;
          const annualMonthlyEquivalent = Math.round(monthlyPrice * 0.8);
          const annualTotal = monthlyPrice * 10;
          const displayPrice = billing === 'yearly' ? annualMonthlyEquivalent : monthlyPrice;
          const list = bullets(p, c.featureCatalog);

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
              className={`relative flex flex-col rounded-[28px] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                isMaster
                  ? 'bg-gradient-to-b from-[#2E102E] to-[#160A18] text-white shadow-[0_20px_60px_rgba(217,70,239,0.25)] border-2 border-fuchsia-500/60'
                  : isGrowth
                  ? 'jamun shadow-[0_30px_80px_-20px_rgba(34,21,46,.55)] border-2 border-amber-400'
                  : 'card'
              }`}
            >
              {isMaster && (
                <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-3.5 py-1 text-xs font-extrabold text-white shadow-lg">
                  <Crown size={13} />FLAGSHIP 👑
                </span>
              )}
              {isGrowth && !isMaster && (
                <span className="haldi absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold shadow-lg">
                  <Crown size={13} />RECOMMENDED
                </span>
              )}
              {isUltra && (
                <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3.5 py-1 text-xs font-extrabold text-white shadow-lg">
                  INVENTORY 📦
                </span>
              )}

              <div className={`font-display text-2xl font-extrabold ${isMaster ? 'text-fuchsia-300' : isGrowth ? 'text-lux' : ''}`}>
                {p.name}
              </div>
              <p className={`mt-1 text-xs font-semibold ${isMaster || isGrowth ? 'text-white/70' : 'text-muted'}`}>
                {p.tagline}
              </p>

              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl font-extrabold leading-none">₹{displayPrice}</span>
                <span className={`pb-1 text-xs ${isMaster || isGrowth ? 'text-white/60' : 'text-muted'}`}>/ month</span>
              </div>
              {billing === 'yearly' && (
                <div className="mt-1 text-[11px] font-semibold text-emerald-600">
                  ₹{annualTotal}/yr (2 months free!)
                </div>
              )}

              {p.bestFor && (
                <p className={`mt-2 text-xs ${isMaster || isGrowth ? 'text-white/60' : 'text-muted'}`}>
                  For {p.bestFor.toLowerCase()}
                </p>
              )}

              <ul className="my-6 flex-1 space-y-2">
                {list.map((b) => (
                  <li
                    key={b.text}
                    className={`flex items-start gap-2 text-xs font-semibold ${
                      b.on ? '' : isMaster || isGrowth ? 'text-white/35' : 'text-faint/70'
                    }`}
                  >
                    {b.on ? (
                      <Check size={15} className={`mt-0.5 shrink-0 ${isMaster ? 'text-fuchsia-400' : isGrowth ? 'text-lux' : 'text-mint'}`} />
                    ) : (
                      <Lock size={13} className="mt-0.5 shrink-0 opacity-40" />
                    )}
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/download"
                className={`rounded-2xl py-3.5 text-center text-sm font-extrabold transition-transform hover:-translate-y-0.5 ${
                  isMaster
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-md'
                    : isGrowth
                    ? 'haldi shadow-[0_14px_30px_-10px_rgba(245,181,10,.7)]'
                    : 'bg-ink text-white'
                }`}
              >
                {c.trialEnabled && c.trialDays > 0 ? `Try ${p.name} free for ${c.trialDays} days` : `Get ${p.name}`}
              </Link>
              <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>Zero autopay • No card required</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
