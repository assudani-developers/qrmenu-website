import QRCode from 'qrcode';
import { lum } from '@/components/menu/types';

export type QrTheme = { id: string; name: string; tier: string; blurb?: string; fg: string; bg: string; bg2: string; ink: string; frame: string; dots: boolean };

/** A real, scannable QR drawn as SVG: round dots or squares, finder eyes always solid so phones read it fast. */
export function QrSvg({ text, fg, dots, size = 160 }: { text: string; fg: string; dots: boolean; size?: number }) {
  const q = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const n = q.modules.size, d = q.modules.data;
  const eye = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (!d[y * n + x] || eye(x, y)) continue;
    cells.push(dots ? <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.42} /> : <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />);
  }
  const Eye = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x + 0.5} y={y + 0.5} width={6} height={6} rx={dots ? 1.8 : 0.6} fill="none" stroke={fg} strokeWidth={1} />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={dots ? 0.9 : 0.3} />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} width={size} height={size} fill={fg} role="img" aria-label="QR code">
      {cells}
      <Eye x={0} y={0} /><Eye x={n - 7} y={0} /><Eye x={0} y={n - 7} />
    </svg>
  );
}

/** The printable QR card, same three layouts as the owner app: plain, table tent and framed card. */
export default function QrDesign({ t, url, name = 'Saffron Courtyard', caption = 'Scan for menu' }: { t: QrTheme; url: string; name?: string; caption?: string }) {
  if (t.id === 'plain') {
    return <div className="grid place-items-center rounded-2xl bg-white p-5 shadow-sm"><QrSvg text={url} fg={t.fg} dots={t.dots} size={170} /></div>;
  }
  if (t.id === 'tent') {
    return (
      <div className="overflow-hidden rounded-[22px] border-2 text-center" style={{ background: t.bg, borderColor: t.frame }}>
        <div className="px-3 py-3 font-display text-lg font-extrabold text-white" style={{ background: t.frame }}>{name}</div>
        <div className="mt-3 text-[10px] font-extrabold tracking-[.18em]" style={{ color: t.ink }}>ORDER FROM YOUR TABLE</div>
        <div className="mx-auto mt-2 w-fit"><QrSvg text={url} fg={t.fg} dots={t.dots} size={130} /></div>
        <div className="mt-2 text-xs font-semibold" style={{ color: t.ink }}>{caption}</div>
        <div className="mx-5 mt-3 h-px" style={{ background: t.frame, opacity: 0.4 }} />
        <div className="py-2 text-[9.5px]" style={{ color: t.ink, opacity: 0.5 }}>fold here</div>
      </div>
    );
  }
  const dark = lum(t.bg) < 0.35;
  return (
    <div className="rounded-[26px] px-5 pb-4 pt-5 text-center" style={{
      background: `linear-gradient(135deg, ${t.bg}, ${t.bg2})`,
      border: `${t.id === 'gold' ? 3 : 1.5}px solid ${t.frame}${dark ? 'E6' : 'B3'}`,
      boxShadow: t.id === 'noir' || t.id === 'royal' ? `0 0 28px -8px ${t.frame}66` : undefined,
    }}>
      <div className="line-clamp-2 font-display text-xl font-extrabold leading-tight" style={{ color: t.ink }}>{name}</div>
      <div className="mt-0.5 text-[10px] font-extrabold tracking-[.16em]" style={{ color: t.ink, opacity: 0.78 }}>{caption.toUpperCase()}</div>
      <div className="mx-auto mt-3 w-fit rounded-2xl bg-white p-2.5" style={{ border: `1px solid ${t.frame}80` }}><QrSvg text={url} fg={t.fg} dots={t.dots} size={130} /></div>
      <div className="mt-3 text-[11px]" style={{ color: t.ink, opacity: 0.75 }}>No app needed, opens instantly</div>
    </div>
  );
}
