import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE_URL } from "@/lib/seo";
import { SERVICE_DETAIL_PAGES } from "@/data/services";
import { PROJECT_CASE_STUDIES } from "@/data/projects";
import { INSIGHTS } from "@/data/insights";

const LAST_MODIFIED = "2026-06-22";

type SitemapEntry = { path: string; changefreq: string; priority: string; lastmod: string };

const staticPages: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: LAST_MODIFIED },
  { path: "/about", changefreq: "monthly", priority: "0.8", lastmod: LAST_MODIFIED },
  { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: LAST_MODIFIED },
  { path: "/projects", changefreq: "weekly", priority: "0.9", lastmod: LAST_MODIFIED },
  { path: "/process", changefreq: "monthly", priority: "0.7", lastmod: LAST_MODIFIED },
  { path: "/pricing", changefreq: "monthly", priority: "0.8", lastmod: "2026-10-12" },
  { path: "/quote", changefreq: "monthly", priority: "0.7", lastmod: "2026-10-12" },
  { path: "/tech-stack", changefreq: "monthly", priority: "0.6", lastmod: "2026-10-12" },
  { path: "/industries", changefreq: "monthly", priority: "0.7", lastmod: "2026-10-12" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-12" },
  { path: "/terms", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-12" },
  { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: LAST_MODIFIED },
  { path: "/faq", changefreq: "monthly", priority: "0.7", lastmod: LAST_MODIFIED },
  { path: "/contact", changefreq: "monthly", priority: "0.8", lastmod: LAST_MODIFIED },
];

const pages: SitemapEntry[] = [
  ...staticPages,
  ...SERVICE_DETAIL_PAGES.map((s) => ({
    path: `/services/${s.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: LAST_MODIFIED,
  })),
  ...PROJECT_CASE_STUDIES.map((p) => ({
    path: `/projects/${p.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: LAST_MODIFIED,
  })),
  ...INSIGHTS.map((i) => ({
    path: `/blog/${i.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: i.publishedAt.slice(0, 10),
  })),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = pages.map(({ path, changefreq, priority, lastmod }) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${path === "/" ? "" : path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${changefreq}</changefreq>`,
            `    <priority>${priority}</priority>`,
            "  </url>",
          ].join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
