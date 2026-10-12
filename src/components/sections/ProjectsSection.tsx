import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import {
  PROJECTS,
  PROJECT_CASE_STUDIES,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";

export function Projects({
  showViewAll = false,
  filterable = false,
}: { showViewAll?: boolean; filterable?: boolean } = {}) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const visible =
    filterable && filter !== "All" ? PROJECTS.filter((p) => p.category === filter) : PROJECTS;

  return (
    <Section
      id="projects"
      eyebrow="Case Studies"
      title="Experience Behind Our Solutions"
      subtitle="A look at production systems we've designed, engineered, and deployed for real operational use."
    >
      {filterable && (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by type"
        >
          {(["All", ...PROJECT_CATEGORIES] as const).map((c) => {
            const count =
              c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length;
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {c} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-5">
        {visible.map((p, idx) => {
          const caseStudy = PROJECT_CASE_STUDIES.find((study) => study.title === p.title);
          return (
            <article
              key={p.title}
              className={`glass rounded-2xl p-7 card-hover ${
                showViewAll && idx >= 6 ? "hidden" : "block"
              } ${filterable && filter === "All" && p.featured ? "md:col-span-2 border-primary/40" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {p.tag}
                </span>
                {filterable && filter === "All" && p.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    <Star className="size-3" aria-hidden="true" /> Featured
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>
              {caseStudy && (
                <div className="mb-5 grid sm:grid-cols-3 gap-2">
                  {caseStudy.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-lg border border-border bg-secondary/35 px-3 py-2 text-xs font-medium text-foreground"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {caseStudy && (
                <a
                  href={`/projects/${caseStudy.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
                >
                  View case study <ArrowRight className="size-4" />
                </a>
              )}
            </article>
          );
        })}
      </div>

      {showViewAll && (
        <div className="mt-8 text-center sm:text-left">
          <a
            href="/projects"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
          >
            View All Projects <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </Section>
  );
}
