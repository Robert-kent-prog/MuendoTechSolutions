import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { PROJECTS, PROJECT_CASE_STUDIES } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Case Studies"
      title="Experience Behind Our Solutions"
      subtitle="A look at production systems we've designed, engineered, and deployed for real operational use."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p) => {
          const caseStudy = PROJECT_CASE_STUDIES.find((study) => study.title === p.title);
          return (
            <article key={p.title} className="glass rounded-2xl p-7 card-hover">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {p.tag}
                </span>
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
    </Section>
  );
}
