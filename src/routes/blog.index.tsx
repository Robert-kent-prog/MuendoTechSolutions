import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { BLOG_CATEGORIES, INSIGHTS } from "@/data/insights";
import { CTA } from "@/components/sections/CTASection";

const POSTS_PER_PAGE = 6;

export const Route = createFileRoute("/blog/")({
  component: BlogIndexRoute,
  head: () =>
    pageHead({
      title: `Software Development Blog | ${COMPANY}`,
      description:
        "Read practical software development notes from Muendo Tech Solutions covering Kenyan business websites, SEO, M-Pesa, POS systems, AI automation, deployment, MVP planning, security, and backend architecture.",
      path: "/blog",
    }),
});

function BlogIndexRoute() {
  return (
    <PageShell>
      <BlogIndexPage />
    </PageShell>
  );
}

function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [page, setPage] = useState(1);
  const posts = useMemo(() => {
    const filtered =
      activeCategory === "All Posts"
        ? INSIGHTS
        : INSIGHTS.filter((post) => post.category === activeCategory);
    return [...filtered].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [activeCategory]);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const visiblePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  return (
    <>
      <section className="py-20 sm:py-28 bg-hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              Blog
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Field Notes.</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Practical notes from engineers shipping business software in Kenya: M-Pesa patterns,
              deployment choices, AI workflows, security basics, and product decisions that hold up
              after launch.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {BLOG_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-3.5 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="glass rounded-2xl p-7 card-hover flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" /> {post.date} · {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold leading-snug">{post.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <a
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
                >
                  Read article <ArrowRight className="size-4" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * POSTS_PER_PAGE + 1} to{" "}
              {Math.min(page * POSTS_PER_PAGE, posts.length)} of {posts.length} posts
              {activeCategory !== "All Posts" ? ` in ${activeCategory}` : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-secondary/50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ArrowLeft className="size-4" /> Previous
              </button>
              <span className="rounded-lg border border-border bg-secondary/35 px-3.5 py-2 text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-secondary/50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
