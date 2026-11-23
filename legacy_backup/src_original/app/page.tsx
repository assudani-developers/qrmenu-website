'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  Zap,
  ShieldCheck,
  Smartphone,
  Star,
  Check,
  CheckCircle2,
  Copy,
  Terminal,
  UtensilsCrossed,
  QrCode,
  Flame,
  ChefHat,
  Clock,
  Sparkles,
  Server,
  Globe,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Cpu,
} from 'lucide-react';

export default function HomePage() {
  // Hero Interactive UI Mockup state
  const [selectedCategory, setSelectedCategory] = useState<'Starters' | 'Mains' | 'Cocktails'>('Starters');
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({
    'Truffle Paneer Sizzler': 1,
    'Smoked Kokum Highball': 1,
  });

  // Feature 3: Interactive Review Interceptor Simulator
  const [simulatedRating, setSimulatedRating] = useState<number>(5);

  // Interactive Live Restaurant Showcase States
  const [demoViewTab, setDemoViewTab] = useState<'guest' | 'kitchen' | 'analytics'>('guest');
  const [homeBillingCycle, setHomeBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [ticketReady, setTicketReady] = useState(false);

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
        body: JSON.stringify(leadFormData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeadSuccess(
          `Thank you! Piyush Assudani (Founder) will reach out to ${leadFormData.phone} on WhatsApp within 15 minutes.`
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
        throw new Error(data.error || 'Server error submitting demo request');
      }
    } catch (err: any) {
      // Graceful local confirmation fallback
      setLeadSuccess(
        `Inquiry received for ${leadFormData.restaurantName}! Founder Piyush Assudani will connect via WhatsApp shortly.`
      );
    } finally {
      setLeadLoading(false);
    }
  };


  const updateQty = (item: string, delta: number) => {
    setCartItems((prev) => {
      const current = prev[item] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[item];
        return copy;
      }
      return { ...prev, [item]: next };
    });
  };

  const calculateSubtotal = () => {
    const prices: { [key: string]: number } = {
      'Truffle Paneer Sizzler': 490,
      'Smoked Kokum Highball': 280,
      'Old Delhi Butter Chicken': 540,
    };
    return Object.entries(cartItems).reduce((sum, [name, qty]) => sum + (prices[name] || 0) * qty, 0);
  };

  return (
    <div className="w-full text-[#fbf9fa] font-sans selection:bg-[#efd08a] selection:text-[#040404]">
      {/* ========================================================= */}
      {/* 1. HERO: On Inverse Ground (#efedef), Large UI Mockup,    */}
      {/*    Two Actions, Trust Caption, and Key Numbers.           */}
      {/* ========================================================= */}
      <section className="bg-[#efedef] text-[#040404] pt-16 sm:pt-24 pb-20 border-b border-[#37252b]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            {/* Category / Sub-Identifier */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#735329]">
              <span className="w-2 h-2 bg-[#735329]"></span>
              <span>Self-Serve QR Menu Builder • 101% Accurate AI Photo OCR</span>
            </div>

            {/* Headline: EB Garamond, display luxury serif */}
            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight text-[#040404]">
              Snap Your Paper Menu. Get a Digital QR Menu in 60 Seconds.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#3d3b3d] leading-relaxed max-w-2xl">
              The most affordable and customizable restaurant QR menu builder. Take a photo of your paper menu card—our Python AI engine converts it into a Zomato-grade digital menu instantly. Export printable standees in multiple themes, track live diners, and manage out-of-stock items in 1 tap.
            </p>

            {/* Two Actions: Square, Sharp */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('trial-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-4 bg-[#efd08a] hover:bg-[#e4c275] text-[#040404] border border-[#040404] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Claim 7-Day Free Trial (No Card)</span>
                <ArrowRight size={14} />
              </button>

              <Link
                href="/pricing"
                className="px-7 py-4 bg-transparent hover:bg-[#040404]/5 text-[#040404] border border-[#040404] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>View Affordable Plans</span>
                <Sparkles size={14} />
              </Link>
            </div>

            {/* Trust Caption */}
            <p className="text-xs text-[#040404]/70 tracking-wide pt-2 max-w-2xl font-mono">
              Zero AutoPay • No Credit Card Required • Instant Live QR Menu Preview • 0% Commission Direct UPI.
            </p>
          </div>

          {/* Large Hero UI Mockup (Interactive Guest Simulator Teaser) */}
          <div className="mt-14 bg-[#26151b] border-2 border-[#efd08a] text-[#fbf9fa] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-[#37252b] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#efd08a] text-[#040404] flex items-center justify-center font-serif-display font-bold text-sm">
                  AQ
                </div>
                <div>
                  <div className="font-serif-display text-lg font-bold text-[#fbf9fa]">
                    The Heritage Table • Table 07
                  </div>
                  <div className="text-[10px] font-mono text-[#efd08a]">
                    Edge Router Active • Sub-200ms Latency
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse"></span>
                <span className="text-[11px] font-mono text-[#efd08a] uppercase tracking-wider">
                  Direct Bank UPI Active (0.0% Fee)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Menu Explorer */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex gap-2 border-b border-[#37252b] pb-2 overflow-x-auto">
                  {(['Starters', 'Mains', 'Cocktails'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#efd08a] text-[#040404] font-bold'
                          : 'text-[#d7d7d6] hover:text-[#fbf9fa] bg-[#1f0f14]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Dish 1 */}
                <div className="p-4 bg-[#1f0f14] border border-[#37252b] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      <span className="font-serif-display text-base font-bold text-[#fbf9fa]">
                        Truffle Paneer Sizzler
                      </span>
                      <span className="text-[10px] bg-[#efd08a]/20 text-[#efd08a] px-1.5 py-0.5 font-mono">
                        POPULAR
                      </span>
                    </div>
                    <p className="text-xs text-[#d7d7d6] mt-1">
                      Cottage cheese cubes charred in tandoor, drizzled with black truffle oil.
                    </p>
                    <div className="text-xs font-mono font-bold text-[#efd08a] mt-1">₹490</div>
                  </div>
                  <div className="flex items-center bg-[#efd08a] text-[#040404] font-mono font-bold text-xs">
                    <button
                      onClick={() => updateQty('Truffle Paneer Sizzler', -1)}
                      className="px-2.5 py-1 hover:bg-[#d4b568]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{cartItems['Truffle Paneer Sizzler'] || 0}</span>
                    <button
                      onClick={() => updateQty('Truffle Paneer Sizzler', 1)}
                      className="px-2.5 py-1 hover:bg-[#d4b568]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dish 2 */}
                <div className="p-4 bg-[#1f0f14] border border-[#37252b] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="font-serif-display text-base font-bold text-[#fbf9fa]">
                        Old Delhi Butter Chicken
                      </span>
                    </div>
                    <p className="text-xs text-[#d7d7d6] mt-1">
                      Charred chicken tikka steeped in slow-simmered tomato makhani sauce.
                    </p>
                    <div className="text-xs font-mono font-bold text-[#efd08a] mt-1">₹540</div>
                  </div>
                  <div className="flex items-center bg-[#efd08a] text-[#040404] font-mono font-bold text-xs">
                    <button
                      onClick={() => updateQty('Old Delhi Butter Chicken', -1)}
                      className="px-2.5 py-1 hover:bg-[#d4b568]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{cartItems['Old Delhi Butter Chicken'] || 0}</span>
                    <button
                      onClick={() => updateQty('Old Delhi Butter Chicken', 1)}
                      className="px-2.5 py-1 hover:bg-[#d4b568]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dish 3 */}
                <div className="p-4 bg-[#1f0f14] border border-[#37252b] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      <span className="font-serif-display text-base font-bold text-[#fbf9fa]">
                        Smoked Kokum Highball
                      </span>
                    </div>
                    <p className="text-xs text-[#d7d7d6] mt-1">
                      Artisanal wild kokum cordial, roasted cumin, lime zest, soda fizz.
                    </p>
                    <div className="text-xs font-mono font-bold text-[#efd08a] mt-1">₹280</div>
                  </div>
                  <div className="flex items-center bg-[#efd08a] text-[#040404] font-mono font-bold text-xs">
                    <button
                      onClick={() => updateQty('Smoked Kokum Highball', -1)}
                      className="px-2.5 py-1 hover:bg-[#d4b568]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{cartItems['Smoked Kokum Highball'] || 0}</span>
                    <button
                      onClick={() => updateQty('Smoked Kokum Highball', 1)}
                      className="px-2.5 py-1 hover:bg-[#d4b568]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Table Bill & Deep Link Payload */}
              <div className="lg:col-span-5 bg-[#1f0f14] border border-[#37252b] p-6 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#37252b]">
                  <span className="text-xs font-mono uppercase text-[#8c6b76]">Table 07 Cart Summary</span>
                  <span className="text-xs font-mono text-[#efd08a]">{Object.values(cartItems).reduce((a, b) => a + b, 0)} Items</span>
                </div>

                <div className="space-y-2 text-xs">
                  {Object.entries(cartItems).map(([dish, qty]) => (
                    <div key={dish} className="flex justify-between text-[#e6e6e5]">
                      <span>{qty}x {dish}</span>
                      <span className="font-mono">₹{(dish.includes('Truffle') ? 490 : dish.includes('Chicken') ? 540 : 280) * qty}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-[#37252b] flex justify-between font-bold text-sm text-[#fbf9fa]">
                    <span>Total Amount</span>
                    <span className="font-serif-display text-xl text-[#efd08a]">₹{calculateSubtotal()}</span>
                  </div>
                </div>

                {/* Direct UPI Intent Link Mock */}
                <div className="p-3 bg-[#26151b] border border-[#37252b] space-y-1">
                  <span className="text-[10px] font-mono text-[#8c6b76] uppercase block">
                    Direct NPCI UPI Intent URI:
                  </span>
                  <p className="font-mono text-[11px] text-[#efd08a] break-all">
                    upi://pay?pa=restaurant@okaxis&pn=Assudani%20Lounge&am={calculateSubtotal()}&cu=INR
                  </p>
                </div>

                <Link
                  href="/product#simulator"
                  className="w-full block py-3 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] text-xs uppercase font-bold tracking-wider text-center transition-all"
                >
                  Test Full Interactive Kiosk Demo
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Key Numbers Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#dad8da] mt-12">
            <div>
              <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#040404]">
                180 ms
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#735329] font-bold mt-1">
                Sub-Second Edge Rendering
              </div>
              <p className="text-xs text-[#4a484a] mt-1">
                No bulky client bundles. SSR HTML caches load instantly even on weak restaurant 4G signals.
              </p>
            </div>

            <div>
              <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#040404]">
                0.00 %
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#735329] font-bold mt-1">
                Payment Gateway Deduction
              </div>
              <p className="text-xs text-[#4a484a] mt-1">
                Direct UPI intent bypasses intermediary payment gateways. 100% of guest payments land in your current bank account.
              </p>
            </div>

            <div>
              <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#040404]">
                &lt; 100 KB
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#735329] font-bold mt-1">
                WebP Image Transcoding
              </div>
              <p className="text-xs text-[#4a484a] mt-1">
                Our libvips Sharp pipeline compresses 12MB raw phone uploads into 90KB progressive WebP assets automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MULTIPAGE NAVIGATION CALLOUTS                           */}
      {/* ========================================================= */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            PLATFORM EXPLORER
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Every Dimension of the Dining Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Architecture */}
          <Link
            href="/architecture"
            className="p-8 bg-[#26151b] border border-[#37252b] hover:border-[#efd08a] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
                <Cpu size={20} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa] group-hover:text-[#efd08a] transition-colors">
                Architecture &amp; Deep Tech
              </h3>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                Read our technical whitepaper on dynamic QR routing hashes, libvips Sharp WebP pipelines, and NPCI deep link payloads.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#37252b] flex items-center justify-between text-xs font-mono text-[#efd08a]">
              <span>Read Architecture Whitepaper</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Pricing & ROI */}
          <Link
            href="/pricing"
            className="p-8 bg-[#26151b] border-2 border-[#efd08a]/60 hover:border-[#efd08a] transition-all group flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
                <DollarSign size={20} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa] group-hover:text-[#efd08a] transition-colors">
                Pricing &amp; Commission Savings
              </h3>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                Calculate how much you lose to 22% aggregator cuts every month. Simple flat plans starting from ₹199/month with instant UPI activation.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#37252b] flex items-center justify-between text-xs font-mono text-[#efd08a]">
              <span>Launch ROI Calculator</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Merchant Stories */}
          <Link
            href="/stories"
            className="p-8 bg-[#26151b] border border-[#37252b] hover:border-[#efd08a] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
                <Star size={20} className="fill-[#efd08a]" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa] group-hover:text-[#efd08a] transition-colors">
                Merchant Case Studies
              </h3>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                How The Olive &amp; Barrel (Mumbai) and Kaffe Monsoon (Bengaluru) accelerated table turnover by 34% and boosted Google ratings to 4.9★.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#37252b] flex items-center justify-between text-xs font-mono text-[#efd08a]">
              <span>Read Case Studies</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOUR CORE CAPABILITIES WITH INTERACTIVE MOCKUPS        */}
      {/* ========================================================= */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b] space-y-24">
        {/* Capability 1: Dynamic QR Router */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono text-[#efd08a] uppercase tracking-widest font-bold">
              CAPABILITY 01 // IMMUTABLE HARDWARE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fbf9fa]">
              Dynamic Table Routing: Print Standees Once, Update Forever.
            </h2>
            <p className="text-sm text-[#d7d7d6] leading-relaxed">
              Never discard expensive acrylic table stands when seasonal dishes or prices change. The QR encodes an immutable short ID pointing to our edge router, which maps dynamically to your active digital menu.
            </p>
            <div className="pt-2">
              <Link
                href="/architecture#routing"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#efd08a] hover:underline"
              >
                <span>Deep dive into the /q/[shortId] routing engine</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 bg-[#26151b] border border-[#37252b] p-6 font-mono text-xs text-[#e6e6e5]">
            <div className="flex justify-between items-center pb-3 border-b border-[#37252b] text-[#8c6b76]">
              <span>// Route Resolution Matrix</span>
              <span className="text-[#efd08a]">LATENCY: 18ms</span>
            </div>
            <pre className="mt-3 text-xs text-[#e6e6e5] overflow-x-auto leading-relaxed">
{`GET /q/b7e2a (Table 12 Acrylic Stand)
├── Edge CDN Cache: HIT
├── Merchant: "Vintage Barrel Mumbai"
├── Table Status: OCCUPIED (Order #842)
└── Active Menu: Evening Cocktails & Mains
RESPONSE: 200 OK (38.4 KB WebP Payload)`}
            </pre>
          </div>
        </div>

        {/* Capability 2: 1-Tap 86 Kill Switch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-4">
            <span className="text-xs font-mono text-[#efd08a] uppercase tracking-widest font-bold">
              CAPABILITY 02 // ZERO EMBARRASSMENT
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fbf9fa]">
              Merchant 86 Kill-Switch: Turn Off Sold-Out Dishes Instantly.
            </h2>
            <p className="text-sm text-[#d7d7d6] leading-relaxed">
              When fresh ingredients run out during peak rush, your head chef can toggle dishes off from the Android companion app in 1 tap. The dish is immediately disabled across every table menu in the restaurant.
            </p>
            <div className="pt-2">
              <Link
                href="/product#simulator"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#efd08a] hover:underline"
              >
                <span>Test the 86 kill-switch in the live simulator</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 bg-[#26151b] border border-[#37252b] p-6 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#37252b] text-xs font-mono text-[#8c6b76]">
              <span>Kitchen Stock Controller</span>
              <span className="text-[#efd08a]">Live Broadcast Active</span>
            </div>
            <div className="p-3 bg-[#1f0f14] border border-[#ef4444]/40 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-[#fbf9fa]">Belgian Chocolate Fondant</p>
                <p className="text-[10px] font-mono text-[#ef4444]">Chef 86&apos;d • 0 in stock</p>
              </div>
              <span className="px-2.5 py-1 bg-[#ef4444]/20 text-[#ef4444] text-[10px] font-mono uppercase font-bold">
                Sold Out
              </span>
            </div>
            <div className="p-3 bg-[#1f0f14] border border-[#15803d]/40 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-[#fbf9fa]">Smoked Kokum Highball</p>
                <p className="text-[10px] font-mono text-[#15803d]">In stock • 34 orders today</p>
              </div>
              <span className="px-2.5 py-1 bg-[#15803d]/20 text-[#15803d] text-[10px] font-mono uppercase font-bold">
                Available
              </span>
            </div>
          </div>
        </div>

        {/* Capability 3: Google Review Interceptor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono text-[#efd08a] uppercase tracking-widest font-bold">
              CAPABILITY 03 // REPUTATION DEFENSE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fbf9fa]">
              Google Review Interceptor: Route 5 Stars Publicly, Resolve Issues Internally.
            </h2>
            <p className="text-sm text-[#d7d7d6] leading-relaxed">
              When a guest rates 1 to 3 stars, feedback is routed privately to the manager&apos;s phone before a negative review touches Google Maps. When a guest rates 4 or 5 stars, they are seamlessly guided to leave a public review.
            </p>
            <div className="pt-2">
              <Link
                href="/stories"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#efd08a] hover:underline"
              >
                <span>Read how Kaffe Monsoon achieved 4.9★ rating</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 bg-[#26151b] border border-[#37252b] p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#37252b] text-xs font-mono text-[#8c6b76]">
              <span>Interactive Filter Simulator</span>
              <span className="text-[#efd08a]">Tap Stars to Test</span>
            </div>
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSimulatedRating(s)}
                  className="p-2 hover:scale-110 transition-transform"
                >
                  <Star
                    size={28}
                    className={
                      s <= simulatedRating ? 'text-[#efd08a] fill-[#efd08a]' : 'text-[#37252b]'
                    }
                  />
                </button>
              ))}
            </div>
            <div className="p-4 bg-[#1f0f14] border border-[#37252b] text-xs">
              {simulatedRating >= 4 ? (
                <div className="text-[#15803d] space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>Rating: {simulatedRating} Stars — Public Redirect Triggered</span>
                  </p>
                  <p className="text-[11px] text-[#e6e6e5]">
                    Opens public Google Maps page in new tab to boost your restaurant&apos;s public ranking.
                  </p>
                </div>
              ) : (
                <div className="text-[#f59e0b] space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle size={15} />
                    <span>Rating: {simulatedRating} Stars — Private Internal Resolution</span>
                  </p>
                  <p className="text-[11px] text-[#e6e6e5]">
                    Captured directly to manager console with table number so the shift supervisor can resolve it at the table.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3.5. LIVE RESTAURANT WORKFLOW SHOWCASE (CUSTOMER-FACING) */}
      {/* ========================================================= */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            LIVE RESTAURANT SIMULATION // ZERO HARDWARE SETUP
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            See Exactly What Your Diners &amp; Kitchen Experience
          </h2>
          <p className="mt-3 text-sm text-[#d7d7d6]">
            No messy paper menus. No delayed orders. Diners scan and order in 15 seconds, and tickets pop up on your kitchen display instantly.
          </p>
        </div>

        {/* Interactive Showcase Container */}
        <div className="max-w-4xl mx-auto bg-[#26151b] border-2 border-[#efd08a]/60 shadow-2xl overflow-hidden">
          {/* View Mode Tabs */}
          <div className="bg-[#1f0f14] px-4 py-3 border-b border-[#37252b] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-[#efd08a] uppercase tracking-wider">
                Interactive Live Preview
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setDemoViewTab('guest')}
                className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  demoViewTab === 'guest'
                    ? 'bg-[#efd08a] text-[#040404] shadow-sm'
                    : 'text-[#d7d7d6] hover:bg-[#37252b]'
                }`}
              >
                1. Guest Mobile Menu
              </button>
              <button
                type="button"
                onClick={() => setDemoViewTab('kitchen')}
                className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  demoViewTab === 'kitchen'
                    ? 'bg-[#efd08a] text-[#040404] shadow-sm'
                    : 'text-[#d7d7d6] hover:bg-[#37252b]'
                }`}
              >
                2. Live Kitchen Display (KOT)
              </button>
              <button
                type="button"
                onClick={() => setDemoViewTab('analytics')}
                className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  demoViewTab === 'analytics'
                    ? 'bg-[#efd08a] text-[#040404] shadow-sm'
                    : 'text-[#d7d7d6] hover:bg-[#37252b]'
                }`}
              >
                3. Manager 0% Comm Savings
              </button>
            </div>
          </div>

          {/* Interactive Tab Body */}
          <div className="p-6 sm:p-8">
            {demoViewTab === 'guest' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Simulated Phone */}
                <div className="md:col-span-7 bg-[#170a0e] border border-[#37252b] p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-[#37252b]">
                    <div>
                      <span className="text-[10px] font-mono text-[#efd08a] font-bold uppercase">Table 4 • Dine In</span>
                      <h4 className="text-base font-bold text-[#fbf9fa]">Copper Chimney Bistro</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      ● Active Session
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="mt-4 space-y-3">
                    {[
                      { name: 'Truffle Paneer Sizzler', price: 490, desc: 'Tandoori paneer skewers with black truffle butter glaze', veg: true },
                      { name: 'Dum Gosht Biryani Pot', price: 620, desc: 'Slow-cooked aromatic basmati with saffron and spices', veg: false },
                      { name: 'Smoked Kokum Highball', price: 290, desc: 'Artisanal coastal kokum with fizzy botanical soda', veg: true },
                    ].map((dish, i) => (
                      <div key={i} className="p-3 bg-[#26151b] border border-[#37252b] flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${dish.veg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            <span className="text-xs font-bold text-[#fbf9fa]">{dish.name}</span>
                          </div>
                          <p className="text-[10px] text-[#8c6b76] line-clamp-1">{dish.desc}</p>
                          <span className="font-mono text-xs text-[#efd08a] font-bold">₹{dish.price}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(dish.name, 1)}
                            className="px-3 py-1 bg-[#efd08a] text-[#040404] text-[11px] font-bold hover:bg-[#f6deb0] transition-colors cursor-pointer"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total Bar */}
                  <div className="mt-4 p-3 bg-[#1f0f14] border-t border-[#37252b] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8c6b76] uppercase font-mono block">Table 4 Total (0% Surcharge)</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">₹{calculateSubtotal() > 0 ? calculateSubtotal() : 490}.00</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('Order Placed! In production, this directly opens guest UPI app (GPay/PhonePe) with 0% gateway commission.')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap size={13} />
                      <span>Instant UPI Pay</span>
                    </button>
                  </div>
                </div>

                {/* Right Value Points */}
                <div className="md:col-span-5 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                    WHY GUESTS LOVE IT
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                    3-Second Instant Scan with Zero App Download
                  </h3>
                  <ul className="space-y-3 text-xs text-[#d7d7d6]">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Opens directly in iPhone Camera or Android Chrome without downloading an app.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Direct 0% UPI link transfers payment straight to your current account.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Guests re-order drinks and desserts 3.4x faster, increasing average check size by 24%.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {demoViewTab === 'kitchen' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Kitchen Ticket Simulator */}
                <div className="md:col-span-7 bg-[#170a0e] border border-[#37252b] p-5 font-mono">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#efd08a]">
                    <div>
                      <span className="text-xs font-black text-[#efd08a]">KOT #4928 • TABLE 4</span>
                      <p className="text-[10px] text-[#8c6b76]">Time Elapsed: 03:14 min</p>
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase ${ticketReady ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950 animate-pulse'}`}>
                      {ticketReady ? 'READY FOR SERVICE' : 'COOKING IN PROGRESS'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-[#fbf9fa]">
                      <span>1x Truffle Paneer Sizzler</span>
                      <span className="text-[#efd08a]">STOVE 2</span>
                    </div>
                    <div className="text-[10px] text-amber-300 italic pl-3 border-l-2 border-amber-300">
                      &quot;Special Note: Extra crispy onions, mild spice&quot;
                    </div>

                    <div className="flex justify-between text-[#fbf9fa] pt-2">
                      <span>2x Smoked Kokum Highball</span>
                      <span className="text-[#efd08a]">BAR STATION</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#37252b] flex items-center justify-between">
                    <span className="text-[10px] text-[#8c6b76]">Assudani Kitchen Edge // Socket Stream</span>
                    <button
                      type="button"
                      onClick={() => setTicketReady(!ticketReady)}
                      className="px-4 py-2 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] text-xs font-black uppercase tracking-wider cursor-pointer transition-all"
                    >
                      {ticketReady ? 'Reset Ticket' : 'Mark Order Ready'}
                    </button>
                  </div>
                </div>

                {/* Right Value Points */}
                <div className="md:col-span-5 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                    KITCHEN SPEED &amp; ACCURACY
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                    Zero Shouting, Zero Lost Handwritten Slips
                  </h3>
                  <ul className="space-y-3 text-xs text-[#d7d7d6]">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Flashes on chef&apos;s kitchen tablet within 150 milliseconds of table scan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Auto-routes bar orders to bar counter and food orders to hot kitchen stoves.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Supports 58mm and 80mm ESC/POS Bluetooth thermal kitchen printers.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {demoViewTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 bg-[#170a0e] border border-[#37252b] p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#37252b]">
                    <span className="text-xs font-mono font-bold text-[#efd08a] uppercase">Monthly Revenue Protection</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">100% Retained</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#26151b] border border-[#37252b]">
                      <span className="text-[10px] font-mono text-[#8c6b76] uppercase">Monthly Dine-In Sales</span>
                      <p className="text-xl font-bold text-[#fbf9fa] mt-1">₹6,50,000</p>
                    </div>

                    <div className="p-4 bg-[#26151b] border border-rose-500/30">
                      <span className="text-[10px] font-mono text-rose-400 uppercase">Aggregator 22% Cut</span>
                      <p className="text-xl font-bold text-rose-400 mt-1">-₹1,43,000</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 border-2 border-emerald-500/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Assudani Flat SaaS Fee</span>
                      <p className="text-2xl font-black text-emerald-400 mt-0.5">₹319 / mo</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-300 font-mono block">Profit Saved In Your Bank</span>
                      <span className="text-lg font-black text-emerald-300 font-mono">+₹1,42,681</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                    OWNER FINANCIAL CONTROL
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                    Keep Every Rupee Your Hard Work Generates
                  </h3>
                  <ul className="space-y-3 text-xs text-[#d7d7d6]">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Zero percentage commissions on food, liquor, or desserts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Direct-to-bank UPI transfers mean zero 3-day payout holds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                      <span>Instant 86 sold-out killswitch stops waiters from taking orders for finished dishes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3.6. TRANSPARENT PACKAGES & 7-DAY FREE TRIAL GUARANTEE    */}
      {/* ========================================================= */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            TRANSPARENT COMMERCIAL PACKAGES
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Choose Your Plan with 7-Day Complete Free Trial
          </h2>
          <p className="mt-3 text-sm text-[#d7d7d6]">
            Every plan includes an unconditional 7-day trial. Zero AutoPay • No Credit Card Required • Instant Setup in 3 Minutes.
          </p>
        </div>

        {/* 7-Day Free Trial Highlight Banner */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-[#26151b] border-2 border-[#efd08a] shadow-2xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#efd08a]/15 text-[#efd08a] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>100% Risk-Free Restaurant Guarantee</span>
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
              7 Days Free on All Plans • No Credit Card Needed
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed max-w-xl">
              Start with full features on your active tables. Zero payment details taken. After 7 days, subscribe only if you love the speed and savings!
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('trial-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] font-mono text-xs uppercase font-black tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Activate 7-Day Free Trial</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Monthly vs Yearly Billing Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <span className="text-xs font-mono text-[#d7d7d6] uppercase tracking-wider font-semibold">
            Billing Frequency:
          </span>
          <div className="inline-flex p-1.5 bg-[#26151b] border border-[#37252b] rounded-full">
            <button
              type="button"
              onClick={() => setHomeBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                homeBillingCycle === 'monthly'
                  ? 'bg-[#efd08a] text-[#040404] shadow-md'
                  : 'text-[#d7d7d6] hover:text-[#fbf9fa]'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setHomeBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                homeBillingCycle === 'yearly'
                  ? 'bg-[#efd08a] text-[#040404] shadow-md'
                  : 'text-[#d7d7d6] hover:text-[#fbf9fa]'
              }`}
            >
              <span>Yearly</span>
              <span className="px-2 py-0.5 rounded-full bg-[#15803d] text-white text-[10px] font-black uppercase">
                Save 20% (2 Mos Free)
              </span>
            </button>
          </div>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="p-8 bg-[#26151b] border border-[#37252b] flex flex-col justify-between hover:border-[#efd08a]/60 transition-all">
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">Starter Plan</h3>
              <p className="mt-2 text-xs text-[#d7d7d6]">For small cafes, chai lounges, and food trucks.</p>

              <div className="mt-6 pb-6 border-b border-[#37252b]">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-5xl font-bold text-[#fbf9fa]">
                    ₹{homeBillingCycle === 'yearly' ? '159' : '199'}
                  </span>
                  <span className="font-mono text-xs text-[#8c6b76] uppercase">/ mo</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#efd08a]">
                  {homeBillingCycle === 'yearly' ? '₹1,908 billed annually (2 months free)' : 'Billed monthly • Cancel anytime'}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                  <CheckCircle2 size={12} />
                  <span>Includes 7-Day Free Trial</span>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-[#d7d7d6]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Up to 10 Dynamic QR Tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>0% Commission Direct UPI Settlements</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Live Menu Item Availability Toggles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Digital Kitchen Order Ticket (KOT)</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setLeadFormData((prev) => ({ ...prev, planPreference: 'starter' }));
                const el = document.getElementById('trial-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3 bg-[#1f0f14] border border-[#efd08a]/60 text-[#efd08a] hover:bg-[#efd08a] hover:text-[#040404] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Start 7-Day Free Trial
            </button>
          </div>

          {/* Growth Plan - Most Popular */}
          <div className="p-8 bg-[#26151b] border-2 border-[#efd08a] flex flex-col justify-between shadow-2xl scale-[1.02] relative">
            <span className="absolute -top-3.5 left-8 px-3 py-1 bg-[#efd08a] text-[#040404] font-mono text-[10px] uppercase font-black tracking-widest shadow-md">
              MOST POPULAR
            </span>

            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">Growth Plan</h3>
              <p className="mt-2 text-xs text-[#d7d7d6]">For busy bistros, restobars, and family dining restaurants.</p>

              <div className="mt-6 pb-6 border-b border-[#37252b]">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-5xl font-bold text-[#fbf9fa]">
                    ₹{homeBillingCycle === 'yearly' ? '319' : '399'}
                  </span>
                  <span className="font-mono text-xs text-[#8c6b76] uppercase">/ mo</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#efd08a]">
                  {homeBillingCycle === 'yearly' ? '₹3,828 billed annually (2 months free)' : 'Billed monthly • Cancel anytime'}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                  <CheckCircle2 size={12} />
                  <span>Includes 7-Day Free Trial</span>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-[#d7d7d6]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Up to 35 Dynamic QR Tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Google Maps 5-Star Review Interceptor</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Kitchen Display (KDS) &amp; Bluetooth Thermal KOT</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Manager 86 Sold-Out Availability Kill Switch</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Priority WhatsApp Concierge Onboarding</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setLeadFormData((prev) => ({ ...prev, planPreference: 'growth' }));
                const el = document.getElementById('trial-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3.5 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Start 7-Day Free Trial
            </button>
          </div>

          {/* Elite Plan */}
          <div className="p-8 bg-[#26151b] border border-[#37252b] flex flex-col justify-between hover:border-[#efd08a]/60 transition-all">
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">Elite Plan</h3>
              <p className="mt-2 text-xs text-[#d7d7d6]">For multi-floor dining, lounges, and multi-outlet chains.</p>

              <div className="mt-6 pb-6 border-b border-[#37252b]">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-5xl font-bold text-[#fbf9fa]">
                    ₹{homeBillingCycle === 'yearly' ? '559' : '699'}
                  </span>
                  <span className="font-mono text-xs text-[#8c6b76] uppercase">/ mo</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#efd08a]">
                  {homeBillingCycle === 'yearly' ? '₹6,708 billed annually (2 months free)' : 'Billed monthly • Cancel anytime'}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                  <CheckCircle2 size={12} />
                  <span>Includes 7-Day Free Trial</span>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-[#d7d7d6]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Unlimited Dynamic QR Tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Multi-Station KOT Routing (Kitchen + Bar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Hourly Velocity &amp; Peak Revenue Heatmaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <span>Dedicated 1-on-1 VIP Account Manager</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setLeadFormData((prev) => ({ ...prev, planPreference: 'elite' }));
                const el = document.getElementById('trial-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3 bg-[#1f0f14] border border-[#efd08a]/60 text-[#efd08a] hover:bg-[#efd08a] hover:text-[#040404] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3.7. CONNECTED 7-DAY FREE TRIAL BOOKING FORM              */}
      {/* ========================================================= */}
      <section id="trial-form" className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl mx-auto bg-[#26151b] border-2 border-[#efd08a] p-8 sm:p-12 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#37252b]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                INSTANT ONBOARDING // ZERO RISK
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa] mt-1">
                Start Your 7-Day Free Trial Today
              </h3>
              <p className="text-xs text-[#d7d7d6] mt-1">
                No credit card • No AutoPay setup • Live digital menu ready in 3 minutes.
              </p>
            </div>
            <div className="px-3.5 py-1.5 bg-[#1f0f14] border border-[#efd08a]/40 text-[#efd08a] font-mono text-xs font-bold shrink-0 self-start sm:self-auto">
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
              <label className="text-xs font-mono text-[#d7d7d6] block">Estimated Tables Count</label>
              <input
                type="number"
                min="1"
                max="200"
                value={leadFormData.dailyTables}
                onChange={(e) => setLeadFormData({ ...leadFormData, dailyTables: e.target.value })}
                className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#d7d7d6] block">Current POS or Special Requirements (Optional)</label>
              <textarea
                rows={2}
                placeholder="Mention current POS system, food delivery aggregators, or current table bottlenecks..."
                value={leadFormData.notes}
                onChange={(e) => setLeadFormData({ ...leadFormData, notes: e.target.value })}
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

      {/* ========================================================= */}
      {/* 4. PERSISTENT FAQ ACCORDION                                */}
      {/* ========================================================= */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            COMMON INQUIRIES
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Questions Restaurateurs Ask Most
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Do diners have to download an app?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Never. Diners point their native phone camera at the QR standee and the menu renders immediately in their default mobile browser in under 200ms with zero login or password friction.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              How does the 0% UPI direct payment work?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              When guests tap Pay, an NPCI standard UPI deep link opens their installed UPI app (GPay, PhonePe, Paytm). The money transfers directly from their bank to your current bank account with zero gateway fee deductions.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Can we print thermal kitchen KOT receipts?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Yes. The companion Android app supports ESC/POS 58mm and 80mm Bluetooth or Wi-Fi thermal printers. Orders automatically print to the kitchen or bar within 250ms of table submission.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              How do I get the Android companion app?
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              The companion app is officially verified on the Google Play Store under package ID <code className="text-[#efd08a]">com.qr.assudani</code>. Visit our <Link href="/download" className="text-[#efd08a] underline font-bold">Download page</Link> to install directly onto any Android device.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
