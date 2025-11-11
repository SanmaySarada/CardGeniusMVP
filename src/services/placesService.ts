/**
 * Google Places API Service
 * Finds nearby places and place details
 */

export interface PlaceResult {
  placeId: string;
  name: string;
  types: string[];
  location: {
    lat: number;
    lng: number;
  };
  vicinity?: string;
  rating?: number;
  distance?: number; // in meters
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Find nearby places using Google Places API Nearby Search
 */
export async function findNearbyPlaces(
  lat: number,
  lng: number,
  radius: number = 500 // meters
): Promise<PlaceResult[]> {
  if (!API_KEY) {
    console.error('Google Maps API key not found');
    return [];
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${API_KEY}`;
    
    // Note: This will fail due to CORS in browser. We need to use a proxy or the JS SDK
    // For now, we'll use the Maps JavaScript API's PlacesService
    console.warn('Using client-side Places API - results may be limited');
    
    // We'll implement this using the @googlemaps/js-api-loader or the Map instance
    return [];
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
}

/**
 * Get the closest place to a location
 * This uses the Places Service from the Maps JavaScript API
 */
export function getClosestPlace(
  map: google.maps.Map,
  location: google.maps.LatLngLiteral
): Promise<PlaceResult | null> {
  return new Promise((resolve) => {
    const service = new google.maps.places.PlacesService(map);
    
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: 'establishment', // Any type of business
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const place = results[0]; // Closest place
        
        const result: PlaceResult = {
          placeId: place.place_id || '',
          name: place.name || 'Unknown Place',
          types: place.types || [],
          location: {
            lat: place.geometry?.location?.lat() || location.lat,
            lng: place.geometry?.location?.lng() || location.lng,
          },
          vicinity: place.vicinity,
          rating: place.rating,
        };
        
        resolve(result);
      } else {
        console.warn('Places API status:', status);
        resolve(null);
      }
    });
  });
}

/**
 * Calculate distance between two points in meters
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Convert meters to miles
 */
export function metersToMiles(meters: number): number {
  return meters * 0.000621371;
}

/**
 * Format distance for display
 */
export function formatDistance(meters: number): string {
  const miles = metersToMiles(meters);
  if (miles < 0.1) {
    return `${Math.round(meters)} ft`;
  }
  return `${miles.toFixed(1)} mi`;
}

