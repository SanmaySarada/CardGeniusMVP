import { Card } from '@/types/card';
import { Smartphone, Nfc, Shield } from 'lucide-react';
import { useState } from 'react';

interface EnhancedWalletCardProps {
  card: Card;
  onClick?: () => void;
  index?: number;
  isExpanded?: boolean;
  totalCards?: number;
}

const gradientMap = {
  blue: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
  purple: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]',
  teal: 'from-[#14b8a6] via-[#0d9488] to-[#0f766e]',
  orange: 'from-[#f97316] via-[#ea580c] to-[#c2410c]',
  pink: 'from-[#ec4899] via-[#db2777] to-[#be185d]',
  green: 'from-[#22c55e] via-[#16a34a] to-[#15803d]',
  red: 'from-[#ef4444] via-[#dc2626] to-[#b91c1c]',
};

const brandLogos: Record<string, { name: string; icon: typeof Shield }> = {
  visa: { name: 'VISA', icon: Shield },
  mastercard: { name: 'Mastercard', icon: Shield },
  amex: { name: 'AMEX', icon: Shield },
  discover: { name: 'Discover', icon: Shield },
};

export const EnhancedWalletCard = ({ 
  card, 
  onClick, 
  index = 0,
  isExpanded = false,
  totalCards = 1
}: EnhancedWalletCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const last4 = card.tokenId.slice(-4).padStart(4, '0');
  const brand = brandLogos[card.brand] || brandLogos.visa;
  
  // Calculate depth-based transforms
  const stackOffset = index * 32; // Vertical stacking offset
  const scaleOffset = 1 - (index * 0.04); // Smaller cards in back
  const zIndex = totalCards - index;
  const opacity = 1 - (index * 0.08);
  
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-full aspect-[1.586] rounded-[24px] 
        cursor-pointer parallax-card wallet-card
        ${isExpanded ? 'animate-card-expand' : ''}
        ${isHovered && index === 0 ? 'wallet-card-active' : ''}
      `}
      style={{
        transform: isExpanded 
          ? 'translateY(0) scale(1)' 
          : `translateY(${stackOffset}px) scale(${scaleOffset})`,
        zIndex,
        opacity: isExpanded ? 1 : opacity,
        transition: 'all 0.4s cubic-bezier(0.34, 1.26, 0.64, 1)',
      }}
    >
      {/* Card gradient background */}
      <div className={`
        absolute inset-0 rounded-[24px] overflow-hidden
        bg-gradient-to-br ${gradientMap[card.gradient as keyof typeof gradientMap] || gradientMap.blue}
      `}>
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-black/10 blur-3xl" />
        
        {/* Content container */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Top section */}
          <div className="flex items-start justify-between">
            {/* Bank & card info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <brand.icon className="w-5 h-5" />
                </div>
                {card.isDefault && (
                  <div className="px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-[10px] font-semibold border border-white/30">
                    Default
                  </div>
                )}
              </div>
              <h3 className="text-base font-bold tracking-tight mt-2">
                {card.cardName}
              </h3>
              <p className="text-xs opacity-80 font-medium mt-0.5">
                {card.bankName}
              </p>
            </div>
            
            {/* Contactless icon */}
            <div className="flex flex-col items-end gap-2">
              <Nfc className="w-6 h-6 opacity-80" />
              <Smartphone className="w-5 h-5 opacity-60" />
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-3">
            {/* EMV Chip - enhanced realistic look */}
            <div className="relative w-12 h-10 rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400" />
              <div className="absolute inset-[3px] rounded-sm bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500">
                <div className="grid grid-cols-4 grid-rows-3 gap-[1px] p-1 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-amber-600/40 rounded-[1px]"
                      style={{ 
                        boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.3)' 
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Chip shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent" />
            </div>
            
            {/* Card number */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono tracking-[0.3em] opacity-90 font-semibold">
                •••• {last4}
              </span>
            </div>
            
            {/* Brand logo */}
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold opacity-80 tracking-wider">
                {brand.name}
              </div>
              <div className="text-[10px] opacity-60 font-mono">
                {card.addedAt.getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
