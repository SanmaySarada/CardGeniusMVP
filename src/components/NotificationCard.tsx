import { NotificationData } from '@/types/card';
import { MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCardProps {
  notification: NotificationData;
  onClick?: () => void;
}

const gradientMap = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-700',
  teal: 'from-teal-400 to-teal-600',
  orange: 'from-orange-400 to-orange-600',
  pink: 'from-pink-400 to-pink-600',
};

export const NotificationCard = ({ notification, onClick }: NotificationCardProps) => {
  return (
    <div
      onClick={onClick}
      className="glass rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-transform active:scale-95"
    >
      <div className="flex gap-3">
        {/* Mini card preview */}
        <div
          className={`w-16 h-12 rounded-lg bg-gradient-to-br ${
            gradientMap[notification.suggestedCard.gradient]
          } flex-shrink-0`}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">
              {notification.merchantName}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </div>
          </div>

          <p className="text-sm text-foreground mb-2">
            Use <span className="font-semibold">{notification.suggestedCard.cardName}</span>
          </p>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {notification.reason}
          </p>

          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>Nearby merchant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
