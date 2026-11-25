import type { ReactNode } from "react";

export interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  headingAs?: "h1" | "h2";
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  headingAs = "h2",
  children,
  className = "",
}: SectionHeadingProps) {
  const Heading = headingAs;

  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              {eyebrow}
            </div>
          )}
          <Heading className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}
          </Heading>
          {subtitle && (
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
