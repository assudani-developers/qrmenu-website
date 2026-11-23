import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Safety — ASSUDANI QR',
  description: 'Official Google Play Store data safety and privacy terms for package com.qr.assudani.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      <section className="px-6 pt-16 pb-20 max-w-[1000px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#efd08a] hover:underline mb-8"
        >
          <ArrowLeft size={14} />
          <span>Return to Overview</span>
        </Link>

        <div className="bg-[#26151b] border-2 border-[#37252b] p-8 sm:p-14 shadow-2xl space-y-8">
          <div className="space-y-3 border-b border-[#37252b] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#15803d]/20 text-[#15803d] border border-[#15803d]/40 text-xs font-mono font-bold">
              <ShieldCheck size={14} />
              <span>Google Play Policy & GDPR Compliant</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa]">
              Privacy Policy & Terms of Service
            </h1>
            <p className="text-xs font-mono text-[#8c6b76]">
              Effective Date: November 18, 2026 • Verified Package: <strong className="text-[#efd08a]">com.qr.assudani</strong>
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#d7d7d6] leading-relaxed">
            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#fbf9fa] mb-2">
                1. Application Scope & Data Controller
              </h2>
              <p>
                Assudani QR (&quot;the Platform&quot;), including the verified Google Play Store application (<code className="text-[#efd08a] font-mono">com.qr.assudani</code>) and web routing endpoints, is operated by Assudani QR Technologies Pvt Ltd for restaurant merchants, staff, and dine-in guests.
              </p>
            </div>

            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#fbf9fa] mb-2">
                2. Guest & Diner Privacy: Friction-Free Dining
              </h2>
              <p>
                Dine-in guests who scan table QR codes are <strong className="text-[#fbf9fa]">never required to create an account</strong>, provide telephone numbers, or submit biometric identity to view restaurant menus or place orders. Browsing dishes, selecting preferences, and reviewing bill totals occurs anonymously on the guest&apos;s client device.
              </p>
            </div>

            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#fbf9fa] mb-2">
                3. Direct UPI Intent Payment Security
              </h2>
              <p>
                All digital settlements are initiated using standard NPCI UPI Intent URI protocols (<code className="text-[#efd08a] font-mono">upi://pay?...</code>). Payment authorization happens exclusively within the diner&apos;s chosen bank or authorized PSP app (Google Pay, PhonePe, BHIM, Paytm). Assudani QR does not touch, intermediate, or store debit card details, credit card numbers, or secret UPI PINs on any cloud server.
              </p>
            </div>

            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#fbf9fa] mb-2">
                4. Merchant Profile & Media Optimization
              </h2>
              <p>
                Restaurant operators provide basic merchant data (restaurant display name, branch address, contact phone number, and receiving UPI VPA). Uploaded food photography is sanitized and transcoded locally into progressive WebP binaries under 100kb; camera EXIF metadata and GPS geolocation coordinates are stripped during transcoding.
              </p>
            </div>

            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#fbf9fa] mb-2">
                5. Third-Party Data Sharing & Advertising
              </h2>
              <p>
                We do not sell, rent, or trade merchant or guest behavioral data to third-party ad networks or brokers. The platform runs entirely devoid of ad-tracking pixels, social analytics trackers, or commercial profiling scripts.
              </p>
            </div>

            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#fbf9fa] mb-2">
                6. Contact Developer & Legal Inquiries
              </h2>
              <p>
                For questions regarding data processing or compliance inquiries for Google Play package <code className="text-[#efd08a] font-mono">com.qr.assudani</code>, contact our developer team at:
              </p>
              <div className="p-4 bg-[#1f0f14] border border-[#37252b] font-mono text-xs text-[#efd08a] mt-2">
                Email: legal@assudani.in • Corporate VPA: billing@assudani
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
