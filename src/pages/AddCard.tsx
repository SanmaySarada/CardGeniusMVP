import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOSButton } from '@/components/IOSButton';
import { Camera, Upload, Check, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/types/card';

const STORAGE_KEY = 'wallet_cards';

export default function AddCard() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    
    // Simulate scanning delay (in production, this would call a real card scanning API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setScanning(false);
    setScanned(true);
    
    // Simulate scan result
    const mockScanResult = {
      brand: 'visa' as const,
      bank: 'Chase',
      artStyle: 'blue' as const,
      tokenId: `token_${Date.now()}`,
      cardName: 'Chase Freedom Flex',
    };
    
    // Save to database
    await saveCard(mockScanResult);
  };

  const saveCard = (scanResult: {
    brand: 'visa' | 'mastercard' | 'amex' | 'discover';
    bank: string;
    artStyle: 'blue' | 'purple' | 'teal' | 'orange' | 'pink';
    tokenId: string;
    cardName: string;
  }) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const cards: Card[] = stored ? JSON.parse(stored) : [];
      
      const newCard: Card = {
        id: `card_${Date.now()}`,
        tokenId: scanResult.tokenId,
        brand: scanResult.brand,
        bankName: scanResult.bank,
        cardName: scanResult.cardName,
        gradient: scanResult.artStyle,
        isDefault: cards.length === 0,
        addedAt: new Date(),
      };

      cards.unshift(newCard);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));

      toast.success('Card added successfully!');
      setTimeout(() => {
        navigate('/wallet');
      }, 1500);
    } catch (error: any) {
      toast.error('Failed to save card');
      setScanned(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/wallet')}
          className="p-2 hover:bg-secondary rounded-full transition-colors -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Add Card</h1>
      </div>

      {/* Content */}
      <div className="px-6 space-y-8">
        {!scanned ? (
          <>
            {/* Scan Frame */}
            <div className="relative aspect-[1.586] max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl border-4 border-primary border-dashed flex items-center justify-center bg-muted/20">
                {scanning ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-medium">Scanning card...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Position card inside frame
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="glass rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Privacy first:</span>{' '}
                We only extract brand and bank information. Your card number is never stored or transmitted.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <IOSButton
                variant="primary"
                fullWidth
                onClick={handleScan}
                disabled={scanning}
              >
                <Camera className="w-5 h-5 mr-2 inline" />
                Scan Card
              </IOSButton>

              <IOSButton variant="outline" fullWidth>
                <Upload className="w-5 h-5 mr-2 inline" />
                Upload Image
              </IOSButton>

              <button
                onClick={() => navigate('/wallet')}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Enter manually instead
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center space-y-6 animate-spring pt-12">
            <div className="w-24 h-24 rounded-full bg-primary mx-auto flex items-center justify-center animate-confetti">
              <Check className="w-12 h-12 text-primary-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Card Detected!</h2>
              <p className="text-muted-foreground">
                Adding to your wallet...
              </p>
            </div>

            {/* Mock Card Info */}
            <div className="glass rounded-2xl p-6 max-w-sm mx-auto text-left">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Brand</div>
                  <div className="font-semibold">Visa</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Bank</div>
                  <div className="font-semibold">Chase</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Card Name</div>
                  <div className="font-semibold">Freedom Flex</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
