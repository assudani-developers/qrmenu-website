import Link from 'next/link';
import Logo from './Logo';

const links = [['/', 'Home'], ['/designs', 'Designs'], ['/pricing', 'Pricing'], ['/download', 'Get the app'], ['/contact', 'Contact']];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#eef0eb]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold"><Logo size={34} />QR Menu Pro</Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map(([h, l]) => <Link key={h} href={h} className="rounded-xl px-4 py-2 text-sm font-bold text-muted transition-colors hover:bg-white hover:text-ink">{l}</Link>)}
        </nav>
        <Link href="/download" className="rounded-2xl bg-ink px-5 py-2.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">Start free</Link>
      </div>
    </header>
  );
}
