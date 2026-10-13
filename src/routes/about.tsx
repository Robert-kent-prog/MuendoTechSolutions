import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/AboutSection";
import { Team } from "@/components/sections/TeamSection";
import { Why } from "@/components/sections/ServicePackagesSection";
import { CTA } from "@/components/sections/CTASection";
import { PhotoBand } from "@/components/ui/PhotoBand";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    pageHead({
      title: `About ${COMPANY} | Nairobi Software Development Team`,
      description:
        "Meet Muendo Software Labs, a Nairobi-based software development team building web apps, mobile apps, backend APIs, business systems, AI integrations, and payment-ready platforms.",
      path: "/about",
    }),
});

function AboutPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <About />
        <PhotoBand
          id="nairobi-skyline"
          caption="Nairobi, Kenya, where we are based."
          aspect="aspect-[21/9]"
          position="object-[50%_60%]"
        />
        <Team />
        <Why />
        <CTA />
      </main>
    </PageShell>
  );
}
