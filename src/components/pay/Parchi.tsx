'use client';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

export type ParchiLine = { label: string; value: string; tone?: 'muted' | 'good' | 'strong' };
export type SealKind = 'paid' | 'verifying' | 'trial' | null;

const ease = [0.2, 0.8, 0.2, 1] as const;

/**
 * A thermal-printer receipt that feeds out of a slot, line by line.
 * Lines added later (a coupon) slide in; the total rolls; a 3D rubber stamp lands on it when the state changes.
 */
export default function Parchi({ brand, title, meta, lines, total, totalLabel, note, seal, sealText, footer, printKey }: {
  brand: string; title: string; meta: string[]; lines: ParchiLine[]; total: string; totalLabel: string; note?: string;
  seal: SealKind; sealText?: string; footer: string; printKey: string;
}) {
  const paper = useAnimationControls();
  useEffect(() => {
    paper.set({ y: '-100%' });
    // stepped feed, like a real thermal printer
    paper.start({ y: '0%', transition: { duration: 2.1, ease: (t: number) => Math.round(easeOut(t) * 26) / 26 } });
  }, [printKey, paper]);
  useEffect(() => {
    if (seal === 'paid' || seal === 'trial') paper.start({ x: [0, -5, 4, -2, 0], rotate: [0, -0.6, 0.4, 0], transition: { duration: 0.45, delay: 0.42 } });
  }, [seal, paper]);

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* printer */}
      <div className="relative z-20 mx-auto h-16 w-[112%] -translate-x-[5.4%] rounded-[22px] bg-gradient-to-b from-[#3a2a4d] to-[#1c1028] shadow-[0_20px_40px_-12px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.12)]">
        <div className="absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" /></span>
          <span className="text-[11px] font-bold tracking-wide text-white/50">{brand}</span>
        </div>
        <div className="absolute bottom-3 left-6 right-6 h-2 rounded-full bg-black/70 shadow-[inset_0_2px_3px_rgba(0,0,0,.9)]" />
      </div>
      {/* paper window */}
      <div className="relative -mt-5 overflow-hidden px-[3%] pb-8" style={{ perspective: 900 }}>
        <motion.div animate={paper} className="relative origin-top">
          <div className="relative bg-[#fffdf7] px-6 pb-7 pt-9 font-mono text-[13px] text-[#2a2330] shadow-[0_30px_60px_-20px_rgba(0,0,0,.55)]"
            style={{ maskImage: zigzag, WebkitMaskImage: zigzag, maskSize: '100% 100%' }}>
            <div className="pointer-events-none absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#000 0 1px,transparent 1px 3px)' }} />
            <div className="text-center">
              <div className="font-display text-[22px] font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-bricolage)' }}>{brand}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[.2em] text-[#6f6a77]">{title}</div>
            </div>
            <Dash />
            <div className="space-y-0.5 text-[12px] text-[#55505d]">{meta.map((m) => <div key={m}>{m}</div>)}</div>
            <Dash />
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.div key={l.label} layout initial={{ opacity: 0, height: 0, x: -10 }} animate={{ opacity: 1, height: 'auto', x: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease }}
                    className={`flex justify-between gap-4 ${l.tone === 'good' ? 'text-[#0f7a55]' : l.tone === 'muted' ? 'text-[#6f6a77]' : l.tone === 'strong' ? 'font-bold' : ''}`}>
                    <span>{l.label}</span><span className="shrink-0 tabular-nums">{l.value}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <Dash double />
            <div className="flex items-end justify-between">
              <span className="text-[12px] font-bold uppercase tracking-[.15em]">{totalLabel}</span>
              <AnimatePresence mode="popLayout">
                <motion.span key={total} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.4, ease }}
                  className="text-[30px] font-extrabold leading-none tabular-nums" style={{ fontFamily: 'var(--font-bricolage)' }}>{total}</motion.span>
              </AnimatePresence>
            </div>
            {note && <p className="mt-3 text-center text-[11.5px] leading-snug text-[#55505d]">{note}</p>}
            <Dash />
            <Barcode seed={printKey} />
            <p className="mt-2 text-center text-[10.5px] tracking-wide text-[#6f6a77]">{footer}</p>

            <AnimatePresence>{seal && <Seal key={seal} kind={seal} text={sealText} />}</AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const zigzag = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="M0 0H100V97.5 L97.5 100 95 97.5 92.5 100 90 97.5 87.5 100 85 97.5 82.5 100 80 97.5 77.5 100 75 97.5 72.5 100 70 97.5 67.5 100 65 97.5 62.5 100 60 97.5 57.5 100 55 97.5 52.5 100 50 97.5 47.5 100 45 97.5 42.5 100 40 97.5 37.5 100 35 97.5 32.5 100 30 97.5 27.5 100 25 97.5 22.5 100 20 97.5 17.5 100 15 97.5 12.5 100 10 97.5 7.5 100 5 97.5 2.5 100 0 97.5Z"/></svg>')}")`;

const Dash = ({ double }: { double?: boolean }) => (
  <div className={`my-4 ${double ? 'border-y-[3px] border-double py-px' : 'border-t-2 border-dashed'} border-[#2a2330]/25`} />
);

function Barcode({ seed }: { seed: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const bars = Array.from({ length: 46 }, (_, i) => { h = (h * 1103515245 + 12345) >>> 0; return 1 + ((h >> (i % 7)) & 3); });
  return (
    <div className="flex h-11 items-stretch justify-center gap-[2px]" aria-hidden>
      {bars.map((w, i) => <span key={i} className="bg-[#2a2330]" style={{ width: w, opacity: i % 9 === 0 ? 0.35 : 1 }} />)}
    </div>
  );
}

/** Rubber stamp that drops onto the paper in 3D and leaves an inked impression. */
function Seal({ kind, text }: { kind: Exclude<SealKind, null>; text?: string }) {
  const c = kind === 'paid' ? '#0f7a55' : kind === 'trial' ? '#5e2d8c' : '#b45309';
  const big = kind === 'paid' ? 'PAID' : kind === 'trial' ? 'FREE' : 'CHECKING';
  const ring = kind === 'paid' ? 'PAYMENT VERIFIED • THANK YOU • ' : kind === 'trial' ? 'FREE TRIAL • NO CARD • NO AUTOPAY • ' : 'VERIFYING • USUALLY UNDER 1 HOUR • ';
  const id = `seal-${kind}`;
  const landing = kind !== 'verifying';
  return (
    <motion.div
      className="pointer-events-none absolute bottom-6 right-2 z-10"
      style={{ transformStyle: 'preserve-3d' }}
      initial={landing ? { scale: 2.8, rotateX: 62, rotateZ: -40, y: -160, opacity: 0, filter: 'blur(6px)' } : { scale: 0.6, opacity: 0 }}
      animate={landing ? { scale: 1, rotateX: 0, rotateZ: -14, y: 0, opacity: 0.92, filter: 'blur(0px)' } : { scale: 1, opacity: 0.85, rotateZ: -10 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={landing ? { type: 'spring', stiffness: 520, damping: 22, mass: 1.1, delay: 0.1 } : { duration: 0.4 }}
    >
      {/* soft shadow the stamp casts while it is in the air */}
      {landing && <motion.div className="absolute inset-4 rounded-full bg-black/40 blur-xl" initial={{ opacity: 0.5, scale: 1.4 }} animate={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: 0.1 }} />}
      <motion.svg width="150" height="150" viewBox="0 0 150 150" style={{ mixBlendMode: 'multiply', filter: `drop-shadow(0 1px 0 ${c}55)` }}
        animate={kind === 'verifying' ? { rotate: 360 } : {}} transition={kind === 'verifying' ? { repeat: Infinity, duration: 18, ease: 'linear' } : {}}>
        <defs>
          <filter id={`${id}-ink`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.32" result="m" />
            <feComposite in="SourceGraphic" in2="m" operator="in" />
          </filter>
          <path id={`${id}-p`} d="M75,75 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <g filter={`url(#${id}-ink)`} fill="none" stroke={c}>
          <circle cx="75" cy="75" r="68" strokeWidth="5" strokeDasharray={kind === 'verifying' ? '6 6' : undefined} />
          <circle cx="75" cy="75" r="60" strokeWidth="1.6" />
          <circle cx="75" cy="75" r="40" strokeWidth="1.6" />
          <text fill={c} stroke="none" fontSize="10.5" fontWeight="800" letterSpacing="1.6" fontFamily="var(--font-jakarta)"><textPath href={`#${id}-p`}>{ring}</textPath></text>
          <text x="75" y={text ? 79 : 84} textAnchor="middle" fill={c} stroke="none" fontSize={big.length > 5 ? 15 : 27} fontWeight="900" fontFamily="var(--font-bricolage)" letterSpacing="1">{big}</text>
          {text && <text x="75" y="96" textAnchor="middle" fill={c} stroke="none" fontSize="9" fontWeight="800" fontFamily="var(--font-jakarta)">{text}</text>}
        </g>
      </motion.svg>
    </motion.div>
  );
}
