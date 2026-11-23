'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Minus, Sparkles, ShieldCheck } from 'lucide-react';
import { bullets, Catalog, DEFAULT_CATALOG, fetchCatalog } from '@/lib/api';

/** Pricing cards with Monthly / Yearly toggle & 7-day free trial guarantee */
export default function Plans() {
  const [c, setC] = useState<Catalog>(DEFAULT_CATALOG);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetchCatalog()
      .then((data) => {
        if (data && data.plans && data.plans.length > 0) setC(data);
      })
      .catch(() => {
        // Gracefully use DEFAULT_CATALOG on static hosting
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
          Experience live QR ordering, kitchen display, and digital menu free for 7 days. Bina autopay ya deduction ke — koi card details nahi deni!
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

      {/* Plan Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {c.plans.map((p) => {
          const monthlyPrice = p.price;
          // 20% discount on yearly (10 months price for 12 months)
          const annualMonthlyEquivalent = Math.round(monthlyPrice * 0.8);
          const annualTotal = monthlyPrice * 10;
          const displayPrice = billing === 'yearly' ? annualMonthlyEquivalent : monthlyPrice;
          const isMaster = p.id === 'master';

          return (
            <div
              key={p.id}
              className={`card relative flex flex-col p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                isMaster ? 'border-fuchsia-500/50 bg-gradient-to-b from-fuchsia-500/5 to-transparent' : ''
              }`}
              style={
                isMaster
                  ? { borderColor: '#d946ef', boxShadow: '0 20px 60px rgba(217, 70, 239, 0.2)' }
                  : p.popular
                  ? { borderColor: p.color, boxShadow: `0 20px 60px ${p.color}33` }
                  : undefined
              }
            >
              {p.popular && (
                <span className="gold-grad absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-extrabold text-[#1a1206]">
                  MOST POPULAR
                </span>
              )}
              {isMaster && (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-3 py-1 text-[11px] font-extrabold text-white shadow-sm">
                  FLAGSHIP 👑
                </span>
              )}
              <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: isMaster ? '#d946ef' : p.color }}>
                {p.name}
              </div>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-serif text-5xl font-bold">₹{displayPrice}</span>
                <span className="pb-1.5 text-sm text-muted">/ month</span>
              </div>
              {billing === 'yearly' && (
                <div className="mt-0.5 text-xs font-semibold text-emerald-700">
                  Billed annually at ₹{annualTotal}/yr (2 months free!)
                </div>
              )}
              <p className="mt-2 text-sm font-bold">{p.tagline}</p>
              {(p as any).description && <p className="mt-2 text-sm text-muted">{(p as any).description}</p>}
              {(p as any).bestFor && (
                <p className="mt-3 inline-block self-start rounded-full bg-black/5 px-3 py-1 text-xs font-bold">
                  Best for: {(p as any).bestFor}
                </p>
              )}
              <ul className="my-6 flex-1 space-y-2.5">
                {bullets(p, c.featureCatalog).map((b) => (
                  <li key={b.text} className={`flex items-start gap-2.5 text-sm font-semibold ${b.on ? '' : 'text-muted/50'}`}>
                    {b.on ? <Check size={17} className="mt-0.5 shrink-0 text-emerald-600" /> : <Minus size={17} className="mt-0.5 shrink-0" />}
                    {b.text}
                  </li>
                ))}
              </ul>
              <Link
                href="/download"
                className="gold-grad rounded-2xl py-3.5 text-center font-extrabold text-[#1a1206] shadow-sm hover:opacity-95"
              >
                {c.trialEnabled && c.trialDays > 0 ? `Start ${c.trialDays}-day free trial` : 'Get started'}
              </Link>
              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Zero autopay • Cancel anytime</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
