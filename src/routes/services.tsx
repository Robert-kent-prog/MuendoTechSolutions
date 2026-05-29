import { createFileRoute } from "@tanstack/react-router";

import { Industries, PageShell, Services, Solutions, Technologies } from "./index";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [{ title: "Services | Nexa Tech Solutions" }],
  }),
});

function ServicesPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Services />
        <Solutions />
        <Technologies />
        <Industries />
      </main>
    </PageShell>
  );
}
