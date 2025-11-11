export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover';

export type CardGradient = 'blue' | 'purple' | 'teal' | 'orange' | 'pink' | 'green' | 'red';

export interface Card {
  id: string;
  tokenId: string; // Backend reference token (never the actual PAN)
  brand: CardBrand;
  bankName: string;
  cardName: string;
  gradient: CardGradient;
  isDefault?: boolean;
  addedAt: Date;
}

export interface CardScanResult {
  brand: CardBrand;
  bank: string;
  artStyle: CardGradient;
  tokenId: string;
  cardName: string;
}

export interface NotificationData {
  id: string;
  merchantName: string;
  suggestedCard: Card;
  reason: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
  };
}
