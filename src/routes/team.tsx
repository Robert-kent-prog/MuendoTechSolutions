import { createFileRoute } from "@tanstack/react-router";

import { PageShell, Team } from "./index";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [{ title: "Team | Nexa Tech Solutions" }],
  }),
});

function TeamPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Team />
      </main>
    </PageShell>
  );
}
