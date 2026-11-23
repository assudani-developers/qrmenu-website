'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { io } from 'socket.io-client';
import { Search, X, MapPin, Clock, Phone, Wifi, AtSign, Share2, MessageCircle, Globe, Navigation, BellRing, CalendarDays, ShoppingBag, ChevronRight, Megaphone, Star, Copy, Check } from 'lucide-react';
import { API } from '@/lib/api';
import Sheet from './Sheet';
import { Book, CallStaff, Checkout, DishSheet, Rate, Tracker, VegMark, useOrder } from './Sheets';
import { Addon, BADGE, CartLine, Dish, FONT, MenuData, Variant, alpha, inr, lum, onColor, photos } from './types';

type Modal = null | 'dish' | 'cart' | 'track' | 'call' | 'book' | 'rate';
const ease = [0.2, 0.8, 0.2, 1] as const;

export default function MenuClient({ code }: { code: string }) {
  const sp = useSearchParams();
  const table = sp.get('t') || sp.get('table') || '';
  const [data, setData] = useState<MenuData | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'missing' | 'error'>('loading');
  const [q, setQ] = useState('');
  const [veg, setVeg] = useState(false);
  const [active, setActive] = useState('');
  const [modal, setModal] = useState<Modal>(null);
  const [dish, setDish] = useState<Dish | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState('');
  const [bump, setBump] = useState(0);
  const tracked = useRef(false);
  const order = useOrder(code, bump);

  useEffect(() => {
    const load = (first: boolean) => {
      const track = first && !tracked.current ? '?track=1' : '';
      tracked.current = true;
      return fetch(`${API}/api/menu/${encodeURIComponent(code)}${track}`, { cache: 'no-store' })
        .then(async (r) => {
          if (r.status === 404) return setState('missing');
          const j = await r.json();
          setData(j);
          setState('ok');
          document.title = `${j.restaurant.name} · Menu`;
        })
        .catch(() => { if (first) setState('error'); });
    };
    load(true);
    // sold-out toggles, price changes and design changes appear live
    const s = io(API, { transports: ['websocket'] });
    s.on('connect', () => s.emit('menu:watch', code));
    s.on('menu:updated', () => load(false));
    return () => { s.close(); };
  }, [code]);

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 3200); return () => clearTimeout(t); }, [toast]);

  const sections = useMemo(() => {
    if (!data) return [];
    const term = q.trim().toLowerCase();
    return data.categories.map((c) => ({
      name: c,
      open: data.sections?.find((x) => x.name === c)?.open !== false,
      window: data.sections?.find((x) => x.name === c)?.window || null,
      items: data.items.filter((i) => i.category === c && (!veg || i.isVeg) && (!term || `${i.name} ${i.description || ''}`.toLowerCase().includes(term))),
    })).filter((s) => s.items.length);
  }, [data, q, veg]);

  useEffect(() => {
    if (!sections.length) return;
    const obs = new IntersectionObserver((es) => { const v = es.filter((e) => e.isIntersecting)[0]; if (v) setActive(v.target.getAttribute('data-cat') || ''); }, { rootMargin: '-140px 0px -65% 0px' });
    sections.forEach((s) => { const el = document.getElementById('cat-' + s.name); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [sections]);

  const close = useCallback(() => setModal(null), []);
  const add = (d: Dish, v?: Variant, a: Addon[] = [], n = 1) => {
    const key = d.id + (v?.id || '') + a.map((x) => x.id).sort().join('+');
    setCart((c) => (c.find((l) => l.key === key) ? c.map((l) => (l.key === key ? { ...l, qty: l.qty + n } : l)) : [...c, { key, dish: d, variant: v, addons: a, qty: n }]));
    if (navigator.vibrate) navigator.vibrate(12);
  };
  const inc = (k: string) => setCart((c) => c.map((l) => (l.key === k ? { ...l, qty: l.qty + 1 } : l)));
  const dec = (k: string) => setCart((c) => c.flatMap((l) => (l.key === k ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])));
  const decDish = (d: Dish) => { const l = [...cart].reverse().find((x) => x.dish.id === d.id); if (l) dec(l.key); };

  if (state === 'loading') return <Skeleton />;
  if (state === 'missing') return <Notice title="Menu not found" body="This QR code is not linked to a restaurant. Please ask the staff." />;
  if (state === 'error' || !data) return <Notice title="Can’t load the menu" body="Check your internet connection and scan again." />;
  const r = data.restaurant;
  if (!r.live) return <Notice title={r.name} body="This menu is resting for a moment. Please ask the staff for a printed menu." />;

  const T = r.template;
  const dark = T.dark || lum(T.background) < 0.45;
  const vars = {
    '--p': T.primary, '--onp': onColor(T.primary), '--ps': alpha(T.primary, dark ? 0.2 : 0.12), '--a': T.accent, '--bg': T.background, '--sf': T.surface,
    '--tx': T.text, '--mu': T.muted, '--line': dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)', '--soft': dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.04)',
    '--r': `${T.radius}px`, '--hf': FONT[T.font] || FONT.sans, '--bf': T.font === 'elegant' || T.font === 'serif' ? FONT.sans : FONT[T.font] || FONT.sans,
  } as React.CSSProperties;
  const ordering = !!data.features.ordering;
  const st = r.store || { open: true, prepMinutes: 0, wifiName: '', wifiPassword: '' };
  const canOrder = ordering && st.open;
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + ((l.variant ? l.variant.price : l.dish.offerPrice || l.dish.price) + l.addons.reduce((m, x) => m + x.price, 0)) * l.qty, 0);
  const qtyOf = (d: Dish) => cart.filter((l) => l.dish.id === d.id).reduce((n, l) => n + l.qty, 0);
  const openDish = (d: Dish) => { setDish(d); setModal('dish'); };
  const quickAdd = (d: Dish) => (d.variants?.length || d.addons?.length ? openDish(d) : add(d));
  const jump = (c: string) => { const el = document.getElementById('cat-' + c); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 128, behavior: 'smooth' }); };

  return (
    <div style={{ ...vars, background: 'var(--bg)', color: 'var(--tx)', fontFamily: 'var(--bf)' }} className="min-h-dvh pb-32">
      <Header data={data} table={table} />

      {r.theme.announcement && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="overflow-hidden" style={{ background: 'var(--p)', color: 'var(--onp)' }}>
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-3 text-sm font-bold"><Megaphone size={17} className="shrink-0" /><span>{r.theme.announcement}</span></div>
        </motion.div>
      )}

      {/* sticky search + categories */}
      <div className="sticky top-0 z-30 border-b backdrop-blur-xl" style={{ background: alpha(T.background, 0.86), borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-3xl px-4 pt-3">
          <div className="flex gap-2">
            {r.theme.showSearch !== false && (
              <label className="flex flex-1 items-center gap-2 rounded-2xl px-4" style={{ background: 'var(--soft)', border: '1px solid var(--line)' }}>
                <Search size={18} style={{ color: 'var(--mu)' }} />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${data.items.length} dishes`} aria-label="Search dishes" className="h-11 w-full bg-transparent text-[15px] font-semibold placeholder:font-medium" style={{ color: 'var(--tx)' }} />
                {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={17} /></button>}
              </label>
            )}
            {r.theme.showVegToggle !== false && (
              <button onClick={() => setVeg(!veg)} aria-pressed={veg} className="flex h-11 items-center gap-2 rounded-2xl px-3.5 text-sm font-extrabold transition-colors" style={{ background: veg ? '#16a34a' : 'var(--soft)', color: veg ? '#fff' : 'var(--tx)', border: `1px solid ${veg ? '#16a34a' : 'var(--line)'}` }}>
                <VegMark veg size={14} />Veg
              </button>
            )}
          </div>
          <LayoutGroup>
            <nav className="no-scrollbar -mx-4 mt-2 flex gap-1 overflow-x-auto px-4 pb-2" aria-label="Menu sections">
              {sections.map((s) => {
                const on = active === s.name;
                return (
                  <button key={s.name} onClick={() => jump(s.name)} className="relative shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition-colors" style={{ color: on ? 'var(--onp)' : 'var(--mu)' }}>
                    {on && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full" style={{ background: 'var(--p)' }} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                    <span className="relative">{s.name}</span>
                  </button>
                );
              })}
            </nav>
          </LayoutGroup>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4">
        {!st.open && ordering && <div className="mt-4 rounded-2xl p-4 text-sm font-bold" style={{ background: 'var(--soft)' }}>The kitchen is not taking orders right now. You can still browse the menu.</div>}
        {!sections.length && (
          <div className="py-20 text-center">
            <p className="text-lg font-bold">No dishes match</p>
            <p className="mt-1 text-sm" style={{ color: 'var(--mu)' }}>Try another word{veg ? ' or turn off Veg only' : ''}.</p>
          </div>
        )}
        {sections.map((s) => (
          <section key={s.name} id={'cat-' + s.name} data-cat={s.name} className="scroll-mt-32 pt-8">
            <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-4 flex items-baseline justify-between gap-3">
              <h2 className="text-[28px] font-bold leading-none" style={{ fontFamily: 'var(--hf)' }}>{s.name}</h2>
              <span className="text-sm font-bold" style={{ color: 'var(--mu)' }}>{s.window && !s.open ? `Served ${s.window.from}–${s.window.to}` : `${s.items.length} dish${s.items.length > 1 ? 'es' : ''}`}</span>
            </motion.div>
            <div className={T.layout === 'grid' ? 'grid grid-cols-2 gap-3 sm:grid-cols-3' : T.layout === 'cards' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-3'}>
              {s.items.map((d, i) => (
                <DishCard key={d.id} d={d} i={i} layout={T.layout} qty={qtyOf(d)} canOrder={canOrder && s.open} onOpen={() => openDish(d)} onAdd={() => quickAdd(d)} onRemove={() => decDish(d)} />
              ))}
            </div>
          </section>
        ))}

        <Info data={data} table={table} onCall={() => setModal('call')} onBook={() => setModal('book')} onRate={() => setModal('rate')} />
        {!data.features.removeBranding && (
          <a href={r.brand.url} target="_blank" rel="noopener" className="mt-10 flex items-center justify-center gap-2 text-xs font-bold" style={{ color: 'var(--mu)' }}>
            <span className="grid size-5 place-items-center rounded-md text-[10px] font-black" style={{ background: '#f5b50a', color: '#22152e' }}>Q</span>
            Menu by {r.brand.name}. Get yours free
          </a>
        )}
      </main>

      {/* floating actions */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-2">
          <AnimatePresence>
            {order && !count && (
              <motion.button key="track" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} onClick={() => setModal('track')}
                className="pointer-events-auto flex items-center gap-3 self-center rounded-full px-5 py-3 text-sm font-extrabold shadow-2xl" style={{ background: 'var(--a)', color: onColor(T.accent) }}>
                <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" /></span>
                Order #{order.token} · {({ pending: 'Received', cooking: 'Cooking', ready: 'Ready', served: 'Served', cancelled: 'Cancelled' } as any)[order.status] || order.status}
                <ChevronRight size={16} />
              </motion.button>
            )}
            {data.features.serviceCalls && table && !count && (
              <motion.button key="call" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => setModal('call')} aria-label="Call staff"
                className="pointer-events-auto absolute bottom-[max(16px,env(safe-area-inset-bottom))] right-4 grid size-14 place-items-center rounded-full shadow-2xl" style={{ background: 'var(--p)', color: 'var(--onp)' }}>
                <BellRing size={22} />
              </motion.button>
            )}
            {count > 0 && (
              <motion.button key="cart" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} onClick={() => setModal('cart')}
                className="pointer-events-auto flex items-center justify-between rounded-[22px] px-5 py-4 font-extrabold shadow-[0_18px_50px_-10px_rgba(0,0,0,.45)]" style={{ background: 'var(--p)', color: 'var(--onp)' }}>
                <span className="flex items-center gap-3">
                  <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="grid size-8 place-items-center rounded-xl" style={{ background: alpha(onColor(T.primary), 0.18) }}>{count}</motion.span>
                  <span>{inr(total)}<span className="block text-left text-xs font-bold opacity-80">{count} item{count > 1 ? 's' : ''} added</span></span>
                </span>
                <span className="flex items-center gap-1.5"><ShoppingBag size={19} />View order</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Sheet open={modal === 'dish' && !!dish} onClose={close} label={dish?.name || 'Dish'}>
        {dish && <DishSheet key={dish.id} d={dish} canOrder={canOrder && sections.find((s) => s.name === dish.category)?.open !== false} onAdd={(v, a, n) => { add(dish, v, a, n); close(); }} />}
      </Sheet>
      <Sheet open={modal === 'cart'} onClose={close} label="Your order">
        <Checkout cart={cart} data={data} table={table} inc={inc} dec={dec} onPlaced={() => { setCart([]); setBump((b) => b + 1); setModal('track'); }} />
      </Sheet>
      <Sheet open={modal === 'track' && !!order} onClose={close} label="Order status">
        {order && <Tracker o={order} canRate={!!data.features.reviewInterceptor} onRate={() => setModal('rate')} />}
      </Sheet>
      <Sheet open={modal === 'call'} onClose={close} label="Call staff"><CallStaff code={code} table={table} onDone={(m) => { close(); setToast(m); }} /></Sheet>
      <Sheet open={modal === 'book'} onClose={close} label="Book a table"><Book code={code} onDone={(m) => { close(); setToast(m); }} /></Sheet>
      <Sheet open={modal === 'rate'} onClose={close} label="Rate us"><Rate code={code} table={table} onDone={(m) => { close(); setToast(m); }} /></Sheet>

      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} className="fixed inset-x-4 top-[max(16px,env(safe-area-inset-top))] z-[60] mx-auto max-w-md rounded-2xl px-5 py-4 text-sm font-bold shadow-2xl" style={{ background: 'var(--a)', color: onColor(T.accent) }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({ data, table }: { data: MenuData; table: string }) {
  const r = data.restaurant;
  const T = r.template;
  const cover = r.theme.coverUrl;
  const chips = [r.cuisine, r.city && { icon: MapPin, t: r.city }, r.openingHours && { icon: Clock, t: r.openingHours }, table && { icon: null, t: table }].filter(Boolean) as any[];
  const Logo = r.theme.logoUrl ? (
    <motion.img initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} src={r.theme.logoUrl} alt={`${r.name} logo`}
      className="size-20 rounded-full object-cover shadow-xl" style={{ border: `3px solid ${T.surface}` }} />
  ) : null;
  const Title = (
    <>
      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }} className="text-[40px] font-bold leading-[1.02] sm:text-5xl" style={{ fontFamily: 'var(--hf)', letterSpacing: T.font === 'elegant' ? 0 : '-0.02em' }}>{r.name}</motion.h1>
      {(r.tagline || r.theme.welcome) && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.35 }} className="mt-2 text-[15px]">{r.tagline || r.theme.welcome}</motion.p>}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className={`mt-4 flex flex-wrap gap-2 ${T.header === 'centered' ? 'justify-center' : ''}`}>
        {chips.map((c, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur" style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.22)' }}>
            {typeof c === 'string' ? c : <>{c.icon && <c.icon size={13} />}{c.t}</>}
          </span>
        ))}
      </motion.div>
    </>
  );

  if (T.header === 'centered') {
    return (
      <header className="relative overflow-hidden px-5 pb-10 pt-14 text-center" style={{ background: `radial-gradient(120% 90% at 50% 0%, ${alpha(T.primary, 0.22)}, transparent 70%)` }}>
        {cover && <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
        <div className="relative mx-auto max-w-xl">
          {Logo && <div className="mb-4 flex justify-center">{Logo}</div>}
          <div style={{ color: 'var(--tx)' }} className="[&_span]:!bg-[var(--soft)] [&_span]:!border-[var(--line)]">{Title}</div>
        </div>
      </header>
    );
  }
  if (T.header === 'band') {
    return (
      <header className="relative overflow-hidden px-5 pb-9 pt-12" style={{ background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: onColor(T.primary) }}>
        {cover && <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay" />}
        <motion.div aria-hidden className="absolute -right-16 -top-20 size-64 rounded-full" style={{ background: alpha('#ffffff', 0.12) }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative mx-auto flex max-w-3xl items-end gap-4">
          {Logo}
          <div className="min-w-0 flex-1">{Title}</div>
        </div>
      </header>
    );
  }
  return (
    <header className="relative flex min-h-[340px] items-end overflow-hidden rounded-b-[32px] text-white sm:min-h-[400px]">
      {cover ? (
        <motion.img initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease }} src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: `radial-gradient(90% 80% at 85% 10%, ${alpha(T.primary, 0.75)}, transparent 60%), linear-gradient(160deg, ${T.accent}, ${dim(T.accent)})` }} />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.35) 50%, rgba(0,0,0,.72) 100%)' }} />
      <div className="relative mx-auto w-full max-w-3xl px-5 pb-8" style={{ textShadow: '0 2px 18px rgba(0,0,0,.35)' }}>
        {Logo && <div className="mb-4">{Logo}</div>}
        {Title}
      </div>
    </header>
  );
}
const dim = (hex: string) => { const n = parseInt(hex.slice(1), 16); const f = (x: number) => Math.max(0, Math.round(x * 0.55)).toString(16).padStart(2, '0'); return `#${f((n >> 16) & 255)}${f((n >> 8) & 255)}${f(n & 255)}`; };

function DishCard({ d, i, layout, qty, canOrder, onOpen, onAdd, onRemove }: { d: Dish; i: number; layout: string; qty: number; canOrder: boolean; onOpen: () => void; onAdd: () => void; onRemove: () => void }) {
  const pics = photos(d);
  const img = pics[0];
  const stacked = layout !== 'list';
  const price = d.variants?.length ? Math.min(...d.variants.map((v) => v.price)) : d.offerPrice || d.price;
  const tags = (d.tags || []).filter((t) => BADGE[t]);
  const Add = canOrder && d.isAvailable ? (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <AnimatePresence mode="popLayout" initial={false}>
        {qty ? (
          <motion.div key="step" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex items-center overflow-hidden rounded-xl font-extrabold shadow-lg" style={{ background: 'var(--p)', color: 'var(--onp)' }}>
            <button aria-label={`Remove one ${d.name}`} onClick={onRemove} className="px-3 py-2">−</button>
            <motion.span key={qty} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-5 text-center text-sm">{qty}</motion.span>
            <button aria-label={`Add one more ${d.name}`} onClick={onAdd} className="px-3 py-2">+</button>
          </motion.div>
        ) : (
          <motion.button key="add" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} whileTap={{ scale: 0.9 }} onClick={onAdd}
            className="rounded-xl px-5 py-2 text-sm font-extrabold shadow-lg" style={{ background: 'var(--sf)', color: 'var(--p)', border: '1.5px solid var(--p)' }}>
            ADD{d.variants?.length || d.addons?.length ? <sup className="ml-0.5">+</sup> : null}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  ) : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, ease, delay: Math.min(i * 0.05, 0.3) }}
      whileTap={{ scale: 0.985 }} onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className={`group relative cursor-pointer overflow-hidden ${stacked ? 'flex flex-col' : 'flex gap-4 p-4'}`}
      style={{ background: 'var(--sf)', borderRadius: 'var(--r)', border: '1px solid var(--line)', opacity: d.isAvailable ? 1 : 0.55, boxShadow: '0 10px 30px -18px rgba(0,0,0,.25)' }}
    >
      {stacked && img && (
        <div className="relative overflow-hidden" style={{ aspectRatio: layout === 'grid' ? '1 / 1' : '16 / 10' }}>
          <img src={img} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {pics.length > 1 && <span className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-bold text-white">{pics.length} photos</span>}
        </div>
      )}
      <div className={`flex min-w-0 flex-1 flex-col ${stacked ? 'p-3.5' : ''}`}>
        <div className="flex items-start gap-2">
          <span className="mt-1"><VegMark veg={d.isVeg} size={14} /></span>
          <h3 className={`font-bold leading-snug ${layout === 'grid' ? 'text-[15px]' : 'text-[17px]'}`} style={{ fontFamily: 'var(--hf)' }}>{d.name}</h3>
        </div>
        {tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">{tags.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-extrabold" style={{ background: t === 'spicy' ? 'rgba(220,38,38,.12)' : 'var(--ps)', color: t === 'spicy' ? '#dc2626' : 'var(--p)' }}>{t === 'bestseller' && <Star size={10} fill="currentColor" />}{BADGE[t]}</span>)}</div>
        )}
        {d.description && layout !== 'grid' && <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed" style={{ color: 'var(--mu)' }}>{d.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="flex items-baseline gap-1.5">
            <b className="text-[16px]">{d.variants?.length ? `${inr(price)}+` : inr(price)}</b>
            {!d.variants?.length && d.offerPrice ? <s className="text-xs" style={{ color: 'var(--mu)' }}>{inr(d.price)}</s> : null}
          </span>
          {!d.isAvailable ? <span className="text-xs font-extrabold text-red-500">Sold out</span> : (stacked || !img) && Add}
        </div>
      </div>
      {!stacked && img && (
        <div className="relative w-[112px] shrink-0">
          <img src={img} alt={d.name} loading="lazy" className="size-[112px] object-cover" style={{ borderRadius: 'calc(var(--r) * .75)' }} />
          {Add && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">{Add}</div>}
        </div>
      )}
    </motion.article>
  );
}

function Info({ data, table, onCall, onBook, onRate }: { data: MenuData; table: string; onCall: () => void; onBook: () => void; onRate: () => void }) {
  const r = data.restaurant;
  const s = r.social || {};
  const [copied, setCopied] = useState(false);
  const links = [
    s.instagram && { href: s.instagram.startsWith('http') ? s.instagram : `https://instagram.com/${s.instagram.replace('@', '')}`, icon: AtSign, label: 'Instagram' },
    s.whatsapp && { href: `https://wa.me/${s.whatsapp.replace(/\D/g, '').replace(/^(?=\d{10}$)/, '91')}`, icon: MessageCircle, label: 'WhatsApp' },
    s.facebook && { href: s.facebook, icon: Share2, label: 'Facebook' },
    s.maps && { href: s.maps, icon: Navigation, label: 'Directions' },
    s.website && { href: s.website, icon: Globe, label: 'Website' },
    r.phone && { href: `tel:${r.phone}`, icon: Phone, label: 'Call' },
  ].filter(Boolean) as { href: string; icon: any; label: string }[];
  const wifi = r.store?.wifiName;
  return (
    <div className="mt-14 space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {data.features.serviceCalls && table && <Action icon={BellRing} label="Call staff" onClick={onCall} />}
        {data.features.reservations && <Action icon={CalendarDays} label="Book a table" onClick={onBook} />}
        {data.features.reviewInterceptor && <Action icon={Star} label="Rate your visit" onClick={onRate} />}
      </div>
      {wifi && (
        <div className="flex items-center gap-4 rounded-[var(--r)] p-4" style={{ background: 'var(--sf)', border: '1px solid var(--line)' }}>
          <span className="grid size-11 place-items-center rounded-2xl" style={{ background: 'var(--ps)', color: 'var(--p)' }}><Wifi size={20} /></span>
          <div className="min-w-0 flex-1"><div className="text-xs font-bold" style={{ color: 'var(--mu)' }}>Free WiFi</div><div className="truncate font-extrabold">{wifi}</div></div>
          {r.store?.wifiPassword && (
            <button onClick={() => { navigator.clipboard?.writeText(r.store!.wifiPassword); setCopied(true); setTimeout(() => setCopied(false), 1800); }} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-extrabold" style={{ background: 'var(--soft)' }}>
              {copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy password'}
            </button>
          )}
        </div>
      )}
      {(r.about || r.address) && (
        <div className="rounded-[var(--r)] p-5 text-sm leading-relaxed" style={{ background: 'var(--sf)', border: '1px solid var(--line)' }}>
          {r.about && <p>{r.about}</p>}
          {r.address && <p className="mt-2 flex gap-2" style={{ color: 'var(--mu)' }}><MapPin size={16} className="mt-0.5 shrink-0" />{r.address}</p>}
          {r.fssai && <p className="mt-2 text-xs" style={{ color: 'var(--mu)' }}>FSSAI Lic. {r.fssai}</p>}
        </div>
      )}
      {links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold transition-transform active:scale-95" style={{ background: 'var(--sf)', border: '1px solid var(--line)' }}>
              <l.icon size={16} style={{ color: 'var(--p)' }} />{l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const Action = ({ icon: I, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-3 rounded-[var(--r)] p-4 text-left font-extrabold transition-transform active:scale-[.98]" style={{ background: 'var(--sf)', border: '1px solid var(--line)' }}>
    <span className="grid size-10 place-items-center rounded-2xl" style={{ background: 'var(--ps)', color: 'var(--p)' }}><I size={19} /></span>{label}
  </button>
);

function Skeleton() {
  return (
    <div className="min-h-dvh bg-[#f4f4f2]">
      <div className="h-[300px] animate-pulse bg-[#e6e6e2]" />
      <div className="mx-auto max-w-3xl space-y-3 px-4 pt-6">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-28 animate-pulse rounded-3xl bg-white" style={{ animationDelay: `${i * 90}ms` }} />)}
      </div>
    </div>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="jamun grid min-h-dvh place-items-center px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="haldi mx-auto mb-6 grid size-16 place-items-center rounded-3xl text-2xl font-black">Q</div>
        <h1 className="font-display text-4xl font-extrabold">{title}</h1>
        <p className="mx-auto mt-3 max-w-sm text-white/70">{body}</p>
      </motion.div>
    </div>
  );
}
