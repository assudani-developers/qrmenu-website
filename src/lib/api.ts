export const API = (process.env.NEXT_PUBLIC_API_URL || 'https://qrmenu.piyushassudani.in').replace(/\/$/, '');
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

/** Plans, designs and feature list straight from the database. Rendered on the server and refreshed every minute. */
export async function fetchCatalog(): Promise<Catalog | null> {
  try {
    const r = await fetch(`${API}/api/owner/plans`, { next: { revalidate: 60 } });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.plans?.length ? j : null;
  } catch {
    return null;
  }
}

/** Human-readable feature bullets generated from the plan config. */
export function bullets(p: Plan, catalog: CatalogRow[] = []): { text: string; on: boolean }[] {
  const f = p.features;
  const lc = (t: string) => t.replace(/^[A-Z](?![A-Z])/, (c) => c.toLowerCase()); // keep 'QR', lower 'Menu'
  return catalog.map((r) => {
    const v = r.type === 'text' ? r.values?.[p.id] : f[r.from || r.key];
    if (r.type === 'bool') return { text: r.label, on: v === true };
    if (r.type === 'count') return { text: `${(v || []).length} ${lc(r.label)}`, on: (v || []).length > 0 };
    if (r.type === 'number') return { text: v >= 999 ? `Unlimited ${lc(r.label)}` : `${r.label}: ${v || 0}`, on: (v || 0) > 0 };
    return { text: `${r.label}: ${v ?? ''}`, on: true };
  });
}
