import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Verified businesses", value: "1,250+" },
  { label: "Monthly discovery sessions", value: "94k" },
  { label: "Service categories", value: "85+" },
];

const values = [
  { title: "Trust-led discovery", description: "We prioritize credible profiles, clear business context, and useful contact information." },
  { title: "Structured for decisions", description: "Directory layouts are designed to help buyers compare, shortlist, and act quickly." },
  { title: "Growth focused", description: "Every surface is built to support organic traffic, discoverability, and conversion quality." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a premium business discovery platform built for credible listings and high-intent connections.`}
      actions={
        <>
          <Button asChild>
            <Link href="/contact">Talk to Our Team</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A focused platform for business visibility and buyer trust.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} helps professional businesses present themselves with confidence through structured listings,
              high-quality profile surfaces, and a clean discovery flow. We built the product for operators who want better
              leads, clearer positioning, and a website experience that feels credible from first click.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
