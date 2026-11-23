import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomDock from "@/components/BottomDock";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ASSUDANI QR — Modern Digital Dining Operating System",
  description: "Ultra-fast sub-second QR menus, zero-fee direct UPI payments, live kitchen KOT ordering, and Google review interceptor for restaurants, cafes, and lounges across India.",
  keywords: [
    "QR Menu",
    "Digital Restaurant Menu",
    "Contactless Dining",
    "UPI Restaurant Payment",
    "Kitchen Order Ticket",
    "KOT System",
    "Restaurant SaaS India",
    "com.qr.assudani"
  ],
  authors: [
    { name: "Piyush Assudani", url: "https://github.com" },
    { name: "Assudani Developers" },
  ],
  creator: "Piyush Assudani",
  publisher: "Assudani Developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                try {
                  var origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, val) {
                    if (
                      typeof name === 'string' &&
                      (name === 'bis_skin_checked' ||
                       name === 'bis_register' ||
                       name.indexOf('bis_') === 0 ||
                       name.indexOf('__processed_') === 0)
                    ) {
                      return;
                    }
                    return origSetAttr.apply(this, arguments);
                  };
                  if (document.documentElement) {
                    for (var i = document.documentElement.attributes.length - 1; i >= 0; i--) {
                      var a = document.documentElement.attributes[i];
                      if (a && (a.name === 'bis_skin_checked' || a.name === 'bis_register' || a.name.indexOf('bis_') === 0 || a.name.indexOf('__processed_') === 0)) {
                        document.documentElement.removeAttribute(a.name);
                      }
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Host+Grotesk:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Assudani QR Operating System",
              operatingSystem: "Web, Android, iOS",
              applicationCategory: "BusinessApplication",
              description: "Modern digital dining operating system with 0% commission direct UPI payments and real-time kitchen KOT ordering.",
              offers: [
                {
                  "@type": "Offer",
                  name: "7-Day Free Trial",
                  price: "0.00",
                  priceCurrency: "INR",
                },
                {
                  "@type": "Offer",
                  name: "Starter Plan",
                  price: "199.00",
                  priceCurrency: "INR",
                },
                {
                  "@type": "Offer",
                  name: "Growth Plan",
                  price: "399.00",
                  priceCurrency: "INR",
                },
              ],
              author: {
                "@type": "Person",
                name: "Piyush Assudani",
                jobTitle: "Founder & System Architect",
              },
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#1f0f14] text-[#fbf9fa] antialiased selection:bg-[#efd08a] selection:text-[#040404]"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 w-full pb-16">
          {children}
        </main>
        <BottomDock />
        <Footer />
      </body>
    </html>
  );
}
