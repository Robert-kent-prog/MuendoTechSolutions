import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { contactProjectHref } from "@/lib/contact-project";
import { COMPANY, SITE_URL, pageHead } from "@/lib/seo";
import { CTA, PROJECT_CASE_STUDIES } from "./index";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectCaseStudyPage,
  head: ({ params }) => {
    const project = PROJECT_CASE_STUDIES.find((item) => item.slug === params.slug);

    if (!project) {
      return {
        meta: [
          { title: `Case Study Not Found | ${COMPANY}` },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }

    const head = pageHead({
      title: `${project.title} Case Study | ${COMPANY}`,
      description: project.summary,
      path: `/projects/${project.slug}`,
    });

    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            creator: { "@type": "Organization", name: COMPANY, url: SITE_URL },
            about: project.tag,
          }),
        },
      ],
    };
  },
});

function ProjectCaseStudyPage() {
  const { slug } = Route.useParams();
  const project = PROJECT_CASE_STUDIES.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Case study not found</h1>
          <p className="mt-3 text-muted-foreground">
            The project page you opened may have moved or been removed.
          </p>
          <a
            href="/projects"
            className="mt-6 inline-flex items-center gap-2 text-sm text-accent font-medium"
          >
            <ArrowLeft className="size-4" /> Back to projects
          </a>
        </div>
      </section>
    );
  }

  const contactService =
    project.tag.includes("Retail") || project.title.includes("Bookkeeping")
      ? "Point of Sale / Retail System"
      : project.tag.includes("Fleet")
        ? "Fleet Management System"
        : project.tag.includes("Health")
          ? "Business System"
          : project.tag.includes("DocTech")
            ? "Document Management System"
            : project.tag.includes("Mobile")
              ? "Mobile App"
              : "Business System";
  const contactHref = contactProjectHref({
    title: project.title,
    service: contactService,
    source: `/projects/${project.slug}`,
    message: [
      `I am interested in building something similar to ${project.title}.`,
      "",
      `Reference context: ${project.summary}`,
      `Useful proof point: ${project.metrics.join(", ")}`,
      "",
      "What I want to keep from this example:",
      "",
      "Changes or extra features I need:",
      "",
      "Users and roles:",
      "",
      "Timeline:",
      "",
      "Budget range:",
    ].join("\n"),
  });

  return (
    <>
      <article>
        <section className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" /> Projects
            </a>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  {project.tag}
                </div>
                <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
                <a
                  href={contactHref}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:opacity-90"
                >
                  Build Something Similar <ArrowRight className="size-4" />
                </a>
              </div>
              <aside className="glass rounded-2xl p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  Proof Points
                </div>
                <div className="mt-5 grid gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-xl border border-border bg-secondary/35 p-4 text-sm font-medium"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-xs text-muted-foreground">Client / context</div>
                <div className="mt-1 font-semibold">{project.client}</div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                ["Problem", project.problem],
                ["Solution", project.solution],
                ["Outcome", project.outcome],
              ].map(([label, text]) => (
                <div key={label} className="glass rounded-2xl p-7 card-hover">
                  <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                    {label}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 border-y border-border bg-sidebar/35">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                  Features
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  What the system included
                </h2>
                <div className="mt-8 grid gap-3">
                  {project.features.map((feature) => (
                    <div key={feature} className="glass rounded-xl p-4 flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                  Stack
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technologies used</h2>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
      <CTA />
    </>
  );
}
