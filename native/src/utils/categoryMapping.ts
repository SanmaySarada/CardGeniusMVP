/**
 * Maps place names and types to reward categories
 * Based on the Python script's map_to_category.py logic
 */

export const FALLBACK_KEYWORDS = [
  'everywhere',
  'all purchases',
  'all other',
  'general',
];

// Brand-specific mappings
const BRAND_MAPPINGS: Record<string, string> = {
  target: 'Target',
  walmart: 'Walmart',
  'whole foods': 'Whole Foods',
  amazon: 'Amazon',
  costco: 'Costco',
  starbucks: 'Starbucks',
  chipotle: 'Restaurants',
  mcdonalds: 'Restaurants',
  "mcdonald's": 'Restaurants',
  'taco bell': 'Restaurants',
  subway: 'Restaurants',
  shell: 'Gas stations',
  chevron: 'Gas stations',
  exxon: 'Gas stations',
  bp: 'Gas stations',
  '76': 'Gas stations',
  arco: 'Gas stations',
};

// Google Places type to category mappings
const TYPE_MAPPINGS: Record<string, string> = {
  restaurant: 'Restaurants',
  cafe: 'Restaurants',
  bar: 'Restaurants',
  food: 'Restaurants',
  meal_takeaway: 'Restaurants',
  meal_delivery: 'Restaurants',
  bakery: 'Restaurants',
  
  gas_station: 'Gas stations',
  
  grocery_or_supermarket: 'Grocery',
  supermarket: 'Grocery',
  
  department_store: 'Shopping',
  clothing_store: 'Shopping',
  shoe_store: 'Shopping',
  shopping_mall: 'Shopping',
  store: 'Shopping',
  
  drugstore: 'Drugstores',
  pharmacy: 'Drugstores',
  
  transit_station: 'Transit',
  subway_station: 'Transit',
  train_station: 'Transit',
  bus_station: 'Transit',
  
  lodging: 'Hotels',
  hotel: 'Hotels',
  
  car_rental: 'Car rental',
  
  movie_theater: 'Entertainment',
  amusement_park: 'Entertainment',
  bowling_alley: 'Entertainment',
  casino: 'Entertainment',
  night_club: 'Entertainment',
  
  gym: 'Fitness',
  spa: 'Fitness',
  
  airport: 'Travel',
  travel_agency: 'Travel',
};

/**
 * Build search terms for finding reward categories
 */
export function buildSearchTerms(category: string, allColumns: string[]): string[] {
  const terms: string[] = [category];
  const categoryLower = category.toLowerCase();

  // Add variations
  if (categoryLower.includes('restaurant')) {
    terms.push('dining', 'food');
  } else if (categoryLower.includes('gas')) {
    terms.push('fuel', 'gasoline');
  } else if (categoryLower.includes('grocery')) {
    terms.push('supermarket', 'food');
  } else if (categoryLower.includes('travel')) {
    terms.push('flights', 'hotels', 'airfare');
  } else if (categoryLower.includes('transit')) {
    terms.push('transport', 'subway', 'train');
  }

  return terms;
}

/**
 * Map a place to reward categories
 * Returns [brandSpecificCategory, defaultCategory]
 */
export function mapPlaceToCategories(
  placeName: string,
  placeTypes: string[]
): [string | null, string | null] {
  const nameLower = placeName.toLowerCase();
  
  // Check brand-specific mappings first
  let brandCategory: string | null = null;
  for (const [brand, category] of Object.entries(BRAND_MAPPINGS)) {
    if (nameLower.includes(brand)) {
      brandCategory = category;
      break;
    }
  }

  // Check type-based mappings
  let defaultCategory: string | null = null;
  for (const placeType of placeTypes) {
    if (TYPE_MAPPINGS[placeType]) {
      defaultCategory = TYPE_MAPPINGS[placeType];
      break;
    }
  }

  // Fallback to "Other purchases" if nothing matches
  if (!brandCategory && !defaultCategory) {
    defaultCategory = 'Other purchases';
  }

  return [brandCategory, defaultCategory];
}

