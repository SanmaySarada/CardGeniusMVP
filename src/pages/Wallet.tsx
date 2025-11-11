import { useState, useEffect } from 'react';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { EnhancedWalletCard } from '@/components/EnhancedWalletCard';
import { CardDetailSheet } from '@/components/CardDetailSheet';
import { IOSButton } from '@/components/IOSButton';
import { LocationChip } from '@/components/LocationChip';
import { Card } from '@/types/card';
import { Plus, Settings, MapPin, Bell } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';
import { toast } from 'sonner';
import { mockCards } from '@/data/mockCards';

const STORAGE_KEY = 'wallet_cards';

export default function Wallet() {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { location } = useLocation();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isBankConnected, setIsBankConnected] = useState(false);

  useEffect(() => {
    loadCards();
    checkBankConnection();
  }, [routerLocation]);

  const checkBankConnection = () => {
    const stored = localStorage.getItem('bank_connected');
    console.log('Bank connection check:', stored ? 'Connected' : 'Not connected', stored);
    setIsBankConnected(!!stored);
  };

  const loadCards = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedCards = JSON.parse(stored).map((card: any) => ({
        ...card,
        addedAt: new Date(card.addedAt),
      }));
      setCards(parsedCards);
    } else {
      // Initialize with mock data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCards));
      setCards(mockCards);
    }
  };

  const saveCards = (updatedCards: Card[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  const handleDeleteCard = () => {
    if (!selectedCard) return;

    const updatedCards = cards.filter(card => card.id !== selectedCard.id);
    saveCards(updatedCards);
    toast.success('Card removed');
    setSheetOpen(false);
  };

  const handleSetDefault = () => {
    if (!selectedCard) return;

    const updatedCards = cards.map(card => ({
      ...card,
      isDefault: card.id === selectedCard.id,
    }));
    saveCards(updatedCards);
    toast.success('Default card updated');
    setSheetOpen(false);
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setSheetOpen(true);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 space-y-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/notifications')}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        <LocationChip 
          location={location ? `${location.city || 'Unknown'}, ${location.state || ''}` : 'Getting location...'} 
          isLive={!!location} 
        />
      </div>

      {/* Enhanced Cards Stack with Parallax */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 mt-6">
        <div className="space-y-4">
          {cards.length === 0 ? (
            <div className="glass-light rounded-3xl p-8 text-center animate-spring">
              <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No cards yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Add your first card to start tracking rewards and getting smart recommendations
              </p>
              <IOSButton variant="primary" onClick={() => navigate('/add-card')}>
                <Plus className="w-5 h-5 mr-2 inline" />
                Add Your First Card
              </IOSButton>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {/* Enhanced card stack with better depth perception */}
              <div 
                className="relative" 
                style={{ 
                  height: `${(cards.length - 1) * 32 + 260}px`,
                  perspective: '1000px',
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className="absolute left-0 right-0"
                    style={{
                      top: 0,
                    }}
                  >
                    <EnhancedWalletCard 
                      card={card} 
                      index={index}
                      totalCards={cards.length}
                      onClick={() => handleCardClick(card)}
                    />
                  </div>
                ))}
              </div>

              {/* Floating add button with enhanced styling */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => navigate('/add-card')}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground 
                    flex items-center justify-center 
                    transition-all duration-300 
                    hover:scale-110 hover:shadow-depth-3
                    active:scale-95
                    depth-2"
                >
                  <Plus className="w-7 h-7" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-50 glass border-t border-border/50 bg-background/95 backdrop-blur-lg flex-shrink-0">
        <div className={`flex justify-around items-center h-20 px-6 ${isBankConnected ? 'grid grid-cols-4' : 'grid grid-cols-3'}`}>
          <button className="flex flex-col items-center gap-1 text-primary">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <span className="text-xs font-medium">Wallet</span>
          </button>

          {isBankConnected && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="text-xs">Dashboard</span>
            </button>
          )}

          <button
            onClick={() => navigate('/map')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Map</span>
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

      {/* Enhanced Card Details Sheet */}
      <CardDetailSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        card={selectedCard}
        onSetDefault={handleSetDefault}
        onDelete={handleDeleteCard}
      />
    </div>
  );
}
