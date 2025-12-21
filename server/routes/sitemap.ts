import type { Express } from "express";

export function registerSitemapRoute(app: Express): void {
  app.get("/sitemap.xml", (req, res) => {
    // Get the domain from the request host or use environment variable
    const host = req.get("host") || process.env.SITE_URL || "https://www.foryourinfluence.co.za";
    const protocol = req.protocol || "https";
    const siteUrl = process.env.SITE_URL || `${protocol}://${host}`;
    const lastModified = new Date().toISOString().split("T")[0];

    const routes = [
      { path: "/", priority: "1.0", changefreq: "weekly" },
      { path: "/about", priority: "0.8", changefreq: "monthly" },
      { path: "/favourites", priority: "0.8", changefreq: "weekly" },
      { path: "/contact", priority: "0.7", changefreq: "monthly" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

    res.type("application/xml");
    res.send(xml);
  });

  // robots.txt
  app.get("/robots.txt", (req, res) => {
    const host = req.get("host") || process.env.SITE_URL || "https://www.foryourinfluence.co.za";
    const protocol = req.protocol || "https";
    const siteUrl = process.env.SITE_URL || `${protocol}://${host}`;
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml`;

    res.type("text/plain");
    res.send(robotsTxt);
  });
}
