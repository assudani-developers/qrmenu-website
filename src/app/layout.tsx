import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#faf7f2' };
export const metadata: Metadata = {
  title: 'QR Menu Pro — digital menus for restaurants',
  description: 'Photograph your paper menu and go live in a minute: a beautiful digital menu, a permanent QR code, table ordering and a live kitchen screen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning><Nav />{children}<Footer /></body>
    </html>
  );
}
