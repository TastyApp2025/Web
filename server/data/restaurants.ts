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
  phone?: string;
  website?: string;
  hours?: string;
  priceRange?: string;
  review?: string;
  rating?: number;
  altText?: string;
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
    address: "168 Loop Street, CBD, Cape Town, 8001",
    phone: "+27 76 846 0929",
    website: "https://addisincape.co.za",
    hours: "Daily, 12:00 PM - 10:00 PM",
    priceRange: "$$",
    rating: 4.5,
    altText: "Addis in Cape Ethiopian Restaurant entrance with traditional decor and dining ambiance",
    review: "[YOUR DETAILED REVIEW GOES HERE - Write your review and it will appear on the restaurant page]",
  },
  {
    id: "seven-colours-1",
    name: "Seven Colours Eatery",
    location: "Cape Town, South Africa",
    type: "Café",
    description: "Vibrant eatery offering contemporary cuisine in a colorful, welcoming atmosphere.",
    image: "https://lh3.googleusercontent.com/p/AF1QipNwEi0s1xhp2BhRqVUllhgual7IkshSMcz6f-2m=s680-w680-h510-rw",
    mapLink: "https://maps.google.com/maps?q=Seven+Colours+Eatery+Cape+Town",
    address: "Battery Park, V&A Waterfront, Cape Town, 8001",
    phone: "+27 87 265 8762",
    website: "https://www.sevencolourseatery.co.za",
    hours: "Daily, 9:00 AM - 10:00 PM",
    priceRange: "$$",
    rating: 4.3,
    altText: "Seven Colours Eatery entrance with traditional South African decor and dining ambiance",
    review: "[YOUR DETAILED REVIEW GOES HERE - Write your review and it will appear on the restaurant page]",
  },
  {
    id: "idiot-sandwich-1",
    name: "The Idiot Sandwich Café",
    location: "Cape Town, South Africa",
    type: "Café",
    description: "Cozy café known for creative sandwiches and great coffee in a relaxed setting.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwM3mjtafLTVinph18poHUscGolIrxzbBhdlzlPiG29QYk6iNATPcaeEDBH_QVBd1mSvG-dbypMQyOCVmApk38ndizr2mxO4et263W6qyIavDmB6S0J1p3BT9BUuNGDIT5gfvnv=s680-w680-h510-rw",
    mapLink: "https://maps.google.com/maps?q=The+Idiot+Sandwich+Cafe+Cape+Town",
    address: "Goodwood, Cape Town, 8000",
    phone: "",
    website: "",
    hours: "Monday - Saturday, Hours Vary (Closed Sundays)",
    priceRange: "$",
    rating: 4.4,
    altText: "The Idiot Sandwich Café entrance with café-style decor and dining ambiance",
    review: "[YOUR DETAILED REVIEW GOES HERE - Write your review and it will appear on the restaurant page]",
  },
  {
    id: "andalousse-1",
    name: "Andalousse Moroccan Restaurant",
    location: "Cape Town, South Africa",
    type: "Moroccan",
    description: "Exotic Moroccan flavors served in an authentically decorated restaurant with traditional ambiance.",
    image: "https://lh3.googleusercontent.com/p/AF1QipMn3OdCZtmr0DdSs7SrnWICtv_yBjWUuQSJh6k=w289-h312-n-k-no",
    mapLink: "https://maps.google.com/maps?q=Andalousse+Moroccan+Restaurant+Cape+Town",
    address: "De Waterkant, Cape Town, 8001",
    phone: "+27 21 433 1820",
    website: "",
    hours: "Daily, 12:00 PM - 11:00 PM",
    priceRange: "$$$",
    rating: 4.6,
    altText: "Andalousse Moroccan Restaurant entrance with traditional Moroccan decor and ambiance",
    review: "[YOUR DETAILED REVIEW GOES HERE - Write your review and it will appear on the restaurant page]",
  },
];
