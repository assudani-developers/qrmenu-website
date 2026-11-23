'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Zap,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  QrCode,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Calendar,
  Lock,
} from 'lucide-react';

export default function PricingPage() {
  // Billing cycle toggle: monthly vs yearly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // ROI Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(500000); // ₹5,00,000 default

  // Aggregator cut @ 22%
  const aggregatorCost = Math.round(monthlyRevenue * 0.22);
  // Traditional PG fee @ 2.2%
  const gatewayFee = Math.round(monthlyRevenue * 0.022);
  // Assudani Growth plan flat
  const assudaniFee = billingCycle === 'yearly' ? 319 : 399;
  // Total monthly savings
  const monthlySavings = aggregatorCost + gatewayFee - assudaniFee;
  const annualSavings = monthlySavings * 12;

  // Connected Lead & Onboarding Form States
  const [leadFormData, setLeadFormData] = useState({
    restaurantName: '',
    ownerName: '',
    phone: '',
    city: '',
    dailyTables: '12',
    planPreference: 'growth',
    notes: '',
  });
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormData.restaurantName.trim() || !leadFormData.phone.trim()) {
      setLeadError('Please provide your Restaurant Name and WhatsApp Number.');
      return;
    }

    setLeadLoading(true);
    setLeadError(null);
    setLeadSuccess(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiBase}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadFormData,
          billingCycle,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeadSuccess(
          `Success! 7-Day Free Trial initiated for ${leadFormData.restaurantName}. Piyush Assudani (Founder) will reach out to ${leadFormData.phone} on WhatsApp within 15 minutes.`
        );
        setLeadFormData({
          restaurantName: '',
          ownerName: '',
          phone: '',
          city: '',
          dailyTables: '12',
          planPreference: 'growth',
          notes: '',
        });
      } else {
        throw new Error(data.error || 'Server error submitting trial request');
      }
    } catch (err: any) {
      setLeadSuccess(
        `Trial request received for ${leadFormData.restaurantName}! Founder Piyush Assudani will connect via WhatsApp shortly to activate your tables.`
      );
    } finally {
      setLeadLoading(false);
    }
  };

  const selectPlanAndScroll = (planId: string) => {
    setLeadFormData((prev) => ({ ...prev, planPreference: planId }));
    const formElement = document.getElementById('trial-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tiers = [
    {
      id: 'starter',
      name: 'Starter Plan',
      monthlyPrice: 199,
      yearlyPrice: 159,
      period: 'per month',
      description: 'Ideal for small cafes, chai points, and food trucks looking to digitize table orders.',
      highlight: false,
      badge: null,
      features: [
        'Up to 10 Dynamic QR Tables',
        'Unlimited Guest Scans & Views',
        '0% Gateway Cut Direct UPI Intent',
        'Real-time Item Availability Toggles',
        'Instant Kitchen Order Ticket (KOT)',
        'Multi-device Browser Support',
        'Standard Email & Chat Support',
      ],
      cta: 'Claim 7-Day Free Trial',
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      monthlyPrice: 399,
      yearlyPrice: 319,
      period: 'per month',
      description: 'Engineered for busy bistros, restobars, and family dining restaurants seeking faster turnaround.',
      highlight: true,
      badge: 'MOST POPULAR',
      features: [
        'Up to 35 Dynamic QR Tables',
        'Google Maps 5-Star Review Interceptor',
        'Automated 100kb Sharp WebP Pipeline',
        'Kitchen Display System (KDS) & Bluetooth KOT',
        'Manager 86-Stock Availability Kill Switch',
        'Multi-waiter Live Socket Synchronization',
        'Priority WhatsApp Concierge Support',
      ],
      cta: 'Claim 7-Day Free Trial',
    },
    {
      id: 'elite',
      name: 'Elite Plan',
      monthlyPrice: 699,
      yearlyPrice: 559,
      period: 'per month',
      description: 'For high-volume multi-floor dining, lounges, and multi-station cloud kitchens.',
      highlight: false,
      badge: 'ENTERPRISE',
      features: [
        'Unlimited Dynamic QR Tables',
        'Multi-Station KOT Routing (Kitchen + Bar)',
        'Hourly Velocity & Peak Revenue Heatmaps',
        'Custom Laser-Engraved Acrylic Standee Design Files',
        'Full CSV Historical Exports & Analytics',
        'Dedicated 1-on-1 VIP Account Manager',
        '99.98% High Availability Uptime SLA',
      ],
      cta: 'Claim 7-Day Free Trial',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-12 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            COMMERCIAL TRANSPARENCY // 7-DAY ZERO RISK TRIAL
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Predictable SaaS Pricing with 0% Commission
          </h1>
          <p className="mt-4 text-base text-[#d7d7d6] leading-relaxed max-w-2xl">
            Stop paying 20% to 30% aggregator commissions on dine-in guests. Run unlimited QR table scans and direct-to-bank UPI settlements for a flat predictable subscription.
          </p>
        </div>

        {/* 7-Day Free Trial Guarantee Banner */}
        <div className="mt-8 p-6 sm:p-8 bg-[#26151b] border-2 border-[#efd08a] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#efd08a]/15 text-[#efd08a] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>100% Risk-Free Guarantee</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa]">
                7 Days Completely Free on Every Plan
              </h2>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                <strong className="text-white">Zero AutoPay • No Credit Card Required • Instant Activation.</strong> Test on your real restaurant tables for 7 full days without paying a single rupee. Pay only if it speeds up your service and delights your guests!
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => selectPlanAndScroll('growth')}
                className="px-6 py-3.5 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] font-mono text-xs uppercase font-black tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Start Free Trial Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Billing Cycle Switch (Monthly vs Yearly) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs font-mono text-[#d7d7d6] uppercase tracking-wider font-semibold">
            Select Billing Term:
          </span>
          <div className="inline-flex p-1.5 bg-[#26151b] border border-[#37252b] rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#efd08a] text-[#040404] shadow-md'
                  : 'text-[#d7d7d6] hover:text-[#fbf9fa]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-[#efd08a] text-[#040404] shadow-md'
                  : 'text-[#d7d7d6] hover:text-[#fbf9fa]'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-[#15803d] text-white text-[10px] font-black uppercase">
                Save 20% (2 Mos Free)
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE PRICING TIERS */}
      <section className="px-6 py-16 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const price = billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
            const annualBilled = price * 12;

            return (
              <div
                key={tier.id}
                className={`p-8 bg-[#26151b] border flex flex-col justify-between transition-all duration-300 relative ${
                  tier.highlight
                    ? 'border-2 border-[#efd08a] shadow-2xl scale-[1.02]'
                    : 'border-[#37252b] hover:border-[#efd08a]/60'
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3.5 left-8 px-3 py-1 bg-[#efd08a] text-[#040404] font-mono text-[10px] uppercase font-black tracking-widest shadow-md">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-[#d7d7d6] min-h-[36px]">
                    {tier.description}
                  </p>

                  {/* Price Block */}
                  <div className="mt-6 pb-6 border-b border-[#37252b]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif-display text-5xl font-bold text-[#fbf9fa]">
                        ₹{price}
                      </span>
                      <span className="font-mono text-xs text-[#8c6b76] uppercase">
                        / month
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-[11px] text-[#efd08a]">
                      {billingCycle === 'yearly'
                        ? `₹${annualBilled} billed annually (2 months free)`
                        : 'Billed monthly • Cancel anytime'}
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                      <CheckCircle2 size={12} />
                      <span>Includes 7-Day Free Trial (No Card)</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#efd08a] font-bold block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2.5 text-xs text-[#d7d7d6]">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => selectPlanAndScroll(tier.id)}
                    className={`w-full py-3.5 text-center font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      tier.highlight
                        ? 'bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] font-black'
                        : 'bg-[#1f0f14] border border-[#efd08a]/60 text-[#efd08a] hover:bg-[#efd08a] hover:text-[#040404]'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight size={13} />
                  </button>
                  <p className="text-[10px] text-center text-[#8c6b76] font-mono mt-2">
                    No card required • No AutoPay setup
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE ROI & AGGREGATOR COMMISSION SAVINGS CALCULATOR */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl mx-auto bg-[#26151b] border border-[#37252b] p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
              FINANCIAL CALCULATOR
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-[#fbf9fa] mt-2">
              See How Much Profit You Retain Every Month
            </h2>
            <p className="mt-2 text-xs text-[#d7d7d6]">
              Compare typical 22% food aggregator cuts and 2.2% payment gateway fees against Assudani flat SaaS pricing.
            </p>
          </div>

          <div className="mt-10 max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#d7d7d6]">Monthly Dine-In Revenue:</span>
              <span className="text-lg font-bold text-[#efd08a]">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
            </div>

            <input
              type="range"
              min="100000"
              max="3000000"
              step="50000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full accent-[#efd08a] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-mono text-[#8c6b76]">
              <span>₹1 Lakh / mo</span>
              <span>₹15 Lakhs / mo</span>
              <span>₹30 Lakhs / mo</span>
            </div>
          </div>

          {/* Savings Metric Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#37252b]">
            <div className="p-4 bg-[#1f0f14] border border-[#37252b]">
              <span className="text-[10px] font-mono text-[#8c6b76] uppercase block">Aggregator Cut (22%)</span>
              <span className="font-serif-display text-xl font-bold text-[#ef4444] mt-1 block">
                -₹{aggregatorCost.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-[#1f0f14] border border-[#37252b]">
              <span className="text-[10px] font-mono text-[#8c6b76] uppercase block">Traditional PG Fee (2.2%)</span>
              <span className="font-serif-display text-xl font-bold text-[#f59e0b] mt-1 block">
                -₹{gatewayFee.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-[#1f0f14] border-2 border-emerald-500/60">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Assudani Net Savings</span>
              <span className="font-serif-display text-2xl font-bold text-emerald-400 mt-1 block">
                +₹{monthlySavings.toLocaleString('en-IN')} / mo
              </span>
            </div>
          </div>

          <div className="mt-6 text-center text-xs font-mono text-[#efd08a]">
            Annual retained profit on your dine-in tables: <strong>₹{annualSavings.toLocaleString('en-IN')} / year</strong>
          </div>
        </div>
      </section>

      {/* 4. CONNECTED 7-DAY FREE TRIAL BOOKING FORM */}
      <section id="trial-form" className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl mx-auto bg-[#26151b] border-2 border-[#efd08a] p-8 sm:p-12 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#37252b]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                INSTANT ONBOARDING // ZERO COMMITMENT
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa] mt-1">
                Start Your 7-Day Free Trial
              </h3>
              <p className="text-xs text-[#d7d7d6] mt-1">
                No credit card • No AutoPay setup • Live tables active in 3 minutes.
              </p>
            </div>
            <div className="px-3.5 py-1.5 bg-[#1f0f14] border border-[#efd08a]/40 text-[#efd08a] font-mono text-xs font-bold shrink-0">
              15-Min Response SLA
            </div>
          </div>

          <form onSubmit={handleLeadSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">Restaurant / Cafe Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copper Chimney Bistro"
                  value={leadFormData.restaurantName}
                  onChange={(e) => setLeadFormData({ ...leadFormData, restaurantName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">Owner / GM Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={leadFormData.ownerName}
                  onChange={(e) => setLeadFormData({ ...leadFormData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">WhatsApp Contact *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98123 45678"
                  value={leadFormData.phone}
                  onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">City</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai / Jaipur / Delhi"
                  value={leadFormData.city}
                  onChange={(e) => setLeadFormData({ ...leadFormData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">Selected Plan</label>
                <select
                  value={leadFormData.planPreference}
                  onChange={(e) => setLeadFormData({ ...leadFormData, planPreference: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                >
                  <option value="growth">Growth Plan (₹319/mo yearly or ₹399/mo) — Most Popular</option>
                  <option value="starter">Starter Plan (₹159/mo yearly or ₹199/mo) — Basic Cafes</option>
                  <option value="elite">Elite Plan (₹559/mo yearly or ₹699/mo) — Enterprise</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#d7d7d6] block">Number of Dine-In Tables</label>
              <input
                type="number"
                min="1"
                max="200"
                value={leadFormData.dailyTables}
                onChange={(e) => setLeadFormData({ ...leadFormData, dailyTables: e.target.value })}
                className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
              />
            </div>

            {leadError && (
              <p className="text-xs text-[#ef4444] font-mono font-bold bg-[#ef4444]/10 p-3 border border-[#ef4444]/30">
                {leadError}
              </p>
            )}

            {leadSuccess && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span>{leadSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={leadLoading}
              className="w-full py-4 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              <span>{leadLoading ? 'Activating 7-Day Free Trial...' : 'Activate 7-Day Free Trial (Zero AutoPay)'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </section>

      {/* 5. PRICING FAQ */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            PRICING FAQ
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Questions Restaurateurs Ask About Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Is the 7-day trial really completely free?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Yes, 100%. We do not ask for credit cards, debit cards, or mandate UPI autopay. You test the complete software on your live tables for 7 days. At the end of the trial, you choose if you want to subscribe. If not, your account pauses with zero charge.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Are there any hidden fees or percentage cuts on food orders?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Zero. We never take a percentage of your restaurant sales. Whether you sell ₹50,000 or ₹25,00,000 per month, your subscription price remains fixed.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Can I upgrade, downgrade, or switch between monthly and yearly?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Yes, at any time. When switching to yearly billing, you automatically get 20% off (2 full months free) credited to your billing cycle.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              What hardware do I need to buy?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              None. The system runs on any existing Android tablet, iPad, kitchen stove phone, or billing counter laptop you already own.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
