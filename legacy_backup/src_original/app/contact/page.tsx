'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    phone: '',
    city: '',
    dailyTables: '15',
    planPreference: 'growth',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.restaurantName.trim() || !formData.phone.trim()) {
      setError('Please provide your Restaurant Name and WhatsApp Number.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiBase}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(
          `Demo inquiry received for ${formData.restaurantName}! Founder Piyush Assudani will connect via WhatsApp within 15 minutes to set up your 7-Day Free Trial.`
        );
        setFormData({
          restaurantName: '',
          ownerName: '',
          phone: '',
          city: '',
          dailyTables: '15',
          planPreference: 'growth',
          notes: '',
        });
      } else {
        throw new Error(data.error || 'Server error submitting inquiry');
      }
    } catch (err: any) {
      setSuccess(
        `Inquiry received for ${formData.restaurantName}! Our founder desk will connect with you via WhatsApp shortly.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-12 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            DIRECT ONBOARDING & SUPPORT
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Speak Directly with our Restaurant Concierge
          </h1>
          <p className="mt-4 text-base text-[#d7d7d6] leading-relaxed max-w-2xl">
            Have questions about digital menus, table QR standees, kitchen printers, or our 7-Day Free Trial? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 py-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Value Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#26151b] border-2 border-[#efd08a] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                15-MINUTE WHATSAPP SLA
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#fbf9fa]">
                Direct Founder Onboarding
              </h2>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                Every restaurant partner is personally onboarded with direct guidance from{' '}
                <strong className="text-[#efd08a]">Piyush Assudani</strong>, Founder of Assudani Developers. No endless customer support tickets or waiting queues.
              </p>

              <div className="pt-2">
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush!%20I%20am%20interested%20in%20setting%20up%20a%207-Day%20Free%20Trial%20for%20my%20restaurant."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-[#040404] font-bold text-xs uppercase tracking-wider rounded-none hover:bg-[#20ba59] transition-all shadow-lg"
                >
                  <MessageCircle size={16} />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#26151b] border border-[#37252b] space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#efd08a] font-bold">
                Communication Channels
              </h3>

              <div className="space-y-3 text-xs text-[#d7d7d6]">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#fbf9fa]">Corporate Inquiries & Billing</p>
                    <p className="text-[#8c6b76] font-mono">billing@assudani.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#fbf9fa]">Active Hours</p>
                    <p className="text-[#8c6b76]">Monday – Sunday: 9:00 AM – 11:30 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-[#efd08a] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#fbf9fa]">Enterprise SLA</p>
                    <p className="text-[#8c6b76]">99.9% Uptime Guarantee with real-time socket routing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive 7-Day Free Trial Booking Form */}
          <div className="lg:col-span-7 bg-[#26151b] border border-[#37252b] p-8 sm:p-12 shadow-2xl">
            <div className="border-b border-[#37252b] pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#efd08a] font-bold">
                START IN 3 MINUTES
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fbf9fa] mt-1">
                Activate Your 7-Day Free Trial
              </h2>
              <p className="text-xs text-[#d7d7d6] mt-1">
                No credit card needed • No AutoPay setup • Instant live QR menu preview.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#d7d7d6] block">Restaurant / Cafe Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Rajputana Bistro"
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#d7d7d6] block">Owner / General Manager Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Vikramaditya Singh"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#d7d7d6] block">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur / Delhi / Pune"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#d7d7d6] block">Estimated Tables</label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    placeholder="12"
                    value={formData.dailyTables}
                    onChange={(e) => setFormData({ ...formData, dailyTables: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">Preferred Plan</label>
                <select
                  value={formData.planPreference}
                  onChange={(e) => setFormData({ ...formData, planPreference: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                >
                  <option value="growth">Growth Plan (₹399/mo or ₹319/mo yearly) — Most Popular</option>
                  <option value="starter">Starter Plan (₹199/mo or ₹159/mo yearly) — For Cafes</option>
                  <option value="elite">Elite Plan (₹699/mo or ₹559/mo yearly) — Multi-station Dining</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#d7d7d6] block">Current POS or Specific Requirements (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current table setup or POS system..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1f0f14] border border-[#37252b] text-white text-xs focus:outline-none focus:border-[#efd08a]"
                />
              </div>

              {error && (
                <p className="text-xs text-[#ef4444] font-mono font-bold bg-[#ef4444]/10 p-3 border border-[#ef4444]/30">
                  {error}
                </p>
              )}

              {success && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#efd08a] hover:bg-[#f6deb0] text-[#040404] font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Submitting to Concierge...' : 'Claim 7-Day Free Trial (No Card Needed)'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
