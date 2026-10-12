import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/SectionHeading";
import { BUDGET_OPTIONS } from "@/data/budget";

const PRICE_FACTORS = [
  {
    title: "Scope and number of screens",
    desc: "A five-page website and a multi-role system are very different builds. More pages, records and reports mean more design, build and testing time.",
  },
  {
    title: "Users and permissions",
    desc: "Systems with several roles (admin, staff, customer) need careful access rules, approvals and audit trails.",
  },
  {
    title: "Integrations",
    desc: "M-Pesa payments, SMS, email, accounting tools and other APIs each add setup, testing and reconciliation work.",
  },
  {
    title: "Data migration",
    desc: "Moving records out of spreadsheets or an old system needs cleaning and checking before it goes live.",
  },
  {
    title: "Timeline",
    desc: "A tight deadline can mean extra people or reduced scope. Planning ahead is the cheapest way to get a good result.",
  },
  {
    title: "Support after launch",
    desc: "Hosting, backups, updates and small improvements are best handled through a monthly maintenance retainer.",
  },
];

const ALWAYS_INCLUDED = [
  "A written scope and quote before work starts",
  "Responsive design for phone, tablet and desktop",
  "Deployment and launch support",
  "Handover of access and a walkthrough for your team",
];

export function PricingBands() {
  return (
    <Section
      id="budget-bands"
      eyebrow="Budget Guide"
      title="How Project Budgets Usually Fall"
      subtitle="Every project is quoted after a short discovery conversation. These are the ranges we use to talk about budget, so you can tell us roughly where you are."
    >
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BUDGET_OPTIONS.filter((b) => b !== "Not sure yet").map((band) => (
          <li key={band} className="glass rounded-xl p-5 text-lg font-semibold">
            {band}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground max-w-3xl leading-relaxed">
        Not sure which range fits? Use the{" "}
        <Link to="/quote" className="text-accent font-medium hover:underline">
          quote guide
        </Link>{" "}
        for a rough estimate, or send us a brief and we will help you scope it.
      </p>
    </Section>
  );
}

export function PricingFactors() {
  return (
    <Section
      id="price-factors"
      eyebrow="What Affects Price"
      title="What Moves a Quote Up or Down"
      className="border-y border-border bg-sidebar/35"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRICE_FACTORS.map((f) => (
          <article key={f.title} className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 glass rounded-2xl p-6 sm:p-8">
        <h3 className="font-semibold text-lg">Included in every project</h3>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {ALWAYS_INCLUDED.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/quote"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Get a rough estimate <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
