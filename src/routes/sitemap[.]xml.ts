import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = "2026-06-22";

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
  {
    path: "/blog/how-much-does-a-business-website-cost-in-kenya-in-2026",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-06-22",
  },
  {
    path: "/blog/website-maintenance-checklist-for-kenyan-businesses",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-06-22",
  },
  {
    path: "/blog/website-vs-web-app-what-should-your-business-build-first",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-06-22",
  },
  {
    path: "/blog/pos-system-features-every-kenyan-retail-shop-needs",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-06-18",
  },
  {
    path: "/blog/google-business-profile-and-local-seo-basics-for-kenyan-smes",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-05-20",
  },
  {
    path: "/blog/mpesa-payment-reconciliation-for-kenyan-business-systems",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-04-17",
  },
  {
    path: "/blog/school-management-systems-in-kenya-what-to-build-first",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-03-19",
  },
  {
    path: "/blog/clinic-and-vaccination-tracker-features-for-kenyan-health-teams",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-02-18",
  },
  {
    path: "/blog/website-redesign-checklist-for-kenyan-companies",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-01-21",
  },
  {
    path: "/blog/business-email-setup-for-kenyan-smes",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2025-12-18",
  },
  {
    path: "/blog/ecommerce-website-features-for-kenyan-online-shops",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2025-11-20",
  },
  {
    path: "/blog/fleet-management-software-for-kenyan-logistics-teams",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2025-10-16",
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
