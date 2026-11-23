'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  ShieldCheck,
  ExternalLink,
  Download,
  Copy,
  CheckCircle2,
  Terminal,
  QrCode,
  Printer,
  Zap,
  ArrowRight,
  Globe,
  Layers,
} from 'lucide-react';

export default function DownloadPage() {
  const [copiedPkg, setCopiedPkg] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const copyPackageName = () => {
    navigator.clipboard.writeText('com.qr.assudani');
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 2000);
  };

  const copyDockerCmd = () => {
    navigator.clipboard.writeText('docker run -d -p 5000:5000 --name assudani-api assudani/qr-engine:latest');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-16 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#26151b] border border-[#37252b] text-[#efd08a] font-mono text-xs uppercase tracking-widest mb-6">
            <Smartphone size={14} />
            <span>Merchant Companion App • Google Play Certified</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fbf9fa] leading-[1.08]">
            Deploy Your Dining Room in 3 Minutes.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#d7d7d6] font-normal leading-relaxed max-w-3xl">
            Get the certified merchant companion app on Google Play to manage live orders, mark items sold out, and print thermal KOT tickets in real time.
          </p>
        </div>
      </section>

      {/* 2. PRIMARY DOWNLOAD TARGETS */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Card: Google Play Store Companion App */}
          <div className="lg:col-span-7 bg-[#26151b] border-2 border-[#efd08a] p-8 sm:p-12 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 bg-[#15803d]/20 text-[#15803d] border border-[#15803d]/40 text-xs font-mono font-bold flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Google Play Protect Verified</span>
                </span>
                <span className="text-xs font-mono text-[#8c6b76]">v1.0.0 Production Build</span>
              </div>

              <div>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fbf9fa]">
                  Assudani QR Merchant App
                </h2>
                <p className="text-sm text-[#d7d7d6] mt-2 leading-relaxed">
                  The Android companion app for restaurant managers, head chefs, and waitstaff. Receive live table orders, 86 dishes in 1-tap, and sync Bluetooth thermal printers.
                </p>
              </div>

              {/* Package ID strip */}
              <div className="p-4 bg-[#1f0f14] border border-[#37252b] flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-[#8c6b76]">
                    Play Store Package Identifier:
                  </span>
                  <p className="font-mono text-sm font-bold text-[#efd08a]">com.qr.assudani</p>
                </div>
                <button
                  onClick={copyPackageName}
                  className="px-3 py-1.5 bg-[#37252b] hover:bg-[#4a343d] text-xs font-mono text-[#e6e6e5] flex items-center gap-1.5 transition-colors"
                >
                  {copiedPkg ? <CheckCircle2 size={13} className="text-[#efd08a]" /> : <Copy size={13} />}
                  <span>{copiedPkg ? 'Copied' : 'Copy ID'}</span>
                </button>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-3 text-xs font-mono text-[#d7d7d6]">
                <div className="p-3 bg-[#1f0f14] border border-[#37252b]">
                  <p className="text-[#8c6b76] text-[10px]">OS REQUIREMENT</p>
                  <p className="font-bold text-[#fbf9fa] mt-0.5">Android 8.0+</p>
                </div>
                <div className="p-3 bg-[#1f0f14] border border-[#37252b]">
                  <p className="text-[#8c6b76] text-[10px]">DOWNLOAD SIZE</p>
                  <p className="font-bold text-[#fbf9fa] mt-0.5">~18 MB</p>
                </div>
                <div className="p-3 bg-[#1f0f14] border border-[#37252b]">
                  <p className="text-[#8c6b76] text-[10px]">ENGINE</p>
                  <p className="font-bold text-[#efd08a] mt-0.5">Flutter 3.41</p>
                </div>
              </div>
            </div>

            {/* Download CTA */}
            <div className="mt-8 pt-8 border-t border-[#37252b]">
              <a
                href="https://play.google.com/store/apps/details?id=com.qr.assudani"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#efd08a] text-[#040404] text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-[#f6deb0] transition-colors shadow-lg"
              >
                <Smartphone size={16} />
                <span>Download on Google Play Store</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Secondary Card: Guest Diner Web Kiosk (Zero Install) */}
          <div className="lg:col-span-5 bg-[#26151b] border border-[#37252b] p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="px-3 py-1 bg-[#1f0f14] border border-[#37252b] text-[#efd08a] text-xs font-mono uppercase tracking-wider inline-block">
                For Diners & Guests
              </span>

              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa]">
                  Zero-Install Customer Web Kiosk
                </h3>
                <p className="text-xs sm:text-sm text-[#d7d7d6] mt-2 leading-relaxed">
                  Your guests never download an app. They scan the table QR code and the full menu opens instantly in iOS Safari or Android Chrome with sub-second rendering.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#e6e6e5]">
                  <CheckCircle2 size={15} className="text-[#efd08a] shrink-0" />
                  <span>Works in native iOS & Android camera scanners</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#e6e6e5]">
                  <CheckCircle2 size={15} className="text-[#efd08a] shrink-0" />
                  <span>Zero sign-in or login barrier for guests</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#e6e6e5]">
                  <CheckCircle2 size={15} className="text-[#efd08a] shrink-0" />
                  <span>Direct 1-tap UPI deep linking (GPay, PhonePe, Paytm)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#37252b]">
              <Link
                href="/product#simulator"
                className="w-full py-3.5 border border-[#efd08a] text-[#efd08a] hover:bg-[#efd08a]/10 text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <Globe size={15} />
                <span>Preview Interactive Web Menu</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP BY STEP ONBOARDING TIMELINE */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            QUICKSTART GUIDE
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Go Live in Four Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-3">
            <span className="font-mono text-2xl font-bold text-[#efd08a]">01</span>
            <h4 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
              Install Android App
            </h4>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Download <code className="text-[#efd08a]">com.qr.assudani</code> from the Google Play Store onto your manager or billing phone.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-3">
            <span className="font-mono text-2xl font-bold text-[#efd08a]">02</span>
            <h4 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
              Add Bank UPI VPA
            </h4>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Enter your restaurant&apos;s current bank account UPI ID to enable 0% fee instant guest payments.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-3">
            <span className="font-mono text-2xl font-bold text-[#efd08a]">03</span>
            <h4 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
              Print Table Standees
            </h4>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Export high-resolution PDF print files for your acrylic standees. Permanent routing means you print once.
            </p>
          </div>

          <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-3">
            <span className="font-mono text-2xl font-bold text-[#efd08a]">04</span>
            <h4 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
              Start Dining
            </h4>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Guests scan, order dishes, and pay directly into your account with real-time KOT printing in your kitchen.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HARDWARE & THERMAL PRINTER COMPATIBILITY */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto">
        <div className="bg-[#1f0f14] border border-[#37252b] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#efd08a]">
                <Printer size={16} />
                <span>HARDWARE AGNOSTIC • ZERO LOCK-IN</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa]">
                Universal Thermal ESC/POS Printer Support
              </h3>
              <p className="text-sm text-[#d7d7d6] leading-relaxed">
                Connect any industry standard 58mm or 80mm receipt printer via Bluetooth, USB, or local Ethernet. Works out of the box with Epson, TVS Electronics, Posiflex, NGX, and Sunmi POS terminals.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <Link
                href="/pricing"
                className="bg-[#efd08a] text-[#040404] px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#f6deb0] transition-colors"
              >
                View Plans & Activate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
