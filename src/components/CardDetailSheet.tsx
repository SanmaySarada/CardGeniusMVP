import { ReactNode, useState } from 'react';
import { X, Star, Trash2, CreditCard, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Card } from '@/types/card';
import { EnhancedWalletCard } from './EnhancedWalletCard';
import { IOSButton } from './IOSButton';

interface CardDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card | null;
  onSetDefault: () => void;
  onDelete: () => void;
}

// Mock transaction data
const mockTransactions = [
  { id: 1, merchant: 'Starbucks', amount: -4.95, date: '2025-01-20', category: 'Dining' },
  { id: 2, merchant: 'Whole Foods', amount: -67.32, date: '2025-01-19', category: 'Groceries' },
  { id: 3, merchant: 'Shell Gas', amount: -45.00, date: '2025-01-18', category: 'Gas' },
];

export const CardDetailSheet = ({ 
  isOpen, 
  onClose, 
  card,
  onSetDefault,
  onDelete
}: CardDetailSheetProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'transactions'>('details');
  
  if (!isOpen || !card) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Enhanced bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="glass-light rounded-t-[32px] max-h-[85vh] overflow-hidden border-t border-white/20">
          {/* Drag handle */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-12 h-1.5 bg-foreground/20 rounded-full" />
          </div>

          {/* Header with close */}
          <div className="flex items-center justify-between px-6 pb-4">
            <h2 className="text-xl font-bold">Card Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted/50 rounded-full transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content - scrollable */}
          <div className="overflow-y-auto max-h-[70vh] pb-safe">
            {/* Card preview - larger */}
            <div className="px-6 mb-6">
              <div className="max-w-sm mx-auto transform scale-95">
                <EnhancedWalletCard card={card} isExpanded />
              </div>
            </div>

            {/* Stats grid */}
            <div className="px-6 mb-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="glass rounded-2xl p-4 text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">2.5%</div>
                  <div className="text-xs text-muted-foreground mt-1">Cash Back</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <DollarSign className="w-5 h-5 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">$127</div>
                  <div className="text-xs text-muted-foreground mt-1">Earned</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-muted-foreground mt-1">Uses</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 mb-4">
              <div className="glass rounded-2xl p-1 flex gap-1">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === 'details'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === 'transactions'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Transactions
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="px-6">
              {activeTab === 'details' ? (
                <div className="space-y-4 mb-6">
                  {/* Card info */}
                  <div className="glass rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bank</span>
                      <span className="font-semibold">{card.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Card Name</span>
                      <span className="font-semibold">{card.cardName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Brand</span>
                      <span className="font-semibold capitalize">{card.brand}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Added</span>
                      <span className="font-semibold">
                        {card.addedAt.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    {!card.isDefault && (
                      <IOSButton variant="primary" fullWidth onClick={onSetDefault}>
                        <Star className="w-4 h-4 mr-2 inline" />
                        Set as Default Card
                      </IOSButton>
                    )}
                    <IOSButton variant="secondary" fullWidth className="text-destructive" onClick={onDelete}>
                      <Trash2 className="w-4 h-4 mr-2 inline" />
                      Remove Card
                    </IOSButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {mockTransactions.map((txn) => (
                    <div key={txn.id} className="glass rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{txn.merchant}</div>
                        <div className="text-xs text-muted-foreground">{txn.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${Math.abs(txn.amount).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{txn.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
