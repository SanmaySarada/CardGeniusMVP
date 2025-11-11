import { MapPin } from 'lucide-react';

interface LocationChipProps {
  location: string;
  isLive?: boolean;
}

export const LocationChip = ({ location, isLive = false }: LocationChipProps) => {
  return (
    <div className="glass rounded-full px-4 py-2 flex items-center gap-2 shadow-ios">
      <MapPin className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium">{location}</span>
      {isLive && (
        <span className="w-2 h-2 bg-primary rounded-full pulse-location" />
      )}
    </div>
  );
};
