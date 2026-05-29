import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PageShell } from "./index";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
  head: () => ({
    meta: [
      { title: "Blog | Nexa Tech Solutions" },
      {
        name: "description",
        content:
          "Practical field notes from Nexa Tech Solutions on software development, M-Pesa, AI automation, deployment, product planning, and security.",
      },
    ],
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
