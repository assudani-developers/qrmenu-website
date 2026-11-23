export type Variant = { id: string; name: string; price: number };
export type Addon = { id: string; name: string; price: number };
export type Dish = {
  id: string; name: string; category: string; price: number; offerPrice?: number | null; description?: string; ingredients?: string;
  allergens?: string[]; isVeg: boolean; isAvailable: boolean; imageUrl?: string; images?: string[]; tags?: string[]; variants?: Variant[];
  addons?: Addon[]; diet?: string[]; spiceLevel?: string; prepTime?: number | null; calories?: number | null;
};
export type Template = {
  id: string; name: string; primary: string; accent: string; background: string; surface: string; text: string; muted: string;
  font: 'serif' | 'sans' | 'rounded' | 'display' | 'elegant'; radius: number; layout: 'list' | 'grid' | 'cards'; header: 'hero' | 'centered' | 'band'; dark: boolean;
};
export type Social = { instagram?: string; facebook?: string; whatsapp?: string; website?: string; maps?: string };
export type Store = { open: boolean; prepMinutes: number; wifiName: string; wifiPassword: string };
export type MenuData = {
  restaurant: {
    id: string; slug: string; shortId: string; name: string; tagline: string; city?: string; phone?: string; cuisine?: string; address?: string;
    openingHours?: string; about?: string; fssai?: string; social?: Social; store?: Store; live: boolean; status: string; googleReviewUrl?: string;
    tables?: string[]; taxPercent?: number; template: Template; brand: { name: string; url: string };
    theme: { logoUrl?: string; coverUrl?: string; announcement?: string; welcome?: string; showVegToggle?: boolean; showSearch?: boolean };
  };
  categories: string[];
  sections?: { name: string; open: boolean; window: { from: string; to: string } | null }[];
  items: Dish[];
  features: { ordering?: boolean; removeBranding?: boolean; reviewInterceptor?: boolean; serviceCalls?: boolean; reservations?: boolean };
};
export type CartLine = { key: string; dish: Dish; variant?: Variant; addons: Addon[]; qty: number };

export const unitPrice = (d: Dish, v?: Variant, a: Addon[] = []) => (v ? v.price : d.offerPrice || d.price) + a.reduce((n, x) => n + x.price, 0);
export const photos = (d: Dish) => (d.images && d.images.length ? d.images : d.imageUrl ? [d.imageUrl] : []);
export const FONT: Record<string, string> = {
  serif: 'var(--font-fraunces), Georgia, serif',
  sans: 'var(--font-jakarta), system-ui, sans-serif',
  rounded: 'var(--font-nunito), system-ui, sans-serif',
  display: 'var(--font-bricolage), system-ui, sans-serif',
  elegant: 'var(--font-cormorant), Georgia, serif',
};
export const DIET: Record<string, string> = { jain: 'Jain', vegan: 'Vegan', glutenFree: 'Gluten-free', egg: 'Egg', nuts: 'Nuts', dairy: 'Milk', soy: 'Soy', sesame: 'Sesame' };
export const BADGE: Record<string, string> = { bestseller: 'Bestseller', chef: "Chef's special", new: 'New', spicy: 'Spicy' };

export function lum(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}
export const onColor = (hex: string) => (lum(hex) > 0.6 ? '#141414' : '#ffffff');
export const alpha = (hex: string, a: number) => hex + Math.round(a * 255).toString(16).padStart(2, '0');
export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
