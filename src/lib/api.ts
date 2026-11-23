export const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001').replace(/\/$/, '');
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || '';

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  badge?: string;
  color: string;
  description?: string;
  bestFor?: string;
  features: Record<string, any>;
};

export type Catalog = {
  trialDays: number;
  trialEnabled: boolean;
  plans: Plan[];
  templates: { id: string; name: string; tier: string; blurb: string; primary: string; background: string; accent: string; dark: boolean }[];
  qrThemes: { id: string; name: string; tier: string }[];
  featureCatalog?: CatalogRow[];
  brandName?: string;
  support?: { phone?: string; email?: string };
};

export type CatalogRow = {
  key: string;
  label: string;
  group: string;
  type: 'bool' | 'number' | 'count' | 'text';
  from?: string;
  values?: Record<string, string>;
};

export const DEFAULT_CATALOG: Catalog = {
  trialDays: 7,
  trialEnabled: true,
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Digital Menu & QR Code',
      price: 199,
      color: '#6B7280',
      description: 'Host your menu online with a permanent QR code. Unlimited dishes, perfect for kiosks, food trucks and chai stalls.',
      bestFor: 'Kiosks, food trucks & quick-service stalls',
      features: {
        templates: ['classic'],
        aiScansPerMonth: 5,
        ordering: false,
        inventory: false,
        voiceAssistant: false,
        crmSuite: false,
      },
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'Table Ordering & Live Kitchen Screen',
      price: 399,
      popular: true,
      badge: 'RECOMMENDED',
      color: '#C77D0A',
      description: 'Full table ordering, live KOT kitchen screen, audio alerts, dish badges, customer ratings and daily scan counts.',
      bestFor: 'Cafés, cloud kitchens & family restaurants',
      features: {
        templates: ['classic', 'modern', 'bistro', 'cafe'],
        aiScansPerMonth: 50,
        ordering: true,
        inventory: false,
        voiceAssistant: false,
        crmSuite: false,
      },
    },
    {
      id: 'ultra',
      name: 'Ultra',
      tagline: 'Live Inventory & Brand Control',
      price: 699,
      badge: 'INVENTORY 📦',
      color: '#8B5CF6',
      description: 'Everything in Growth + Live Inventory Management, ingredient auto-depletion, low-stock warnings, auto-PO generator, custom URL & 100 tables.',
      bestFor: 'Full-service restaurants, bars & busy kitchens',
      features: {
        templates: ['classic', 'modern', 'bistro', 'cafe', 'luxe', 'neon'],
        aiScansPerMonth: 999,
        ordering: true,
        inventory: true,
        voiceAssistant: false,
        crmSuite: false,
      },
    },
    {
      id: 'master',
      name: 'Master',
      tagline: 'Complete Automation, Voice & CRM',
      price: 1299,
      badge: 'FLAGSHIP 👑',
      color: '#EC4899',
      description: 'The ultimate flagship suite: Voice AI Announcements ("Bolna") in Hindi/English, Advanced CRM, Loyalty Points, WhatsApp Marketing & Staff PINs.',
      bestFor: 'Fine dine empires, high-volume dining & restaurant chains',
      features: {
        templates: ['classic', 'modern', 'bistro', 'cafe', 'luxe', 'neon', 'regal'],
        aiScansPerMonth: 9999,
        ordering: true,
        inventory: true,
        voiceAssistant: true,
        crmSuite: true,
        staffManagement: true,
        multiOutlet: true,
      },
    },
  ],
  templates: [
    { id: 'classic', name: 'Classic', tier: 'starter', blurb: 'Warm neutral tones', primary: '#22152E', background: '#FAF7F2', accent: '#C77D0A', dark: false },
    { id: 'modern', name: 'Modern', tier: 'growth', blurb: 'Crisp minimal design', primary: '#111827', background: '#F9FAFB', accent: '#2563EB', dark: false },
    { id: 'bistro', name: 'Bistro', tier: 'growth', blurb: 'Warm cafe elegance', primary: '#451A03', background: '#FFFBEB', accent: '#D97706', dark: false },
    { id: 'cafe', name: 'Cafe', tier: 'growth', blurb: 'Organic botanical vibe', primary: '#064E3B', background: '#F0FDF4', accent: '#059669', dark: false },
    { id: 'luxe', name: 'Luxe Gold', tier: 'ultra', blurb: 'Champagne black gold', primary: '#180D24', background: '#0F0916', accent: '#FFCF4A', dark: true },
    { id: 'neon', name: 'Neon Night', tier: 'ultra', blurb: 'Vibrant modern glow', primary: '#09090B', background: '#030712', accent: '#38BDF8', dark: true },
    { id: 'regal', name: 'Regal Rose', tier: 'master', blurb: 'Imperial velvet & gold', primary: '#4A044E', background: '#2E0854', accent: '#F472B6', dark: true },
  ],
  qrThemes: [
    { id: 'classic', name: 'Classic', tier: 'starter' },
    { id: 'sunset', name: 'Sunset', tier: 'growth' },
    { id: 'ocean', name: 'Ocean', tier: 'growth' },
    { id: 'gold', name: 'Luxury Gold', tier: 'ultra' },
  ],
};

export async function fetchCatalog(): Promise<Catalog> {
  try {
    const r = await fetch(`${API}/api/owner/plans`, { cache: 'no-store' });
    if (!r.ok) return DEFAULT_CATALOG;
    return await r.json();
  } catch {
    return DEFAULT_CATALOG;
  }
}

/** Human-readable feature bullets generated from the plan config. */
export function bullets(p: Plan, catalog: CatalogRow[] = []): { text: string; on: boolean }[] {
  const f = p.features;
  if (!catalog || !catalog.length) {
    const list: { text: string; on: boolean }[] = [
      { text: 'Unlimited dishes & categories', on: true },
      { text: `${(f.templates || []).length} designer menu templates`, on: true },
      { text: f.aiScansPerMonth >= 999 ? 'Unlimited menu photo scans' : `${f.aiScansPerMonth} menu photo scans / month`, on: true },
      { text: 'Table QR ordering & digital menu', on: !!f.ordering },
      { text: 'Live KOT kitchen screen & audio alerts', on: !!f.ordering },
    ];
    if (p.id === 'ultra' || p.id === 'master') {
      list.push({ text: 'Live Inventory & ingredient tracking', on: true });
      list.push({ text: 'Low-stock warnings & Auto-PO generator', on: true });
      list.push({ text: 'Remove "Powered by QR Menu Pro" branding', on: true });
    }
    if (p.id === 'master') {
      list.push({ text: 'Voice AI ("Bolna") Hindi/English announcements', on: true });
      list.push({ text: 'CRM Suite, Loyalty points & WhatsApp marketing', on: true });
      list.push({ text: 'Staff 4-digit PINs & role-based permissions', on: true });
      list.push({ text: 'Multi-branch chain management', on: true });
    }
    return list;
  }
  return catalog.map((r) => {
    const v = r.type === 'text' ? r.values?.[p.id] : f[r.from || r.key];
    if (r.type === 'bool') return { text: r.label, on: v === true };
    if (r.type === 'count') return { text: `${(v || []).length} ${r.label.toLowerCase()}`, on: (v || []).length > 0 };
    if (r.type === 'number') return { text: v >= 999 ? `Unlimited ${r.label.toLowerCase()}` : `${r.label}: ${v || 0}`, on: (v || 0) > 0 };
    return { text: `${r.label}: ${v ?? ''}`, on: true };
  });
}
