import { Router, Request, Response } from "express";
import { searchPlace } from "../services/googleMapsService";

const router = Router();

router.post("/api/places/search", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const placeDetails = await searchPlace(query);

    if (!placeDetails) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(placeDetails);
  } catch (error) {
    console.error("Error searching place:", error);
    res.status(500).json({
      error: "Failed to fetch place details",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post("/api/places/batch", async (req: Request, res: Response) => {
  try {
    const { queries } = req.body;

    if (!Array.isArray(queries)) {
      return res.status(400).json({ error: "Queries must be an array" });
    }

    const results = await Promise.allSettled(
      queries.map((query) => searchPlace(query))
    );

    const places = results.map((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        return result.value;
      }
      
      let errorMessage = `Failed to fetch place for query: ${queries[index]}`;
      if (result.status === "rejected") {
        console.error(`Query "${queries[index]}" failed:`, result.reason);
        errorMessage = result.reason instanceof Error ? result.reason.message : String(result.reason);
      }
      
      return {
        error: errorMessage,
        query: queries[index],
      };
    });

    res.json(places);
  } catch (error) {
    console.error("Error batch searching places:", error);
    res.status(500).json({
      error: "Failed to fetch places",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
