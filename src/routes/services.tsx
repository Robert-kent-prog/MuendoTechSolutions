import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { Industries, PageShell, Services, Solutions, Technologies } from "./index";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () =>
    pageHead({
      title: `Software Development Services | ${COMPANY}`,
      description:
        "Explore Muendo Tech Solutions services: web app development, mobile apps, backend APIs, POS systems, desktop applications, Laravel, Django, Spring Boot, databases, AI integrations, and maintenance.",
      path: "/services",
    }),
});

function ServicesPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Services />
        <Solutions />
        <Technologies />
        <Industries />
      </main>
    </PageShell>
  );
}
