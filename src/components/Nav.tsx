import Link from 'next/link';
import Logo from './Logo';

const links = [['/', 'Home'], ['/pricing', 'Pricing'], ['/download', 'Get the app'], ['/contact', 'Contact']];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3 font-extrabold"><Logo />QR Menu Pro</Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map(([h, l]) => <Link key={h} href={h} className="rounded-xl px-4 py-2 text-sm font-bold text-muted transition-colors hover:bg-black/5 hover:text-ink">{l}</Link>)}
        </nav>
        <Link href="/download" className="gold-grad rounded-2xl px-5 py-2.5 text-sm font-extrabold text-[#1a1206] shadow-[0_8px_22px_rgba(229,154,47,.35)]">Start free</Link>
      </div>
    </header>
  );
}
