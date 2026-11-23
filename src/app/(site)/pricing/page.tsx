import Plans from '@/components/Plans';
import LeadForm from '@/components/LeadForm';

export const metadata = { title: 'Pricing', description: 'Starter, Growth and Ultra plans for your restaurant QR menu. Unlimited dishes and scans, free trial, pay monthly by UPI, no autopay.', alternates: { canonical: '/pricing' } };
export default function Pricing() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-center font-display text-5xl font-extrabold">Pricing</h1>
      <p className="mx-auto mb-12 mt-3 max-w-xl text-center text-muted">Prices and features below are read live from our platform, so they are always current. Coupons are applied on the payment page.</p>
      <Plans />
      <div className="mx-auto mt-16 max-w-xl"><LeadForm title="Questions? Talk to us" /></div>
    </main>
  );
}
