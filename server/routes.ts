import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import placesRouter from "./routes/places";
import { registerContactRoutes } from "./routes/contact";
import { registerSitemapRoute } from "./routes/sitemap";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Google Maps Places API routes
  app.use(placesRouter);

  // Contact Form routes
  registerContactRoutes(app);

  // Sitemap & Robots routes
  registerSitemapRoute(app);

  return httpServer;
}
