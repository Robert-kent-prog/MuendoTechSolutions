import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import {
  PROJECTS,
  PROJECT_CASE_STUDIES,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";

const normalizeTitle = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
const sameTitle = (a: string, b: string) => normalizeTitle(a) === normalizeTitle(b);

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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p, idx) => {
          const caseStudy = PROJECT_CASE_STUDIES.find((study) => sameTitle(study.title, p.title));
          const shownStack = p.stack.slice(0, 6);
          const hiddenCount = p.stack.length - shownStack.length;
          return (
            <article
              key={p.title}
              className={`glass rounded-xl p-5 card-hover flex-col ${
                showViewAll && idx >= 6 ? "hidden" : "flex"
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                {p.tag}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {p.desc}
              </p>
              {caseStudy && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {caseStudy.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-md border border-border bg-secondary/35 px-2 py-1 text-[11px] font-medium text-foreground"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {shownStack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-secondary border border-border text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
                {hiddenCount > 0 && (
                  <span className="text-[11px] px-2 py-0.5 text-muted-foreground">
                    +{hiddenCount} more
                  </span>
                )}
              </div>
              {caseStudy && (
                <a
                  href={`/projects/${caseStudy.slug}`}
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
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
