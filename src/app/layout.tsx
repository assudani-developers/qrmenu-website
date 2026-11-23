import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Fraunces, Nunito, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';

// One family per menu-design "font" token (serif, sans, rounded, display, elegant) + the brand pair.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-cormorant', display: 'swap' });

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#22152E' };
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'QR Menu Pro: digital QR menu, table ordering & kitchen screen for restaurants', template: '%s · QR Menu Pro' },
  description: 'Photograph your paper menu and go live in a minute. Beautiful QR menus in 10 ready-made designs, table ordering, waiter calls and a live kitchen screen for Indian restaurants, cafés and dhabas. Free trial, pay by UPI.',
  applicationName: 'QR Menu Pro',
  keywords: ['QR menu', 'digital menu', 'QR code menu for restaurant', 'restaurant QR ordering', 'contactless menu India', 'table ordering app', 'KOT kitchen screen', 'menu card QR', 'cafe QR menu', 'restaurant menu app'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'QR Menu Pro', locale: 'en_IN', url: SITE, title: 'QR Menu Pro: your menu on every table, in a minute', description: 'Snap your paper menu, pick a design, print one QR. Table ordering and a live kitchen screen included.' },
  twitter: { card: 'summary_large_image', title: 'QR Menu Pro', description: 'Digital QR menus, table ordering and a live kitchen screen for restaurants.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false },
  category: 'business',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bricolage.variable} ${fraunces.variable} ${nunito.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
