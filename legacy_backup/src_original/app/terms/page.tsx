import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Assudani QR Technologies',
  description: 'Terms of Service, 7-Day Free Trial conditions, and merchant usage terms for Assudani QR Technologies.',
};

export default function TermsPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-12 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            LEGAL // MERCHANT AGREEMENT
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Terms of Service
          </h1>
          <p className="mt-4 text-base text-[#d7d7d6] leading-relaxed max-w-2xl">
            Clear, transparent terms governing the use of Assudani QR software, dynamic standees, and subscription services. Effective as of November 2026.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-16 max-w-[1000px] mx-auto space-y-12 text-[#d7d7d6] text-sm leading-relaxed">
        {/* Highlight 7-day free trial clause */}
        <div className="p-8 bg-[#26151b] border-2 border-[#efd08a] shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#efd08a] font-mono text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 size={16} />
            <span>7-Day Completely Free Trial Clause</span>
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            Zero AutoPay & No Credit Card Commitment
          </h2>
          <p className="text-xs text-[#d7d7d6] leading-relaxed">
            Every new restaurant onboarded to Assudani QR receives an unconditional 7-Day Complete Free Trial on all tiers (Starter, Growth, Elite). No credit card, debit card, mandate, or UPI autopay is registered upon starting the trial. At the conclusion of 7 calendar days, you may choose to activate a paid subscription (monthly or yearly). If you do not choose to renew, your account naturally pauses with zero penalty, zero hidden fees, and zero auto-debits.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            1. Software License & Service Provision
          </h2>
          <p>
            Assudani QR Technologies Pvt Ltd (&quot;Assudani QR&quot;) grants the merchant a non-exclusive, non-transferable revocable license to utilize the Assudani QR Cloud POS, Table Standee QR routing, Kitchen Order Ticket (KOT) engine, and Companion Mobile Application in accordance with their chosen subscription tier.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            2. Direct 0% Commission Direct UPI Settlements
          </h2>
          <p>
            Assudani QR is not a payment aggregator or money transmitter. Guest payments routed through table QR codes utilize NPCI standard UPI deep-link protocols connecting directly to the restaurant&apos;s own registered bank account or merchant VPA. Assudani QR never escrows, holds, or deducts fees from diner payments.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            3. Subscription Billing & Yearly Discounts
          </h2>
          <p>
            Subscriptions are offered on a Monthly or Yearly basis. Yearly plans include a 20% discount (equivalent to 2 free months). Paid subscriptions can be renewed via official corporate invoicing or authorized UPI billing channels. All subscriptions are prepaid and non-recurring unless explicitly authorized by the merchant.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            4. Service Availability & Uptime SLA
          </h2>
          <p>
            Assudani QR targets a 99.9% uptime SLA for diner QR menu routing and kitchen socket synchronization. In the rare event of cloud network degradation, the companion Android POS app maintains an offline-first cache to keep taking table orders locally.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
            5. Contact & Founder Governance
          </h2>
          <p>
            These terms are governed under Indian Law and overseen by Piyush Assudani, Founder of Assudani Developers. For legal inquiries or custom enterprise agreements, contact{' '}
            <Link href="/contact" className="text-[#efd08a] underline font-bold">
              our compliance team
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
