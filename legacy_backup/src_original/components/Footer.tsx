'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Server,
  Zap,
  Lock,
  Heart,
  Code2,
  Terminal,
  Activity,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="w-full bg-[#efedef] text-[#040404] border-t-4 border-[#efd08a] mt-auto">
        {/* Upper Pre-Footer Callout */}
        <div className="border-b border-[#dad8da] px-6 py-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#735329] font-bold block mb-2">
                Next-Gen Restaurant Infrastructure
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#040404] leading-tight">
                Ready to replace slow paper menus and eliminate 25% aggregator cuts?
              </h2>
              <p className="mt-3 text-base text-[#4a484a] max-w-2xl leading-relaxed">
                Launch your restaurant&apos;s dynamic QR menu in 3 minutes. Zero hardware setup, direct-to-bank UPI transfers, and sub-second edge delivery.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <Link
                href="/download"
                className="bg-[#040404] text-[#fbf9fa] hover:bg-[#26151b] px-6 py-4 text-xs uppercase tracking-widest font-bold text-center transition-all flex items-center justify-center gap-2 group shadow-lg"
              >
                <span>Download Merchant App</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-[#040404] text-[#040404] hover:bg-[#040404] hover:text-[#efedef] px-6 py-4 text-xs uppercase tracking-widest font-bold text-center transition-all"
              >
                Explore Tiers & ROI Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="px-6 py-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand & Overview */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#040404] text-[#efd08a] flex items-center justify-center font-serif-display font-bold text-lg tracking-wider">
                  AQ
                </div>
                <span className="font-serif-display text-2xl font-bold tracking-tight text-[#040404]">
                  ASSUDANI QR
                </span>
              </div>
              <p className="text-sm text-[#4a484a] leading-relaxed mb-6 max-w-sm">
                The high-performance digital dining operating system engineered for modern restaurants, cloud kitchens, and boutique cafes across India.
              </p>

              {/* Developer Founder Credit Card */}
              <div className="p-4 bg-white border-2 border-[#040404] shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#735329]">
                    DEVELOPER & FOUNDER
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                </div>
                <p className="font-serif-display text-lg font-bold text-[#040404]">
                  Piyush Assudani
                </p>
                <p className="text-xs text-[#4a484a] leading-relaxed">
                  Founder & Principal Systems Architect at <strong className="text-[#040404]">Assudani Developers</strong>.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#040404]">
                  <span className="px-2 py-0.5 bg-[#efedef] font-bold border border-[#dad8da]">
                    Full-Stack & Mobile
                  </span>
                  <span className="px-2 py-0.5 bg-[#efedef] font-bold border border-[#dad8da]">
                    SaaS Founder
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-[#e3e1e3] border border-[#dad8da] flex items-center gap-3 text-xs text-[#2b2a2b]">
                <ShieldCheck size={20} className="text-[#15803d] shrink-0" />
                <div>
                  <p className="font-semibold text-[#040404]">Google Play Verified Package</p>
                  <p className="font-mono text-[11px] text-[#5c5a5c]">ID: com.qr.assudani</p>
                </div>
              </div>
            </div>

            {/* Navigation Column 1: Engineering Architecture */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-[#040404] mb-4 pb-1 border-b border-[#dad8da]">
                Architecture
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/architecture" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    System Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/architecture#compression" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    10MB WebP Image Pipeline
                  </Link>
                </li>
                <li>
                  <Link href="/architecture#upi-intent" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Direct UPI Intent Settlement
                  </Link>
                </li>
                <li>
                  <Link href="/architecture#realtime" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    WebSocket Real-Time Engine
                  </Link>
                </li>
                <li>
                  <Link href="/architecture#security" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    POSIX Atomic Write Protection
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation Column 2: Product Modules */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-[#040404] mb-4 pb-1 border-b border-[#dad8da]">
                Product Suite
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/product" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Digital Menu System
                  </Link>
                </li>
                <li>
                  <Link href="/product#simulator" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Interactive Kiosk Simulator
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    SaaS Subscription Tiers
                  </Link>
                </li>
                <li>
                  <Link href="/pricing#calculator" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Aggregator Savings Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Merchant Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation Column 3: Deployment & Compliance */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-[#040404] mb-4 pb-1 border-b border-[#dad8da]">
                Deploy & Legal
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/download" className="text-[#4a484a] hover:text-[#040404] transition-colors flex items-center gap-1.5 font-medium">
                    <Smartphone size={14} />
                    <span>Google Play Download</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.qr.assudani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4a484a] hover:text-[#040404] transition-colors flex items-center gap-1"
                  >
                    <span>Play Store Web Listing</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Privacy Policy & Data Safety
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Terms of Service & 7-Day Trial
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Refund & Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#4a484a] hover:text-[#040404] transition-colors">
                    Contact & Concierge Desk
                  </Link>
                </li>
                <li>
                  <span className="text-[#848284] text-xs">Direct UPI: 0% Bank Settlement</span>
                </li>
                <li className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#15803d]/10 text-[#15803d] font-mono text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]"></span>
                    <span>99.98% Uptime SLA</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Massive Editorial Watermark */}
          <div className="mt-16 pt-12 border-t border-[#dad8da] select-none pointer-events-none">
            <p className="font-serif-display font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#dad8da] tracking-tight leading-none uppercase text-center overflow-hidden whitespace-nowrap">
              ASSUDANI DINING ARCHITECTURE
            </p>
          </div>

          {/* Bottom Metadata & Legal Bar */}
          <div className="mt-8 pt-6 border-t border-[#dad8da] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e6b6e] gap-4">
            <p>
              © {new Date().getFullYear()} Assudani QR Technologies Pvt Ltd. Designed & Developed by <strong className="text-[#040404]">Piyush Assudani</strong> (Founder, Assudani Developers).
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-[#040404] transition-colors underline">
                Privacy Policy
              </Link>
              <Link href="/architecture" className="hover:text-[#040404] transition-colors underline">
                Technical Specification
              </Link>
              <Link href="/download" className="hover:text-[#040404] transition-colors underline">
                Google Play: com.qr.assudani
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 🌟 HERMES-AGENT INSPIRED SECONDARY DOCKED SUB-FOOTER BAR                   */}
      {/* ========================================================================= */}
      <section
        aria-label="System Heartbeat & Developer Docket"
        className="w-full bg-[#170a0e] border-t border-[#efd08a]/30 text-[#e6e6e5] px-4 py-3 text-xs tracking-wide shadow-2xl relative z-40"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          {/* Left: Live System Heartbeat */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#d7d7d6]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">SYSTEM ONLINE</span>
            <span className="text-[#7a5d67]">•</span>
            <span>POSIX ATOMIC PERSISTENCE</span>
            <span className="hidden sm:inline text-[#7a5d67]">•</span>
            <span className="hidden sm:inline text-[#efd08a]">LATENCY &lt; 20ms</span>
          </div>

          {/* Center: Prominent Developer & Founder Credit */}
          <div className="flex items-center gap-1.5 text-xs text-[#fbf9fa]">
            <span className="text-[#8c6b76] font-mono text-[11px]">ARCHITECTED BY</span>
            <span className="font-bold text-[#efd08a] hover:underline cursor-pointer">
              Piyush Assudani
            </span>
            <span className="text-[#8c6b76] font-mono text-[11px]">| FOUNDER, ASSUDANI DEVELOPERS</span>
          </div>

          {/* Right: Quick Launch Public Pills */}
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <Link
              href="/product"
              className="px-2.5 py-1 bg-[#26151b] border border-[#efd08a]/40 text-[#efd08a] hover:bg-[#efd08a] hover:text-[#040404] transition-all flex items-center gap-1"
            >
              <Zap size={11} />
              <span>Live Kiosk Demo</span>
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.qr.assudani"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-[#26151b] border border-[#37252b] text-[#d7d7d6] hover:text-white transition-all flex items-center gap-1"
            >
              <Smartphone size={11} />
              <span>Play Store</span>
            </a>
            <span className="hidden lg:inline px-2 py-1 bg-[#1f0f14] border border-[#37252b] text-[#8c6b76]">
              NPCI Certified UPI Settlement
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
