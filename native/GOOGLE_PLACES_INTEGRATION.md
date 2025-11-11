# 🗺️ Google Places API Integration

This document explains how the Google Places API and reward calculation system work in the React Native app.

## Overview

The app now uses **real Google Places API** data to:
1. Find nearby merchants based on your GPS location
2. Map each merchant to reward categories
3. Calculate which of your cards gives the best cashback
4. Display recommendations sorted by reward rate

---

## How It Works

### 1. **Location Tracking** (`useLocation` hook)
- Continuously tracks your GPS coordinates
- Updates every 10 seconds or when you move 50+ meters
- Reverse geocodes to get city/state names

### 2. **Nearby Places Search** (`useNearbyPlaces` hook)
- Searches within 500 meter radius of your location
- Fetches real merchant data from Google Places API
- Returns: name, address, types, coordinates

### 3. **Category Mapping** (`categoryMapping.ts`)
Converts Google Places types to reward categories:
- `restaurant` → "Restaurants"
- `gas_station` → "Gas stations"
- `grocery_or_supermarket` → "Grocery"
- `store` → "Shopping"
- And more...

**Brand-specific mappings:**
- "Target" → "Target" (for Target REDcard)
- "Starbucks" → "Restaurants"
- "Shell", "Chevron" → "Gas stations"

### 4. **Reward Calculation** (`rewardCalculator.ts`)
Matches categories to your cards' reward rates:
```typescript
{
  'Target REDcard': {
    'Target': 5.0%,
    'Everywhere': 1.0%
  },
  'American Express® Gold Card': {
    'Restaurants': 4.0%,
    'U.S. supermarkets': 4.0%,
    'Flights': 3.0%
  },
  // ... more cards
}
```

### 5. **Display** (`Map.tsx` screen)
- Shows top merchant in a featured card
- Lists all nearby places with best card recommendations
- Sorted by highest reward rate first
- Pull-to-refresh to update

---

## Files Structure

```
native/src/
├── utils/
│   ├── placesApi.ts          # Google Places API calls
│   ├── categoryMapping.ts    # Place → Category mapping
│   └── rewardCalculator.ts   # Card → Reward rate matching
├── hooks/
│   └── useNearbyPlaces.ts    # Combines location + places + rewards
└── screens/
    └── Map.tsx               # UI displaying results
```

---

## API Key Configuration

The Google Places API key is hardcoded in `placesApi.ts`:
```typescript
const GOOGLE_PLACES_API_KEY = 'AIzaSyCuQsZ28OaiqCMCVpWH6DWnBuRvoRK8kuw';
```

For production, you should:
1. Store in environment variables
2. Use Expo's `expo-constants` to access securely
3. Restrict the API key in Google Cloud Console to your app's bundle ID

---

## Adding Your Cards

Edit `rewardCalculator.ts` to add your personal cards:

```typescript
export const REWARD_RATES: Record<string, Record<string, number>> = {
  'Your Card Name': {
    'Category Name': 5.0,  // 5% cashback
    'Another Category': 2.0,
    'Everywhere': 1.0,
  },
  // ... more cards
};
```

**Important:** The card name must match exactly with the `cardName` field in your wallet.

---

## How Matching Works

### Example: You're at Starbucks

1. **Location:** GPS = (37.7749, -122.4194)
2. **Places API:** Returns "Starbucks" with types: `['cafe', 'restaurant', 'food']`
3. **Category Mapping:** 
   - Brand match: "Starbucks" → "Restaurants"
   - Type match: `cafe` → "Restaurants"
4. **Card Matching:**
   ```
   American Express Gold Card: 4% (Restaurants)
   Chase Sapphire Reserve: 3% (Restaurants)
   U.S. Bank Altitude Go: 4% (Restaurants)
   Target REDcard: 1% (Everywhere - fallback)
   ```
5. **Result:** Recommends **Amex Gold** or **Altitude Go** (tied at 4%)

---

## Fallback Logic

If no specific category matches:
1. Looks for generic categories: "Everywhere", "All purchases"
2. Shows 0% if card has no matching rewards

---

## Customizing Search Radius

In `Map.tsx`, change the radius parameter:
```typescript
const { places } = useNearbyPlaces(
  location?.latitude,
  location?.longitude,
  userCards,
  1000  // 1000 meters = 1 km
);
```

---

## API Rate Limits

Google Places API has usage limits:
- **Free tier:** $200/month (~28,000 requests)
- Each nearby search = 1 request
- Each place details lookup = 1 request

**Optimization tips:**
- Cache results locally
- Only refresh when location changes significantly
- Use smaller search radius

---

## Testing

### Test with specific locations:
1. Open the app
2. Allow location permissions
3. Go to Map tab
4. See nearby places appear automatically

### Test without moving:
Use a GPS spoofing app or iOS/Android simulator location override to test different areas.

---

## Troubleshooting

### No places appearing?
- Check location permissions are granted
- Verify API key is valid
- Check console for error messages
- Ensure internet connection

### Wrong categories?
- Edit `categoryMapping.ts` to add more type mappings
- Add brand-specific overrides in `BRAND_MAPPINGS`

### Wrong reward rates?
- Update `REWARD_RATES` in `rewardCalculator.ts`
- Ensure card names match exactly

---

## Python Script Comparison

The React Native implementation follows the same logic as the Python script:

| Python | React Native |
|--------|-------------|
| `map_to_category.py` | `categoryMapping.ts` |
| `map.py` (Places API call) | `placesApi.ts` |
| `get_best_cards_for_category()` | `getBestCardsForCategory()` |
| `card_rewards_matrix.csv` | `REWARD_RATES` object |
| Command line args | GPS location |

**Key difference:** The mobile app uses GPS coordinates instead of text address input, and runs continuously in the background.

---

## Future Enhancements

- [ ] Add real-time notifications when near high-reward merchants
- [ ] Cache results to reduce API calls
- [ ] Add manual search by name/address
- [ ] Show distance to each merchant
- [ ] Add map view with actual map component
- [ ] Background location tracking
- [ ] Push notifications for nearby deals

---

## Security Notes

⚠️ **Never commit API keys to version control**
- Use `.env` files (add to `.gitignore`)
- Restrict API key to your app's bundle ID in Google Cloud Console
- Monitor usage in Google Cloud Console dashboard

---

Built with ❤️ using Google Places API + React Native

