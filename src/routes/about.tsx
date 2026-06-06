import { createFileRoute } from "@tanstack/react-router";

import { About, PageShell, Team } from "./index";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About | Muendo Tech Solutions" }],
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
