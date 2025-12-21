import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { MapPin, Phone, Globe, Clock, DollarSign, Navigation, ChevronLeft, Star, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: `${restaurant?.name} - ForYourInfluence Review`,
      text: `Check out Wesley's review of ${restaurant?.name} on ForYourInfluence!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "The review link has been copied to your clipboard.",
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

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

  // Build structured data safely
  const structuredData = restaurant ? {
    "@context": "https://schema.org/",
    "@type": "Restaurant",
    name: restaurant.name,
    image: restaurant.image,
    description: restaurant.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address || restaurant.location,
    },
    ...(restaurant.phone && { telephone: restaurant.phone }),
    ...(restaurant.website && { url: restaurant.website }),
    ...(restaurant.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: restaurant.rating.toString(),
        reviewCount: "1",
      },
    }),
  } : undefined;

  usePageMeta({
    title: restaurant ? `${restaurant.name} - Restaurant Review | ForYourInfluence` : "Restaurant Review | ForYourInfluence",
    description: restaurant ? `Read Chef Wesley's review of ${restaurant.name}, a ${restaurant.type} restaurant in ${restaurant.location}. Honest, self-funded food reviews.` : "Read Chef Wesley's honest, self-funded food reviews.",
    url: `https://www.foryourinfluence.co.za/restaurant/${id}`,
    keywords: restaurant ? `${restaurant.name} review, ${restaurant.name} ${restaurant.location}, ${restaurant.type} restaurant ${restaurant.location}, Cape Town food reviews` : "restaurant review, food reviews, South Africa",
    structuredData,
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading restaurant details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !restaurant) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-muted-foreground mb-6">{error || "Restaurant not found"}</p>
          <p className="text-sm text-muted-foreground mb-6">ID: {id}</p>
          <Button asChild>
            <Link href="/favourites">Back to Restaurants</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const priceRangeDisplay = {
    "$": "Budget-Friendly",
    "$$": "Moderate",
    "$$$": "Upscale",
    "$$$$": "Fine Dining",
  } as Record<string, string>;

  return (
    <Layout>
      <div className="bg-primary/5 py-6 mb-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/favourites" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80">
            <ChevronLeft size={16} />
            Back to Restaurants
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
            onClick={handleShare}
          >
            <Share2 size={16} />
            Share Review
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        {/* Restaurant Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={restaurant.image}
            alt={`${restaurant.name} - ${restaurant.type} restaurant in ${restaurant.location}`}
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
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(restaurant.rating || 0) ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}
                  />
                ))}
                <span className="ml-2 text-xl font-bold">{restaurant.rating.toFixed(1)}</span>
              </div>
            )}
            <p className="text-lg text-muted-foreground">{restaurant.location}</p>
          </div>

          <p className="text-lg text-foreground leading-relaxed">{restaurant.description}</p>
        </div>

        {/* Info Cards - Quick Details */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 sr-only">Restaurant Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {restaurant.address && (
              <Card className="p-4 flex flex-col items-center text-center border-2 border-border bg-muted/30 hover:border-primary transition-colors h-full">
                <MapPin size={24} className="text-primary mb-2 flex-shrink-0" />
                <h3 className="font-bold text-[10px] uppercase text-muted-foreground mb-1">Address</h3>
                <p className="text-xs font-semibold line-clamp-2">{restaurant.address}</p>
              </Card>
            )}

            {restaurant.phone && (
              <Card className="p-4 flex flex-col items-center text-center border-2 border-border bg-muted/30 hover:border-primary transition-colors h-full">
                <Phone size={24} className="text-primary mb-2 flex-shrink-0" />
                <h3 className="font-bold text-[10px] uppercase text-muted-foreground mb-1">Phone</h3>
                <a href={`tel:${restaurant.phone}`} className="text-xs font-semibold text-primary hover:underline truncate w-full">
                  {restaurant.phone}
                </a>
              </Card>
            )}

            {restaurant.hours && (
              <Card className="p-4 flex flex-col items-center text-center border-2 border-border bg-muted/30 hover:border-primary transition-colors h-full">
                <Clock size={24} className="text-primary mb-2 flex-shrink-0" />
                <h3 className="font-bold text-[10px] uppercase text-muted-foreground mb-1">Hours</h3>
                <p className="text-xs font-semibold line-clamp-2">{restaurant.hours}</p>
              </Card>
            )}

            {restaurant.priceRange && (
              <Card className="p-4 flex flex-col items-center text-center border-2 border-border bg-muted/30 hover:border-primary transition-colors h-full">
                <DollarSign size={24} className="text-primary mb-2 flex-shrink-0" />
                <h3 className="font-bold text-[10px] uppercase text-muted-foreground mb-1">Price</h3>
                <p className="text-xs font-semibold">{priceRangeDisplay[restaurant.priceRange] || restaurant.priceRange}</p>
              </Card>
            )}

            {restaurant.website && (
              <Card className="p-4 flex flex-col items-center text-center border-2 border-border bg-muted/30 hover:border-primary transition-colors h-full">
                <Globe size={24} className="text-primary mb-2 flex-shrink-0" />
                <h3 className="font-bold text-[10px] uppercase text-muted-foreground mb-1">Website</h3>
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Visit
                </a>
              </Card>
            )}
          </div>
        </div>

        {/* Review Section - Scrollable and Long Text Friendly */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 heading-section">Chef Wesley's Review</h2>
          <Card className="bg-muted/20 border-2 border-border overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                {restaurant.review}
              </p>
            </div>
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
