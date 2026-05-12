import { Mail, MessageSquareText, ShieldCheck } from 'lucide-react';

import { ContactLeadForm } from '@/components/shared/contact-lead-form';
import { Footer } from '@/components/shared/footer';
import { NavbarShell } from '@/components/shared/navbar-shell';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Digitalvirtuose';

const contactHighlights = [
  { icon: Mail, title: 'Direct response', copy: 'Your message is saved securely and routed to the right team.' },
  { icon: MessageSquareText, title: 'Clear details', copy: 'Share your requirement, question, or collaboration idea in one place.' },
  { icon: ShieldCheck, title: 'Reliable follow-up', copy: 'We keep the request record so every conversation stays traceable.' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-border px-6 py-20 md:px-10 lg:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_58%_at_50%_-8%,rgba(176,228,204,0.42),transparent_55%),linear-gradient(180deg,rgba(244,250,247,0.9)_0%,transparent_42%)]"
          />

          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-primary">Contact</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-foreground md:text-7xl">
                Let&apos;s talk about your next move.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Use this form to reach {siteName}. Your request will be recorded and shared with the support team for follow-up.
              </p>

              <div className="mt-8 grid gap-4">
                {contactHighlights.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-3xl border border-border bg-card/90 p-5 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-foreground">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContactLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
