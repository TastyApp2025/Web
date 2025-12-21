import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useSearch, useFilter } from "@/hooks/use-search";
import { siteContent } from "@/data/site-content";
import { Link } from "wouter";

interface PlaceDetails {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  mapLink: string;
  rating?: number;
}

export default function Favourites() {
  const [restaurants, setRestaurants] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/restaurants");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

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
        "streetAddress": place.location,
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

  // Scroll handlers for carousel
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Layout>
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-4xl mb-2 heading-page">
            {siteContent.favourites.title}
          </h1>
          <p className="text-description">
            {siteContent.favourites.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div>
            <label htmlFor="search-restaurants" className="block text-sm font-medium text-label mb-2">
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
              <label className="block text-sm font-medium text-label mb-2">
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
            <p className="text-sm text-body">
              Found {filteredRestaurants.length} of {restaurants.length} restaurants
            </p>
          ) : null}
        </div>

        {/* Results - Horizontal Scrollable Carousel */}
        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-[500px] rounded-xl" />
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-body">
              {searchTerm || selectedType
                ? "No restaurants match your search or filter."
                : siteContent.favourites.emptyState}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="relative group">
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Carousel Container */}
              <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div className="flex gap-4 pb-4 w-max md:gap-6">
                  {filteredRestaurants.map((place) => (
                  <Card
                    key={place.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white hover:translate-y-[-4px] flex-shrink-0 w-72 sm:w-80 md:w-96 flex flex-col card-container"
                    data-section-title={place.name.split(" ")[0]}
                  >
                    {/* Image Section */}
                    <div className="w-full h-40 sm:h-48 md:h-56 overflow-hidden relative bg-muted">
                      {place.image ? (
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                          <div className="text-center">
                            <ImageIcon size={32} className="mx-auto mb-2" />
                            <p className="text-sm">No image</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                        {place.type}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-base sm:text-lg mb-2 line-clamp-2 card-title">
                          {place.name}
                        </h3>
                        <div className="flex items-center text-xs mb-3 card-location">
                          <MapPin size={14} className="mr-1.5 flex-shrink-0" />
                          <span className="line-clamp-1">{place.location}</span>
                        </div>
                        <p className="text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3 card-description">
                          {place.description}
                        </p>
                      </div>
                      <Button className="w-full rounded-lg gap-2 mt-4 h-10" variant="default" asChild>
                        <Link href={`/restaurant/${place.id}`}>
                          Read Full Review
                        </Link>
                      </Button>
                      <Button className="w-full rounded-lg gap-2 mt-2 h-10" variant="secondary" asChild>
                        <a
                          href={place.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation size={16} />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
                </div>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="text-center text-xs text-body">
              Scroll left/right to explore more →
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
