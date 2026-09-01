import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { PROCESS } from "@/data/services";

export function Process({ showViewAll = false }: { showViewAll?: boolean } = {}) {
  return (
    <Section
      id="process"
      eyebrow="Our Process"
      title="How We Deliver Projects"
      subtitle="A clear, structured engineering lifecycle from first requirement notes to live release and maintenance."
    >
      <div className="relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4">
          {PROCESS.map((p, idx) => (
            <div
              key={p.n}
              className="glass rounded-xl p-5 card-hover relative flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-2xl font-extrabold text-accent font-mono tracking-tight">
                  {p.n}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  Step {idx + 1}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1.5">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showViewAll && (
        <div className="mt-8">
          <a
            href="/process"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border border-border bg-secondary/40 text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Full Engineering Process <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </Section>
  );
}
