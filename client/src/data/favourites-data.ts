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
  // Add your restaurants here
];
