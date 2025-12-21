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
    image: "https://lh3.googleusercontent.com/p/AF1QipMC95iHhhFfZXrf0N0k6qwAJaWwA-7rcadqy7ac=s680-w680-h510-rw",
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
    image: "https://lh3.googleusercontent.com/p/AF1QipNwEi0s1xhp2BhRqVUllhgual7IkshSMcz6f-2m=s680-w680-h510-rw",
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
    image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwM3mjtafLTVinph18poHUscGolIrxzbBhdlzlPiG29QYk6iNATPcaeEDBH_QVBd1mSvG-dbypMQyOCVmApk38ndizr2mxO4et263W6qyIavDmB6S0J1p3BT9BUuNGDIT5gfvnv=s680-w680-h510-rw",
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
    image: "https://lh3.googleusercontent.com/p/AF1QipMn3OdCZtmr0DdSs7SrnWICtv_yBjWUuQSJh6k=w289-h312-n-k-no",
    mapLink: "https://maps.google.com/maps?q=Andalousse+Moroccan+Restaurant+Cape+Town",
    address: "Cape Town",
    rating: 4.6,
  },
];
