import { useEffect, useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

interface GoogleMapProps {
  onLocationChange?: (lat: number, lng: number, mapInstance?: google.maps.Map) => void;
  initialCenter?: { lat: number; lng: number };
  merchants?: Array<{
    id: string;
    name: string;
    position: { lat: number; lng: number };
    category?: string;
  }>;
}

// Inner component to access map instance
const MapContent = ({ 
  onLocationChange,
  initialCenter,
  merchants 
}: GoogleMapProps) => {
  const map = useMap();
  const [userPosition, setUserPosition] = useState(initialCenter || { lat: 37.7749, lng: -122.4194 });
  const [mapCenter, setMapCenter] = useState(initialCenter || { lat: 37.7749, lng: -122.4194 });

  const handleLocationChangeWithMap = useCallback((lat: number, lng: number) => {
    if (onLocationChange && map) {
      onLocationChange(lat, lng, map);
    } else if (onLocationChange) {
      onLocationChange(lat, lng);
    }
  }, [onLocationChange, map]);

  // Get user's actual location ONCE on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(newPos);
          setMapCenter(newPos);
          handleLocationChangeWithMap(newPos.lat, newPos.lng);
        },
        (error) => {
          console.warn('Geolocation error:', error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const handleMarkerDrag = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setUserPosition(newPos);
      setMapCenter(newPos); // Keep map centered on new position
      handleLocationChangeWithMap(newPos.lat, newPos.lng);
    }
  }, [handleLocationChangeWithMap]);

  return (
    <>
      <Map
        mapId="cardchooser-map"
        style={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={15}
        gestureHandling="greedy"
        disableDefaultUI={false}
        zoomControl={true}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
      >
        {/* User Location Marker (Draggable) */}
        <AdvancedMarker
          position={userPosition}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
            </div>
            {/* User marker */}
            <div className="w-12 h-12 bg-blue-500 rounded-full shadow-elevated flex items-center justify-center border-4 border-white">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="white"
                className="drop-shadow-lg"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>
        </AdvancedMarker>

        {/* Merchant Markers */}
        {merchants.map((merchant) => (
          <AdvancedMarker
            key={merchant.id}
            position={merchant.position}
          >
            <Pin
              background={'#0066ff'}
              borderColor={'#0044cc'}
              glyphColor={'#ffffff'}
            >
              <div className="text-xs font-bold">{merchant.name[0]}</div>
            </Pin>
          </AdvancedMarker>
        ))}
      </Map>
    </>
  );
};

// Main export component
export const GoogleMap = (props: GoogleMapProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-6 max-w-md">
          <p className="text-lg font-semibold mb-2">Google Maps API Key Required</p>
          <p className="text-sm text-muted-foreground">
            Add VITE_GOOGLE_MAPS_API_KEY to your .env file to enable maps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} libraries={['places']}>
      <MapContent {...props} />
    </APIProvider>
  );
};

