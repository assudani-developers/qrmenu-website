# QR Menu Pro - Official Marketing Website

High-conversion, ultra-lightweight marketing website for QR Menu Pro.

## Vercel Free (Hobby) Plan Optimizations
- **100% Static Generation (SSG)**: All routes prerender as static HTML at build time, served directly from Vercel's global Edge CDN with 0 serverless function executions.
- **Zero Image Compute Quota Usage**: Images configured with `unoptimized: true` to prevent consuming Vercel's 1,000 Edge Image Optimizations/month quota.
- **Embedded Static Fallbacks**: Plans, pricing cards, and features render instantly (0ms) without waiting for backend cold starts.
- **Next.js Font Self-Hosting**: Google Fonts (`Plus Jakarta Sans` & `Playfair Display`) are bundled and cached automatically at build time.
- **Compliance**: DPDP Act 2023 legal notices, privacy policy, refund terms, and contact forms.

## Running Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Production build
npm run build
```

## Deployment on Vercel
Simply import this repository on Vercel:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave default)
- **Build Command**: `next build --webpack` (or `npm run build`)
- **Environment Variables** (Optional):
  - `NEXT_PUBLIC_API_URL`: Backend URL (e.g. `https://api.qrmenu.pro`)
  - `NEXT_PUBLIC_PLAY_STORE_URL`: Google Play Store listing URL

---
*Designed & Developed by Piyush Assudani · Founder, Assudani Developers*
