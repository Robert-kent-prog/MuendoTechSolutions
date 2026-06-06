import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";

import { CTA, INSIGHTS } from "./index";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogArticlePage,
  head: () => ({
    meta: [{ title: "Blog Article | Muendo Tech Solutions" }],
  }),
});

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const post = INSIGHTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Article not found</h1>
          <p className="mt-3 text-muted-foreground">
            The note you opened may have moved or been removed.
          </p>
          <a
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 text-sm text-accent font-medium"
          >
            <ArrowLeft className="size-4" /> Back to blog
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <article className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to blog
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="text-accent font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3" /> {post.date} · {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

          <div className="mt-10 glass rounded-2xl p-7 sm:p-8 text-base leading-relaxed text-foreground/90">
            <p>{post.details}</p>

            <div className="mt-8 space-y-8">
              {post.article.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="mt-10 rounded-2xl border border-accent/20 bg-accent/10 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </article>
      <CTA />
    </>
  );
}
