import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-16 sm:py-24">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
            {eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">{title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
