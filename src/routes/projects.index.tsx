import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Projects } from "@/components/sections/ProjectsSection";
import { Testimonials } from "@/components/sections/TestimonialsSection";

export const Route = createFileRoute("/projects/")({
  component: ProjectsIndexPage,
  head: () =>
    pageHead({
      title: `Software Projects and Case Studies | ${COMPANY}`,
      description:
        "View Muendo Software Labs project references across service marketplaces, fleet management, document systems, AI integrations, vaccination tracking, bookkeeping, websites, and e-commerce.",
      path: "/projects",
    }),
});

function ProjectsIndexPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Projects />
        <Testimonials />
      </main>
    </PageShell>
  );
}
