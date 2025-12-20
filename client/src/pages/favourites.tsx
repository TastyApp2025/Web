import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ImageIcon } from "lucide-react";
import { FAVOURITES } from "@/data/favourites-data";
import { siteContent } from "@/data/site-content";

export default function Favourites() {
  const hasRestaurants = FAVOURITES.length > 0;

  return (
    <Layout>
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-4xl mb-2">{siteContent.favourites.title}</h1>
          <p className="text-muted-foreground">{siteContent.favourites.subtitle}</p>
        </div>
      </div>

      {!hasRestaurants ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-primary/60" />
            </div>
            <h2 className="font-display font-bold text-2xl">{siteContent.favourites.emptyState}</h2>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAVOURITES.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md bg-white flex flex-col">
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
                        <p className="text-xs">Add image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {place.type}
                  </div>
                </div>
                <CardContent className="p-6 flex-1">
                  <h3 className="font-display font-bold text-xl mb-1">{place.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <MapPin size={14} className="mr-1" />
                    {place.location}
                  </div>
                  <p className="text-sm text-muted-foreground">{place.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full rounded-full gap-2" variant="secondary" asChild>
                    <a href={place.mapLink} target="_blank" rel="noopener noreferrer">
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