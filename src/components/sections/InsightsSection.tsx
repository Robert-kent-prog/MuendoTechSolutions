import { useState } from "react";
import { Calendar, ChevronDown, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { INSIGHTS } from "@/data/insights";

export function Insights() {
  const [openNote, setOpenNote] = useState<string | null>(null);

  return (
    <Section
      id="insights"
      eyebrow="Insights"
      title="Notes from the Workshop"
      subtitle="Short, practical write-ups on the tools and decisions behind the systems we build."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INSIGHTS.map((p) => {
          const isOpen = openNote === p.title;
          return (
            <article key={p.title} className="glass rounded-2xl p-7 card-hover flex flex-col">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="text-accent font-semibold uppercase tracking-wider">{p.tag}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" /> {p.date} · {p.readTime}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-3 leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              {isOpen && (
                <p className="mt-4 border-t border-border pt-4 text-sm text-foreground/85 leading-relaxed">
                  {p.details}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenNote(isOpen ? null : p.title)}
                  aria-expanded={isOpen}
                  className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isOpen ? "Show less" : "View note"}
                  <ChevronDown
                    className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <a
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Read article <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
