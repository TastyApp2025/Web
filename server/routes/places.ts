import { Router, Request, Response } from "express";
import { restaurants } from "../data/restaurants";

const router = Router();

// Helper function for flexible restaurant matching
function findRestaurantByQuery(query: string) {
  const queryLower = query.toLowerCase();
  
  // Try exact name match first
  let match = restaurants.find(
    (r) => r.name.toLowerCase() === queryLower
  );
  
  if (match) return match;
  
  // Try partial name match (query contains restaurant name or vice versa)
  match = restaurants.find(
    (r) =>
      queryLower.includes(r.name.toLowerCase()) ||
      r.name.toLowerCase().includes(queryLower)
  );
  
  if (match) return match;
  
  // Try matching by key words (first 3+ character words)
  const queryWords = queryLower.split(' ').filter(w => w.length >= 3);
  match = restaurants.find((r) => {
    const nameWords = r.name.toLowerCase().split(' ');
    return queryWords.some(qw => nameWords.some(nw => nw.includes(qw) || qw.includes(nw)));
  });
  
  return match || null;
}

// Search for a single restaurant by name
router.post("/api/places/search", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const restaurant = findRestaurantByQuery(query);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error("Error searching restaurant:", error);
    res.status(500).json({
      error: "Failed to fetch restaurant details",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Batch search - returns all restaurants or filters by queries
router.post("/api/places/batch", async (req: Request, res: Response) => {
  try {
    const { queries } = req.body;

    // If queries provided, filter restaurants based on them
    if (Array.isArray(queries) && queries.length > 0) {
      const places = queries.map((query) => {
        const restaurant = findRestaurantByQuery(query);

        if (restaurant) {
          return restaurant;
        }

        return {
          error: `Restaurant not found for: ${query}`,
          query: query,
        };
      });

      res.json(places);
    } else {
      // No queries provided - return all restaurants
      res.json(restaurants);
    }
  } catch (error) {
    console.error("Error batch searching restaurants:", error);
    res.status(500).json({
      error: "Failed to fetch restaurants",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
