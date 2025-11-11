import { Card } from '../types/card';

/**
 * Reward rates matrix - maps cards to their reward rates by category
 * In production, this should come from your backend/database
 */
export const REWARD_RATES: Record<string, Record<string, number>> = {
  'Target REDcard': {
    'Target': 5.0,
    'Everywhere': 1.0,
  },
  'Capital One Venture X Rewards Credit Card': {
    'Hotels': 10.0,
    'Rental cars': 10.0,
    'Capital One Travel': 10.0,
    'Travel': 5.0,
    'Everywhere': 2.0,
  },
  'American Express® Gold Card': {
    'Restaurants': 4.0,
    'U.S. supermarkets': 4.0,
    'Flights': 3.0,
    'Everywhere': 1.0,
  },
  'Chase Sapphire Reserve®': {
    'Travel': 3.0,
    'Restaurants': 3.0,
    'Everywhere': 1.0,
  },
  'U.S. Bank Altitude® Go': {
    'Restaurants': 4.0,
    'Gas stations': 2.0,
    'Grocery': 2.0,
    'Streaming': 2.0,
    'Everywhere': 1.0,
  },
  'Chase Freedom Unlimited': {
    'Restaurants': 3.0,
    'Drugstores': 3.0,
    'Travel': 5.0,
    'Everywhere': 1.5,
  },
  'Discover it Cash Back': {
    'Rotating categories': 5.0,
    'Everywhere': 1.0,
  },
  'Freedom Unlimited': {
    'Restaurants': 3.0,
    'Drugstores': 3.0,
    'Travel': 5.0,
    'Everywhere': 1.5,
  },
  'Gold Card': {
    'Restaurants': 4.0,
    'U.S. supermarkets': 4.0,
    'Flights': 3.0,
    'Everywhere': 1.0,
  },
  'it Cash Back': {
    'Rotating categories': 5.0,
    'Everywhere': 1.0,
  },
};

export interface CardRecommendation {
  card: Card;
  rewardRate: number;
  rewardText: string;
  matchedCategories: string[];
}

/**
 * Find the best reward rate for a card given search categories
 */
function findBestRewardForCard(
  cardName: string,
  searchCategories: string[]
): { rate: number; matchedCategories: string[] } {
  const rewardData = REWARD_RATES[cardName];
  if (!rewardData) {
    return { rate: 0, matchedCategories: [] };
  }

  let maxRate = 0;
  const matchedCategories: string[] = [];

  // Check each reward category for matches
  for (const [rewardCategory, rate] of Object.entries(rewardData)) {
    const categoryLower = rewardCategory.toLowerCase();
    
    // Check if any search category matches this reward category
    for (const searchCat of searchCategories) {
      const searchLower = searchCat.toLowerCase();
      
      if (
        categoryLower.includes(searchLower) ||
        searchLower.includes(categoryLower)
      ) {
        if (rate > maxRate) {
          maxRate = rate;
          matchedCategories.length = 0;
          matchedCategories.push(rewardCategory);
        } else if (rate === maxRate && !matchedCategories.includes(rewardCategory)) {
          matchedCategories.push(rewardCategory);
        }
      }
    }
  }

  // If no specific match, use "Everywhere" as fallback
  if (maxRate === 0 && rewardData['Everywhere']) {
    maxRate = rewardData['Everywhere'];
    matchedCategories.push('Everywhere');
  }

  return { rate: maxRate, matchedCategories };
}

/**
 * Generate reward text for display
 */
function generateRewardText(
  cardName: string,
  matchedCategories: string[]
): string {
  const rewardData = REWARD_RATES[cardName];
  if (!rewardData || matchedCategories.length === 0) {
    return '';
  }

  const offers: string[] = [];
  for (const category of matchedCategories) {
    const rate = rewardData[category];
    if (rate) {
      const rateStr = rate % 1 === 0 ? rate.toFixed(0) : rate.toString();
      offers.push(`${rateStr}% — ${category}`);
    }
  }

  return offers.join(' | ');
}

/**
 * Get best card recommendations for a given location/category
 */
export function getBestCardsForCategory(
  userCards: Card[],
  categories: string[],
  topN: number = 5
): CardRecommendation[] {
  const recommendations: CardRecommendation[] = [];

  // Score each user card
  for (const card of userCards) {
    const { rate, matchedCategories } = findBestRewardForCard(
      card.cardName,
      categories
    );

    const rewardText = generateRewardText(card.cardName, matchedCategories);

    recommendations.push({
      card,
      rewardRate: rate,
      rewardText,
      matchedCategories,
    });
  }

  // Sort by reward rate (highest first)
  recommendations.sort((a, b) => b.rewardRate - a.rewardRate);

  // Return top N
  return recommendations.slice(0, topN);
}

