import { Section } from "@/components/ui/SectionHeading";
import { INDUSTRIES, INDUSTRY_SOLUTIONS } from "@/data/industries";

export function Industries() {
  return (
    <Section
      id="industries"
      eyebrow="Industries"
      title="Industries We Serve"
      subtitle="From retail floors to lecture halls, we build the systems that keep operations running."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {INDUSTRIES.map((i) => {
          const Icon = i.icon;
          return (
            <div
              key={i.label}
              className="glass rounded-xl p-5 card-hover text-center flex flex-col items-center gap-3"
            >
              <div className="size-11 rounded-xl bg-primary/15 text-primary grid place-items-center">
                <Icon className="size-5" />
              </div>
              <span className="text-sm font-medium">{i.label}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function IndustrySolutions() {
  return (
    <Section
      id="industry-solutions"
      eyebrow="Industry Solutions"
      title="Systems Shaped Around Kenyan Workflows"
      subtitle="Different industries need different defaults. These are the practical workflows we prioritize when shaping a first release."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INDUSTRY_SOLUTIONS.map((solution) => {
          const Icon = solution.icon;
          return (
            <article key={solution.title} className="glass rounded-2xl p-6 card-hover">
              <div className="size-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-4">
                <Icon className="size-5 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{solution.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{solution.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {solution.outcomes.map((outcome) => (
                  <span
                    key={outcome}
                    className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
