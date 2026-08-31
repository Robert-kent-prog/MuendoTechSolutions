import { Section } from "@/components/ui/SectionHeading";
import { TEAM } from "@/data/team";

export function Team() {
  return (
    <Section
      id="team"
      eyebrow="The Team"
      title="Three Engineers. Direct to Client."
      subtitle="No account-manager layers. You speak directly with the people planning the architecture, writing the code, testing the workflows, and shipping your application."
    >
      <div className="grid lg:grid-cols-3 gap-5">
        {TEAM.map((member) => (
          <article key={member.name} className="glass rounded-2xl p-7 card-hover flex flex-col">
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center text-lg font-bold shadow-lg shadow-primary/20">
                {member.initials}
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
                <p className="mt-1 text-sm text-accent font-medium">{member.role}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed flex-1">
              {member.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {member.focus.map((item) => (
                <span
                  key={item}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 glass rounded-2xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold text-lg">Built for application work, not handoffs.</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
            The same engineers who scope the system stay close to implementation, testing, launch,
            and improvements. That keeps decisions practical and communication clear.
          </p>
        </div>
      </div>
    </Section>
  );
}
