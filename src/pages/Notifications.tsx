import { useNavigate } from 'react-router-dom';
import { NotificationCard } from '@/components/NotificationCard';
import { NotificationData } from '@/types/card';
import { mockCards } from '@/data/mockCards';
import { ArrowLeft, MapPin, Bell } from 'lucide-react';

const mockNotifications: NotificationData[] = [
  {
    id: '1',
    merchantName: 'Whole Foods Market',
    suggestedCard: mockCards[0],
    reason: 'Your Chase Freedom Unlimited offers 5% cashback on groceries this quarter',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: '2',
    merchantName: 'Shell Gas Station',
    suggestedCard: mockCards[1],
    reason: 'American Express Gold gives 3% back on gas purchases',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    location: { lat: 37.7849, lng: -122.4094 },
  },
  {
    id: '3',
    merchantName: 'Target',
    suggestedCard: mockCards[2],
    reason: 'Discover it matches all cashback in your first year',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    location: { lat: 37.7649, lng: -122.4294 },
  },
];

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/wallet')}
          className="p-2 hover:bg-secondary rounded-full transition-colors -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4">
        {mockNotifications.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center mt-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No notifications yet</h3>
            <p className="text-sm text-muted-foreground">
              You'll receive alerts when you're near merchants with better cashback opportunities
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span>{mockNotifications.length} recent alerts</span>
            </div>

            {mockNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => navigate('/map')}
              />
            ))}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 glass border-t border-border">
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

          <button
            onClick={() => navigate('/map')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-primary">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xs font-medium">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
