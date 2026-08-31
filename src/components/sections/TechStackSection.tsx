import { Layers } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { TECH } from "@/data/technologies";

export function Technologies() {
  return (
    <Section
      id="technologies"
      eyebrow="Stack"
      title="Technologies We Use"
      subtitle="Modern, reliable technologies chosen for performance, maintainability, and long-term support."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TECH.map((g) => (
          <div key={g.group} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="size-4 text-accent" />
              <h3 className="font-semibold">{g.group}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
