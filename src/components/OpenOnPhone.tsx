'use client';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

/** QR of the owner web app, so a laptop visitor can open it on their phone in one scan. */
export default function OpenOnPhone({ path = '/app/' }: { path?: string }) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    QRCode.toDataURL(new URL(path, window.location.origin).href, { margin: 1, width: 360, color: { dark: '#22152e', light: '#ffffff' } }).then(setSrc).catch(() => {});
  }, [path]);
  return (
    <div className="hidden items-center gap-4 rounded-3xl bg-white p-4 shadow-sm md:flex">
      {src ? <img src={src} alt="QR code to open the owner app on your phone" className="size-24 rounded-xl" /> : <div className="size-24 animate-pulse rounded-xl bg-surface2" />}
      <p className="max-w-[180px] text-sm font-semibold text-muted">On a laptop? Scan this with your phone camera to open the app there.</p>
    </div>
  );
}
