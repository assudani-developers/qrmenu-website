import React from 'react';
import Link from 'next/link';
import {
  Star,
  Quote,
  TrendingUp,
  Clock,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Utensils,
  Coffee,
  Wine,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merchant Stories & Case Studies — ASSUDANI QR',
  description: 'In-depth case studies and verified metrics from high-volume restobars, artisanal cafes, and heritage dining rooms across India.',
};

export default function StoriesPage() {
  const caseStudies = [
    {
      restaurant: 'The Olive & Barrel Restobar',
      location: 'Bandra West, Mumbai',
      type: 'Cocktail Lounge & European Bistro (32 Tables)',
      icon: Wine,
      quote:
        'On packed Saturday nights, waitstaff used to spend 15 minutes per table just distributing menus and swiping credit cards. With Assudani QR, our table turnover accelerated by 34% and we saved ₹52,400 in transaction cuts in our very first month.',
      spokesperson: 'Kabir Mehta, Managing Partner',
      metrics: [
        { label: 'Table Turnover', value: '+34%', subtext: '72 min down to 47 min' },
        { label: 'Gateway Fee Saved', value: '₹52,400', subtext: 'In Month 1 alone' },
        { label: 'Weekend Orders', value: '3.2x', subtext: 'Dispatched directly to bar' },
      ],
      tags: ['Growth Plan', 'Direct UPI Intent', '32 Tables'],
    },
    {
      restaurant: 'Kaffe Monsoon Artisanal Bakery',
      location: 'Indiranagar, Bengaluru',
      type: 'Specialty Sourdough & Specialty Coffee (18 Tables)',
      icon: Coffee,
      quote:
        'Our artisanal sourdough loaves sell out by 11:30 AM. Previously, customers would order finished items and leave 1-star reviews. With the 86 kill-switch, our head baker marks items out of stock in one tap. Our Google rating climbed to 4.9 stars.',
      spokesperson: 'Ananya Rao, Founder & Head Baker',
      metrics: [
        { label: 'Google Rating Lift', value: '4.9★', subtext: 'From 3.9★ in 60 days' },
        { label: '86 Discrepancies', value: '0%', subtext: 'Zero out-of-stock orders' },
        { label: 'New Reviews', value: '+380', subtext: 'Filtered via interceptor' },
      ],
      tags: ['86 Kill Switch', 'Review Interceptor', 'Artisanal Cafe'],
    },
    {
      restaurant: 'The Saffron Courtyard',
      location: 'C-Scheme, Jaipur',
      type: 'Royal Heritage Thali & Fine Dining (45 Tables)',
      icon: Utensils,
      quote:
        'Our printed leather menus cost ₹35,000 per reprint cycle and were easily stained by curries. Assudani QR allowed us to showcase 100kb high-res photos of every heritage dish. Tourists order 28% more appetizers and desserts because they see exactly what arrives.',
      spokesperson: 'Vikram Rathore, Director of Hospitality',
      metrics: [
        { label: 'Average Order Value', value: '+28%', subtext: 'Visual menu dessert lift' },
        { label: 'Reprint Costs', value: '₹0', subtext: 'Saved ₹1.4L annually' },
        { label: 'Menu Load Time', value: '174ms', subtext: 'Sub-second WebP delivery' },
      ],
      tags: ['Elite Plan', '100kb WebP Pipeline', 'Multi-Floor'],
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-16 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#26151b] border border-[#37252b] text-[#efd08a] font-mono text-xs uppercase tracking-widest mb-6">
            <Star size={14} className="fill-[#efd08a]" />
            <span>Merchant Stories • Verified Results</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fbf9fa] leading-[1.08]">
            Built For Indian Dining Rooms That Care About Margins.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#d7d7d6] font-normal leading-relaxed max-w-3xl">
            Read how high-volume lounges, third-wave bakeries, and heritage dining rooms replaced clunky paper menus and reclaimed lakhs in aggregator commissions.
          </p>
        </div>
      </section>

      {/* 2. MACRO METRICS BANNER */}
      <section className="border-b border-[#37252b] bg-[#26151b]">
        <div className="px-6 py-12 max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-[#efd08a]">
              Total Diners Served
            </p>
            <p className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fbf9fa] mt-1">
              1,840,000+
            </p>
            <p className="text-[11px] text-[#8c6b76] mt-1 font-mono">Over active table standees</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-[#efd08a]">
              Average Scan Latency
            </p>
            <p className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fbf9fa] mt-1">
              180ms
            </p>
            <p className="text-[11px] text-[#8c6b76] mt-1 font-mono">Sub-second edge rendering</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-[#efd08a]">
              Gateway Cut Saved
            </p>
            <p className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fbf9fa] mt-1">
              ₹4.2 Cr+
            </p>
            <p className="text-[11px] text-[#8c6b76] mt-1 font-mono">Reclaimed by restaurant owners</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-[#efd08a]">
              Google Rating Lift
            </p>
            <p className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fbf9fa] mt-1">
              4.88★
            </p>
            <p className="text-[11px] text-[#8c6b76] mt-1 font-mono">Via 5-star review interceptor</p>
          </div>
        </div>
      </section>

      {/* 3. CASE STUDIES DEEP DIVE */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto space-y-16">
        {caseStudies.map((cs, idx) => {
          const Icon = cs.icon;
          return (
            <div
              key={cs.restaurant}
              className="bg-[#26151b] border border-[#37252b] p-8 sm:p-12 hover:border-[#efd08a]/60 transition-all shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="p-2 bg-[#1f0f14] border border-[#37252b] text-[#efd08a]">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa]">
                        {cs.restaurant}
                      </h2>
                      <p className="font-mono text-xs text-[#efd08a]">{cs.location} • {cs.type}</p>
                    </div>
                  </div>

                  <div className="relative pl-6 border-l-2 border-[#efd08a] italic text-base sm:text-lg text-[#fbf9fa] leading-relaxed">
                    &ldquo;{cs.quote}&rdquo;
                  </div>

                  <p className="font-mono text-xs text-[#8c6b76]">
                    — {cs.spokesperson}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#1f0f14] border border-[#37252b] text-[10px] font-mono text-[#d7d7d6] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Metrics Grid */}
                <div className="lg:col-span-5 bg-[#1f0f14] border border-[#37252b] p-6 flex flex-col justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#efd08a] font-bold pb-2 border-b border-[#37252b]">
                    MEASURED BUSINESS IMPACT
                  </span>

                  <div className="space-y-6 my-4">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="border-b border-[#37252b]/60 pb-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-mono text-[#d7d7d6]">{m.label}</span>
                          <span className="font-serif-display text-3xl font-bold text-[#efd08a]">
                            {m.value}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8c6b76] font-mono mt-0.5">{m.subtext}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-bold text-[#efd08a] hover:underline"
                    >
                      <span>Replicate These Results</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* BOTTOM CTA */}
        <div className="bg-[#efedef] text-[#040404] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#efd08a]">
          <div>
            <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#040404]">
              Join over 250+ top dining rooms across India.
            </h3>
            <p className="text-sm text-[#4a484a] mt-1">
              Set up your dynamic menu today. No credit cards, no long contracts.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/download"
              className="bg-[#040404] text-[#fbf9fa] hover:bg-[#26151b] px-6 py-3.5 text-xs uppercase tracking-widest font-bold transition-all"
            >
              Get Android App
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
