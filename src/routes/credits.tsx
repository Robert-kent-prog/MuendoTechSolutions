import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { PHOTOS } from "@/data/credits";

export const Route = createFileRoute("/credits")({
  component: CreditsPage,
  head: () =>
    pageHead({
      title: `Photo Credits | ${COMPANY}`,
      description:
        "Credits and licences for the photographs used on the Muendo Software Labs website, sourced from Wikimedia Commons.",
      path: "/credits",
    }),
});

function CreditsPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <PageHeader
          eyebrow="Credits"
          title="Photo credits"
          subtitle="Some photographs on this site come from Wikimedia Commons and are used under the licences below. Product screenshots and illustrations are our own or our clients' work."
        />
        <section className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {Object.values(PHOTOS).map((p) => (
              <article
                key={p.src}
                className="glass rounded-2xl p-5 sm:p-6 grid gap-5 sm:grid-cols-[14rem_1fr]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover rounded-xl border border-border"
                />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <h2 className="text-base font-semibold text-foreground">{p.alt}</h2>
                  <dl className="mt-3 space-y-1">
                    <div>
                      <dt className="inline font-medium text-foreground">Author: </dt>
                      <dd className="inline">{p.author}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-foreground">Licence: </dt>
                      <dd className="inline">
                        <a
                          href={p.licenseUrl}
                          className="text-accent hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {p.license}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-foreground">Source: </dt>
                      <dd className="inline">
                        <a
                          href={p.sourceUrl}
                          className="text-accent hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Wikimedia Commons
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-foreground">Used on: </dt>
                      <dd className="inline">
                        {p.usedOn.map((u, i) => (
                          <span key={u.href}>
                            {i > 0 && ", "}
                            <a href={u.href} className="text-accent hover:underline">
                              {u.label}
                            </a>
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs">
                    Resized and converted to WebP for this site; otherwise unchanged.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
