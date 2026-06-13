import { createFileRoute, Outlet } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "./index";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
  head: () =>
    pageHead({
      title: `Software Development Blog | ${COMPANY}`,
      description:
        "Practical field notes from Muendo Tech Solutions on software development, M-Pesa integration, AI automation, deployment, MVP planning, and software security.",
      path: "/blog",
    }),
});

function BlogLayout() {
  return (
    <PageShell>
      <main className="pt-16">
        <Outlet />
      </main>
    </PageShell>
  );
}
