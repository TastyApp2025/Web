export interface Place {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  mapLink: string;
}

// Add your restaurants here. No limit - add as many as you want!
// Template for a new restaurant:
// {
//   id: 1,
//   name: "Restaurant Name",
//   location: "City, Country",
//   type: "Cuisine Type",
//   description: "Short description",
//   image: "/images/places/place1.jpg",
//   mapLink: "https://maps.google.com/maps?q=restaurant+address"
// },

export const FAVOURITES: Place[] = [
  {
    id: 1,
    name: "Addis in Cape Ethiopian Restaurant",
    location: "Cape Town",
    type: "Ethiopian",
    description: "Authentic Ethiopian cuisine with traditional injera and vibrant flavors. Experience the warmth of Ethiopian hospitality with expertly spiced dishes and communal dining.",
    image: "/attached_assets/generated_images/professional_chef_plating_south_african_food.png",
    mapLink: "https://maps.app.goo.gl/M1gK7TLhXLz2DNaa8"
  },
  {
    id: 2,
    name: "Seven Colours Eatery",
    location: "Cape Town",
    type: "South African",
    description: "Vibrant South African cuisine celebrating local flavors and traditions. From braised meats to fresh vegetables, every dish tells a story of South Africa's diverse culinary heritage.",
    image: "/attached_assets/generated_images/south_african_dining_atmosphere.png",
    mapLink: "https://maps.app.goo.gl/EgB7RMdC89zJsj8e8"
  },
  {
    id: 3,
    name: "The Idiot Sandwich Café",
    location: "Cape Town",
    type: "Café",
    description: "Creative sandwiches and café fare with a unique, playful approach. Perfect for a quick lunch with fresh ingredients and inventive flavor combinations.",
    image: "/attached_assets/generated_images/fresh_ingredients_tomato_and_herbs.png",
    mapLink: "https://maps.app.goo.gl/s2m9zvfKRBiVvgDX9"
  },
  {
    id: 4,
    name: "Andalousse Moroccan Restaurant",
    location: "Cape Town",
    type: "Moroccan",
    description: "Authentic Moroccan cuisine with rich spices and warm hospitality. Enjoy traditional tagines, couscous, and mint tea in an elegant setting inspired by North African culture.",
    image: "/attached_assets/generated_images/professional_chef_plating_south_african_food.png",
    mapLink: "https://maps.app.goo.gl/USyLgBYPMFucjEir8"
  }
];
