import type { Express } from "express";
import { restaurants } from "../data/restaurants";

export function registerSitemapRoute(app: Express): void {
  app.get("/sitemap.xml", (req, res) => {
    try {
      // Get the domain from the request host or use environment variable
      const siteUrl = process.env.SITE_URL || "https://www.foryourinfluence.co.za";
      const lastModified = new Date().toISOString().split("T")[0];

      const mainRoutes = [
        { path: "/", priority: "1.0", changefreq: "weekly" },
        { path: "/about", priority: "0.8", changefreq: "monthly" },
        { path: "/favourites", priority: "0.8", changefreq: "weekly" },
        { path: "/contact", priority: "0.7", changefreq: "monthly" },
      ];

      // Add individual restaurant pages to sitemap
      const restaurantRoutes = restaurants.map((restaurant) => ({
        path: `/restaurant/${restaurant.id}`,
        priority: "0.9",
        changefreq: "monthly",
      }));

      const allRoutes = [...mainRoutes, ...restaurantRoutes];

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

      res.type("application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // robots.txt
  app.get("/robots.txt", (req, res) => {
    try {
      const siteUrl = process.env.SITE_URL || "https://www.foryourinfluence.co.za";
      const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml`;

      res.type("text/plain");
      res.send(robotsTxt);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).send("Error generating robots.txt");
    }
  });
}
