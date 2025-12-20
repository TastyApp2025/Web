import axios, { AxiosError } from "axios";

export interface PlaceDetails {
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

interface GooglePlacesResponse {
  places?: Array<{
    id: string;
    displayName: {
      text: string;
    };
    formattedAddress?: string;
    types?: string[];
    photos?: Array<{
      name: string;
    }>;
    reviews?: Array<{
      text: {
        text: string;
      };
    }>;
    websiteUri?: string;
    googleMapsUri?: string;
    rating?: number;
  }>;
}

interface PhotoMediaResponse {
  photoUri: string;
}

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BASE_URL = "https://places.googleapis.com/v1";

export async function searchPlace(query: string): Promise<PlaceDetails | null> {
  if (!API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY environment variable is not set");
  }

  try {
    // Search for the place using text search
    const searchUrl = `${BASE_URL}/places:searchText`;
    const searchResponse = await axios.post<GooglePlacesResponse>(
      searchUrl,
      {
        textQuery: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.types,places.photos,places.reviews,places.websiteUri,places.googleMapsUri,places.rating",
        },
      }
    );

    if (!searchResponse.data.places || searchResponse.data.places.length === 0) {
      return null;
    }

    const place = searchResponse.data.places[0];

    // Extract cuisine type from types array
    let cuisineType = "Restaurant";
    if (place.types && place.types.length > 0) {
      const cuisineMap: Record<string, string> = {
        "point_of_interest": "Restaurant",
        "establishment": "Restaurant",
        "food": "Restaurant",
        "cafe": "Café",
        "bakery": "Bakery",
        "bar": "Bar",
        "restaurant": "Restaurant",
      };

      for (const type of place.types) {
        if (cuisineMap[type]) {
          cuisineType = cuisineMap[type];
          break;
        }
      }
    }

    // Get first photo if available
    let imageUrl = "";
    if (place.photos && place.photos.length > 0) {
      imageUrl = await getPhotoUrl(place.photos[0].name);
    }

    // Get description from reviews or use a default
    let description =
      "A wonderful dining destination with excellent food and service.";
    if (place.reviews && place.reviews.length > 0) {
      description = place.reviews[0].text.text.substring(0, 200);
    }

    const placeDetails: PlaceDetails = {
      id: place.id,
      name: place.displayName.text,
      location: place.formattedAddress || "Location unknown",
      type: cuisineType,
      description: description,
      image: imageUrl,
      mapLink: place.googleMapsUri || `https://maps.google.com/maps?q=${encodeURIComponent(place.displayName.text)}`,
      address: place.formattedAddress,
      website: place.websiteUri,
      rating: place.rating,
    };

    return placeDetails;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Google Maps API error:",
      axiosError.response?.data || axiosError.message
    );
    throw error;
  }
}

async function getPhotoUrl(photoName: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY environment variable is not set");
  }

  try {
    const photoUrl = `${BASE_URL}/${photoName}/media`;
    const response = await axios.get<PhotoMediaResponse>(photoUrl, {
      params: {
        key: API_KEY,
        maxWidthPx: 600,
        skipHttpRedirect: true,
      },
    });

    return response.data.photoUri;
  } catch (error) {
    console.error("Error fetching photo:", error);
    return "";
  }
}
