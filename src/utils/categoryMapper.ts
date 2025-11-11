/**
 * Category Mapper - TypeScript port of map_to_category.py
 * Maps Google Places data to credit card reward categories
 */

// Brand → Category direct overrides
export const BRAND_OVERRIDES: Record<string, string> = {
  "target": "Target",
  "walmart": "Department Stores",
  "costco": "Wholesale Club",
  "sam's club": "Wholesale Club",
  "sams club": "Sam's Club",
  "bjs": "Wholesale Club",
  "whole foods": "Whole Foods",
  "trader joe": "Grocery",
  "ralphs": "Grocery",
  "starbucks": "Starbucks",
  "mcdonald": "Fast Food",
  "in n out": "Fast Food",
  "chipotle": "Dining",
  "panera": "Dining",
  "shell": "Gas stations (U.S.)",
  "chevron": "Gas stations (U.S.)",
  "hilton": "Hilton hotels/resorts",
  "marriott": "Marriott",
  "hyatt": "Hotel",
  "ihg": "IHG",
  "aaa": "AAA",
  "at&t": "AT&T",
  "att": "AT&T",
  "old navy": "Old Navy",
  "marshalls": "Marshalls",
  "athleta": "Athleta",
  "banana republic": "Banana Republic",
  "barnes & noble": "Barnes & Noble",
  "barnes and noble": "Barnes & Noble",
  "bass pro": "Bass Pro",
  "belk": "Belk",
  "bloomingdale": "Bloomingdale",
  "choice": "Choice",
  "jcpenney": "JCPenney",
  "jcpenny": "JCPenney",
  "kohl's": "Kohl's",
  "kohls": "Kohl's",
  "kroger": "Kroger",
  "lowe's": "Lowe's",
  "lowes": "Lowe's",
  "lyft": "Lyft",
  "macy's": "Macy's",
  "macys": "Macy's",
  "menards": "Menards",
  "rei": "REI",
  "tj maxx": "TJ Maxx",
  "walgreens": "Walgreens",
  "wayfair": "Wayfair",
};

// Google place type → Category mappings
export const TYPE_TO_CATEGORY: Record<string, string> = {
  // Food / dining
  "restaurant": "Restaurants",
  "cafe": "Dining",
  "bar": "Dining",
  "meal_takeaway": "Takeout/Delivery (U.S.)",
  "bakery": "Dining",
  "fast_food_restaurant": "Fast Food",
  "food": "Dining",

  // Retail / shopping
  "supermarket": "Supermarkets (U.S.)",
  "grocery_or_supermarket": "Grocery",
  "department_store": "Department Stores",
  "clothing_store": "Department Stores",
  "electronics_store": "Electronics retailers (up to $2M spend/yr)",
  "home_goods_store": "Home Improvement",
  "book_store": "Book Store",
  "pharmacy": "Drugstore",
  "store": "Department Stores",

  // Travel & transport
  "gas_station": "Gas stations (U.S.)",
  "lodging": "Hotel",
  "hotel": "Hotel",
  "car_rental": "Car Rental",
  "bus_station": "Transit",
  "train_station": "Transit",
  "airport": "Travel",

  // Entertainment & recreation
  "gym": "Gym",
  "movie_theater": "Entertainment",
  "amusement_park": "Entertainment",
  "stadium": "Entertainment",
  "museum": "Entertainment",
  "night_club": "Entertainment",
  "spa": "Beauty",
};

// Normalize text for robust matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

// Build normalized brand overrides
const NORMALIZED_BRAND_OVERRIDES: Record<string, string> = {};
for (const [key, value] of Object.entries(BRAND_OVERRIDES)) {
  NORMALIZED_BRAND_OVERRIDES[normalizeText(key)] = value;
}

/**
 * Maps a place name and types to a reward category
 */
export function mapPlaceToCategory(placeName: string, types: string[]): string {
  if (!placeName && (!types || types.length === 0)) {
    return "Other purchases";
  }

  const nameLower = (placeName || "").toLowerCase();
  const nameNorm = normalizeText(placeName || "");

  // 1. Check brand overrides (normalized)
  for (const [brandNorm, category] of Object.entries(NORMALIZED_BRAND_OVERRIDES)) {
    if (brandNorm && nameNorm.includes(brandNorm)) {
      return category;
    }
  }

  // Fallback to legacy lowercase substring
  for (const [brandRaw, category] of Object.entries(BRAND_OVERRIDES)) {
    if (nameLower.includes(brandRaw)) {
      return category;
    }
  }

  // 2. Check explicit type mappings
  if (types && types.length > 0) {
    for (const type of types) {
      if (TYPE_TO_CATEGORY[type]) {
        return TYPE_TO_CATEGORY[type];
      }
    }
  }

  // 3. Default fallback
  return "Other purchases";
}

/**
 * Maps a place to both brand-specific and default categories
 * Returns [brandCategory | null, defaultCategory]
 */
export function mapPlaceToCategories(
  placeName: string,
  types: string[]
): [string | null, string] {
  const nameLower = (placeName || "").toLowerCase();
  const nameNorm = normalizeText(placeName || "");

  // Brand category (robust normalization)
  let brandCategory: string | null = null;
  for (const [brandNorm, category] of Object.entries(NORMALIZED_BRAND_OVERRIDES)) {
    if (brandNorm && nameNorm.includes(brandNorm)) {
      brandCategory = category;
      break;
    }
  }
  if (brandCategory === null) {
    for (const [brandRaw, category] of Object.entries(BRAND_OVERRIDES)) {
      if (nameLower.includes(brandRaw)) {
        brandCategory = category;
        break;
      }
    }
  }

  // Default path (ignore brand overrides; use types)
  let defaultCategory = "Other purchases";
  if (types && types.length > 0) {
    for (const type of types) {
      if (TYPE_TO_CATEGORY[type]) {
        defaultCategory = TYPE_TO_CATEGORY[type];
        break;
      }
    }
  }

  return [brandCategory, defaultCategory];
}

