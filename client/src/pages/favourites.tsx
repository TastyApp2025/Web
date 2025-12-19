import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import atmosphereImage from "@assets/generated_images/south_african_dining_atmosphere.png";

const FAVOURITES = [
  {
    id: 1,
    name: "The Test Kitchen Carbon",
    location: "Johannesburg",
    type: "Fine Dining",
    image: atmosphereImage, // Using placeholder for demo
    mapLink: "https://maps.google.com"
  },
  {
    id: 2,
    name: "Eastern Food Bazaar",
    location: "Cape Town",
    type: "Street Food",
    image: atmosphereImage,
    mapLink: "https://maps.google.com"
  },
  {
    id: 3,
    name: "Marble",
    location: "Rosebank",
    type: "Grill",
    image: atmosphereImage,
    mapLink: "https://maps.google.com"
  },
  {
    id: 4,
    name: "Fyn",
    location: "Cape Town",
    type: "Fusion",
    image: atmosphereImage,
    mapLink: "https://maps.google.com"
  },
  {
    id: 5,
    name: "Chefs Warehouse",
    location: "Tintswalo Atlantic",
    type: "Tapas",
    image: atmosphereImage,
    mapLink: "https://maps.google.com"
  }
];

export default function Favourites() {
  return (
    <Layout>
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-4xl mb-2">Chef's Favourites</h1>
          <p className="text-muted-foreground">The spots I keep going back to.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FAVOURITES.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md bg-white">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  {place.type}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-xl mb-1">{place.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin size={14} className="mr-1" />
                  {place.location}
                </div>
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
    </Layout>
  );
}