import { Card } from '@/types/card';
import { CreditCard, Shield } from 'lucide-react';

interface WalletCardProps {
  card: Card;
  onClick?: () => void;
  index?: number;
}

const gradientMap = {
  blue: 'from-[hsl(220,70%,55%)] to-[hsl(220,70%,45%)]',
  purple: 'from-[hsl(270,60%,55%)] to-[hsl(270,60%,45%)]',
  teal: 'from-[hsl(173,60%,50%)] to-[hsl(173,60%,40%)]',
  orange: 'from-[hsl(30,80%,55%)] to-[hsl(30,80%,45%)]',
  pink: 'from-[hsl(340,70%,60%)] to-[hsl(340,70%,50%)]',
  green: 'from-[hsl(142,55%,50%)] to-[hsl(142,55%,40%)]',
  red: 'from-[hsl(0,70%,55%)] to-[hsl(0,70%,45%)]',
};

const brandLogos: Record<string, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  discover: 'Discover',
};

export const WalletCard = ({ card, onClick, index = 0 }: WalletCardProps) => {
  // Generate last 4 digits from tokenId
  const last4 = card.tokenId.slice(-4).padStart(4, '0');
  
  return (
    <div
      onClick={onClick}
      className={`relative w-full aspect-[1.3] rounded-[20px] bg-gradient-to-br ${gradientMap[card.gradient as keyof typeof gradientMap] || gradientMap.blue}
        cursor-pointer transition-all duration-300 
        hover:scale-[1.02] active:scale-[0.98] 
        overflow-hidden shadow-lg`}
      style={{
        transform: `translateY(${index * 5}px) scale(${1 - index * 0.008})`,
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Decorative circle */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-4 text-white">
        {/* Top section: Icon + Title */}
        <div className="flex items-start gap-3">
          {/* Brand Icon Circle */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          
          {/* Card Title */}
          <div className="flex-1">
            <h3 className="text-lg font-bold tracking-tight">
              {card.cardName}
            </h3>
            {card.isDefault && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full backdrop-blur-sm inline-block mt-0.5">
                Default
              </span>
            )}
          </div>
        </div>

        {/* Bottom section: Chip + Number */}
        <div className="space-y-2">
          {/* EMV Chip */}
          <div className="w-10 h-8 rounded bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
            <div className="w-8 h-6 rounded-sm bg-gradient-to-br from-amber-300 to-amber-400 flex flex-wrap gap-0.5 p-0.5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-amber-500/30 rounded-[1px]" />
              ))}
            </div>
          </div>
          
          {/* Account Number */}
          <div className="flex items-center gap-2">
            <span className="text-base font-mono tracking-[0.25em] opacity-90">
              •••• {last4}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
