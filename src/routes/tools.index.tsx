import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { FREE_TOOLS, TOOL_CATEGORIES, type ToolCategory } from "@/data/tools";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndexPage,
  head: () => {
    const head = pageHead({
      title: `Free Kenyan Business Tools & Calculators | ${COMPANY}`,
      description:
        "Free browser-based tools for Kenyan businesses: A4 and 80mm KES invoice generator, software budget estimator, and upcoming PAYE, VAT, and M-Pesa tools.",
      path: "/tools",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Free Kenyan Business Tools | ${COMPANY}`,
            url: `${SITE_URL}/tools`,
            description:
              "Free browser-based business utilities built for Kenyan SMEs, freelancers, and retail operators.",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Free Tools", path: "/tools" },
            ]),
          ),
        },
      ],
    };
  },
});

function ToolsIndexPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FREE_TOOLS.filter((tool) => {
      if (category !== "All" && tool.category !== category) return false;
      if (!q) return true;
      return (
        tool.title.toLowerCase().includes(q) ||
        tool.summary.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.includes(q))
      );
    });
  }, [query, category]);

  const liveTools = filtered.filter((t) => t.status === "live");
  const upcomingTools = filtered.filter((t) => t.status === "coming-soon");

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient py-16 sm:py-24">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              Free Business Tools
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Practical Tools for Kenyan Businesses
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Fast, mobile-ready utilities built around KES, 16% VAT, M-Pesa, and everyday SME
              workflows. Every tool runs locally in your browser with no account required.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3.5 py-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-accent shrink-0" aria-hidden="true" />
              100% client-side. Nothing you type is uploaded to any server.
            </div>
          </div>

          <div className="mt-8 glass rounded-2xl p-4 sm:p-5 border border-border space-y-4">
            <div className="relative max-w-lg">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search free business tools"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools (e.g. invoice, receipt, VAT, PAYE, M-Pesa)..."
                className="w-full rounded-xl border border-border bg-background/70 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter tools by category"
            >
              {TOOL_CATEGORIES.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={active}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center border border-border">
              <p className="text-muted-foreground">No tools match "{query}".</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="mt-4 cursor-pointer text-sm font-medium text-accent hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              {liveTools.length > 0 && (
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">Ready to use now</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Open any tool directly in your browser and export or share in seconds.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {liveTools.length} live
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {liveTools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <article
                          key={tool.slug}
                          className="glass rounded-2xl p-6 card-hover border border-primary/35 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="size-11 rounded-xl bg-primary/15 text-primary grid place-items-center">
                                <Icon className="size-5" aria-hidden="true" />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                  {tool.category}
                                </span>
                                {tool.badge && (
                                  <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold leading-snug">{tool.title}</h3>
                            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                              {tool.summary}
                            </p>
                          </div>

                          {tool.href && (
                            <Link
                              to={tool.href}
                              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                            >
                              Open tool <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {upcomingTools.length > 0 && (
                <div className={liveTools.length > 0 ? "pt-6 border-t border-border" : ""}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingTools.map((tool) => {
                      const Icon = tool.icon;
                      const CardHeading = liveTools.length > 0 ? "h3" : "h2";
                      return (
                        <article
                          key={tool.slug}
                          className="glass rounded-xl p-5 border border-border/70 flex flex-col justify-between opacity-85"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div className="size-9 rounded-lg bg-secondary text-muted-foreground grid place-items-center">
                                <Icon className="size-4" aria-hidden="true" />
                              </div>
                              <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Coming soon
                              </span>
                            </div>
                            <CardHeading className="text-base font-semibold leading-snug">
                              {tool.title}
                            </CardHeading>
                            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                              {tool.summary}
                            </p>
                          </div>
                          <div className="mt-4 text-[11px] font-medium text-muted-foreground">
                            {tool.category}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
