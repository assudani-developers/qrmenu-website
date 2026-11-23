import React from 'react';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Refund & Cancellation Policy | Assudani QR Technologies',
  description: 'Unconditional 7-Day Free Trial and transparent refund policies for Assudani QR restaurant subscriptions.',
};

export default function RefundPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-12 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            BILLING POLICY // FAIR USAGE
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-4 text-base text-[#d7d7d6] leading-relaxed max-w-2xl">
            We believe in complete trust and merchant-first transparency. No hidden auto-debits, no lock-ins, and a 100% risk-free 7-day trial.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 max-w-[1000px] mx-auto space-y-12 text-[#d7d7d6] text-sm leading-relaxed">
        {/* Banner */}
        <div className="p-8 bg-[#26151b] border-2 border-[#efd08a] shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#efd08a] font-mono text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 size={16} />
            <span>Zero Risk Guarantee</span>
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            7 Days to Fall in Love with Assudani QR
          </h2>
          <p className="text-xs text-[#d7d7d6] leading-relaxed">
            We never ask for your credit card, debit card, or UPI autopay to start your 7-day trial. You get full access to every feature—including live QR generation, Kitchen KOT, and review interception—without risking a single rupee. If the system does not speed up your table turnover, you pay nothing.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            1. Paid Plan Cancellation
          </h2>
          <p>
            You can cancel your subscription at any time directly through your Super Admin Dashboard or by contacting your dedicated account manager on WhatsApp. Because we do not run automatic recurring debits without your approval, your service simply continues until the end of your current prepaid billing cycle (month or year).
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            2. 14-Day Money-Back Guarantee for Annual Subscriptions
          </h2>
          <p>
            For merchants who choose to prepay for an Annual / Yearly subscription (which includes 2 free months), we offer an additional 14-Day Full Money-Back Guarantee from the date of paid activation. If our technical support is unable to resolve your operational requirements, we will refund 100% of your annual payment back to your source bank account within 3 to 5 business days.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            3. Hardware & Standee Acrylic Goods
          </h2>
          <p>
            Pre-printed acrylic QR stands, wood-engraved table blocks, and NFC tap discs are custom-fabricated for each restaurant brand. If any standee arrives physically damaged during transit, we replace it completely free of charge upon photographic verification within 48 hours of delivery.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            4. How to Request a Refund or Cancellation
          </h2>
          <p>
            To initiate an annual plan refund or pause your trial, please reach out to our billing desk via WhatsApp or email with your registered Restaurant Name and Phone Number:
          </p>
          <div className="p-4 bg-[#1f0f14] border border-[#37252b] font-mono text-xs space-y-1">
            <p>Email: <strong className="text-[#efd08a]">billing@assudani.com</strong></p>
            <p>Founder Desk: <strong className="text-[#efd08a]">Piyush Assudani (Founder, Assudani Developers)</strong></p>
            <p>Resolution SLA: Within 24 Hours</p>
          </div>
        </div>
      </section>
    </div>
  );
}
