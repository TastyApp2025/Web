import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation, ImageIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useSearch, useFilter } from "@/hooks/use-search";
import { siteContent } from "@/data/site-content";

interface PlaceDetails {
  id: number;
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

export default function Favourites() {
  const [restaurants, setRestaurants] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Apply search and filter
  const filteredRestaurants = useFilter(
    useSearch(restaurants, searchTerm, ["name", "location", "description"]),
    "type",
    selectedType
  );

  // Get unique types for filter
  const uniqueTypes = Array.from(new Set(restaurants.map(r => r.type))).sort();

  const restaurantStructuredData = restaurants.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": siteContent.favourites.title,
    "itemListElement": restaurants.map((place, index) => ({
      "@type": "LocalBusiness",
      "position": index + 1,
      "name": place.name,
      "description": place.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": place.address || place.location,
      },
      "image": place.image,
      "url": place.mapLink,
    })),
  } : undefined;

  usePageMeta({
    title: siteContent.favourites.metaTitle,
    description: siteContent.favourites.metaDescription,
    url: "https://www.foryourinfluence.co.za/favourites",
    keywords: "favourite restaurants, South African restaurants, restaurant recommendations",
    structuredData: restaurantStructuredData,
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/data/favourites.json");

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const data = await response.json();
        setRestaurants(data);
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
        <div className="container mx-auto px-4 py-12">
          {/* Loading Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-2 border-border">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-muted">
                    <Skeleton className="w-full h-full rounded-none" />
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-3 p-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 w-full pt-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-red-600" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">
              Unable to Load Restaurants
            </h2>
            <p className="text-muted-foreground text-sm mb-6">{error}</p>
            
            {apiErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold text-red-800 mb-3">API Errors:</p>
                <ul className="space-y-2">
                  {apiErrors.map((err, idx) => (
                    <li key={idx} className=md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-primary/60" />
            </div>
            <h2 className="font-display font-bold text-2xl">
              {siteContent.favourites.emptyState}
            </h2
        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div>
              <label htmlFor="search-restaurants" className="block text-sm font-medium text-foreground mb-2">
                Search
              </label>
              <div className="relative">
                <Input
                  id="search-restaurants"
                  type="text"
                  placeholder="Search by name, location, or cuisine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-10 rounded-full bg-white border-border"
                  aria-label="Search restaurants"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {uniqueTypes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Filter by Type
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedType === null
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                    aria-label="Show all types"
                  >
                    All
                  </button>
                  {uniqueTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedType === type
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      }`}
                      aria-label={`Filter by ${type}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results count */}
            {searchTerm || selectedType ? (
              <p className="text-sm text-muted-foreground">
                Found {filteredRestaurants.length} of {restaurants.length} restaurants
              </p>
            ) : null}
          </div>

          {/* Results */}
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm || selectedType
                  ? "No restaurants match your search or filter."
                  : siteContent.favourites.emptyState}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((place) => (
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
          )}
        </div>
      )}
    </Layout>
  );
}

