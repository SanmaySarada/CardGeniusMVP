import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationChip } from '@/components/LocationChip';
import { GoogleMap } from '@/components/GoogleMap';
import { MapPin, Bell, Settings } from 'lucide-react';
import { getClosestPlace, formatDistance, calculateDistance } from '@/services/placesService';
import { getBestCardForPlace, loadRewardsMatrix } from '@/services/rewardEngine';
import { mockCards } from '@/data/mockCards';

export default function Map() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('Getting location...');
  const [nearbyPlace, setNearbyPlace] = useState<{
    name: string;
    distance: string;
    recommendedCard: string;
    cashback: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load rewards matrix on mount
  useEffect(() => {
    loadRewardsMatrix().catch(console.error);
  }, []);

  const handleLocationChange = useCallback(async (lat: number, lng: number, mapInstance?: google.maps.Map) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Reverse geocode to get city name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const locationName = data.address?.city || data.address?.town || data.address?.village || 'Unknown location';
      setCurrentLocation(locationName);
      
      // Find closest place using Google Places API
      if (mapInstance) {
        const place = await getClosestPlace(mapInstance, { lat, lng });
        
        if (place) {
          // Calculate distance
          const distance = calculateDistance(lat, lng, place.location.lat, place.location.lng);
          const distanceText = formatDistance(distance);
          
          // Get user's card names
          const userCardNames = mockCards.map(card => {
            // Match card names from CSV
            if (card.cardName.includes('Freedom')) return 'Chase Freedom Unlimited℠';
            if (card.cardName.includes('Gold')) return 'American Express® Gold Card';
            if (card.cardName.includes('Discover')) return 'Discover it® Cash Back';
            return card.cardName;
          });
          
          // Get best card recommendation
          const recommendation = await getBestCardForPlace(
            place.name,
            place.types,
            userCardNames
          );
          
          if (recommendation) {
            setNearbyPlace({
              name: place.name,
              distance: distanceText,
              recommendedCard: recommendation.cardName,
              cashback: recommendation.offerText,
            });
          } else {
            setNearbyPlace({
              name: place.name,
              distance: distanceText,
              recommendedCard: 'No specific recommendation',
              cashback: 'Use your default card',
            });
          }
        } else {
          setNearbyPlace(null);
        }
      }
    } catch (error) {
      console.error('Error getting location or place:', error);
      setCurrentLocation('Location unavailable');
      setNearbyPlace(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Google Map Container */}
      <div className="relative flex-1">
        <GoogleMap 
          onLocationChange={handleLocationChange}
          merchants={[]}
        />
        
        {/* Header - Floating on top of map */}
        <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-14 pb-6 pointer-events-none">
          <div className="pointer-events-auto">
            <LocationChip 
              location={nearbyPlace ? `${nearbyPlace.name}, ${nearbyPlace.distance}` : currentLocation} 
              isLive={!!nearbyPlace} 
            />
          </div>
        </div>

        {/* Settings FAB */}
        <button
          onClick={() => navigate('/settings')}
          className="absolute top-20 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center shadow-elevated hover:scale-105 transition-transform"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Merchant Card Preview (floating) - Shows when near a merchant */}
        {nearbyPlace && (
          <div className="absolute bottom-32 inset-x-6 z-10">
            <div className="glass rounded-2xl p-4 shadow-elevated animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{nearbyPlace.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Use <span className="font-semibold text-foreground">{nearbyPlace.recommendedCard}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {nearbyPlace.cashback}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 glass border-t border-border z-20">
        <div className="flex justify-around items-center h-20 px-6">
          <button
            onClick={() => navigate('/wallet')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xs">Wallet</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-primary">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xs font-medium">Map</span>
          </button>

          <button
            onClick={() => navigate('/notifications')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs">Alerts</span>
          </button>
        </div>
      </div>

    </div>
  );
}
