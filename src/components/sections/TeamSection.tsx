import { Section } from "@/components/ui/SectionHeading";
import { TEAM } from "@/data/team";
import { ShieldCheck, Code, Server, UserCheck } from "lucide-react";

export function Team() {
  return (
    <Section
      id="team"
      eyebrow="Engineering Leadership"
      title="Experienced Engineers. Direct Delivery."
      subtitle="No account-manager layers or junior handoffs. You work directly with senior software architects and engineers who design, build, test, and maintain your systems."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {TEAM.map((member, idx) => {
          const isFounder = idx === 0;
          return (
            <article
              key={member.name}
              className={`glass rounded-2xl p-7 card-hover flex flex-col justify-between relative overflow-hidden ${
                isFounder ? "border-primary/40 bg-gradient-to-b from-primary/5 to-transparent" : ""
              }`}
            >
              {isFounder && (
                <div className="absolute top-4 right-4 bg-primary/20 text-primary border border-primary/30 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Founder
                </div>
              )}

              <div>
                {/* Member Header */}
                <div className="flex items-start gap-4">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center text-lg font-bold shadow-lg shadow-primary/20 shrink-0">
                    {member.initials}
                  </div>
                  <div className="min-w-0 pr-16">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{member.name}</h3>
                    <p className="mt-1 text-xs text-accent font-semibold">{member.role}</p>
                    {member.experience && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{member.experience}</p>
                    )}
                  </div>
                </div>

                {/* Member Bio */}
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>

                {/* Featured Engineering Quote */}
                {member.featuredQuote && (
                  <blockquote className="mt-4 p-3 rounded-xl bg-secondary/40 border-l-2 border-accent text-xs italic text-foreground/85 leading-relaxed">
                    "{member.featuredQuote}"
                  </blockquote>
                )}
              </div>

              {/* Technical Focus Badges */}
              <div className="mt-6 pt-5 border-t border-border/60">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Specialization Focus
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.focus.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Direct Accountability Banner */}
      <div className="mt-8 glass rounded-2xl p-6 sm:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border border-border">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <UserCheck className="size-4" /> Direct Engineering Accountability
          </div>
          <h3 className="font-bold text-lg text-foreground">Built for reliability, transparency, and production launch.</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The same software engineers who scope your business requirements stay hands-on through architecture, implementation, testing, deployment, and ongoing retainers.
          </p>
        </div>
      </div>
    </Section>
  );
}
