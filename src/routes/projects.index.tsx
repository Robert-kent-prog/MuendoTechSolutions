import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { Projects, Testimonials } from "./index";

export const Route = createFileRoute("/projects/")({
  component: ProjectsIndexPage,
  head: () =>
    pageHead({
      title: `Software Projects and Case Studies | ${COMPANY}`,
      description:
        "View Muendo Tech Solutions project references across service marketplaces, fleet management, document systems, AI integrations, vaccination tracking, bookkeeping, websites, and e-commerce.",
      path: "/projects",
    }),
});

function ProjectsIndexPage() {
  return (
    <>
      <Projects />
      <Testimonials />
    </>
  );
}
