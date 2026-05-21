import { Mail, MapPin, Phone } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from "@/overrides/contact-page";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) return <ContactPageOverride />;

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || `hello@${SITE_CONFIG.domain}`;

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Contact</p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Contact {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Share your request and our team will route it to the right person for follow-up.
            </p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <Mail className="h-5 w-5" />
                <h2 className="mt-3 font-bold">Email support</h2>
                <p className="mt-1 text-sm text-slate-600">{contactEmail}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <Phone className="h-5 w-5" />
                <h2 className="mt-3 font-bold">Response window</h2>
                <p className="mt-1 text-sm text-slate-600">Within 24 business hours.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <MapPin className="h-5 w-5" />
                <h2 className="mt-3 font-bold">Request tracking</h2>
                <p className="mt-1 text-sm text-slate-600">Every form submission is saved in the master panel.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black">Send a message</h2>
            <ContactLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
