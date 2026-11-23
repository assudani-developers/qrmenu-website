/**
 * Draws the bill as a real receipt picture (PNG) in the browser — no server, no library, no cost.
 * Same look as the on-screen parchi: thermal paper, dashed rules, torn edge and the rubber stamp.
 */
export type ReceiptRow = { label: string; value: string; tone?: 'muted' | 'good' | 'strong' };
export type ReceiptData = {
  brand: string; title: string; meta: string[]; lines: ReceiptRow[]; details: ReceiptRow[];
  total: string; totalLabel: string; note?: string; footer: string;
  seal?: 'paid' | 'verifying' | 'trial' | null; sealText?: string; code: string;
};

const W = 440, PAD = 30, S = 3; // css px width, side padding, pixel scale (sharp on phones and in print)
const INK = '#2a2330', MUTED = '#6f6a77', GOOD = '#0f7a55', PAPER = '#fffdf7';
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const DISPLAY = '"Bricolage Grotesque", "Plus Jakarta Sans", system-ui, sans-serif';

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number) {
  const out: string[] = []; let line = '';
  for (const w of text.split(/\s+/)) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > max && line) { out.push(line); line = w; } else line = t;
  }
  if (line) out.push(line);
  return out;
}

export async function receiptPng(d: ReceiptData): Promise<Blob> {
  try { await (document as any).fonts?.ready; } catch { /* fonts optional */ }
  // pass 1 measures, pass 2 draws on a canvas of the exact height
  let stampY = 0;
  const draw = (ctx: CanvasRenderingContext2D | null) => {
    let y = 46;
    const inner = W - PAD * 2;
    const text = (t: string, x: number, size: number, opt: { color?: string; weight?: number; align?: CanvasTextAlign; font?: string } = {}) => {
      if (!ctx) return;
      ctx.font = `${opt.weight || 500} ${size}px ${opt.font || MONO}`;
      ctx.fillStyle = opt.color || INK;
      ctx.textAlign = opt.align || 'left';
      ctx.fillText(t, x, y);
    };
    const measure = (size: number, weight = 500, font = MONO) => { const m = document.createElement('canvas').getContext('2d')!; m.font = `${weight} ${size}px ${font}`; return m; };
    const dash = (double = false) => {
      y += 14;
      if (ctx) {
        ctx.strokeStyle = '#b9b3c0'; ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
        if (double) { ctx.beginPath(); ctx.moveTo(PAD, y + 4); ctx.lineTo(W - PAD, y + 4); ctx.stroke(); }
        ctx.setLineDash([]);
      }
      y += double ? 26 : 22;
    };
    const row = (r: ReceiptRow, size = 13.5) => {
      const color = r.tone === 'good' ? GOOD : r.tone === 'muted' ? MUTED : INK;
      const weight = r.tone === 'strong' ? 800 : 500;
      const m = measure(size, weight);
      const vw = r.value ? m.measureText(r.value).width + 16 : 0;
      const ls = wrap(m, r.label, inner - vw);
      ls.forEach((l, i) => { text(l, PAD, size, { color, weight }); if (i === 0 && r.value) text(r.value, W - PAD, size, { color, weight, align: 'right' }); if (i < ls.length - 1) y += size + 6; });
      y += size + 10;
    };

    text(d.brand, W / 2, 26, { font: DISPLAY, weight: 800, align: 'center' }); y += 22;
    text(d.title.toUpperCase(), W / 2, 11.5, { color: MUTED, weight: 600, align: 'center' }); y += 4;
    dash();
    for (const m of d.meta) { text(m, PAD, 12.5, { color: '#55505d' }); y += 19; }
    y -= 8; dash();
    for (const l of d.lines) row(l);
    y -= 10; dash(true);
    text(d.totalLabel.toUpperCase(), PAD, 13, { weight: 800 });
    y += 4; text(d.total, W - PAD, 34, { font: DISPLAY, weight: 800, align: 'right' }); y += 8;
    if (d.note) {
      y += 12;
      const m = measure(12);
      for (const l of wrap(m, d.note, inner)) { text(l, W / 2, 12, { color: '#55505d', align: 'center' }); y += 17; }
      y -= 6;
    }
    if (d.details.length) { dash(); for (const r of d.details) row({ ...r, tone: r.tone || 'muted' }, 12.5); y -= 10; }
    if (d.seal) { y += 8; stampY = y + 74; y += 156; } // a clear space of its own for the stamp
    dash();
    // barcode from the bill code
    if (ctx) {
      let x = PAD + 20, seed = [...d.code].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
      ctx.fillStyle = INK;
      while (x < W - PAD - 20) { seed = (seed * 1103515245 + 12345) >>> 0; const bw = 1 + (seed % 3); ctx.fillRect(x, y - 8, bw, 46); x += bw + 1 + ((seed >> 5) % 3); }
    }
    y += 56;
    text(d.code, W / 2, 11, { color: MUTED, align: 'center' }); y += 20;
    text(d.footer, W / 2, 11, { color: MUTED, align: 'center' }); y += 34;
    return y;
  };

  const H = draw(null);
  const c = document.createElement('canvas');
  c.width = W * S; c.height = (H + 14) * S;
  const ctx = c.getContext('2d')!;
  ctx.scale(S, S);
  // paper with a torn (zig-zag) bottom edge and a soft shadow
  ctx.fillStyle = '#ece8f0'; ctx.fillRect(0, 0, W, H + 14);
  ctx.save();
  ctx.shadowColor = 'rgba(34,21,46,.18)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
  ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(W - 8, 0); ctx.lineTo(W - 8, H - 8);
  for (let x = W - 8, up = true; x > 8; x -= 9, up = !up) ctx.lineTo(Math.max(8, x - 9), up ? H : H - 8);
  ctx.closePath(); ctx.fillStyle = PAPER; ctx.fill();
  ctx.restore();
  draw(ctx);
  if (d.seal) stamp(ctx, d.seal, d.sealText, W / 2, stampY);
  return await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('Could not make the image'))), 'image/png'));
}

function stamp(ctx: CanvasRenderingContext2D, kind: 'paid' | 'verifying' | 'trial', sub: string | undefined, cx: number, cy: number) {
  const color = kind === 'paid' ? '#0f7a55' : kind === 'trial' ? '#5e2d8c' : '#b45309';
  const word = kind === 'paid' ? 'PAID' : kind === 'trial' ? 'FREE' : 'CHECKING';
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(-0.21); ctx.globalAlpha = 0.86;
  ctx.strokeStyle = color; ctx.fillStyle = color;
  ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, 61, 0, Math.PI * 2); ctx.stroke();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `800 ${word.length > 5 ? 22 : 34}px ${DISPLAY}`; ctx.fillText(word, 0, -4);
  if (sub) { ctx.font = `700 10px ${MONO}`; ctx.fillText(sub.toUpperCase(), 0, 24); }
  ctx.restore();
}

/** Save the picture: share sheet on phones that support it (iPhone/Android), plain download elsewhere. */
export async function saveReceipt(blob: Blob, name: string) {
  const file = new File([blob], name, { type: 'image/png' });
  const nav = navigator as any;
  if (/Android|iPhone|iPad/i.test(navigator.userAgent) && nav.canShare?.({ files: [file] })) {
    try { await nav.share({ files: [file], title: name }); return; } catch (e: any) { if (e?.name === 'AbortError') return; }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
