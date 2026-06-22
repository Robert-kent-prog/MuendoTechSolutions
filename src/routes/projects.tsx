import { Outlet, createFileRoute } from "@tanstack/react-router";

import { PageShell } from "./index";

export const Route = createFileRoute("/projects")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  return (
    <PageShell>
      <main className="pt-16">
        <Outlet />
      </main>
    </PageShell>
  );
}
