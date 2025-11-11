import { Card } from '@/types/card';

export const mockCards: Card[] = [
  {
    id: '1',
    tokenId: 'tok_chase_freedom_001',
    brand: 'visa',
    bankName: 'Chase',
    cardName: 'Freedom Unlimited',
    gradient: 'blue',
    isDefault: true,
    addedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    tokenId: 'tok_amex_gold_002',
    brand: 'amex',
    bankName: 'American Express',
    cardName: 'Gold Card',
    gradient: 'orange',
    addedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    tokenId: 'tok_discover_it_003',
    brand: 'discover',
    bankName: 'Discover',
    cardName: 'it Cash Back',
    gradient: 'teal',
    addedAt: new Date('2024-03-10'),
  },
];
