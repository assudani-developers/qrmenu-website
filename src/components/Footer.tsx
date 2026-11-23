import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 font-display font-extrabold"><Logo size={30} />QR Menu Pro</div>
        <nav className="flex flex-wrap gap-5 text-sm font-semibold text-muted">
          <Link href="/designs">Designs</Link><Link href="/pricing">Pricing</Link><Link href="/download">Get the app</Link><Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund">Refunds</Link>
        </nav>
        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold text-ink">Powered by <span className="font-bold text-gold">Assudani Developers</span> &amp; <span className="font-bold text-gold">Bishnoi Digitals</span></p>
          <p className="mt-0.5 text-[11px] text-muted">© {new Date().getFullYear()} QR Menu Pro</p>
        </div>
      </div>
    </footer>
  );
}
