import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { About, PageShell, Team } from "./index";

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
