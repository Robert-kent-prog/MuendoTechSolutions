import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, FileCode2, ArrowRight, Layers, Briefcase, BookOpen, Compass, ExternalLink } from "lucide-react";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { SERVICE_DETAIL_PAGES } from "@/data/services";
import { PROJECT_CASE_STUDIES } from "@/data/projects";
import { INSIGHTS } from "@/data/insights";

export const Route = createFileRoute("/sitemap")({
  component: SitemapPage,
  head: () =>
    pageHead({
      title: `HTML Sitemap | ${COMPANY}`,
      description:
        "Comprehensive page index of Muendo Software Labs: explore our core pages, software development services, project case studies, technical field notes, and contact options.",
      path: "/sitemap",
    }),
});

interface SitemapGroup {
  id: string;
  title: string;
  icon: typeof Compass;
  items: { title: string; href: string; description?: string }[];
}

function SitemapPage() {
  const [query, setQuery] = useState("");

  const groups: SitemapGroup[] = useMemo(
    () => [
      {
        id: "main",
        title: "Main Navigation",
        icon: Compass,
        items: [
          { title: "Home Page", href: "/", description: "Nairobi software development company overview" },
          { title: "About Us", href: "/about", description: "Meet our software development team and mission" },
          { title: "Software Services", href: "/services", description: "Overview of web, mobile, API & POS services" },
          { title: "Project Case Studies", href: "/projects", description: "Portfolio of delivered software applications" },
          { title: "Development Process", href: "/process", description: "Step-by-step software engineering lifecycle" },
          { title: "Field Notes & Blog", href: "/blog", description: "Technical write-ups on M-Pesa, security & tech stack" },
          { title: "Frequently Asked Questions", href: "/faq", description: "Answers on pricing, retainers, and tech stack" },
          { title: "Contact Us", href: "/contact", description: "Request a project quote or send a WhatsApp brief" },
        ],
      },
      {
        id: "services",
        title: "Services & Solutions",
        icon: Layers,
        items: SERVICE_DETAIL_PAGES.map((s) => ({
          title: s.title,
          href: `/services/${s.slug}`,
          description: s.summary,
        })),
      },
      {
        id: "projects",
        title: "Projects & Portfolio Case Studies",
        icon: Briefcase,
        items: PROJECT_CASE_STUDIES.map((p) => ({
          title: p.title,
          href: `/projects/${p.slug}`,
          description: p.summary,
        })),
      },
      {
        id: "blog",
        title: "Technical Field Notes & Articles",
        icon: BookOpen,
        items: INSIGHTS.map((post) => ({
          title: post.title,
          href: `/blog/${post.slug}`,
          description: post.excerpt,
        })),
      },
    ],
    [],
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  return (
    <PageShell>
      <main className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              Site Directory
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">HTML Sitemap.</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Explore the full structure of {COMPANY}. Easily navigate to all company pages,
              software service offerings, case studies, and engineering field notes.
            </p>
          </div>

          {/* Search & XML Banner */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass rounded-2xl p-5 border border-border">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sitemap pages..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-background/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-secondary/40 text-xs font-medium text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileCode2 className="size-4 text-accent" />
                View XML Sitemap (For Crawlers) <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Sitemap Sections Grid */}
          <div className="mt-12 space-y-12">
            {filteredGroups.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-muted-foreground">No pages match "{query}".</p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 text-sm text-accent font-medium hover:underline"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              filteredGroups.map((group) => {
                const IconComponent = group.icon;
                return (
                  <div key={group.id} className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b border-border pb-3">
                      <IconComponent className="size-5 text-accent" />
                      <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
                      <span className="ml-auto text-xs text-muted-foreground font-mono">
                        {group.items.length} links
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="glass card-hover rounded-xl p-5 flex flex-col justify-between space-y-3 group"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                                {item.title}
                              </h3>
                              <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-transform shrink-0" />
                            </div>
                            {item.description && (
                              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-accent/80 truncate">
                            {item.href}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
