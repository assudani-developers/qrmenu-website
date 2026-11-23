'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Minus, Plus, Check, Star, BellRing, Receipt, GlassWater, Sparkles, CalendarDays, ChefHat, CookingPot, BellDot, UtensilsCrossed } from 'lucide-react';
import { API } from '@/lib/api';
import { Addon, BADGE, CartLine, DIET, Dish, MenuData, Variant, inr, onColor, photos, unitPrice } from './types';

const btn = 'inline-flex items-center justify-center gap-2 rounded-[calc(var(--r)*.8)] px-5 py-3.5 font-extrabold transition-transform active:scale-[.97] disabled:opacity-50';
const primaryBtn = { background: 'var(--p)', color: 'var(--onp)' } as const;
const field = 'w-full rounded-2xl px-4 py-3.5 text-[16px] font-semibold';
const fieldStyle = { background: 'var(--soft)', color: 'var(--tx)', border: '1px solid var(--line)' } as const;

export function VegMark({ veg, size = 15 }: { veg: boolean; size?: number }) {
  const c = veg ? '#16a34a' : '#dc2626';
  return (
    <span aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'} className="inline-grid shrink-0 place-items-center rounded-[3px]" style={{ width: size, height: size, border: `1.5px solid ${c}` }}>
      {veg ? <i className="block rounded-full" style={{ width: size * 0.45, height: size * 0.45, background: c }} /> : <i className="block" style={{ width: 0, height: 0, borderLeft: `${size * 0.26}px solid transparent`, borderRight: `${size * 0.26}px solid transparent`, borderBottom: `${size * 0.42}px solid ${c}` }} />}
    </span>
  );
}

/** Swipeable photo strip with dots. */
export function Gallery({ urls, alt, ratio = '4 / 3' }: { urls: string[]; alt: string; ratio?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  if (!urls.length) return null;
  return (
    <div className="relative">
      <div ref={ref} onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" style={{ aspectRatio: ratio }}>
        {urls.map((u, k) => <img key={u + k} src={u} alt={`${alt} photo ${k + 1}`} className="h-full w-full shrink-0 snap-center object-cover" loading={k ? 'lazy' : 'eager'} />)}
      </div>
      {urls.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {urls.map((u, k) => (
            <button key={u + k} aria-label={`Photo ${k + 1}`} onClick={() => ref.current?.scrollTo({ left: k * ref.current.clientWidth, behavior: 'smooth' })}
              className="h-1.5 rounded-full bg-white transition-all" style={{ width: k === i ? 20 : 6, opacity: k === i ? 1 : 0.6 }} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DishSheet({ d, canOrder, onAdd }: { d: Dish; canOrder: boolean; onAdd: (v?: Variant, a?: Addon[], qty?: number) => void }) {
  const [v, setV] = useState<Variant | undefined>(d.variants?.[0]);
  const [a, setA] = useState<Addon[]>([]);
  const [qty, setQty] = useState(1);
  const pics = photos(d);
  const price = unitPrice(d, v, a);
  return (
    <div>
      {pics.length > 0 && <div className="mx-4 mt-2 overflow-hidden rounded-[var(--r)]"><Gallery urls={pics} alt={d.name} /></div>}
      <div className="px-6 pt-5">
        <div className="flex items-start gap-2.5 pr-10">
          <span className="mt-1.5"><VegMark veg={d.isVeg} /></span>
          <h2 className="text-[26px] font-bold leading-tight" style={{ fontFamily: 'var(--hf)' }}>{d.name}</h2>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(d.tags || []).filter((t) => BADGE[t]).map((t) => <span key={t} className="rounded-full px-2.5 py-1 text-[11px] font-extrabold" style={{ background: 'var(--ps)', color: 'var(--p)' }}>{BADGE[t]}</span>)}
          {(d.diet || []).map((t) => DIET[t] && <span key={t} className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ border: '1px solid var(--line)', color: 'var(--mu)' }}>{DIET[t]}</span>)}
          {d.prepTime ? <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ border: '1px solid var(--line)', color: 'var(--mu)' }}>{d.prepTime} min</span> : null}
          {d.calories ? <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ border: '1px solid var(--line)', color: 'var(--mu)' }}>{d.calories} kcal</span> : null}
        </div>
        {d.description && <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--mu)' }}>{d.description}</p>}
        {d.ingredients && <p className="mt-2 text-sm" style={{ color: 'var(--mu)' }}><b style={{ color: 'var(--tx)' }}>Made with:</b> {d.ingredients}</p>}
        {!!d.allergens?.length && <p className="mt-2 text-sm font-semibold text-amber-600">Contains {d.allergens.map((x) => DIET[x] || x).join(', ')}</p>}

        {!!d.variants?.length && (
          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-extrabold">Choose a size</legend>
            <div className="space-y-2">
              {d.variants.map((x) => (
                <label key={x.id} className="flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3" style={{ border: `1.5px solid ${v?.id === x.id ? 'var(--p)' : 'var(--line)'}`, background: v?.id === x.id ? 'var(--ps)' : 'transparent' }}>
                  <span className="flex items-center gap-3 font-semibold"><input type="radio" name="variant" className="accent-[var(--p)]" checked={v?.id === x.id} onChange={() => setV(x)} />{x.name}</span>
                  <b>{inr(x.price)}</b>
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {!!d.addons?.length && (
          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-extrabold">Add extras</legend>
            <div className="space-y-2">
              {d.addons.map((x) => {
                const on = a.some((y) => y.id === x.id);
                return (
                  <label key={x.id} className="flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3" style={{ border: `1.5px solid ${on ? 'var(--p)' : 'var(--line)'}` }}>
                    <span className="flex items-center gap-3 font-semibold"><input type="checkbox" className="accent-[var(--p)]" checked={on} onChange={() => setA(on ? a.filter((y) => y.id !== x.id) : [...a, x])} />{x.name}</span>
                    <span className="font-bold" style={{ color: 'var(--mu)' }}>+{inr(x.price)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>
      {canOrder && d.isAvailable && (
        <div className="sticky bottom-0 mt-6 flex items-center gap-3 px-6 pb-2 pt-3" style={{ background: 'var(--sf)' }}>
          <div className="flex items-center gap-1 rounded-2xl p-1" style={{ background: 'var(--soft)' }}>
            <button aria-label="Less" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-10 place-items-center rounded-xl"><Minus size={18} /></button>
            <span className="w-7 text-center text-lg font-extrabold">{qty}</span>
            <button aria-label="More" onClick={() => setQty(qty + 1)} className="grid size-10 place-items-center rounded-xl"><Plus size={18} /></button>
          </div>
          <button onClick={() => onAdd(v, a, qty)} className={`${btn} flex-1`} style={primaryBtn}>Add · {inr(price * qty)}</button>
        </div>
      )}
      {!d.isAvailable && <p className="px-6 pt-4 text-center font-bold text-red-500">Sold out right now</p>}
    </div>
  );
}

/** One QR for the whole restaurant: the guest taps their table (or types it when the owner has not listed tables). */
export function TablePicker({ tables, value, onChange }: { tables: string[]; value: string; onChange: (t: string) => void }) {
  if (!tables.length) return <input value={value} onChange={(e) => onChange(e.target.value)} inputMode="numeric" placeholder="Your table number" aria-label="Your table number" className={field} style={fieldStyle} />;
  return (
    <div role="radiogroup" aria-label="Your table">
      <div className="mb-2 text-sm font-bold">Which table are you at?</div>
      <div className="flex flex-wrap gap-2">
        {tables.map((x) => (
          <button key={x} role="radio" aria-checked={value === x} onClick={() => onChange(x)} className="min-w-12 rounded-xl px-3.5 py-2.5 text-sm font-extrabold transition-transform active:scale-95"
            style={value === x ? { background: 'var(--p)', color: 'var(--onp)' } : { background: 'var(--soft)', border: '1px solid var(--line)' }}>
            {x.replace(/^table\s*/i, '')}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Checkout({ cart, data, table, inc, dec, onPlaced, onTable }: { cart: CartLine[]; data: MenuData; table: string; inc: (k: string) => void; dec: (k: string) => void; onPlaced: (o: { id: string; trackKey: string; token: number }) => void; onTable: (t: string) => void }) {
  const r = data.restaurant;
  const [t, setT] = useState(table || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const sub = cart.reduce((n, l) => n + unitPrice(l.dish, l.variant, l.addons) * l.qty, 0);
  const tax = Math.round((sub * (r.taxPercent || 0)) / 100);
  const idem = useRef(typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()));

  async function place() {
    setErr('');
    if (!t.trim()) return setErr('Tell us your table so the food reaches you');
    if (phone && !/^\+?[0-9 ]{10,15}$/.test(phone)) return setErr('Enter a valid mobile number or leave it empty');
    setBusy(true);
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': idem.current },
        body: JSON.stringify({ slug: r.shortId, table: t, name, phone, notes, items: cart.map((l) => ({ dishId: l.dish.id, variantId: l.variant?.id, addonIds: l.addons.map((x) => x.id), qty: l.qty })) }),
      });
      const j = await res.json();
      if (!res.ok || !j.success) throw new Error(j.message || 'Could not place the order');
      try { localStorage.setItem(`qrm_order_${r.shortId}`, JSON.stringify({ id: j.order.id, key: j.order.trackKey, token: j.order.token })); } catch (_) {}
      onTable(t);
      onPlaced(j.order);
    } catch (e: any) {
      setErr(e.message);
    } finally { setBusy(false); }
  }

  return (
    <div className="px-6 pt-2">
      <h2 className="text-[26px] font-bold" style={{ fontFamily: 'var(--hf)' }}>Your order</h2>
      <p className="text-sm" style={{ color: 'var(--mu)' }}>Pay at the table after your meal.</p>
      <div className="mt-4 divide-y" style={{ borderColor: 'var(--line)' }}>
        {cart.map((l) => (
          <div key={l.key} className="flex items-center gap-3 py-3" style={{ borderColor: 'var(--line)' }}>
            <VegMark veg={l.dish.isVeg} size={13} />
            <div className="min-w-0 flex-1">
              <div className="truncate font-bold">{l.dish.name}</div>
              <div className="truncate text-xs" style={{ color: 'var(--mu)' }}>{[l.variant?.name, ...l.addons.map((x) => x.name)].filter(Boolean).join(' · ') || inr(unitPrice(l.dish, l.variant, l.addons))}</div>
            </div>
            <div className="flex items-center rounded-xl" style={{ border: '1.5px solid var(--p)', color: 'var(--p)' }}>
              <button aria-label="Less" onClick={() => dec(l.key)} className="grid size-8 place-items-center"><Minus size={15} /></button>
              <span className="w-5 text-center text-sm font-extrabold">{l.qty}</span>
              <button aria-label="More" onClick={() => inc(l.key)} className="grid size-8 place-items-center"><Plus size={15} /></button>
            </div>
            <div className="w-16 text-right font-bold">{inr(unitPrice(l.dish, l.variant, l.addons) * l.qty)}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <TablePicker tables={r.tables || []} value={t} onChange={setT} />
        <div className="grid grid-cols-2 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} style={fieldStyle} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="Mobile (optional)" className={field} style={fieldStyle} />
        </div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Cooking notes (less spicy, no onion…)" rows={2} className={field} style={fieldStyle} />
      </div>
      <div className="mt-5 space-y-1.5 rounded-2xl p-4 text-sm" style={{ background: 'var(--soft)' }}>
        <div className="flex justify-between"><span style={{ color: 'var(--mu)' }}>Items</span><b>{inr(sub)}</b></div>
        {tax > 0 && <div className="flex justify-between"><span style={{ color: 'var(--mu)' }}>Taxes ({r.taxPercent}%)</span><b>{inr(tax)}</b></div>}
        <div className="flex justify-between pt-1.5 text-base"><b>To pay</b><b>{inr(sub + tax)}</b></div>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-bold text-red-500">{err}</p>}
      <button onClick={place} disabled={busy} className={`${btn} mt-4 w-full text-base`} style={primaryBtn}>{busy ? 'Sending to kitchen…' : `Place order · ${inr(sub + tax)}`}</button>
    </div>
  );
}

const STEPS = [
  { k: 'pending', label: 'Received', icon: BellDot },
  { k: 'cooking', label: 'Cooking', icon: CookingPot },
  { k: 'ready', label: 'Ready', icon: ChefHat },
  { k: 'served', label: 'Served', icon: UtensilsCrossed },
];
/** Live order status (socket, with a slow poll as a safety net). */
export function useOrder(code: string, bump: number) {
  const [o, setO] = useState<any>(null);
  useEffect(() => {
    let stop = false;
    let saved: any = null;
    try { saved = JSON.parse(localStorage.getItem(`qrm_order_${code}`) || 'null'); } catch (_) {}
    if (!saved) { setO(null); return; }
    const load = () => fetch(`${API}/api/orders/${saved.id}/track?key=${saved.key}`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((j) => { if (!stop) setO(j?.order || null); }).catch(() => {});
    load();
    const t = setInterval(load, 20000);
    const s = io(API, { transports: ['websocket'] });
    s.on('connect', () => s.emit('order:watch', { id: saved.id, key: saved.key }));
    s.on('order:update', (m: any) => { if (!stop && m?.order) setO((p: any) => ({ ...(p || {}), ...m.order })); });
    return () => { stop = true; clearInterval(t); s.close(); };
  }, [code, bump]);
  return o;
}

export function Tracker({ o, onRate, canRate }: { o: any; onRate: () => void; canRate: boolean }) {
  const idx = Math.max(0, STEPS.findIndex((s) => s.k === o.status));
  const cancelled = o.status === 'cancelled';
  return (
    <div className="px-6 pt-2">
      <p className="text-sm font-bold" style={{ color: 'var(--mu)' }}>Order #{o.token}{o.tableNumber ? ` · ${o.tableNumber}` : ''}</p>
      <h2 className="text-[28px] font-bold" style={{ fontFamily: 'var(--hf)' }}>{cancelled ? 'Order cancelled' : idx === 3 ? 'Enjoy your meal' : idx === 2 ? 'Your food is ready' : idx === 1 ? 'Being cooked now' : 'Kitchen has your order'}</h2>
      {!cancelled && (
        <div className="relative mt-7 flex justify-between">
          <div className="absolute left-5 right-5 top-5 h-1 rounded-full" style={{ background: 'var(--line)' }} />
          <motion.div className="absolute left-5 top-5 h-1 rounded-full" style={{ background: 'var(--p)' }} initial={{ width: 0 }} animate={{ width: `calc((100% - 40px) * ${idx / 3})` }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }} />
          {STEPS.map((s, i) => (
            <div key={s.k} className="relative flex w-16 flex-col items-center gap-2">
              <motion.div className="grid size-10 place-items-center rounded-full" animate={{ scale: i === idx ? [1, 1.12, 1] : 1 }} transition={{ repeat: i === idx && idx < 3 ? Infinity : 0, duration: 1.6 }}
                style={{ background: i <= idx ? 'var(--p)' : 'var(--soft)', color: i <= idx ? 'var(--onp)' : 'var(--mu)' }}>
                {i < idx ? <Check size={18} /> : <s.icon size={18} />}
              </motion.div>
              <span className="text-xs font-bold" style={{ color: i <= idx ? 'var(--tx)' : 'var(--mu)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 space-y-1 rounded-2xl p-4 text-sm" style={{ background: 'var(--soft)' }}>
        {(o.items || []).map((l: any, i: number) => <div key={i} className="flex justify-between"><span>{l.qty} × {l.name}</span></div>)}
        {o.totalAmount != null && <div className="flex justify-between border-t pt-2 font-extrabold" style={{ borderColor: 'var(--line)' }}><span>Total</span><span>{inr(o.totalAmount)}</span></div>}
      </div>
      {canRate && idx >= 2 && <button onClick={onRate} className={`${btn} mt-4 w-full`} style={primaryBtn}><Star size={18} />Rate your meal</button>}
    </div>
  );
}

export function CallStaff({ code, table, tables, onTable, onDone }: { code: string; table: string; tables: string[]; onTable: (t: string) => void; onDone: (msg: string) => void }) {
  const [busy, setBusy] = useState('');
  const [t, setT] = useState(table);
  const opts = [
    { type: 'waiter', label: 'Call a waiter', icon: BellRing },
    { type: 'bill', label: 'Ask for the bill', icon: Receipt },
    { type: 'water', label: 'Some water please', icon: GlassWater },
    { type: 'cleaning', label: 'Clean the table', icon: Sparkles },
  ];
  async function send(type: string) {
    if (!t.trim()) return onDone('Choose your table first');
    setBusy(type);
    onTable(t);
    const r = await fetch(`${API}/api/service-calls`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ slug: code, table: t, type }) }).then((x) => x.json()).catch(() => ({}));
    setBusy('');
    onDone(r.success ? 'The staff has been told. Someone is on the way.' : r.message || 'Could not reach the staff. Please wave to them.');
  }
  return (
    <div className="px-6 pt-2">
      <h2 className="text-[26px] font-bold" style={{ fontFamily: 'var(--hf)' }}>Need something?</h2>
      {table ? <p className="text-sm" style={{ color: 'var(--mu)' }}>{table}</p> : <div className="mt-4"><TablePicker tables={tables} value={t} onChange={setT} /></div>}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {opts.map((o) => (
          <button key={o.type} onClick={() => send(o.type)} disabled={!!busy} className="flex flex-col items-start gap-3 rounded-[var(--r)] p-4 text-left font-bold transition-transform active:scale-95" style={{ background: 'var(--soft)', border: '1px solid var(--line)' }}>
            <span className="grid size-10 place-items-center rounded-2xl" style={{ background: 'var(--ps)', color: 'var(--p)' }}>{busy === o.type ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <o.icon size={20} />}</span>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Book({ code, onDone }: { code: string; onDone: (msg: string) => void }) {
  const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
  const [f, setF] = useState({ name: '', phone: '', date: today, time: '20:00', guests: '2', notes: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function send() {
    setBusy(true); setErr('');
    const r = await fetch(`${API}/api/reservations`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ slug: code, ...f }) }).then((x) => x.json()).catch(() => ({ message: 'Check your connection' }));
    setBusy(false);
    if (r.success) onDone('Booking request sent. The restaurant will confirm it shortly.'); else setErr(r.message || 'Could not send');
  }
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="space-y-3 px-6 pt-2">
      <h2 className="text-[26px] font-bold" style={{ fontFamily: 'var(--hf)' }}><CalendarDays className="mr-2 inline" />Book a table</h2>
      <div className="grid grid-cols-2 gap-3">
        <input value={f.name} onChange={set('name')} placeholder="Your name" className={field} style={fieldStyle} />
        <input value={f.phone} onChange={set('phone')} inputMode="tel" placeholder="Mobile" className={field} style={fieldStyle} />
        <input type="date" min={today} value={f.date} onChange={set('date')} className={field} style={fieldStyle} aria-label="Date" />
        <input type="time" value={f.time} onChange={set('time')} className={field} style={fieldStyle} aria-label="Time" />
      </div>
      <input type="number" min={1} max={50} value={f.guests} onChange={set('guests')} className={field} style={fieldStyle} aria-label="Guests" />
      <textarea value={f.notes} onChange={set('notes')} rows={2} placeholder="Occasion or request (optional)" className={field} style={fieldStyle} />
      {err && <p role="alert" className="text-sm font-bold text-red-500">{err}</p>}
      <button onClick={send} disabled={busy} className={`${btn} w-full`} style={primaryBtn}>{busy ? 'Sending…' : 'Request booking'}</button>
    </div>
  );
}

export function Rate({ code, table, onDone }: { code: string; table: string; onDone: (msg: string) => void }) {
  const [stars, setStars] = useState(0);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  async function send() {
    setBusy(true);
    const r = await fetch(`${API}/api/feedback`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ slug: code, rating: stars, message: msg, tableNumber: table }) }).then((x) => x.json()).catch(() => ({}));
    setBusy(false);
    if (stars >= 4 && r.googleReviewUrl) { window.open(r.googleReviewUrl, '_blank', 'noopener'); onDone('Thank you! A Google review helps us a lot.'); }
    else onDone('Thank you. Your feedback went straight to the owner.');
  }
  return (
    <div className="px-6 pt-2 text-center">
      <h2 className="text-[26px] font-bold" style={{ fontFamily: 'var(--hf)' }}>How was everything?</h2>
      <div className="mt-5 flex justify-center gap-2" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button key={n} role="radio" aria-checked={stars === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} whileTap={{ scale: 0.8 }} onClick={() => setStars(n)}>
            <Star size={40} fill={n <= stars ? '#f5b50a' : 'none'} color={n <= stars ? '#f5b50a' : 'var(--mu)'} />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {stars > 0 && stars <= 3 && (
          <motion.textarea initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="What could we do better? Only the owner sees this." className={`${field} mt-5`} style={fieldStyle} />
        )}
      </AnimatePresence>
      <button onClick={send} disabled={!stars || busy} className={`${btn} mt-5 w-full`} style={primaryBtn}>{busy ? 'Sending…' : 'Send'}</button>
    </div>
  );
}

export { onColor };
