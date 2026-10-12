import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalPage({
  title,
  subtitle,
  updated,
  sections,
}: {
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={`Last updated ${updated}`} title={title} subtitle={subtitle} />
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((s, i) => (
            <article key={s.heading}>
              <h2 className="text-xl font-semibold tracking-tight">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {s.body}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
