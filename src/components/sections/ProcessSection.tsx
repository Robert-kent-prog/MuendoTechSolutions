import { Section } from "@/components/ui/SectionHeading";
import { PROCESS } from "@/data/services";

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Our Process"
      title="How We Deliver Projects"
      subtitle="A clear, structured engineering lifecycle from first requirement notes to live release and maintenance."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PROCESS.map((p) => (
          <div key={p.n} className="glass rounded-2xl p-6 card-hover relative flex flex-col">
            <span className="text-3xl font-extrabold text-accent/30 font-mono mb-2">{p.n}</span>
            <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
