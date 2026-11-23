'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  CreditCard,
  Zap,
} from 'lucide-react';

export default function BottomDock() {
  const pathname = usePathname();

  const dockLinks = [
    { href: '/', label: 'Overview', icon: Compass },
    { href: '/product', label: 'Product', icon: Layers },
    { href: '/architecture', label: 'Architecture', icon: Cpu },
    { href: '/pricing', label: 'Pricing', icon: CreditCard },
    { href: '/download', label: 'Get App', icon: Smartphone, highlight: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Bottom Quick Navigation Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-2 bg-[#26151b]/92 backdrop-blur-xl border border-[#efd08a]/35 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.65)] flex items-center gap-1.5 sm:gap-2 transition-all duration-300 hover:border-[#efd08a]/60 max-w-[95vw] sm:max-w-max"
    >
      {/* Live Operational Indicator */}
      <div className="hidden md:flex items-center gap-1.5 pl-2 pr-3 border-r border-[#37252b] font-mono text-[10px] text-[#efd08a]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-bold tracking-wider">ENGINE ACTIVE</span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {dockLinks.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#efd08a] text-[#040404] shadow-md scale-105'
                    : 'bg-[#efd08a]/20 text-[#efd08a] hover:bg-[#efd08a] hover:text-[#040404]'
                }`}
              >
                <Icon size={14} />
                <span className="text-[11px] sm:text-xs">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                active
                  ? 'bg-[#37252b] text-[#efd08a] font-bold shadow-xs'
                  : 'text-[#d7d7d6] hover:text-[#fbf9fa] hover:bg-[#301b22]'
              }`}
            >
              <Icon size={14} className={active ? 'text-[#efd08a]' : 'text-[#8c6b76]'} />
              <span className="text-[11px] sm:text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
