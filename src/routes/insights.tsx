import { createFileRoute, redirect } from "@tanstack/react-router";

import { Insights, PageShell } from "./index";

export const Route = createFileRoute("/insights")({
  beforeLoad: () => {
    throw redirect({ to: "/blog" });
  },
  component: InsightsPage,
  head: () => ({
    meta: [{ title: "Insights | Muendo Tech Solutions" }],
  }),
});

function InsightsPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Insights />
      </main>
    </PageShell>
  );
}
