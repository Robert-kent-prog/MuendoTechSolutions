import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/AboutSection";
import { Team } from "@/components/sections/TeamSection";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    pageHead({
      title: `About ${COMPANY} | Nairobi Software Development Team`,
      description:
        "Meet Muendo Tech Solutions, a Nairobi-based software development team building web apps, mobile apps, backend APIs, business systems, AI integrations, and payment-ready platforms.",
      path: "/about",
    }),
});

function AboutPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <About />
        <Team />
      </main>
    </PageShell>
  );
}
