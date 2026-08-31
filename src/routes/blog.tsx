import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
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
