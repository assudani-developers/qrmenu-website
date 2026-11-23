export const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001').replace(/\/$/, '');
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || '';
export const APP_URL = (process.env.NEXT_PUBLIC_MENU_URL || 'http://localhost:3000').replace(/\/$/, '');

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  color: string;
  description?: string;
  bestFor?: string;
  features: Record<string, any>;
};

export type Catalog = {
  trialDays: number;
  trialEnabled: boolean;
  plans: Plan[];
  templates: { id: string; name: string }[];
  featureCatalog?: CatalogRow[];
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
      tagline: 'Digital Menu & Permanent QR Code',
      price: 199,
      color: '#6B7280',
      description: 'Host your menu online with an instant QR code. Unlimited dishes, perfect for kiosks, food trucks and chai stalls.',
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
      tagline: 'Table Ordering & Live Kitchen Display',
      price: 399,
      popular: true,
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
      tagline: 'Full Inventory, Brand & 100 Tables',
      price: 699,
      color: '#8B5CF6',
      description: 'Everything in Growth + Live Inventory Management, low-stock warnings, auto-PO generator, custom web slug, remove branding & 100 tables.',
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
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'bistro', name: 'Bistro' },
    { id: 'cafe', name: 'Cafe' },
    { id: 'luxe', name: 'Luxe' },
    { id: 'neon', name: 'Neon' },
    { id: 'regal', name: 'Regal' },
  ],
};

export async function fetchCatalog(): Promise<Catalog> {
  const r = await fetch(`${API}/api/owner/plans`, { cache: 'no-store' });
  if (!r.ok) throw new Error('Could not load plans');
  return r.json();
}

/** Human-readable feature bullets generated from the live plan config (so site, app and admin never disagree). */
export function bullets(p: Plan, catalog: CatalogRow[] = []): { text: string; on: boolean }[] {
  const f = p.features;
  if (!catalog.length) {
    const list: { text: string; on: boolean }[] = [
      { text: 'Unlimited dishes & categories', on: true },
      { text: `${(f.templates || []).length} designer menu templates`, on: true },
      { text: f.aiScansPerMonth >= 999 ? 'Unlimited menu photo scans' : `${f.aiScansPerMonth} menu photo scans / month`, on: true },
      { text: 'Table QR ordering & digital menu', on: !!f.ordering },
      { text: 'Live KOT kitchen screen & audio alerts', on: !!f.ordering },
    ];
    if (p.id === 'ultra' || p.id === 'master') {
      list.push({ text: 'Live Inventory & ingredient tracking', on: true });
      list.push({ text: 'Low-stock alerts & Auto-PO generator', on: true });
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
    if (r.type === 'number') return { text: `${r.label}: ${v >= 999 ? 'unlimited' : v || 0}`, on: (v || 0) > 0 };
    return { text: `${r.label}: ${v ?? ''}`, on: true };
  });
}
