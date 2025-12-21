import type { Express } from "express";
import { restaurants } from "../data/restaurants";

export function registerRestaurantRoutes(app: Express): void {
  // Get all restaurants
  app.get("/api/restaurants", (req, res) => {
    try {
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  });

  // Get single restaurant by ID
  app.get("/api/restaurants/:id", (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = restaurants.find((r) => r.id === id);

      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurant" });
    }
  });
}
