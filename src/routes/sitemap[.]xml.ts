import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://nexa-tech-solutions.vercel.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/about",
          "/team",
          "/services",
          "/projects",
          "/process",
          "/blog",
          "/blog/choosing-between-mern-and-spring-boot-for-kenyan-smes",
          "/blog/integrating-mpesa-daraja-the-right-way",
          "/blog/adding-ai-to-business-software-without-burning-budget",
          "/blog/choosing-vercel-cloudflare-vps-or-cpanel",
          "/blog/what-to-put-in-an-mvp-and-what-to-leave-out",
          "/blog/security-basics-every-business-system-needs",
          "/faq",
          "/contact",
        ];
        const urls = paths.map(
          (p) =>
            `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
