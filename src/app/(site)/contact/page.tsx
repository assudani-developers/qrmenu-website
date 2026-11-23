import LeadForm from '@/components/LeadForm';

export const metadata = { title: 'Contact — QR Menu Pro' };
export default function Contact() {
  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold">Let’s set you up</h1>
      <p className="mb-8 mt-3 text-muted">Tell us about your restaurant and we will call you back, help you scan your menu and get your QR printed.</p>
      <LeadForm />
    </main>
  );
}
