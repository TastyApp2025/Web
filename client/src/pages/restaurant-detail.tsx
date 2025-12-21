import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { MapPin, Phone, Globe, Clock, DollarSign, Navigation, ChevronLeft, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface Restaurant {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  mapLink: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  priceRange?: string;
  review?: string;
  rating?: number;
  altText?: string;
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch restaurant data
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`/api/restaurants/${id}`);

        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
          setError(null);
        } else {
          setError(`Failed to load restaurant (${response.status})`);
          console.error("Restaurant not found:", response.status);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        setError(`Error fetching restaurant: ${errorMsg}`);
        console.error("Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading restaurant details...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <p className="text-sm text-muted-foreground mb-6">ID: {id}</p>
          <Button asChild>
            <Link href="/favourites">Back to Restaurants</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (!restaurant) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Button asChild>
            <Link href="/favourites">Back to Restaurants</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Build structured data safely
  const structuredData: any = {
    "@context": "https://schema.org/",
    "@type": "Restaurant",
    name: restaurant.name,
    image: restaurant.image,
    description: restaurant.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address || restaurant.location,
    },
  };

  if (restaurant.phone) {
    structuredData.telephone = restaurant.phone;
  }

  if (restaurant.website) {
    structuredData.url = restaurant.website;
  }

  if (restaurant.rating) {
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating.toString(),
      reviewCount: "1",
    };
  }

  usePageMeta({
    title: `${restaurant.name} - Restaurant Review | ForYourInfluence`,
    description: `${restaurant.name} - ${restaurant.type} restaurant in ${restaurant.location}. Read an honest, independent review from professional chef Wesley.`,
    url: `https://www.foryourinfluence.co.za/restaurant/${id}`,
    keywords: `${restaurant.name}, restaurant review, ${restaurant.type}, Cape Town`,
    structuredData,
  });

  const priceRangeDisplay = {
    "$": "Budget-Friendly",
    "$$": "Moderate",
    "$$$": "Upscale",
    "$$$$": "Fine Dining",
  } as Record<string, string>;

  return (
    <Layout>
      <div className="bg-primary/5 py-6 mb-12">
        <div className="container mx-auto px-4">
          <Link href="/favourites" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 mb-6">
            <ChevronLeft size={16} />
            Back to Restaurants
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-3xl">
        {/* Restaurant Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={restaurant.image}
            alt={restaurant.altText || restaurant.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {restaurant.type}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">{restaurant.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Star size={20} className="fill-amber-500 text-amber-500" />
              <span className="text-2xl font-bold">{restaurant.rating?.toFixed(1)}</span>
            </div>
            <p className="text-lg text-muted-foreground">{restaurant.location}</p>
          </div>

          <p className="text-lg text-foreground leading-relaxed">{restaurant.description}</p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {restaurant.address && (
            <Card className="p-6 border-2 border-border bg-muted/30">
              <div className="flex gap-3">
                <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm uppercase text-muted-foreground mb-1">Address</h3>
                  <p className="font-semibold text-foreground">{restaurant.address}</p>
                </div>
              </div>
            </Card>
          )}

          {restaurant.phone && (
            <Card className="p-6 border-2 border-border bg-muted/30">
              <div className="flex gap-3">
                <Phone size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm uppercase text-muted-foreground mb-1">Phone</h3>
                  <a href={`tel:${restaurant.phone}`} className="font-semibold text-primary hover:underline">
                    {restaurant.phone}
                  </a>
                </div>
              </div>
            </Card>
          )}

          {restaurant.hours && (
            <Card className="p-6 border-2 border-border bg-muted/30">
              <div className="flex gap-3">
                <Clock size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm uppercase text-muted-foreground mb-1">Hours</h3>
                  <p className="font-semibold text-foreground">{restaurant.hours}</p>
                </div>
              </div>
            </Card>
          )}

          {restaurant.priceRange && (
            <Card className="p-6 border-2 border-border bg-muted/30">
              <div className="flex gap-3">
                <DollarSign size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm uppercase text-muted-foreground mb-1">Price Range</h3>
                  <p className="font-semibold text-foreground">
                    {priceRangeDisplay[restaurant.priceRange] || restaurant.priceRange}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {restaurant.website && (
            <Card className="p-6 border-2 border-border bg-muted/30">
              <div className="flex gap-3">
                <Globe size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm uppercase text-muted-foreground mb-1">Website</h3>
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline break-all"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Review Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 heading-section">My Review</h2>
          <Card className="p-8 bg-muted/20 border-2 border-border">
            <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground">
              {restaurant.review}
            </p>
          </Card>
        </div>

        {/* Directions Button */}
        <Button className="w-full gap-2 h-12 text-base" asChild>
          <a href={restaurant.mapLink} target="_blank" rel="noopener noreferrer">
            <Navigation size={20} />
            View Directions on Google Maps
          </a>
        </Button>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>
            This is an independent, honest review. Wesley visits restaurants and pays for his own meals. No
            sponsorships or free content.
          </p>
        </div>
      </div>
    </Layout>
  );
}
