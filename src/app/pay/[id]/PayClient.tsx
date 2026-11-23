'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QRCode from 'qrcode';
import { Check, Copy, Crown, ShieldCheck, Smartphone, TicketPercent, X, Clock3, PartyPopper, AlertTriangle, Image as ImageIcon, UploadCloud, Download, Printer } from 'lucide-react';
import { API } from '@/lib/api';
import Parchi, { ParchiLine, SealKind } from '@/components/pay/Parchi';
import { receiptPng, saveReceipt } from '@/lib/receiptImage';

type PlanLite = { id: string; name: string; price: number; tagline: string; popular: boolean; badge: string };
type View = {
  id: string; plan: string; expiresAt: string; brandName: string; trialDays: number;
  restaurant: { name: string; ownerName: string; phone: string; shortId: string; city: string };
  subscription: { status: string; plan: string; planName: string; daysLeft: number; endsAt: string | null; trialEndsAt: string | null };
  plans: PlanLite[]; payee: { upiId: string; name: string };
  payment: null | { id: string; status: 'pending' | 'verified' | 'rejected'; amount: number; listPrice: number; coupon: string | null; discount: number; planId: string; utrRef: string; screenshotUrl?: string | null; date: string; verifiedAt: string | null; paidUntil: string | null; credit?: number; creditPlan?: string | null; autoApproved?: boolean };
};
type Quote = { original: number; discount: number; final: number; coupon?: { code: string; type: string; value: number; description?: string }; extraTrialDays: number; credit?: number; creditPlan?: string; creditDays?: number };

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const day = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const ease = [0.2, 0.8, 0.2, 1] as const;

async function post(path: string, body: unknown) {
  const r = await fetch(`${API}/api${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.success === false) throw new Error(j.message || 'Something went wrong');
  return j;
}

export default function PayClient({ id }: { id: string }) {
  const [v, setV] = useState<View | null>(null);
  const [err, setErr] = useState('');
  const [plan, setPlan] = useState('');
  const [code, setCode] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [cErr, setCErr] = useState('');
  const [busy, setBusy] = useState('');
  const [utr, setUtr] = useState('');
  const [uErr, setUErr] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploadingSs, setUploadingSs] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [qr, setQr] = useState('');
  const [mobile, setMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const prevStatus = useRef<string | null>(null);

  const load = async (first = false) => {
    try {
      const r = await fetch(`${API}/api/pay/${id}`, { cache: 'no-store' });
      const j = await r.json();
      if (!r.ok) throw new Error(j.message || 'This payment link has expired');
      setV(j);
      if (first) setPlan(j.payment?.planId || j.plan);
      const st = j.payment?.status || null;
      if (prevStatus.current === 'pending' && st === 'verified') setCelebrate(true);
      prevStatus.current = st;
    } catch (e: any) { if (first) setErr(e.message); }
  };
  useEffect(() => { load(true); setMobile(/Android|iPhone|iPad/i.test(navigator.userAgent)); }, [id]);
  // while a payment waits for verification, check every few seconds so the seal lands the moment it is approved
  useEffect(() => {
    if (v?.payment?.status !== 'pending') return;
    const t = setInterval(() => load(), 4000);
    return () => clearInterval(t);
  }, [v?.payment?.status]);

  const p = v?.plans.find((x) => x.id === plan);
  const price = quote && !quote.extraTrialDays ? quote : p ? { original: p.price, discount: 0, final: p.price } : null;
  const upi = v && price ? `upi://pay?pa=${encodeURIComponent(v.payee.upiId)}&pn=${encodeURIComponent(v.payee.name)}&am=${price.final.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`${v.restaurant.shortId} ${plan} plan`)}` : '';
  useEffect(() => { if (upi) QRCode.toDataURL(upi, { margin: 1, width: 520, color: { dark: '#22152e', light: '#ffffff' } }).then(setQr).catch(() => setQr('')); }, [upi]);
  // every plan change asks the server for the real price: upgrades get a credit for unused days of the current plan
  useEffect(() => {
    setCErr('');
    if (!plan) return;
    post(`/pay/${id}/quote`, { plan, coupon: quote?.coupon?.code }).then(setQuote).catch(() => setQuote(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);
  const [ack, setAck] = useState(false); // fraud notice accepted this visit

  async function apply() {
    if (!code.trim()) return;
    setBusy('coupon'); setCErr('');
    try { setQuote(await post(`/pay/${id}/quote`, { plan, coupon: code.trim() })); } catch (e: any) { setQuote(null); setCErr(e.message); }
    setBusy('');
  }
  async function trialBonus() {
    setBusy('trial');
    try { const j = await post(`/pay/${id}/trial-coupon`, { plan, coupon: code.trim() }); setV(j); setQuote(null); setCode(''); setCelebrate(true); } catch (e: any) { setCErr(e.message); }
    setBusy('');
  }
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setUErr('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }
    setScreenshot(f);
    setPreview(URL.createObjectURL(f));
    setUErr('');
  };

  async function submit() {
    setUErr('');
    const ref = utr.replace(/\s/g, '');
    if (ref && !/^[A-Za-z0-9]{10,24}$/.test(ref)) return setUErr('That reference looks wrong (usually 12 digits). You can also leave it empty.');
    if (!ack) return setAck(false);
    setBusy('submit');
    try {
      let ssUrl = '';
      if (screenshot) {
        setUploadingSs(true);
        const fd = new FormData();
        fd.append('screenshot', screenshot);
        const upRes = await fetch(`${API}/api/pay/upload-screenshot`, {
          method: 'POST',
          body: fd,
        });
        const upJson = await upRes.json().catch(() => ({}));
        if (upRes.ok && upJson.url) {
          ssUrl = upJson.url;
        }
        setUploadingSs(false);
      }
      const j = await post(`/pay/${id}/submit`, {
        plan,
        coupon: quote?.coupon ? quote.coupon.code : undefined,
        utr: ref || undefined,
        screenshotUrl: ssUrl || undefined,
        fraudAck: true,
      });
      setV(j);
      if (j.autoApproved) setCelebrate(true);
      prevStatus.current = j.autoApproved ? 'verified' : 'pending';
    } catch (e: any) {
      setUErr(e.message);
    } finally {
      setBusy('');
      setUploadingSs(false);
    }
  }

  const [saving, setSaving] = useState(false);
  /** The bill as a PNG picture — same parchi as on screen, with plan, coupon, UPI details and stamp. */
  const downloadSlip = async () => {
    if (!v || !receipt || saving) return;
    setSaving(true);
    try {
      const pay = v.payment;
      const code = pay?.id || `BILL-${v.id.slice(0, 8).toUpperCase()}`;
      const details = [
        { label: pay?.status === 'verified' ? 'Paid by UPI to' : 'UPI ID', value: v.payee.upiId || '' },
        ...(v.payee.name ? [{ label: 'Payee', value: v.payee.name }] : []),
        ...(pay?.utrRef || utr.trim() ? [{ label: 'UPI ref (UTR)', value: pay?.utrRef || utr.trim() }] : []),
        ...(pay?.paidUntil ? [{ label: 'Valid till', value: day(pay.paidUntil) }] : []),
      ].filter((r) => r.value);
      const blob = await receiptPng({
        brand: v.brandName, title: 'Subscription bill', meta: receipt.meta, lines: receipt.lines.filter((l) => !l.label.startsWith('UPI ref')),
        details, total: receipt.total, totalLabel: receipt.totalLabel, note: receipt.note,
        footer: 'No card · No autopay · Thank you', seal: receipt.seal, sealText: receipt.sealText, code,
      });
      await saveReceipt(blob, `${v.brandName.replace(/\W+/g, '-')}-bill-${code}.png`);
    } finally { setSaving(false); }
  };

  const receipt = useMemo(() => {
    if (!v || !p) return null;
    const pay = v.payment;
    const shown = pay ? v.plans.find((x) => x.id === pay.planId) || p : p;
    const trial = v.subscription.status === 'trial' && !pay;
    const lines: ParchiLine[] = [];
    if (trial) lines.push({ label: `Free trial (${v.trialDays} days)`, value: '₹0', tone: 'good' });
    lines.push({ label: `${shown.name} plan · 30 days`, value: inr(pay ? pay.listPrice : shown.price) });
    const disc = pay ? pay.discount : price?.discount || 0;
    const cc = pay ? pay.coupon : quote?.coupon?.code;
    if (disc > 0) lines.push({ label: `Coupon ${cc}`, value: `− ${inr(disc)}`, tone: 'good' });
    const credit = pay ? pay.credit || 0 : price && 'credit' in price ? (price as Quote).credit || 0 : 0;
    if (credit > 0) lines.push({ label: `Unused ${pay ? pay.creditPlan : (price as Quote).creditPlan} days`, value: `− ${inr(credit)}`, tone: 'good' });
    if (pay?.utrRef) lines.push({ label: `UPI ref ${pay.utrRef}`, value: '', tone: 'muted' });
    const seal: SealKind = pay?.status === 'verified' ? 'paid' : pay?.status === 'pending' ? 'verifying' : trial ? 'trial' : null;
    const note = pay?.status === 'verified' ? `${shown.name} is active till ${day(pay.paidUntil)}.`
      : pay?.status === 'pending' ? 'We are checking your payment. This page updates by itself.'
        : trial ? `Trial ends ${day(v.subscription.trialEndsAt)}. Then ${inr(price?.final || shown.price)} a month, only if you pay. No autopay.`
          : undefined;
    return {
      lines, seal, note,
      total: inr(pay ? pay.amount : price?.final || 0),
      totalLabel: pay?.status === 'verified' ? 'Paid' : 'To pay',
      sealText: pay?.status === 'verified' ? day(pay.verifiedAt) : trial ? `${v.subscription.daysLeft} DAYS LEFT` : undefined,
      meta: [v.restaurant.name, `${v.restaurant.ownerName} · ${v.restaurant.phone}`, `${day(new Date().toISOString())} · Bill ${v.id.slice(0, 8).toUpperCase()}`],
    };
  }, [v, p, price, quote]);

  if (err) return <Shell><Notice icon={AlertTriangle} title="Link expired" body={`${err} Open the app and tap Renew to get a fresh link.`} /></Shell>;
  if (!v || !p || !receipt) return <Shell><div className="mx-auto mt-24 size-10 animate-spin rounded-full border-4 border-white/20 border-t-[#f5b50a]" /></Shell>;

  const pay = v.payment;
  const done = pay?.status === 'verified';
  const waiting = pay?.status === 'pending';

  return (
    <Shell brand={v.brandName}>
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 pb-20 pt-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-12">
        <div className="lg:sticky lg:top-10">
          <div className="print-area">
            <Parchi brand={v.brandName} title="Subscription bill" meta={receipt.meta} lines={receipt.lines} total={receipt.total} totalLabel={receipt.totalLabel}
              note={receipt.note} seal={receipt.seal} sealText={receipt.sealText} footer="No card · No autopay · Thank you for choosing us" printKey={id} />
          </div>
          <div className="no-print mt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={downloadSlip}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[.08] px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-white/[.15]"
              title="Save the bill as a picture"
            >
              <Download size={14} className="text-[#f5b50a]" />
              <span>{saving ? 'Saving…' : 'Save bill as image'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[.08] px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-white/[.15]"
              title="Print or save as PDF"
            >
              <Printer size={14} className="text-[#f5b50a]" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        <div className="text-white">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                <PartyPopper className="text-[#ffcf4a]" size={40} />
                <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02]">Payment received.</h1>
                <p className="mt-4 max-w-md text-lg text-white/70">Your {v.plans.find((x) => x.id === pay!.planId)?.name} plan is active till {day(pay!.paidUntil)}. Go back to the app: everything is already unlocked.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={downloadSlip}
                    className="flex items-center gap-2 rounded-2xl border border-[#f5b50a] bg-[#f5b50a]/15 px-6 py-3.5 text-sm font-extrabold text-[#f5b50a] hover:bg-[#f5b50a]/25"
                  >
                    <Download size={16} />
                    <span>{saving ? 'Saving…' : 'Download receipt (image)'}</span>
                  </button>
                  <a href="/app/" className="haldi flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-extrabold"><Smartphone size={16} />Open the app</a>
                </div>
              </motion.div>
            ) : waiting ? (
              <motion.div key="wait" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                <Clock3 className="text-[#ffcf4a]" size={40} />
                <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02]">Checking your payment</h1>
                <p className="mt-4 max-w-md text-lg text-white/70">We are matching UPI reference <b className="text-white">{pay!.utrRef}</b> with our bank. This usually takes under an hour. You can close this page: the app will tell you the moment it is done.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={downloadSlip}
                    className="flex items-center gap-2 rounded-2xl border border-[#f5b50a] bg-[#f5b50a]/15 px-6 py-3.5 text-sm font-extrabold text-[#f5b50a] hover:bg-[#f5b50a]/25"
                  >
                    <Download size={16} />
                    <span>{saving ? 'Saving…' : 'Download slip (image)'}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-white/15"
                  >
                    <Printer size={16} />
                    <span>Print Slip</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-display text-[44px] font-extrabold leading-[1.02] sm:text-5xl">{v.subscription.status === 'active' ? 'Renew your plan' : 'Continue after your trial'}</h1>
                <p className="mt-3 text-white/65">{v.restaurant.name} · pay once for 30 days. No card, no autopay.</p>

                <Step n={1} title="Pick your plan">
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {v.plans.map((x) => {
                      const on = plan === x.id;
                      return (
                        <button key={x.id} onClick={() => setPlan(x.id)} aria-pressed={on}
                          className={`relative rounded-2xl border p-4 text-left transition-all ${on ? 'border-[#f5b50a] bg-[#f5b50a]/10 shadow-[0_0_0_3px_rgba(245,181,10,.25)]' : 'border-white/12 bg-white/[.04] hover:bg-white/[.07]'}`}>
                          {x.popular && <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-[#f5b50a] px-2 py-0.5 text-[10px] font-extrabold text-[#22152e]"><Crown size={10} />{x.badge || 'Best value'}</span>}
                          <div className="font-extrabold">{x.name}</div>
                          <div className="mt-1 font-display text-2xl font-extrabold">{inr(x.price)}<span className="text-xs font-semibold text-white/50"> /mo</span></div>
                          <div className="mt-1 line-clamp-2 text-xs text-white/55">{x.tagline}</div>
                        </button>
                      );
                    })}
                  </div>
                </Step>

                <Step n={2} title="Have a coupon?">
                  <div className="flex gap-2">
                    <label className="flex flex-1 items-center gap-2 rounded-2xl border border-white/12 bg-white/[.05] px-4">
                      <TicketPercent size={18} className="text-white/50" />
                      <input value={code} onChange={(e) => { setCode(e.target.value.toUpperCase()); setCErr(''); }} onKeyDown={(e) => e.key === 'Enter' && apply()} placeholder="Coupon code" aria-label="Coupon code" className="h-12 w-full bg-transparent font-bold uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-white/35" />
                      {quote?.coupon && <button aria-label="Remove coupon" onClick={() => { setCode(''); post(`/pay/${id}/quote`, { plan }).then(setQuote).catch(() => setQuote(null)); }}><X size={17} /></button>}
                    </label>
                    <button onClick={apply} disabled={!code.trim() || busy === 'coupon'} className="rounded-2xl bg-white px-5 font-extrabold text-[#22152e] disabled:opacity-40">{busy === 'coupon' ? '…' : 'Apply'}</button>
                  </div>
                  <AnimatePresence>
                    {cErr && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-2 text-sm font-bold text-[#ff8a7a]">{cErr}</motion.p>}
                    {quote && !quote.extraTrialDays && quote.discount > 0 && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1.5 text-sm font-bold text-[#6ee7b7]"><Check size={16} />{quote.coupon?.code} saves you {inr(quote.discount)}</motion.p>}
                    {quote && quote.extraTrialDays > 0 && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-[#5e2d8c]/40 p-3.5">
                        <span className="text-sm font-bold">This coupon adds {quote.extraTrialDays} free days. No payment needed.</span>
                        <button onClick={trialBonus} disabled={busy === 'trial'} className="shrink-0 rounded-xl bg-[#ffcf4a] px-4 py-2 text-sm font-extrabold text-[#22152e]">{busy === 'trial' ? '…' : 'Add days'}</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Step>

                <Step n={3} title={`Pay ${inr(price?.final || 0)} with any UPI app`}>
                  {!v.payee.upiId ? (
                    <p className="rounded-2xl bg-white/[.06] p-4 text-sm text-white/70">Online payment is not set up yet. Please contact support.</p>
                  ) : (
                    <div className="grid items-center gap-5 sm:grid-cols-[190px_1fr]">
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-[190px] overflow-hidden rounded-2xl bg-white p-2.5 shadow-2xl ring-1 ring-white/20">
                          <img
                            src="/images/payment_qr.png"
                            alt={`UPI QR for ${v.payee.name}`}
                            className="w-full h-auto rounded-xl object-contain"
                          />
                          <div className="mt-1.5 border-t border-slate-100 pt-1 text-center">
                            <div className="text-[11px] font-black uppercase tracking-wider text-slate-900">{v.payee.name}</div>
                            <div className="text-[10px] font-semibold text-slate-500">{v.payee.upiId}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {mobile && (
                          <a href={upi} className="haldi flex items-center justify-center gap-2 rounded-2xl py-4 text-lg font-extrabold shadow-[0_14px_30px_-10px_rgba(245,181,10,.7)]">
                            <Smartphone size={20} />Open UPI app · {inr(price?.final || 0)}
                          </a>
                        )}
                        <p className="text-sm text-white/65">
                          Scan this official QR with Google Pay, PhonePe, Paytm, BHIM, or your bank app. The payee name is <b className="text-white">{v.payee.name}</b>.
                        </p>
                        <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/12 bg-white/[.05] px-4 py-3">
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-white/45">Or pay to UPI ID</div>
                            <div className="truncate font-bold">{v.payee.upiId}</div>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(v.payee.upiId);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1600);
                            }}
                            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/15"
                          >
                            {copied ? <Check size={15} /> : <Copy size={15} />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Step>

                <Step n={4} title="Add the payment screenshot">
                  <p className="-mt-1 mb-3 text-sm text-white/55">
                    Attach the payment screenshot: when it clearly shows our name, the amount and today’s date, your plan switches on instantly. The UPI reference is optional.
                  </p>
                  <input
                    value={utr}
                    onChange={(e) => { setUtr(e.target.value); setUErr(''); }}
                    inputMode="numeric"
                    placeholder="UPI reference (optional)"
                    aria-label="UPI reference number"
                    className="h-14 w-full rounded-2xl border border-white/12 bg-white/[.05] px-4 text-lg font-bold tracking-widest placeholder:font-medium placeholder:tracking-normal placeholder:text-white/30"
                  />
                  {uErr && <p role="alert" className="mt-2 text-sm font-bold text-[#ff8a7a]">{uErr}</p>}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFile}
                    accept="image/*"
                    className="hidden"
                  />

                  {!preview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#f5b50a]/40 bg-[#f5b50a]/10 py-3.5 px-4 text-sm font-bold text-white transition-all hover:border-[#f5b50a] hover:bg-[#f5b50a]/20"
                    >
                      <UploadCloud size={18} className="text-[#f5b50a]" />
                      <span>Attach payment screenshot · approves instantly</span>
                    </button>
                  ) : (
                    <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-2.5 pr-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={preview} alt="Screenshot proof preview" className="size-12 shrink-0 rounded-xl object-cover ring-2 ring-emerald-400" />
                        <div className="min-w-0 text-left">
                          <div className="truncate text-xs font-bold text-white">{screenshot?.name || 'Screenshot'}</div>
                          <div className="text-[11px] font-bold text-emerald-400">✓ Proof attached · Ready to submit with UTR</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setScreenshot(null); setPreview(''); }}
                        className="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white"
                        title="Remove screenshot"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3">
                    <div className="text-xs text-white/70">
                      <span className="font-bold text-white">Need a payment slip?</span> Download your slip with your UTR.
                    </div>
                    <button
                      type="button"
                      onClick={downloadSlip}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#f5b50a]/40 bg-[#f5b50a]/15 px-3 py-2 text-xs font-bold text-[#f5b50a] hover:bg-[#f5b50a]/25"
                    >
                      <Download size={13} />
                      <span>{saving ? 'Saving…' : 'Save as image'}</span>
                    </button>
                  </div>

                  <button
                    onClick={submit}
                    disabled={busy === 'submit' || !v.payee.upiId}
                    className="haldi mt-4 w-full rounded-2xl py-4 text-lg font-extrabold transition-transform active:scale-[.98] disabled:opacity-50"
                  >
                    {busy === 'submit'
                      ? (uploadingSs ? 'Uploading screenshot…' : screenshot ? 'Checking your screenshot…' : 'Submitting payment…')
                      : `I have paid ${inr(price?.final || 0)}`}
                  </button>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/45">
                    <ShieldCheck size={14} />We never ask for your UPI PIN, card or bank login.
                  </p>
                </Step>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {celebrate && <Confetti onDone={() => setCelebrate(false)} />}
      <AnimatePresence>
        {!ack && !done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-end bg-black/60 p-4 backdrop-blur-sm sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="fraud-title">
            <motion.div initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40 }} transition={{ duration: 0.4, ease }} className="w-full max-w-md rounded-[28px] bg-white p-6 text-[#22152e] shadow-2xl">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#fde8e6] text-[#d12e1f]"><AlertTriangle size={24} /></div>
              <h2 id="fraud-title" className="mt-4 font-display text-2xl font-extrabold">Before you pay</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#55505d]">Payments are checked automatically. <b className="text-[#22152e]">Any fraud, such as an edited or someone else’s screenshot, will suspend your service immediately</b> and the menu goes offline.</p>
              <button onClick={() => setAck(true)} className="haldi mt-6 w-full rounded-2xl py-4 text-base font-extrabold">I understand, continue</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

function Shell({ children, brand = 'QR Menu Pro' }: { children: React.ReactNode; brand?: string }) {
  return (
    <div className="relative min-h-dvh overflow-hidden" style={{ background: 'radial-gradient(80% 60% at 80% 0%, #4a2b66 0%, transparent 60%), radial-gradient(60% 50% at 0% 100%, #3a2410 0%, transparent 60%), #180d24' }}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-white">
        <div className="flex items-center gap-2.5 font-display text-lg font-extrabold"><span className="haldi grid size-9 place-items-center rounded-xl text-base font-black">Q</span>{brand}</div>
        <div className="flex items-center gap-3"><span className="hidden items-center gap-1.5 text-xs font-bold text-white/55 sm:flex"><ShieldCheck size={15} />Secure checkout</span><a href="/app/" className="rounded-xl bg-white/10 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-white/15">Back to the app</a></div>
      </header>
      {children}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.15 + n * 0.08 }} className="mt-8">
      <h2 className="mb-3 flex items-center gap-3 text-lg font-extrabold"><span className="grid size-7 place-items-center rounded-full bg-white/10 text-sm">{n}</span>{title}</h2>
      {children}
    </motion.section>
  );
}

function Notice({ icon: I, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="mx-auto mt-24 max-w-md px-6 text-center text-white">
      <I className="mx-auto text-[#ffcf4a]" size={44} />
      <h1 className="mt-5 font-display text-4xl font-extrabold">{title}</h1>
      <p className="mt-3 text-white/65">{body}</p>
    </div>
  );
}

function Confetti({ onDone }: { onDone: () => void }) {
  const bits = useMemo(() => Array.from({ length: 90 }, (_, i) => ({ x: (Math.random() - 0.5) * 900, y: -(300 + Math.random() * 500), r: Math.random() * 720, c: ['#f5b50a', '#ffcf4a', '#5e2d8c', '#0f7a55', '#ffffff', '#f97366'][i % 6], s: 6 + Math.random() * 7, d: Math.random() * 0.25 })), []);
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {bits.map((b, i) => (
        <motion.span key={i} className="absolute bottom-0 left-1/2 block rounded-[2px]" style={{ width: b.s, height: b.s * 0.5, background: b.c }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }} animate={{ x: b.x, y: [0, b.y, b.y + 900], rotate: b.r, opacity: [1, 1, 0] }} transition={{ duration: 2.4, delay: b.d, times: [0, 0.4, 1], ease: 'easeOut' }} />
      ))}
    </div>
  );
}
