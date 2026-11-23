import LeadForm from '@/components/LeadForm';

export const metadata = { title: 'Contact', description: 'Talk to the QR Menu Pro team about menus, plans, printing your QR or anything else.', alternates: { canonical: '/contact' } };
export default function Contact() {
  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold">Let’s set you up</h1>
      <p className="mb-8 mt-3 text-muted">Tell us about your restaurant and we will call you back, help you scan your menu and get your QR printed.</p>
      <LeadForm />
    </main>
  );
}
