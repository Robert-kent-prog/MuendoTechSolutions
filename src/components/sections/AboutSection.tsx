import { Rocket, Sparkles, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { VALUES } from "@/data/team";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Us"
      title="Software Built for Real Business Needs"
      subtitle="We are a software development company based in Nairobi, Kenya, focused on building practical digital systems that solve real operational problems. Our work covers web platforms, mobile apps, backend services, APIs, business dashboards, authentication systems, database solutions, and deployment support."
    >
      <p className="text-muted-foreground max-w-3xl -mt-6 mb-12 leading-relaxed">
        We believe good software should be secure, maintainable, easy to use, and built around the
        client's actual workflow.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="glass rounded-2xl p-7 card-hover">
          <div className="size-10 rounded-lg bg-primary/15 text-primary grid place-items-center mb-4">
            <Rocket className="size-5" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To help businesses and organizations move from manual, inefficient processes to reliable
            digital systems that improve speed, control, visibility, and growth.
          </p>
        </div>
        <div className="glass rounded-2xl p-7 card-hover">
          <div className="size-10 rounded-lg bg-accent/15 text-accent grid place-items-center mb-4">
            <Sparkles className="size-5" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            To become a trusted software partner for businesses, institutions, and startups across
            Kenya and beyond.
          </p>
        </div>
      </div>
      <div className="glass rounded-2xl p-7">
        <h3 className="font-semibold text-xl mb-4">Core Values</h3>
        <div className="flex flex-wrap gap-2">
          {VALUES.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              <CheckCircle2 className="size-3.5 text-accent" />
              {v}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
