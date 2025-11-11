import { useState, useEffect } from 'react';
import { searchNearbyPlaces, NearbyPlace } from '../utils/placesApi';
import { mapPlaceToCategories } from '../utils/categoryMapping';
import { Card } from '../types/card';
import { getBestCardsForCategory, CardRecommendation } from '../utils/rewardCalculator';

export interface PlaceWithRecommendation extends NearbyPlace {
  categories: string[];
  bestCard: CardRecommendation | null;
}

interface UseNearbyPlacesResult {
  places: PlaceWithRecommendation[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to fetch nearby places and calculate best card recommendations
 */
export function useNearbyPlaces(
  latitude: number | null,
  longitude: number | null,
  userCards: Card[],
  radius: number = 500
): UseNearbyPlacesResult {
  const [places, setPlaces] = useState<PlaceWithRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = async () => {
    if (!latitude || !longitude) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch nearby places from Google Places API
      const nearbyPlaces = await searchNearbyPlaces(latitude, longitude, radius);

      // Map each place to categories and find best card
      const placesWithRecommendations: PlaceWithRecommendation[] = nearbyPlaces.map(
        (place) => {
          const [brandCategory, defaultCategory] = mapPlaceToCategories(
            place.name,
            place.types
          );

          const categories = [brandCategory, defaultCategory].filter(
            (cat): cat is string => cat !== null
          );

          // Get best card for this place
          const recommendations = getBestCardsForCategory(userCards, categories, 1);
          const bestCard = recommendations.length > 0 ? recommendations[0] : null;

          return {
            ...place,
            categories,
            bestCard,
          };
        }
      );

      // Sort by reward rate (highest first)
      placesWithRecommendations.sort((a, b) => {
        const rateA = a.bestCard?.rewardRate || 0;
        const rateB = b.bestCard?.rewardRate || 0;
        return rateB - rateA;
      });

      setPlaces(placesWithRecommendations);
    } catch (err: any) {
      console.error('Error fetching nearby places:', err);
      setError(err.message || 'Failed to fetch nearby places');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [latitude, longitude, radius, userCards.length]);

  return {
    places,
    loading,
    error,
    refresh: fetchPlaces,
  };
}

