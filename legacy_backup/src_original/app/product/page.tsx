'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  QrCode,
  Flame,
  UtensilsCrossed,
  ChefHat,
  Star,
  Check,
  CheckCircle2,
  Smartphone,
  ArrowRight,
  Printer,
  ShieldAlert,
  Sliders,
  DollarSign,
  AlertTriangle,
  Clock,
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Mains' | 'Cocktails' | 'Desserts';
  price: number;
  description: string;
  isVeg: boolean;
  isPopular?: boolean;
  isAvailable: boolean;
}

export default function ProductSuitePage() {
  // Simulator State: Menu Items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 'item-1',
      name: 'Truffle Edamame Dumplings',
      category: 'Starters',
      price: 460,
      description: 'Steamed translucent parcels, shaved black truffle butter, crispy scallion drizzle.',
      isVeg: true,
      isPopular: true,
      isAvailable: true,
    },
    {
      id: 'item-2',
      name: 'Old Delhi Butter Chicken',
      category: 'Mains',
      price: 540,
      description: 'Slow-charred clay oven tandoori morsels in velvety smoked tomato and cashew gravy.',
      isVeg: false,
      isPopular: true,
      isAvailable: true,
    },
    {
      id: 'item-3',
      name: 'Smoked Kokum Highball',
      category: 'Cocktails',
      price: 320,
      description: 'Artisanal coastal kokum cordial, roasted cumin, lime zest, soda fizz.',
      isVeg: true,
      isPopular: false,
      isAvailable: true,
    },
    {
      id: 'item-4',
      name: 'Pistachio Milk Cake',
      category: 'Desserts',
      price: 380,
      description: 'Slow-poached saffron sponge steeped in spiced cardamom cream, Iranian pistachios.',
      isVeg: true,
      isPopular: true,
      isAvailable: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'Starters' | 'Mains' | 'Cocktails' | 'Desserts'>('Starters');
  const [cart, setCart] = useState<{ [id: string]: number }>({ 'item-1': 1 });
  const [simulatedRating, setSimulatedRating] = useState<number>(5);
  const [simulatedTable, setSimulatedTable] = useState<string>('Table 04');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  // Toggle 86 stock kill switch
  const toggleStock = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
    // remove from cart if marked unavailable
    const item = menuItems.find((i) => i.id === id);
    if (item && item.isAvailable) {
      setCart((c) => {
        const copy = { ...c };
        delete copy[id];
        return copy;
      });
    }
  };

  const updateCartQty = (id: string, delta: number) => {
    const item = menuItems.find((i) => i.id === id);
    if (!item || !item.isAvailable) return;

    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = menuItems.find((i) => i.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  const currentCategoryItems = menuItems.filter((i) => i.category === activeTab);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-16 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#26151b] border border-[#37252b] text-[#efd08a] font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Product Suite • Frictionless Dining</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fbf9fa] leading-[1.08]">
            The Modern Restaurant Operating System.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#d7d7d6] font-normal leading-relaxed max-w-3xl">
            Designed to delight guests with instant digital menus, empower kitchen staff with zero-error KOTs, and protect your margins with 0% direct UPI payments.
          </p>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE SIMULATOR (Flagship Experience) */}
      <section id="simulator" className="px-6 py-20 max-w-[1400px] mx-auto border-b border-[#37252b]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efd08a] font-bold">
            INTERACTIVE SANDBOX
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf9fa] mt-3">
            Experience The Guest & Kitchen Flow
          </h2>
          <p className="mt-4 text-sm text-[#d7d7d6]">
            Try adding dishes, toggling the manager&apos;s 86-stock kill switch, or testing the review interceptor below.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Guest Mobile Kiosk Preview */}
          <div className="lg:col-span-7 bg-[#26151b] border-2 border-[#efd08a]/60 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#37252b]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#efd08a] text-[#040404] flex items-center justify-center font-bold font-serif-display">
                  AQ
                </div>
                <div>
                  <h3 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
                    Assudani Bistro & Grill
                  </h3>
                  <p className="font-mono text-xs text-[#efd08a]">{simulatedTable} • Live Session</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#15803d]/20 text-[#15803d] border border-[#15803d]/40 text-xs font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#15803d] rounded-full animate-ping"></span>
                  Connected
                </span>
              </div>
            </div>

            {/* Category Nav */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#37252b]">
              {(['Starters', 'Mains', 'Cocktails', 'Desserts'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                    activeTab === cat
                      ? 'bg-[#efd08a] text-[#040404] font-bold'
                      : 'text-[#d7d7d6] hover:text-[#fbf9fa] bg-[#1f0f14]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dishes List */}
            <div className="mt-6 space-y-4">
              {currentCategoryItems.map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`p-4 border transition-all ${
                      item.isAvailable
                        ? 'bg-[#1f0f14] border-[#37252b] hover:border-[#efd08a]/40'
                        : 'bg-[#1a0c10] border-[#ef4444]/30 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 inline-block border ${
                              item.isVeg ? 'border-green-500' : 'border-red-500'
                            } p-0.5`}
                          >
                            <span
                              className={`w-full h-full block rounded-full ${
                                item.isVeg ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            ></span>
                          </span>
                          <span className="font-serif-display text-lg font-bold text-[#fbf9fa]">
                            {item.name}
                          </span>
                          {item.isPopular && (
                            <span className="px-1.5 py-0.5 bg-[#efd08a]/10 text-[#efd08a] text-[10px] font-mono uppercase">
                              Chef&apos;s Pick
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#d7d7d6] leading-relaxed max-w-md">
                          {item.description}
                        </p>
                        <p className="font-mono text-sm font-bold text-[#efd08a] pt-1">
                          ₹{item.price}
                        </p>
                      </div>

                      {/* Add to Cart Actions */}
                      <div className="shrink-0">
                        {!item.isAvailable ? (
                          <span className="px-3 py-1.5 bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30 text-xs font-mono uppercase font-bold">
                            Sold Out (86&apos;d)
                          </span>
                        ) : qty > 0 ? (
                          <div className="flex items-center bg-[#efd08a] text-[#040404] font-mono font-bold text-xs">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="px-2.5 py-1.5 hover:bg-[#d4b568]"
                            >
                              -
                            </button>
                            <span className="px-3 py-1.5">{qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="px-2.5 py-1.5 hover:bg-[#d4b568]"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="px-4 py-1.5 bg-[#efd08a] text-[#040404] text-xs font-bold font-mono uppercase hover:bg-[#f6deb0] transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Bar & Direct UPI Checkout */}
            <div className="mt-8 pt-6 border-t border-[#37252b] bg-[#1f0f14] p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#d7d7d6] uppercase">
                  Subtotal ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
                </span>
                <span className="font-serif-display text-2xl font-bold text-[#efd08a]">
                  ₹{calculateSubtotal()}
                </span>
              </div>

              {orderPlaced ? (
                <div className="p-3 bg-[#15803d]/20 border border-[#15803d] text-center space-y-1">
                  <p className="font-bold text-sm text-[#15803d] flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Order Dispatched to Kitchen!</span>
                  </p>
                  <p className="font-mono text-xs text-[#e6e6e5]">
                    KOT #1042 printed • 0% Direct UPI Settlement
                  </p>
                  <button
                    onClick={() => setOrderPlaced(false)}
                    className="text-xs text-[#efd08a] underline font-mono mt-1"
                  >
                    Reset Demo Order
                  </button>
                </div>
              ) : (
                <button
                  disabled={calculateSubtotal() === 0}
                  onClick={() => setOrderPlaced(true)}
                  className={`w-full py-3.5 text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all ${
                    calculateSubtotal() > 0
                      ? 'bg-[#efd08a] text-[#040404] hover:bg-[#f6deb0] shadow-lg'
                      : 'bg-[#37252b] text-[#8c6b76] cursor-not-allowed'
                  }`}
                >
                  <DollarSign size={15} />
                  <span>Simulate Instant 0% UPI Checkout (₹{calculateSubtotal()})</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Merchant Companion App Control Center */}
          <div className="lg:col-span-5 space-y-6">
            {/* Manager's Live 86 Kill Switch Panel */}
            <div className="bg-[#26151b] border border-[#37252b] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#37252b]">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-[#efd08a]" />
                  <h4 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
                    Merchant 86 Kill-Switch
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-[#8c6b76] uppercase">Instant Synced</span>
              </div>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                Run out of ingredients during peak dinner rush? Tap any item below to 86 it instantly across all customer tables with zero delay.
              </p>

              <div className="space-y-2">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-[#1f0f14] border border-[#37252b]"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#fbf9fa]">{item.name}</p>
                      <p className="text-[10px] font-mono text-[#8c6b76]">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => toggleStock(item.id)}
                      className={`px-3 py-1 text-xs font-mono uppercase font-bold transition-all ${
                        item.isAvailable
                          ? 'bg-[#15803d]/20 text-[#15803d] border border-[#15803d]'
                          : 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]'
                      }`}
                    >
                      {item.isAvailable ? 'In Stock' : '86’d (Off)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Kitchen Thermal KOT Ticket */}
            <div className="bg-[#fbf9fa] text-[#040404] p-6 font-mono text-xs border border-[#dad8da] shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b-2 border-dashed border-[#040404]">
                <span className="font-bold">KOT #1042 • {simulatedTable}</span>
                <span className="text-[10px]">TIME: 19:42 IST</span>
              </div>
              <div className="py-3 space-y-1.5 border-b-2 border-dashed border-[#040404]">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = menuItems.find((i) => i.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between font-bold">
                      <span>
                        {qty}x {item.name}
                      </span>
                      <span>₹{item.price * qty}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pt-2 text-[10px] text-center text-[#4a484a]">
                PRINTED ON 80MM THERMAL PRINTER • AUTO-DISPATCHED
              </div>
            </div>

            {/* Google Review Interceptor Demo */}
            <div className="bg-[#26151b] border border-[#37252b] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#37252b]">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-[#efd08a] fill-[#efd08a]" />
                  <h4 className="font-serif-display font-bold text-lg text-[#fbf9fa]">
                    Google Review Interceptor
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-[#efd08a]">Smart Router</span>
              </div>
              <p className="text-xs text-[#d7d7d6] leading-relaxed">
                Test how the checkout interceptor filters feedback. 4-5 stars route directly to public Google Maps; 1-3 stars open an internal private manager feedback modal.
              </p>

              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSimulatedRating(star)}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star
                      size={24}
                      className={
                        star <= simulatedRating
                          ? 'text-[#efd08a] fill-[#efd08a]'
                          : 'text-[#37252b]'
                      }
                    />
                  </button>
                ))}
              </div>

              <div className="p-3 bg-[#1f0f14] border border-[#37252b] text-xs">
                {simulatedRating >= 4 ? (
                  <div className="text-[#15803d] space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      <span>Positive Rating ({simulatedRating} Stars)</span>
                    </p>
                    <p className="text-[11px] text-[#e6e6e5]">
                      Opens public Google Maps listing to boost SEO and public trust.
                    </p>
                  </div>
                ) : (
                  <div className="text-[#f59e0b] space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle size={14} />
                      <span>Critical Feedback ({simulatedRating} Stars)</span>
                    </p>
                    <p className="text-[11px] text-[#e6e6e5]">
                      Routes to private manager WhatsApp alert before bad review touches Google.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE MODULES DETAILS */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#26151b] border border-[#37252b] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
              <QrCode size={20} />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Dynamic Standees
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Permanent QR acrylic standees that never need to be reprinted when prices or dishes change.
            </p>
          </div>

          <div className="bg-[#26151b] border border-[#37252b] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
              <ChefHat size={20} />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Kitchen Display & KOT
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Direct ESC/POS thermal printing for kitchen chefs and bar tenders with sub-second websocket delivery.
            </p>
          </div>

          <div className="bg-[#26151b] border border-[#37252b] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
              <DollarSign size={20} />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              0% UPI Settlement
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              No middleman gateway holding your revenue for 3 days. 100% of guest payments land in your bank.
            </p>
          </div>

          <div className="bg-[#26151b] border border-[#37252b] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#efd08a]/10 border border-[#efd08a]/30 flex items-center justify-center text-[#efd08a]">
              <Smartphone size={20} />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#fbf9fa]">
              Android App
            </h3>
            <p className="text-xs text-[#d7d7d6] leading-relaxed">
              Certified companion app on Google Play (<code className="text-[#efd08a]">com.qr.assudani</code>) for staff order management.
            </p>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-16 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[#efd08a] text-[#040404] px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#f6deb0] transition-colors"
          >
            <span>See Flat Monthly Pricing & ROI</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
