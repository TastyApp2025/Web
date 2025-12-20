import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ImageIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { siteContent } from "@/data/site-content";

interface PlaceDetails {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  mapLink: string;
  address?: string;
  rating?: number;
  website?: string;
}

// Add your restaurant search queries here
const RESTAURANT_QUERIES = [
  "Addis in Cape Ethiopian Restaurant Cape Town",
  "Seven Colours Eatery Cape Town",
  "The Idiot Sandwich Café Cape Town",
  "Andalousse Moroccan Restaurant Cape Town",
  "Addis Red Sea Ethiopian Restaurant Cape Town Woodstock",
];

export default function Favourites() {
  const [restaurants, setRestaurants] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePageMeta({
    title: siteContent.favourites.metaTitle,
    description: siteContent.favourites.metaDescription,
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/places/batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ queries: RESTAURANT_QUERIES }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const data = await response.json();
        const validRestaurants = data.filter(
          (place: any) => !place.error && place.name
        );
        setRestaurants(validRestaurants);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load restaurants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <Layout>
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-4xl mb-2">
            {siteContent.favourites.title}
          </h1>
          <p className="text-muted-foreground">
            {siteContent.favourites.subtitle}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Loader size={32} className="text-primary/60 animate-spin" />
            </div>
            <h2 className="font-display font-bold text-2xl">
              Loading restaurants...
            </h2>
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-red-600" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">
              Unable to Load Restaurants
            </h2>
            <p className="text-muted-foreground text-sm">{error}</p>
            <p className="text-muted-foreground text-xs mt-4">
              Make sure the GOOGLE_MAPS_API_KEY environment variable is set
            </p>
          </div>
        </div>
      ) : restaurants.length === 0 ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-primary/60" />
            </div>
            <h2 className="font-display font-bold text-2xl">
              {siteContent.favourites.emptyState}
            </h2>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((place) => (
              <Card
                key={place.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md bg-white flex flex-col"
              >
                <div className="h-48 overflow-hidden relative bg-muted">
                  {place.image ? (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <div className="text-center">
                        <ImageIcon size={32} className="mx-auto mb-2" />
                        <p className="text-xs">No image available</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {place.type}
                  </div>
                </div>
                <CardContent className="p-6 flex-1">
                  <h3 className="font-display font-bold text-xl mb-1">
                    {place.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <MapPin size={14} className="mr-1" />
                    {place.location}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {place.description}
                  </p>
                  {place.rating && (
                    <div className="mt-2 text-sm font-semibold text-amber-600">
                      ★ {place.rating.toFixed(1)} rating
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full rounded-full gap-2" variant="secondary" asChild>
                    <a
                      href={place.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation size={16} />
                      Get Directions
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
