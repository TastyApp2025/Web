// Manual restaurant data - easily editable
// Add your restaurants here with image URL links (from Unsplash, Pexels, etc.)

export interface Restaurant {
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

export const restaurants: Restaurant[] = [
  {
    id: "addis-cape-1",
    name: "Addis in Cape Ethiopian Restaurant",
    location: "Cape Town, South Africa",
    type: "Ethiopian",
    description: "Authentic Ethiopian cuisine with traditional flavors and communal dining experience.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    mapLink: "https://maps.google.com/maps?q=Addis+in+Cape+Ethiopian+Restaurant+Cape+Town",
    address: "Cape Town",
    rating: 4.5,
  },
  {
    id: "seven-colours-1",
    name: "Seven Colours Eatery",
    location: "Cape Town, South Africa",
    type: "Café",
    description: "Vibrant eatery offering contemporary cuisine in a colorful, welcoming atmosphere.",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
    mapLink: "https://maps.google.com/maps?q=Seven+Colours+Eatery+Cape+Town",
    address: "Cape Town",
    rating: 4.3,
  },
  {
    id: "idiot-sandwich-1",
    name: "The Idiot Sandwich Café",
    location: "Cape Town, South Africa",
    type: "Café",
    description: "Cozy café known for creative sandwiches and great coffee in a relaxed setting.",
    image: "https://images.unsplash.com/photo-1511621776486-a01980e01a18?w=600&h=400&fit=crop",
    mapLink: "https://maps.google.com/maps?q=The+Idiot+Sandwich+Cafe+Cape+Town",
    address: "Cape Town",
    rating: 4.4,
  },
  {
    id: "andalousse-1",
    name: "Andalousse Moroccan Restaurant",
    location: "Cape Town, South Africa",
    type: "Moroccan",
    description: "Exotic Moroccan flavors served in an authentically decorated restaurant with traditional ambiance.",
    image: "https://images.unsplash.com/photo-1505521316406-da8049a92e5b?w=600&h=400&fit=crop",
    mapLink: "https://maps.google.com/maps?q=Andalousse+Moroccan+Restaurant+Cape+Town",
    address: "Cape Town",
    rating: 4.6,
  },
  {
    id: "addis-redsea-1",
    name: "Addis Red Sea Ethiopian Restaurant",
    location: "Woodstock, Cape Town, South Africa",
    type: "Ethiopian",
    description: "Authentic Red Sea Ethiopian cuisine featuring traditional recipes and warm hospitality.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    mapLink: "https://maps.google.com/maps?q=Addis+Red+Sea+Ethiopian+Restaurant+Cape+Town+Woodstock",
    address: "Woodstock, Cape Town",
    rating: 4.5,
  },
];
