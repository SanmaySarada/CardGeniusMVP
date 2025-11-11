/**
 * Reward Engine - TypeScript port of map.py
 * Finds the best credit card for a given category
 */

import Papa from 'papaparse';
import { mapPlaceToCategories } from '@/utils/categoryMapper';

export interface CardReward {
  cardName: string;
  rewardRate: number;
  category: string;
  offerText: string;
}

interface RewardsMatrix {
  [cardName: string]: {
    [category: string]: number;
  };
}

let rewardsMatrix: RewardsMatrix | null = null;
let allCategories: string[] = [];

/**
 * Load and parse the card rewards matrix CSV
 */
export async function loadRewardsMatrix(): Promise<void> {
  if (rewardsMatrix) return; // Already loaded

  try {
    const response = await fetch('/src/data/card_rewards_matrix.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const matrix: RewardsMatrix = {};
          const data = results.data as any[];
          
          if (data.length > 0) {
            // Extract all category columns (everything except "Card Name")
            allCategories = Object.keys(data[0]).filter(col => col !== 'Card Name');
            
            // Build the matrix
            data.forEach((row: any) => {
              const cardName = row['Card Name'];
              if (!cardName) return;
              
              matrix[cardName] = {};
              allCategories.forEach(category => {
                const value = parseFloat(row[category]) || 0;
                matrix[cardName][category] = value;
              });
            });
          }
          
          rewardsMatrix = matrix;
          console.log(`Loaded ${Object.keys(matrix).length} cards with ${allCategories.length} categories`);
          resolve();
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading rewards matrix:', error);
    throw error;
  }
}

/**
 * Get best card for a place
 */
export async function getBestCardForPlace(
  placeName: string,
  placeTypes: string[],
  userCards: string[]
): Promise<CardReward | null> {
  // Ensure matrix is loaded
  if (!rewardsMatrix) {
    await loadRewardsMatrix();
  }
  
  if (!rewardsMatrix) {
    console.error('Failed to load rewards matrix');
    return null;
  }

  // Map place to categories
  const [brandCategory, defaultCategory] = mapPlaceToCategories(placeName, placeTypes);
  const categoriesToCheck = [brandCategory, defaultCategory].filter(Boolean) as string[];
  
  if (categoriesToCheck.length === 0) {
    return null;
  }

  // Build search terms for these categories
  const searchTerms = new Set<string>();
  categoriesToCheck.forEach(cat => {
    searchTerms.add(cat);
    // Add related columns that contain this category
    allCategories.forEach(col => {
      if (col.toLowerCase().includes(cat.toLowerCase())) {
        searchTerms.add(col);
      }
    });
  });
  
  // Add fallback terms
  searchTerms.add('Everywhere');
  searchTerms.add('Other purchases');

  // Find best card from user's collection
  let bestCard: CardReward | null = null;
  let maxReward = 0;

  userCards.forEach(cardName => {
    const cardRewards = rewardsMatrix![cardName];
    if (!cardRewards) {
      console.warn(`Card "${cardName}" not found in rewards matrix`);
      return;
    }

    // Find best reward rate for this card across matching categories
    let bestRate = 0;
    let bestCategoryForCard = '';
    
    searchTerms.forEach(term => {
      const rate = cardRewards[term] || 0;
      if (rate > bestRate) {
        bestRate = rate;
        bestCategoryForCard = term;
      }
    });

    if (bestRate > maxReward) {
      maxReward = bestRate;
      
      // Generate offer text
      const offers: Array<{category: string, rate: number}> = [];
      searchTerms.forEach(term => {
        const rate = cardRewards[term] || 0;
        if (rate > 0) {
          offers.push({ category: term, rate });
        }
      });
      
      // Sort by rate descending
      offers.sort((a, b) => b.rate - a.rate);
      
      // Format offer text
      const offerText = offers
        .slice(0, 2) // Top 2 categories
        .map(o => `${o.rate}% ${o.category}`)
        .join(' • ');

      bestCard = {
        cardName,
        rewardRate: bestRate,
        category: bestCategoryForCard,
        offerText: offerText || `${bestRate}% cashback`,
      };
    }
  });

  return bestCard;
}

/**
 * Get recommendation for a category
 */
export async function getRecommendationForCategory(
  category: string,
  userCards: string[]
): Promise<CardReward | null> {
  if (!rewardsMatrix) {
    await loadRewardsMatrix();
  }
  
  if (!rewardsMatrix) return null;

  let bestCard: CardReward | null = null;
  let maxReward = 0;

  userCards.forEach(cardName => {
    const cardRewards = rewardsMatrix![cardName];
    if (!cardRewards) return;

    const rate = cardRewards[category] || cardRewards['Everywhere'] || 0;
    
    if (rate > maxReward) {
      maxReward = rate;
      bestCard = {
        cardName,
        rewardRate: rate,
        category,
        offerText: `${rate}% ${category}`,
      };
    }
  });

  return bestCard;
}

