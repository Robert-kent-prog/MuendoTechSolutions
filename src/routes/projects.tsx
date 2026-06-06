import { createFileRoute } from "@tanstack/react-router";

import { PageShell, Projects, Testimonials } from "./index";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [{ title: "Projects | Muendo Tech Solutions" }],
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
