import Constants from 'expo-constants';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCuQsZ28OaiqCMCVpWH6DWnBuRvoRK8kuw';

export interface PlaceDetails {
  placeId: string;
  name: string;
  formattedAddress: string;
  types: string[];
}

export interface NearbyPlace extends PlaceDetails {
  location: {
    lat: number;
    lng: number;
  };
  distance?: number;
}

/**
 * Find a place by text query (address or name)
 */
export async function findPlaceFromText(query: string): Promise<PlaceDetails | null> {
  const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  const params = new URLSearchParams({
    input: query,
    inputtype: 'textquery',
    fields: 'place_id,name,formatted_address,types',
    key: GOOGLE_PLACES_API_KEY,
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Places API error: ${response.status}`);
    }

    const data = await response.json();
    const candidates = data.candidates || [];

    if (candidates.length === 0) {
      return null;
    }

    const place = candidates[0];
    return {
      placeId: place.place_id,
      name: place.name,
      formattedAddress: place.formatted_address,
      types: place.types || [],
    };
  } catch (error) {
    console.error('Error finding place:', error);
    return null;
  }
}

/**
 * Search for nearby places based on current location
 */
export async function searchNearbyPlaces(
  latitude: number,
  longitude: number,
  radius: number = 500
): Promise<NearbyPlace[]> {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = new URLSearchParams({
    location: `${latitude},${longitude}`,
    radius: radius.toString(),
    key: GOOGLE_PLACES_API_KEY,
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Places API error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results || [];

    return results.map((place: any) => ({
      placeId: place.place_id,
      name: place.name,
      formattedAddress: place.vicinity || '',
      types: place.types || [],
      location: {
        lat: place.geometry?.location?.lat || 0,
        lng: place.geometry?.location?.lng || 0,
      },
    }));
  } catch (error) {
    console.error('Error searching nearby places:', error);
    return [];
  }
}

/**
 * Reverse geocode coordinates to get place details
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<PlaceDetails | null> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json';
  const params = new URLSearchParams({
    latlng: `${latitude},${longitude}`,
    key: GOOGLE_PLACES_API_KEY,
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Geocode API error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results || [];

    if (results.length === 0) {
      return null;
    }

    const place = results[0];
    return {
      placeId: place.place_id,
      name: place.formatted_address,
      formattedAddress: place.formatted_address,
      types: place.types || [],
    };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}

