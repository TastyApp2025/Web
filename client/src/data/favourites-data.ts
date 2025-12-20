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
    description: "Authentic Ethiopian cuisine with traditional injera and vibrant flavors.",
    image: "",
    mapLink: "https://maps.app.goo.gl/M1gK7TLhXLz2DNaa8"
  },
  {
    id: 2,
    name: "Seven Colours Eatery",
    location: "Cape Town",
    type: "South African",
    description: "Vibrant South African cuisine celebrating local flavors and traditions.",
    image: "",
    mapLink: "https://maps.app.goo.gl/EgB7RMdC89zJsj8e8"
  },
  {
    id: 3,
    name: "The Idiot Sandwich Café",
    location: "Cape Town",
    type: "Café",
    description: "Creative sandwiches and café fare with a unique, playful approach.",
    image: "",
    mapLink: "https://maps.app.goo.gl/s2m9zvfKRBiVvgDX9"
  },
  {
    id: 4,
    name: "Andalousse Moroccan Restaurant",
    location: "Cape Town",
    type: "Moroccan",
    description: "Authentic Moroccan cuisine with rich spices and warm hospitality.",
    image: "",
    mapLink: "https://maps.app.goo.gl/USyLgBYPMFucjEir8"
  },
  {
    id: 5,
    name: "Addis in Cape Ethiopian Restaurant",
    location: "Cape Town",
    type: "Ethiopian",
    description: "Another branch of authentic Ethiopian cuisine experience.",
    image: "",
    mapLink: "https://maps.app.goo.gl/K1SsWXsJ4G4FX7kh9"
  }
];
