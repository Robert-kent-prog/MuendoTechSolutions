import { Outlet, createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/services")({
  component: ServicesLayout,
});

function ServicesLayout() {
  return (
    <PageShell>
      <main className="pt-16">
        <Outlet />
      </main>
    </PageShell>
  );
}
