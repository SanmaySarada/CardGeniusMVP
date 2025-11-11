import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Location permission not granted');
          setLoading(false);
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 50,
          },
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
              // Reverse geocode to get city name
              const geocode = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
              });
              
              if (geocode.length > 0) {
                setLocation({
                  latitude,
                  longitude,
                  city: geocode[0].city || geocode[0].subregion,
                  state: geocode[0].region,
                });
              } else {
                setLocation({ latitude, longitude });
              }
            } catch (err) {
              // Still set location even if geocoding fails
              setLocation({ latitude, longitude });
            }
            
            setError(null);
            setLoading(false);
          }
        );
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    startTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, error, loading };
};

