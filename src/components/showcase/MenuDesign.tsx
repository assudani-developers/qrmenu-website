import { FONT, alpha, onColor } from '@/components/menu/types';

export type MenuTemplate = {
  id: string; name: string; tier: string; blurb?: string; primary: string; accent: string; background: string; surface?: string;
  text?: string; muted?: string; font?: string; radius?: number; layout?: 'list' | 'grid' | 'cards' | string; header?: 'hero' | 'centered' | 'band' | string; dark?: boolean;
};

const DISHES = [
  { n: 'Paneer Tikka', d: 'Charred in the tandoor, mint chutney', p: 280, veg: true, tag: 'Bestseller' },
  { n: 'Butter Chicken', d: 'Silky tomato and butter gravy', p: 380, veg: false },
  { n: 'Dal Makhani', d: 'Slow-cooked overnight', p: 260, veg: true },
  { n: 'Masala Chai', d: 'Assam tea, ginger, cardamom', p: 60, veg: true },
];

const Veg = ({ veg }: { veg: boolean }) => (
  <span className="grid size-3 shrink-0 place-items-center rounded-[3px] border-[1.5px]" style={{ borderColor: veg ? '#16a34a' : '#dc2626' }}>
    <i className="block size-1.5 rounded-full" style={{ background: veg ? '#16a34a' : '#dc2626' }} />
  </span>
);

/** A small phone showing a menu design exactly as guests see it: header style, layout, font, colours and corners. */
export default function MenuDesign({ t, name = 'Saffron Courtyard' }: { t: MenuTemplate; name?: string }) {
  const bg = t.background, sf = t.surface || '#ffffff', tx = t.text || '#1a1a1a', mu = t.muted || '#6b6b6b', pr = t.primary;
  const r = Math.min(t.radius ?? 16, 22), hf = FONT[t.font || 'sans'] || FONT.sans;
  const bf = t.font === 'elegant' || t.font === 'serif' ? FONT.sans : hf;
  const onP = onColor(pr);
  const photo = (i: number) => `linear-gradient(${135 + i * 40}deg, ${alpha(pr, 0.85)}, ${alpha(t.accent, 0.9)})`;
  const Add = () => <span className="rounded-md px-2 py-0.5 text-[9px] font-extrabold" style={{ border: `1px solid ${pr}`, color: t.dark ? pr : pr }}>ADD</span>;

  const header = t.header === 'centered' ? (
    <div className="px-4 pb-3 pt-7 text-center">
      <div className="mx-auto grid size-11 place-items-center rounded-full text-base font-bold" style={{ background: pr, color: onP, fontFamily: hf }}>S</div>
      <div className="mt-2 text-[19px] font-bold leading-tight" style={{ fontFamily: hf }}>{name}</div>
      <div className="mt-0.5 text-[10px]" style={{ color: mu }}>North Indian · Jaipur</div>
    </div>
  ) : t.header === 'band' ? (
    <div className="px-4 pb-4 pt-8" style={{ background: pr, color: onP }}>
      <div className="text-[19px] font-bold leading-tight" style={{ fontFamily: hf }}>{name}</div>
      <div className="mt-0.5 text-[10px] opacity-80">North Indian · Jaipur · Open now</div>
    </div>
  ) : (
    <div className="relative h-28 px-4 pt-14" style={t.dark
      ? { background: `radial-gradient(120% 90% at 85% 0%, ${alpha(pr, 0.45)}, transparent 60%), linear-gradient(160deg, ${alpha(t.accent, 0.18)}, ${bg})`, color: pr }
      : { background: `linear-gradient(140deg, ${t.accent}, ${pr})`, color: '#fff' }}>
      <div className="absolute inset-x-0 bottom-0 h-10" style={{ background: `linear-gradient(to top, ${bg}, transparent)` }} />
      <div className="relative text-[20px] font-bold leading-none" style={{ fontFamily: hf, textShadow: '0 2px 10px rgba(0,0,0,.25)' }}>{name}</div>
    </div>
  );

  const body = t.layout === 'grid' ? (
    <div className="grid grid-cols-2 gap-2">
      {DISHES.map((x, i) => (
        <div key={x.n} className="overflow-hidden" style={{ background: sf, borderRadius: r * 0.7 }}>
          <div className="h-14" style={{ background: photo(i) }} />
          <div className="p-2">
            <div className="flex items-center gap-1"><Veg veg={x.veg} /><span className="truncate text-[10.5px] font-bold">{x.n}</span></div>
            <div className="mt-1 flex items-center justify-between"><span className="text-[10.5px] font-extrabold">₹{x.p}</span><Add /></div>
          </div>
        </div>
      ))}
    </div>
  ) : t.layout === 'cards' ? (
    <div className="space-y-2">
      {DISHES.slice(0, 3).map((x, i) => (
        <div key={x.n} className="flex gap-2.5 p-2" style={{ background: sf, borderRadius: r * 0.8, boxShadow: t.dark ? 'none' : '0 4px 14px -8px rgba(0,0,0,.25)' }}>
          <div className="size-14 shrink-0" style={{ background: photo(i), borderRadius: r * 0.6 }} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1"><Veg veg={x.veg} /><span className="truncate text-[11px] font-bold">{x.n}</span></div>
            <div className="truncate text-[9px]" style={{ color: mu }}>{x.d}</div>
            <div className="mt-1 flex items-center justify-between"><span className="text-[11px] font-extrabold">₹{x.p}</span><Add /></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div style={{ background: sf, borderRadius: r * 0.8 }} className="px-3">
      {DISHES.map((x, i) => (
        <div key={x.n} className="flex items-center gap-2 py-2.5" style={{ borderTop: i ? `1px solid ${alpha(tx, 0.08)}` : undefined }}>
          <Veg veg={x.veg} />
          <div className="min-w-0 flex-1"><div className="truncate text-[11px] font-bold">{x.n}</div><div className="truncate text-[9px]" style={{ color: mu }}>{x.d}</div></div>
          <div className="text-right"><div className="text-[11px] font-extrabold">₹{x.p}</div><div className="mt-0.5"><Add /></div></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto w-[236px] rounded-[38px] bg-[#120a1a] p-2 shadow-[0_30px_60px_-28px_rgba(34,21,46,.7)]">
      <div className="relative h-[430px] overflow-hidden rounded-[31px]" style={{ background: bg, color: tx, fontFamily: bf }}>
        <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />
        {header}
        <div className="flex gap-1.5 px-3 py-2.5">
          {['Starters', 'Mains', 'Drinks'].map((c, i) => (
            <span key={c} className="rounded-full px-2.5 py-1 text-[9.5px] font-extrabold" style={i ? { background: alpha(tx, 0.06), color: mu } : { background: pr, color: onP }}>{c}</span>
          ))}
        </div>
        <div className="px-3">
          <div className="mb-1.5 text-[15px] font-bold" style={{ fontFamily: hf }}>Starters</div>
          {body}
        </div>
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between px-3 py-2.5 text-[10.5px] font-extrabold" style={{ background: pr, color: onP, borderRadius: r * 0.8 }}>
          <span>2 items · ₹540</span><span>View order</span>
        </div>
      </div>
    </div>
  );
}
