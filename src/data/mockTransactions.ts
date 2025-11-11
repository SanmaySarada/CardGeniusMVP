export interface Transaction {
  id: string;
  date: Date;
  merchant: string;
  category: 'food' | 'transport' | 'shopping' | 'entertainment' | 'bills' | 'health' | 'other';
  amount: number;
  cardLast4: string;
  status: 'completed' | 'pending';
  icon: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2025-01-10'),
    merchant: 'Starbucks',
    category: 'food',
    amount: -5.75,
    cardLast4: '4532',
    status: 'completed',
    icon: '☕',
  },
  {
    id: '2',
    date: new Date('2025-01-10'),
    merchant: 'Uber',
    category: 'transport',
    amount: -15.30,
    cardLast4: '8976',
    status: 'completed',
    icon: '🚗',
  },
  {
    id: '3',
    date: new Date('2025-01-09'),
    merchant: 'Amazon',
    category: 'shopping',
    amount: -89.99,
    cardLast4: '4532',
    status: 'completed',
    icon: '📦',
  },
  {
    id: '4',
    date: new Date('2025-01-09'),
    merchant: 'Netflix',
    category: 'entertainment',
    amount: -15.99,
    cardLast4: '1234',
    status: 'completed',
    icon: '🎬',
  },
  {
    id: '5',
    date: new Date('2025-01-08'),
    merchant: 'Whole Foods',
    category: 'food',
    amount: -127.45,
    cardLast4: '4532',
    status: 'completed',
    icon: '🛒',
  },
  {
    id: '6',
    date: new Date('2025-01-08'),
    merchant: 'Shell Gas',
    category: 'transport',
    amount: -52.00,
    cardLast4: '8976',
    status: 'completed',
    icon: '⛽',
  },
  {
    id: '7',
    date: new Date('2025-01-07'),
    merchant: 'Apple Store',
    category: 'shopping',
    amount: -299.00,
    cardLast4: '4532',
    status: 'completed',
    icon: '🍎',
  },
  {
    id: '8',
    date: new Date('2025-01-07'),
    merchant: 'Spotify',
    category: 'entertainment',
    amount: -9.99,
    cardLast4: '1234',
    status: 'completed',
    icon: '🎵',
  },
  {
    id: '9',
    date: new Date('2025-01-06'),
    merchant: 'Target',
    category: 'shopping',
    amount: -67.82,
    cardLast4: '4532',
    status: 'completed',
    icon: '🎯',
  },
  {
    id: '10',
    date: new Date('2025-01-06'),
    merchant: 'Electric Bill',
    category: 'bills',
    amount: -120.00,
    cardLast4: '1234',
    status: 'completed',
    icon: '⚡',
  },
  {
    id: '11',
    date: new Date('2025-01-05'),
    merchant: 'Chipotle',
    category: 'food',
    amount: -12.50,
    cardLast4: '4532',
    status: 'pending',
    icon: '🌯',
  },
  {
    id: '12',
    date: new Date('2025-01-05'),
    merchant: 'CVS Pharmacy',
    category: 'health',
    amount: -24.99,
    cardLast4: '8976',
    status: 'completed',
    icon: '💊',
  },
];

export const categoryColors: Record<string, string> = {
  food: 'hsl(31, 97%, 72%)',
  transport: 'hsl(211, 100%, 50%)',
  shopping: 'hsl(271, 76%, 53%)',
  entertainment: 'hsl(330, 76%, 68%)',
  bills: 'hsl(0, 84%, 60%)',
  health: 'hsl(174, 72%, 56%)',
  other: 'hsl(0, 0%, 60%)',
};

export const categoryLabels: Record<string, string> = {
  food: 'Food & Dining',
  transport: 'Transportation',
  shopping: 'Shopping',
  entertainment: 'Entertainment',
  bills: 'Bills & Utilities',
  health: 'Health & Wellness',
  other: 'Other',
};
