# 🚀 Setup Instructions - Google Places Integration

## Quick Start

Your Google Places API key has been integrated! Follow these steps to run the app:

### 1. Install Dependencies
```bash
cd native
npm install
```

### 2. Start the App
```bash
npx expo start
```

### 3. Test on Device/Simulator
- Press **`i`** for iOS Simulator
- Press **`a`** for Android Emulator
- Scan QR code with Expo Go app on your phone

---

## What's New?

### ✅ Real Google Places API Integration
- Searches nearby merchants within 500m radius
- Uses your actual GPS location
- Returns real business names, addresses, and types

### ✅ Smart Category Mapping
- Maps Google Places types to reward categories
- Brand-specific recognition (Target, Starbucks, etc.)
- Fallback to generic categories

### ✅ Automatic Card Recommendations
- Analyzes all your cards
- Calculates best reward rate for each location
- Shows ranked results sorted by cashback %

### ✅ Updated Map Screen
- Live location tracking
- Nearby places list at bottom
- Top recommendation featured card
- Pull-to-refresh support

---

## How It Works

1. **You open the Map tab**
2. **App gets your GPS location** (requires permission)
3. **Searches Google Places API** for nearby businesses
4. **Maps each place** to reward categories (e.g., "Restaurants", "Gas stations")
5. **Compares with your cards** to find best rewards
6. **Displays results** sorted by highest cashback first

### Example Flow:

```
📍 Your Location: 37.7749, -122.4194
     ↓
🔍 Google Places API: "Starbucks - 0.2 mi"
     ↓
🏷️ Category: "Restaurants"
     ↓
💳 Your Cards:
   - Amex Gold: 4% (Restaurants)
   - Sapphire Reserve: 3% (Restaurants)
   - Target REDcard: 1% (Everywhere)
     ↓
✨ Recommendation: Use Amex Gold • 4% cashback
```

---

## API Key Information

**Your Google Places API Key:**
```
AIzaSyCuQsZ28OaiqCMCVpWH6DWnBuRvoRK8kuw
```

**Location:** Hardcoded in `src/utils/placesApi.ts`

**Usage:**
- Free tier: $200/month credit
- ~28,000 requests/month
- Each nearby search = 1 request

**Security:**
- ⚠️ For production, move to environment variables
- Restrict in Google Cloud Console to your app's bundle ID
- Monitor usage to avoid unexpected charges

---

## File Changes

### New Files Created:
1. **`src/utils/placesApi.ts`**
   - Google Places API wrapper
   - Functions: `searchNearbyPlaces()`, `findPlaceFromText()`, `reverseGeocode()`

2. **`src/utils/categoryMapping.ts`**
   - Maps Google Places types to reward categories
   - Brand-specific overrides (Target, Starbucks, etc.)
   - Search term builder for fuzzy matching

3. **`src/utils/rewardCalculator.ts`**
   - Reward rates matrix for all cards
   - `getBestCardsForCategory()` function
   - Generates reward text for display

4. **`src/hooks/useNearbyPlaces.ts`**
   - Custom React hook
   - Combines location + places + rewards
   - Returns sorted recommendations

### Modified Files:
1. **`src/screens/Map.tsx`**
   - Now uses real location data
   - Displays actual nearby places
   - Shows calculated reward recommendations
   - Added places list at bottom
   - Pull-to-refresh support

---

## Customization

### Add Your Own Cards

Edit `src/utils/rewardCalculator.ts`:

```typescript
export const REWARD_RATES: Record<string, Record<string, number>> = {
  'Your Card Name Here': {
    'Restaurants': 4.0,
    'Gas stations': 3.0,
    'Everywhere': 1.0,
  },
  // ... add more cards
};
```

**Important:** Card name must match the `cardName` field in your wallet exactly.

### Add Custom Category Mappings

Edit `src/utils/categoryMapping.ts`:

```typescript
const BRAND_MAPPINGS: Record<string, string> = {
  'chipotle': 'Restaurants',
  'whole foods': 'Grocery',
  // ... add more brands
};

const TYPE_MAPPINGS: Record<string, string> = {
  'gas_station': 'Gas stations',
  // ... add more types
};
```

### Change Search Radius

In `Map.tsx`, modify the hook call:

```typescript
const { places } = useNearbyPlaces(
  location?.latitude,
  location?.longitude,
  userCards,
  1000  // Search radius in meters (default: 500)
);
```

---

## Testing

### Test Locations:

1. **Your Current Location**
   - Just open the app and go to Map tab
   - See real nearby places

2. **Specific Location** (Simulator)
   - iOS Simulator: Debug → Location → Custom Location
   - Android Emulator: Extended Controls → Location

3. **Example Coordinates to Test:**
   - San Francisco: `37.7749, -122.4194`
   - New York: `40.7128, -74.0060`
   - Los Angeles: `34.0522, -118.2437`

### Expected Behavior:

✅ Location chip shows your city  
✅ Loading indicator while fetching  
✅ Featured card shows top recommendation  
✅ Bottom list shows all nearby places  
✅ Each place shows best card and reward %  
✅ Pull down to refresh  

---

## Troubleshooting

### ❌ "No nearby places found"
**Causes:**
- Location permissions not granted
- No businesses within 500m radius
- API key issue

**Solutions:**
- Grant location permissions in Settings
- Increase search radius
- Check API key in Google Cloud Console

### ❌ Places appear but no card recommendations
**Causes:**
- Category mapping failed
- No cards in wallet
- Card names don't match REWARD_RATES

**Solutions:**
- Add cards to your wallet first
- Check card names match exactly in `rewardCalculator.ts`
- Add missing categories to mapping files

### ❌ App crashes on Map tab
**Causes:**
- Location permission denied
- API request error
- Invalid coordinates

**Solutions:**
- Check console for error messages
- Enable location permissions
- Verify internet connection

### ❌ Wrong reward rates shown
**Causes:**
- Outdated REWARD_RATES data
- Card name mismatch
- Category mapping incorrect

**Solutions:**
- Update `rewardCalculator.ts` with current rates
- Ensure card names match exactly
- Check category mappings in `categoryMapping.ts`

---

## Performance Tips

### Reduce API Calls:
1. Cache results locally (add AsyncStorage)
2. Only refresh when location changes significantly
3. Debounce location updates

### Optimize Battery:
1. Reduce location accuracy when not in Map tab
2. Stop location tracking when app backgrounded
3. Use significant location change mode

---

## Next Steps

### Recommended Enhancements:

1. **🔔 Push Notifications**
   - Alert when near high-reward merchant
   - Requires Expo Notifications setup

2. **💾 Caching**
   - Save recent places in AsyncStorage
   - Reduce API calls

3. **🗺️ Real Map View**
   - Replace mock map with react-native-maps
   - Show actual merchant locations

4. **📊 Analytics**
   - Track which recommendations users act on
   - Optimize category mappings

5. **🔐 Secure API Key**
   - Move to environment variables
   - Use Expo SecureStore

---

## Support

### Documentation:
- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
- [Expo Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)
- [React Navigation Docs](https://reactnavigation.org/)

### Common Issues:
- See `GOOGLE_PLACES_INTEGRATION.md` for detailed integration docs
- Check Expo logs: `npx expo start --dev-client`

---

## Success! 🎉

Your app now:
- ✅ Uses real Google Places data
- ✅ Tracks your actual location
- ✅ Recommends best cards automatically
- ✅ Works everywhere you go

**Just run `npx expo start` and test it out!**

---

Questions? Check the integration docs or console logs for errors.

