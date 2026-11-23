export const metadata = { title: 'Terms of Service', alternates: { canonical: '/terms' } };
export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-5xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 19 November 2026</p>
      <div className="card mt-8 space-y-5 p-8 leading-relaxed [&_h2]:mb-1 [&_h2]:text-lg [&_h2]:font-extrabold [&_p]:text-muted">

<div><h2>The service</h2><p>QR Menu Pro provides a hosted digital menu, QR codes and (on eligible plans) table ordering tools. Features depend on your plan.</p></div>
<div><h2>Trial & billing</h2><p>New accounts may start with a free trial. After the trial a paid plan is needed to keep your menu live. Plans are billed monthly by UPI and activated after payment verification.</p></div>
<div><h2>Your content</h2><p>You are responsible for the accuracy of your menu, prices and taxes. Do not upload unlawful content.</p></div>
<div><h2>Availability</h2><p>We work to keep the service available but do not guarantee uninterrupted access.</p></div>
      </div>
    </main>
  );
}
