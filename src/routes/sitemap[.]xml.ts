import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = "2026-06-13";

const pages = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: LAST_MODIFIED },
  { path: "/about", changefreq: "monthly", priority: "0.8", lastmod: LAST_MODIFIED },
  { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: LAST_MODIFIED },
  { path: "/projects", changefreq: "weekly", priority: "0.9", lastmod: LAST_MODIFIED },
  { path: "/process", changefreq: "monthly", priority: "0.7", lastmod: LAST_MODIFIED },
  { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: LAST_MODIFIED },
  {
    path: "/blog/choosing-between-mern-and-spring-boot-for-kenyan-smes",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2025-12-10",
  },
  {
    path: "/blog/integrating-mpesa-daraja-the-right-way",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-01-14",
  },
  {
    path: "/blog/adding-ai-to-business-software-without-burning-budget",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-02-11",
  },
  {
    path: "/blog/choosing-vercel-cloudflare-vps-or-cpanel",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-03-12",
  },
  {
    path: "/blog/what-to-put-in-an-mvp-and-what-to-leave-out",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-04-09",
  },
  {
    path: "/blog/security-basics-every-business-system-needs",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-05-13",
  },
  { path: "/faq", changefreq: "monthly", priority: "0.7", lastmod: LAST_MODIFIED },
  { path: "/contact", changefreq: "monthly", priority: "0.8", lastmod: LAST_MODIFIED },
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
