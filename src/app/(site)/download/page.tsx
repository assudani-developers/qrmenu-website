import Link from 'next/link';
import { PLAY_STORE_URL } from '@/lib/api';

export const metadata = { title: 'Get the app — QR Menu Pro' };
export default function Download() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-20 text-center">
      <h1 className="font-serif text-5xl font-bold">Get the owner app</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">Sign up in the app, photograph your menu and your QR is ready. Everything you change in the app updates your live menu instantly.</p>
      <div className="mt-10">
        {PLAY_STORE_URL
          ? <a href={PLAY_STORE_URL} className="gold-grad inline-block rounded-2xl px-9 py-4 font-extrabold text-[#1a1206]">Get it on Google Play</a>
          : <div className="card inline-block px-8 py-6"><b>Google Play listing coming soon.</b><p className="mt-1 text-sm text-muted">Want early access? <Link href="/contact" className="font-bold text-gold underline">Contact us</Link>.</p></div>}
      </div>
    </main>
  );
}
