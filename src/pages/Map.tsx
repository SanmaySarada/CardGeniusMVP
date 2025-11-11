import { useNavigate } from 'react-router-dom';
import { LocationChip } from '@/components/LocationChip';
import { MapPin, Bell, Settings, Navigation } from 'lucide-react';

export default function Map() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-muted" />
            ))}
          </div>
        </div>

        {/* Mock merchant markers */}
        <div className="absolute top-1/3 left-1/4">
          <div className="w-8 h-8 bg-primary rounded-full shadow-elevated flex items-center justify-center animate-spring">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute top-1/2 right-1/3">
          <div className="w-8 h-8 bg-primary rounded-full shadow-elevated flex items-center justify-center animate-spring">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/2">
          <div className="w-8 h-8 bg-primary rounded-full shadow-elevated flex items-center justify-center animate-spring">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* User location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-blue-500 rounded-full shadow-elevated flex items-center justify-center border-4 border-white">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-6">
        <LocationChip location="Starbucks, 0.2 mi" isLive />
      </div>

      {/* Merchant Card Preview (floating) */}
      <div className="absolute bottom-32 inset-x-6 z-10">
        <div className="glass rounded-2xl p-4 shadow-elevated animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1">Starbucks</h3>
              <p className="text-sm text-muted-foreground">
                Use <span className="font-semibold text-foreground">Discover it</span> • 5% cashback
              </p>
            </div>
          </div>
        </div>
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

      {/* Settings FAB */}
      <button
        onClick={() => navigate('/settings')}
        className="fixed top-20 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center shadow-elevated hover:scale-105 transition-transform"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}
