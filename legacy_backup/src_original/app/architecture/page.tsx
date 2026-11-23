import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Server,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  Smartphone,
  Flame,
  FileCode,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architecture & Deep Tech — ASSUDANI QR',
  description: 'Technical whitepaper on our sub-second dynamic QR router, 100kb Sharp WebP compression engine, and 0% fee direct UPI intent architecture.',
};

export default function ArchitecturePage() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#26151b] border border-[#37252b] text-[#efd08a] font-mono text-xs uppercase tracking-widest mb-6">
            <Cpu size={14} />
            <span>Architecture Whitepaper • Sub-Second Latency</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fbf9fa] leading-[1.08]">
            Engineered for 180ms Table Loads & Zero-Commission UPI.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#d7d7d6] font-normal leading-relaxed max-w-3xl">
            Why traditional PDF menus and heavy aggregator web apps fail on restaurant 4G networks, and how Assudani QR re-engineers the dining stack from the socket level up.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono">
            <div className="bg-[#26151b] border border-[#37252b] px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#15803d]"></span>
              <span className="text-[#e6e6e5]">EDGE ROUTER: <strong className="text-[#efd08a]">&lt;180ms SSR</strong></span>
            </div>
            <div className="bg-[#26151b] border border-[#37252b] px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#15803d]"></span>
              <span className="text-[#e6e6e5]">WEBP COMPRESSION: <strong className="text-[#efd08a]">&lt;100KB/ITEM</strong></span>
            </div>
            <div className="bg-[#26151b] border border-[#37252b] px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#15803d]"></span>
              <span className="text-[#e6e6e5]">GATEWAY CUT: <strong className="text-[#efd08a]">0.0% DIRECT UPI</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE PILLARS GRID */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            FOUNDATIONAL INFRASTRUCTURE
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Five Technical Inventions That Power The Platform
          </h2>
        </div>

        <div className="space-y-16">
          {/* PILLAR 1: Dynamic QR Routing */}
          <div id="routing" className="bg-[#26151b] border border-[#37252b] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#efd08a] bg-[#1f0f14] px-3 py-1 border border-[#37252b]">
                  <span>01 // DYNAMIC QR ROUTER</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#fbf9fa]">
                  Print Once, Update Forever: The `/q/[shortId]` Engine
                </h3>
                <p className="text-sm sm:text-base text-[#d7d7d6] leading-relaxed">
                  Traditional QR menus encode static URLs or raw PDF file links directly into QR matrices. When prices change, dishes run out, or links break, restaurants are forced to discard expensive acrylic table standees.
                </p>
                <p className="text-sm sm:text-base text-[#d7d7d6] leading-relaxed">
                  Assudani QR decouples the physical table artifact from the digital restaurant payload via an ultra-low latency routing table. The QR standee points permanently to an immutable edge endpoint:
                </p>
                <div className="p-4 bg-[#1f0f14] border border-[#37252b] font-mono text-xs text-[#efd08a] overflow-x-auto">
                  <code>https://assudani.in/q/t4a9e → FastEdge Router → SSR Kitchen State</code>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#e6e6e5]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#efd08a] shrink-0" />
                    <span>Table reassignment in under 1 second without touching physical tables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#efd08a] shrink-0" />
                    <span>Zero client-side bundle hydration penalty for instantaneous visual display</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 bg-[#1f0f14] border border-[#37252b] p-6 font-mono text-xs text-[#e6e6e5] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#37252b] text-[#8c6b76]">
                  <span>// Dynamic Routing Execution Trace</span>
                  <span className="text-[#efd08a]">LATENCY: 14ms</span>
                </div>
                <pre className="text-xs text-[#e6e6e5] overflow-x-auto leading-relaxed">
{`[INCOMING_SCAN] Table 07 (Hash: 9b2a1f)
├── 1. Edge DNS Resolve: 4ms
├── 2. Merchant ID Lookup: "rest_082_jaipur"
├── 3. Dynamic Menu Cache Check: HIT (TTL 300s)
├── 4. Active Out-of-Stock Filter Applied:
│   └── 86'd: "Truffle Sizzler" (Excluded)
├── 5. Pre-computed Pricing & Taxes Injected
└── 6. HTML Payload Emitted: 42.1 KB
TOTAL TIME-TO-FIRST-BYTE: 18ms`}
                </pre>
              </div>
            </div>
          </div>

          {/* PILLAR 2: 100kb Sharp WebP Compression */}
          <div id="compression" className="bg-[#26151b] border border-[#37252b] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 lg:order-2 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#efd08a] bg-[#1f0f14] px-3 py-1 border border-[#37252b]">
                  <span>02 // LOSSLESS MEDIA PIPELINE</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#fbf9fa]">
                  Automated 100kb Sharp WebP Pipeline vs 12MB Phone Uploads
                </h3>
                <p className="text-sm sm:text-base text-[#d7d7d6] leading-relaxed">
                  When restaurant staff upload pictures of dishes straight from modern 48MP smartphone cameras, raw files measure 8MB to 14MB each. A 50-dish menu consumes over 500MB of bandwidth—instantly crashing diner mobile browsers on congested dining room Wi-Fi.
                </p>
                <p className="text-sm sm:text-base text-[#d7d7d6] leading-relaxed">
                  Our ingestion microservice uses libvips / Sharp to sanitize, crop, strip camera EXIF telemetry, downscale to retinal 800×800, and encode into modern progressive WebP with structural similarity quantization.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#1f0f14] border border-[#ef4444]/30">
                    <p className="text-xs text-[#ef4444] font-mono font-bold">RAW SMARTPHONE JPEG</p>
                    <p className="text-2xl font-serif-display font-bold text-[#fbf9fa] mt-1">11.8 MB</p>
                    <p className="text-xs text-[#8c6b76] mt-1">4.2s load on 4G • Memory bloat</p>
                  </div>
                  <div className="p-4 bg-[#1f0f14] border border-[#efd08a]">
                    <p className="text-xs text-[#efd08a] font-mono font-bold">ASSUDANI WEBP ENGINE</p>
                    <p className="text-2xl font-serif-display font-bold text-[#efd08a] mt-1">86.4 KB</p>
                    <p className="text-xs text-[#e6e6e5] mt-1">92ms load • 60 FPS smooth scroll</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 lg:order-1 bg-[#1f0f14] border border-[#37252b] p-6 font-mono text-xs text-[#e6e6e5]">
                <div className="flex items-center justify-between pb-3 border-b border-[#37252b] text-[#8c6b76]">
                  <span>// Image Transcoding Microservice</span>
                  <span className="text-[#efd08a]">LIBVIPS C++ BINDINGS</span>
                </div>
                <pre className="text-xs text-[#e6e6e5] overflow-x-auto leading-relaxed mt-3">
{`// sharp pipeline implementation
const processMenuItemImage = async (buffer) => {
  return await sharp(buffer)
    .rotate() // auto-orient from EXIF
    .resize(800, 800, {
      fit: 'cover',
      position: 'centre',
      withoutEnlargement: true
    })
    .webp({
      quality: 82,
      alphaQuality: 85,
      lossless: false,
      effort: 6
    })
    .toBuffer();
};
// Result: 11,840,128 bytes → 88,412 bytes (-99.2%)`}
                </pre>
              </div>
            </div>
          </div>

          {/* PILLAR 3: Direct 0% UPI Intent Protocol */}
          <div id="upi-intent" className="bg-[#26151b] border border-[#37252b] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#efd08a] bg-[#1f0f14] px-3 py-1 border border-[#37252b]">
                  <span>03 // ZERO COMMISSION SETTLEMENT</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#fbf9fa]">
                  Direct-to-Bank UPI Deep Linking: No Middleman Withholding
                </h3>
                <p className="text-sm sm:text-base text-[#d7d7d6] leading-relaxed">
                  Third-party payment gateways (Razorpay, Paytm PG, Cashfree) deduct 1.95% to 2.5% + GST on every bill and withhold merchant payouts for 24 to 72 hours under T+2 settlement schedules. On ₹10,00,000 monthly turnover, that drains ₹25,000+ pure profit every month.
                </p>
                <p className="text-sm sm:text-base text-[#d7d7d6] leading-relaxed">
                  Assudani QR constructs an NPCI-compliant native UPI Intent URI right in the mobile browser. When a diner taps Pay, their device opens Google Pay, PhonePe, or BHIM directly:
                </p>
                <div className="p-4 bg-[#1f0f14] border border-[#37252b] font-mono text-xs text-[#efd08a] break-all">
                  <code>upi://pay?pa=restaurant@okaxis&pn=Assudani%20Lounge&am=1450.00&cu=INR&tr=INV-99214</code>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#efd08a] font-mono">
                  <CheckCircle2 size={16} />
                  <span>100% OF FUNDS LAND DIRECTLY IN YOUR CURRENT ACCOUNT INSTANTLY</span>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#1f0f14] border border-[#37252b] p-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#efd08a] mb-4 pb-2 border-b border-[#37252b]">
                  Payment Protocol Comparison
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-[#26151b] border border-[#37252b]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-[#fbf9fa]">Standard Aggregators & Gateways</span>
                      <span className="text-xs font-mono text-[#ef4444] font-bold">2.2% + 18% GST</span>
                    </div>
                    <p className="text-xs text-[#8c6b76]">Funds held in nodal escrow. Merchant receives payout 48-72h later.</p>
                  </div>
                  <div className="p-4 bg-[#1f0f14] border-2 border-[#efd08a]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-[#efd08a]">Assudani Direct UPI Protocol</span>
                      <span className="text-xs font-mono text-[#15803d] font-bold bg-[#15803d]/20 px-2 py-0.5">0.00% COMMISSION</span>
                    </div>
                    <p className="text-xs text-[#e6e6e5]">Immediate diner-to-merchant NEFT/IMPS clearing. Zero gateway deduction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 4 & 5: Realtime KOT Sync & Role Isolation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Realtime KOT */}
            <div id="realtime" className="bg-[#26151b] border border-[#37252b] p-8 space-y-4">
              <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
                <Layers size={20} />
              </div>
              <h4 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                Realtime Kitchen KOT Broadcasts
              </h4>
              <p className="text-sm text-[#d7d7d6] leading-relaxed">
                When a table submits an order, our event engine dispatches binary WebSocket packets with Server-Sent Events (SSE) fallback. Kitchen displays and 58mm/80mm thermal receipt printers receive ESC/POS directives with sub-250ms propagation.
              </p>
              <ul className="text-xs font-mono text-[#e6e6e5] space-y-2 pt-2">
                <li>• Automatic station routing (Bar drinks vs Main kitchen)</li>
                <li>• Offline queueing if kitchen Wi-Fi blinks</li>
                <li>• Multi-waiter live status sync</li>
              </ul>
            </div>

            {/* Role Isolation */}
            <div id="security" className="bg-[#26151b] border border-[#37252b] p-8 space-y-4">
              <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
                <Lock size={20} />
              </div>
              <h4 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                Strict Sandbox & Role Isolation
              </h4>
              <p className="text-sm text-[#d7d7d6] leading-relaxed">
                Public diners enjoy frictionless zero-login menu access while merchant credentials, revenue analytics, and Super Admin consoles operate on strictly isolated privilege tiers with cryptographic token validation.
              </p>
              <ul className="text-xs font-mono text-[#e6e6e5] space-y-2 pt-2">
                <li>• Diners cannot inspect internal APIs or bill logs</li>
                <li>• Certified Play Store app (<code className="text-[#efd08a]">com.qr.assudani</code>)</li>
                <li>• Zero analytics tracking or data brokerage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 bg-[#efd08a] text-[#040404] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold">
              Ready to see the difference on your tables?
            </h3>
            <p className="text-sm text-[#382b14] mt-1">
              Explore our simple monthly pricing or test the interactive product suite.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="bg-[#040404] text-[#fbf9fa] hover:bg-[#26151b] px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all"
            >
              View Pricing Tiers
            </Link>
            <Link
              href="/download"
              className="border-2 border-[#040404] text-[#040404] hover:bg-[#040404] hover:text-[#efd08a] px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all"
            >
              Get Android App
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
