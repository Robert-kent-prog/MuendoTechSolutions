import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell, Projects, Testimonials } from "./index";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () =>
    pageHead({
      title: `Software Projects and Case Studies | ${COMPANY}`,
      description:
        "View Muendo Tech Solutions project references across service marketplaces, fleet management, document systems, AI integrations, vaccination tracking, bookkeeping, websites, and e-commerce.",
      path: "/projects",
    }),
});

function ProjectsPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Projects />
        <Testimonials />
      </main>
    </PageShell>
  );
}
