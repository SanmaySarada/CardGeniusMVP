# 🏗️ Architecture Flow - Google Places Integration

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER OPENS MAP TAB                       │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Map.tsx Component Renders                    │
│  - Initializes state                                              │
│  - Sets up hooks                                                  │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
    ┌───────────────────────────┐   ┌──────────────────────────┐
    │   useLocation() Hook       │   │   Load User Cards        │
    │  (hooks/useLocation.ts)    │   │  (utils/storage.ts)      │
    │                            │   │                          │
    │  • Requests permissions    │   │  • Read AsyncStorage     │
    │  • Starts GPS tracking     │   │  • Parse card data       │
    │  • Updates every 10s/50m   │   │  • Return Card[]         │
    │  • Reverse geocode         │   │                          │
    └───────────────────────────┘   └──────────────────────────┘
                    │                           │
                    │   latitude: 37.7749       │   cards: [...]
                    │   longitude: -122.4194     │
                    └─────────────┬─────────────┘
                                  ▼
            ┌────────────────────────────────────────────┐
            │      useNearbyPlaces() Hook                 │
            │    (hooks/useNearbyPlaces.ts)               │
            │                                             │
            │  Input:                                     │
            │    - latitude                               │
            │    - longitude                              │
            │    - userCards                              │
            │    - radius (500m)                          │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │        searchNearbyPlaces()                 │
            │       (utils/placesApi.ts)                  │
            │                                             │
            │  Google Places API Call:                    │
            │  GET https://maps.googleapis.com/...       │
            │      ?location=37.7749,-122.4194           │
            │      &radius=500                            │
            │      &key=AIzaSyC...                        │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │          Google API Returns:                │
            │  [                                          │
            │    {                                        │
            │      name: "Starbucks",                     │
            │      vicinity: "123 Main St",               │
            │      types: ["cafe", "restaurant"],         │
            │      geometry: {                            │
            │        location: {lat: 37.7750, lng: ...}   │
            │      }                                      │
            │    },                                       │
            │    { name: "Target", types: ["store"] },    │
            │    ...                                      │
            │  ]                                          │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │     For Each Place: mapPlaceToCategories() │
            │        (utils/categoryMapping.ts)           │
            │                                             │
            │  Example: "Starbucks" + ["cafe"]            │
            │    ↓                                        │
            │  Check BRAND_MAPPINGS:                      │
            │    ✅ "starbucks" → "Restaurants"           │
            │  Check TYPE_MAPPINGS:                       │
            │    ✅ "cafe" → "Restaurants"                │
            │    ↓                                        │
            │  Returns: ["Restaurants", "Restaurants"]    │
            │  Deduplicated: ["Restaurants"]              │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │    For Each Place: getBestCardsForCategory()│
            │        (utils/rewardCalculator.ts)          │
            │                                             │
            │  Input:                                     │
            │    - userCards: [Freedom, Gold, Reserve]    │
            │    - categories: ["Restaurants"]            │
            │                                             │
            │  Step 1: Check each card's REWARD_RATES     │
            │    Freedom: Restaurants → 3%                │
            │    Gold: Restaurants → 4%                   │
            │    Reserve: Restaurants → 3%                │
            │                                             │
            │  Step 2: Find max rate = 4%                 │
            │                                             │
            │  Step 3: Generate text                      │
            │    "4% — Restaurants"                       │
            │                                             │
            │  Returns: {                                 │
            │    card: Gold Card,                         │
            │    rewardRate: 4.0,                         │
            │    rewardText: "4% — Restaurants",          │
            │    matchedCategories: ["Restaurants"]       │
            │  }                                          │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │       Create PlaceWithRecommendation[]      │
            │                                             │
            │  [                                          │
            │    {                                        │
            │      placeId: "ChIJ...",                    │
            │      name: "Starbucks",                     │
            │      formattedAddress: "123 Main St",       │
            │      types: ["cafe", "restaurant"],         │
            │      location: {lat: ..., lng: ...},        │
            │      categories: ["Restaurants"],           │
            │      bestCard: {                            │
            │        card: Gold Card,                     │
            │        rewardRate: 4.0,                     │
            │        rewardText: "4% — Restaurants"       │
            │      }                                      │
            │    },                                       │
            │    { name: "Target", ... },                 │
            │    ...                                      │
            │  ]                                          │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │       Sort by rewardRate (desc)             │
            │                                             │
            │  Before: [Target 5%, Starbucks 4%, Gas 2%] │
            │  After:  [Target 5%, Starbucks 4%, Gas 2%] │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │         Return to Map.tsx                   │
            │                                             │
            │  places = [...]                             │
            │  loading = false                            │
            │  error = null                               │
            └────────────────────────────────────────────┘
                                  │
                                  ▼
            ┌────────────────────────────────────────────┐
            │            Render UI                        │
            │                                             │
            │  ┌──────────────────────────────┐           │
            │  │  📍 San Francisco, CA        │           │
            │  └──────────────────────────────┘           │
            │                                             │
            │  ┌──────────────────────────────┐           │
            │  │ 🎯 Target                    │ ← Top     │
            │  │ Use Target REDcard • 5%      │   Place   │
            │  └──────────────────────────────┘           │
            │                                             │
            │  ┌──────────────────────────────┐           │
            │  │ ☕ Starbucks                 │           │
            │  │ 123 Main St                  │ ← Places  │
            │  │ 💳 Gold Card • 4%            │   List    │
            │  ├──────────────────────────────┤           │
            │  │ 🎯 Target                    │           │
            │  │ 456 Oak Ave                  │           │
            │  │ 💳 Target REDcard • 5%       │           │
            │  ├──────────────────────────────┤           │
            │  │ ⛽ Shell Gas                 │           │
            │  │ 789 Pine St                  │           │
            │  │ 💳 Altitude Go • 2%          │           │
            │  └──────────────────────────────┘           │
            └────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────┐
│   User GPS   │
│  Location    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│              Google Places API                       │
│  "What businesses are within 500m of this location?" │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│              Place Data                               │
│  [{name, address, types, coordinates}, ...]          │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│         Category Mapping (categoryMapping.ts)        │
│  "Starbucks" + ["cafe"] → "Restaurants"             │
│  "Target" + ["store"] → "Target"                    │
│  "Shell" + ["gas_station"] → "Gas stations"         │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│              User's Cards                             │
│  [Freedom Unlimited, Gold Card, Target REDcard]      │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│      Reward Calculation (rewardCalculator.ts)        │
│                                                      │
│  For "Restaurants":                                  │
│    Freedom: 3%, Gold: 4%, Reserve: 3%              │
│    Best = Gold Card (4%)                            │
│                                                      │
│  For "Target":                                       │
│    Freedom: 1.5%, Gold: 1%, REDcard: 5%           │
│    Best = Target REDcard (5%)                       │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│           Sorted Recommendations                      │
│  1. Target - 5% (Target REDcard)                    │
│  2. Starbucks - 4% (Gold Card)                      │
│  3. Shell - 2% (Altitude Go)                        │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│                Display to User                        │
└──────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App.tsx
└── NavigationContainer
    └── Stack.Navigator
        └── MainTabs (Bottom Tab Navigator)
            └── MapTab
                └── Map.tsx ← WE MODIFIED THIS
                    │
                    ├── useLocation() ← NEW HOOK
                    │   └── hooks/useLocation.ts (existing)
                    │
                    ├── useNearbyPlaces() ← NEW HOOK
                    │   ├── hooks/useNearbyPlaces.ts
                    │   ├── utils/placesApi.ts
                    │   ├── utils/categoryMapping.ts
                    │   └── utils/rewardCalculator.ts
                    │
                    ├── LocationChip (existing component)
                    ├── BlurView (featured place card)
                    └── ScrollView (places list)
                        └── Place Cards (mapped)
```

---

## File Dependencies

```
Map.tsx
  ├── imports useLocation from hooks/useLocation.ts
  ├── imports useNearbyPlaces from hooks/useNearbyPlaces.ts
  ├── imports storage from utils/storage.ts
  ├── imports Card from types/card.ts
  └── imports theme from theme/colors.ts & theme/typography.ts

useNearbyPlaces.ts
  ├── imports searchNearbyPlaces from utils/placesApi.ts
  ├── imports mapPlaceToCategories from utils/categoryMapping.ts
  ├── imports getBestCardsForCategory from utils/rewardCalculator.ts
  └── imports Card from types/card.ts

placesApi.ts
  └── uses hardcoded GOOGLE_PLACES_API_KEY

categoryMapping.ts
  └── standalone (no dependencies)

rewardCalculator.ts
  └── imports Card from types/card.ts
```

---

## State Management Flow

```
Map.tsx Component State:
┌─────────────────────────────────────────────┐
│  [userCards, setUserCards]                  │ ← From AsyncStorage
│  [refreshing, setRefreshing]                │ ← Pull-to-refresh flag
└─────────────────────────────────────────────┘

useLocation() Hook State:
┌─────────────────────────────────────────────┐
│  [location, setLocation]                    │ ← GPS coordinates
│  [error, setError]                          │ ← Permission errors
│  [loading, setLoading]                      │ ← Initial load
└─────────────────────────────────────────────┘

useNearbyPlaces() Hook State:
┌─────────────────────────────────────────────┐
│  [places, setPlaces]                        │ ← API results + rewards
│  [loading, setLoading]                      │ ← Fetch in progress
│  [error, setError]                          │ ← API errors
└─────────────────────────────────────────────┘

Data flows DOWN from hooks to Map.tsx
Actions flow UP (refresh, load cards)
```

---

## API Request Lifecycle

```
1. Component Mount
   ↓
2. useEffect fires in useNearbyPlaces
   ↓
3. Check if latitude/longitude exist
   ↓
4. Call searchNearbyPlaces(lat, lng, radius)
   ↓
5. Construct API URL with query params
   ↓
6. fetch() request to Google
   ↓
7. [NETWORK] HTTP GET
   ↓
8. Google processes request
   ↓
9. [NETWORK] JSON response
   ↓
10. Parse response.json()
    ↓
11. Extract results array
    ↓
12. Map to NearbyPlace[] interface
    ↓
13. For each place:
    a. mapPlaceToCategories()
    b. getBestCardsForCategory()
    c. Create PlaceWithRecommendation
    ↓
14. Sort array by rewardRate
    ↓
15. setPlaces(sorted)
    ↓
16. setLoading(false)
    ↓
17. React re-renders Map.tsx
    ↓
18. Display updated UI
```

---

## Error Handling Flow

```
Try
├── searchNearbyPlaces()
│   ├── Fetch API call
│   ├── Check response.ok
│   └── Parse JSON
└── Catch (error)
    ├── Log to console
    ├── setError(message)
    └── Return empty array

Map.tsx receives:
├── If places.length === 0 && !loading
│   └── Show "No nearby places found"
├── If error !== null
│   └── Could show error banner (not implemented)
└── If loading === true
    └── Show ActivityIndicator
```

---

## Performance Considerations

### When API Calls Happen:
1. **Component mount** (first render)
2. **Location changes** (50m+ movement)
3. **User cards change** (add/remove card)
4. **Pull-to-refresh** (manual trigger)
5. **Radius changes** (config change)

### Optimizations:
- ✅ useEffect dependencies prevent unnecessary calls
- ✅ 50-meter threshold reduces location spam
- ✅ 10-second minimum between GPS updates
- ✅ Local sorting (no API call)
- ✅ Debounced by React's batching

### Future Optimizations:
- ⏳ Cache results in AsyncStorage
- ⏳ Debounce API calls explicitly
- ⏳ Request throttling (1 req/10s max)
- ⏳ Background fetch for prefetching
- ⏳ Intersection observer for list

---

## Security Flow

```
API Key: AIzaSyCuQsZ28OaiqCMCVpWH6DWnBuRvoRK8kuw
   ↓
Hardcoded in: utils/placesApi.ts (line 3)
   ↓
Bundled into: App binary
   ↓
Sent with: Every Google API request
   ↓
Visible: In network inspector / decompiled app
   ↓
Risk: API key theft, unauthorized usage
   ↓
Mitigation (Future):
   ├── Move to .env file
   ├── Use Expo SecureStore
   ├── Restrict in Google Console
   └── Implement backend proxy
```

---

## Testing Flow

```
Development Testing:
1. npx expo start
   ↓
2. Press 'i' for iOS or 'a' for Android
   ↓
3. App opens to Onboarding
   ↓
4. Grant location permission
   ↓
5. Navigate to Map tab
   ↓
6. Wait for location lock
   ↓
7. See places appear
   ↓
8. Verify:
   - Location chip shows city
   - Featured card shows top place
   - List shows all places
   - Reward rates are correct
   - Pull-to-refresh works
   ↓
9. Test edge cases:
   - Move location (simulator)
   - Remove all cards
   - Deny location permission
   - Network offline
   ↓
10. Check console for errors
```

---

## Deployment Checklist

Before production:
- [ ] Move API key to environment variables
- [ ] Restrict API key in Google Cloud Console
- [ ] Add bundle ID restriction
- [ ] Enable billing alerts
- [ ] Set usage quotas
- [ ] Add error tracking (Sentry)
- [ ] Implement result caching
- [ ] Test on real devices
- [ ] Test in airplane mode
- [ ] Test with no cards
- [ ] Test with denied permissions
- [ ] Load test API limits
- [ ] Review privacy policy
- [ ] Update app permissions in stores

---

## Summary

This architecture provides:
✅ Real-time location-based recommendations  
✅ Accurate category mapping  
✅ Smart reward calculations  
✅ Clean separation of concerns  
✅ Type-safe TypeScript  
✅ Reusable hooks  
✅ Scalable structure  

The system mirrors your Python script's logic while adapting to mobile-specific patterns like hooks, real-time GPS, and pull-to-refresh UX.

---

**Ready to test! Run `npx expo start` and navigate to the Map tab.** 🚀

