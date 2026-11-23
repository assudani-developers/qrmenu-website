'use client';
import { useState } from 'react';
import { API } from '@/lib/api';

export default function LeadForm({ plan = '', title = 'Request a demo' }: { plan?: string; title?: string }) {
  const [v, setV] = useState({ restaurantName: '', ownerName: '', phone: '', city: '', notes: '' });
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [err, setErr] = useState('');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const cls = 'w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold focus:border-gold';

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setState('busy'); setErr('');
    try {
      const r = await fetch(`${API}/api/leads`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...v, planPreference: plan }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.message || 'Something went wrong');
      setState('done');
    } catch (x: any) { setErr(x.message); setState('idle'); }
  }

  if (state === 'done') return <div className="card p-8 text-center"><div className="text-5xl">🙏</div><h3 className="mt-3 font-serif text-2xl font-bold">Thank you!</h3><p className="mt-2 text-muted">We have your details and will call you shortly.</p></div>;
  return (
    <form onSubmit={submit} className="card space-y-4 p-7">
      <h3 className="font-serif text-2xl font-bold">{title}</h3>
      <input className={cls} placeholder="Restaurant name *" value={v.restaurantName} onChange={set('restaurantName')} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={cls} placeholder="Your name" value={v.ownerName} onChange={set('ownerName')} />
        <input className={cls} placeholder="Mobile number *" inputMode="tel" value={v.phone} onChange={set('phone')} required />
      </div>
      <input className={cls} placeholder="City" value={v.city} onChange={set('city')} />
      <textarea className={cls} placeholder="Anything we should know? (optional)" rows={3} value={v.notes} onChange={set('notes')} />
      {err && <p className="text-sm font-bold text-red-600">{err}</p>}
      <button disabled={state === 'busy'} className="gold-grad w-full rounded-2xl py-3.5 font-extrabold text-[#1a1206] disabled:opacity-60">{state === 'busy' ? 'Sending…' : 'Send request'}</button>
    </form>
  );
}
