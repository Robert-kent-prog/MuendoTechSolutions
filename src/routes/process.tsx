import { createFileRoute } from "@tanstack/react-router";

import { PageShell, Process, Why } from "./index";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [{ title: "Process | Muendo Tech Solutions" }],
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
