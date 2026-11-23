'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, Smartphone, Sparkles, QrCode } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/product', label: 'Product Suite' },
    { href: '/pricing', label: 'Pricing & ROI' },
    { href: '/stories', label: 'Merchant Stories' },
    { href: '/contact', label: 'Contact & Demo' },
    { href: '/download', label: 'Get App' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="w-full flex flex-col z-50">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <aside
        aria-label="Release Announcement"
        className="w-full bg-[#170a0e] border-b border-[#37252b] text-[#e6e6e5] px-4 py-2 text-center text-xs tracking-wide flex flex-wrap items-center justify-center gap-2"
      >
        <span className="inline-block w-2 h-2 bg-[#efd08a] animate-pulse"></span>
        <span className="font-medium text-[#d7d7d6]">Google Play Store Release Live:</span>
        <span className="font-mono text-[#efd08a] font-bold tracking-wider">com.qr.assudani</span>
        <span className="hidden sm:inline text-[#7a5d67]">•</span>
        <span className="hidden sm:inline text-[#d7d7d6]">0% Direct UPI Settlement Active</span>
        <Link
          href="/download"
          className="inline-flex items-center gap-1 font-semibold text-[#efd08a] hover:underline ml-2"
        >
          <span>Get Merchant APK & AAB</span>
          <ArrowRight size={12} />
        </Link>
      </aside>

      {/* 2. PERSISTENT FLOATING / INSET HEADER */}
      <header className="px-4 sm:px-6 pt-4 pb-2 max-w-[1400px] mx-auto w-full">
        <div className="bg-[#26151b]/95 backdrop-blur-md border border-[#37252b] px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xl">
          {/* Brand Mark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#efd08a] text-[#040404] flex items-center justify-center font-serif-display font-bold text-lg tracking-wider transition-transform duration-300 group-hover:scale-105">
              AQ
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-lg font-bold tracking-tight text-[#fbf9fa] group-hover:text-[#efd08a] transition-colors leading-none">
                ASSUDANI
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#efd08a] font-mono mt-1 font-medium">
                QR Operating System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
                    active
                      ? 'bg-[#37252b] text-[#efd08a] border-b-2 border-[#efd08a]'
                      : 'text-[#d7d7d6] hover:text-[#fbf9fa] hover:bg-[#301b22]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/product#simulator"
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-[#efd08a] border border-[#efd08a]/40 hover:border-[#efd08a] hover:bg-[#efd08a]/10 transition-all flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              <span>Live Kiosk Demo</span>
            </Link>

            <Link
              href="/pricing"
              className="bg-[#efd08a] text-[#040404] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#f6deb0] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Sparkles size={14} />
              <span>7-Day Free Trial</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#d7d7d6] hover:text-[#fbf9fa] hover:bg-[#37252b] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#26151b] border border-[#37252b] p-4 flex flex-col gap-2 shadow-2xl animate-in fade-in duration-200">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm uppercase tracking-wider font-medium transition-all flex items-center justify-between ${
                    active
                      ? 'bg-[#37252b] text-[#efd08a] border-l-4 border-[#efd08a]'
                      : 'text-[#d7d7d6] hover:text-[#fbf9fa] hover:bg-[#301b22]'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 bg-[#efd08a]"></span>}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#37252b] flex flex-col gap-2">
              <Link
                href="/product#simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-3 text-xs uppercase tracking-wider font-semibold text-[#efd08a] border border-[#efd08a]/40 hover:bg-[#efd08a]/10 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                <span>Launch Interactive Kiosk Simulator</span>
              </Link>
              <Link
                href="/download"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#efd08a] text-[#040404] px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#f6deb0] transition-colors flex items-center justify-center gap-2"
              >
                <Smartphone size={15} />
                <span>Download Play Store App</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
