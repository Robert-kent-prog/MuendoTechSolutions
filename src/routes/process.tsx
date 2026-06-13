import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell, Process, Why } from "./index";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () =>
    pageHead({
      title: `Software Development Process | ${COMPANY}`,
      description:
        "Learn how Muendo Tech Solutions plans, designs, builds, tests, deploys, and supports reliable software products for businesses, schools, startups, and SMEs.",
      path: "/process",
    }),
});

function ProcessPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Process />
        <Why />
      </main>
    </PageShell>
  );
}
