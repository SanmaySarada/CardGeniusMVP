# 🚀 Quick Reference - Google Places Integration

## ⚡ Quick Start (30 seconds)

```bash
cd native
npm install
npx expo start
# Press 'i' for iOS or 'a' for Android
# Navigate to Map tab
```

---

## 📁 Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/utils/placesApi.ts` | Google API wrapper | 133 |
| `src/utils/categoryMapping.ts` | Place → Category | 93 |
| `src/utils/rewardCalculator.ts` | Card → Reward % | 147 |
| `src/hooks/useNearbyPlaces.ts` | Combines all logic | 76 |
| `src/screens/Map.tsx` | UI display | 400 |

---

## 🔑 API Key

```
AIzaSyCuQsZ28OaiqCMCVpWH6DWnBuRvoRK8kuw
```

**Location:** `src/utils/placesApi.ts:3`  
**Usage:** ~$0/month (within free tier)  
**Limit:** 6,250 requests/month free

---

## 🎯 What It Does

1. Gets your GPS location
2. Searches nearby businesses (500m radius)
3. Maps each to reward categories
4. Finds your best credit card
5. Shows sorted by highest cashback %

---

## 🛠️ Customization

### Add Your Card

Edit `src/utils/rewardCalculator.ts`:

```typescript
'Your Card Name': {
  'Restaurants': 4.0,
  'Gas stations': 3.0,
  'Everywhere': 1.0,
}
```

### Add Brand Mapping

Edit `src/utils/categoryMapping.ts`:

```typescript
const BRAND_MAPPINGS = {
  'chipotle': 'Restaurants',
  // Add more...
}
```

### Change Search Radius

Edit `src/screens/Map.tsx:48`:

```typescript
useNearbyPlaces(..., 1000) // meters
```

---

## 🧪 Testing

### Test Locations (Simulator):

| City | Coordinates |
|------|-------------|
| San Francisco | 37.7749, -122.4194 |
| New York | 40.7128, -74.0060 |
| Los Angeles | 34.0522, -118.2437 |
| Seattle | 47.6062, -122.3321 |

### Set Location (iOS Simulator):
```
Debug → Location → Custom Location → Enter coordinates
```

### Set Location (Android Emulator):
```
... → Location → Enter coordinates
```

---

## 📊 Example Output

```
📍 San Francisco, CA

🎯 Target
Use Target REDcard • 5% cashback
5% — Target

☕ Starbucks  
123 Main St
💳 Gold Card • 4%

⛽ Shell Gas
456 Oak Ave
💳 Altitude Go • 2%
```

---

## 🐛 Common Issues

### No places showing?
```bash
# Check location permissions
# Settings → CardChooser → Location → "While Using"

# Check network connection
# API requires internet

# Check console for errors
# Look for "Error fetching nearby places"
```

### Wrong rewards?
```typescript
// Update card names to match exactly
// rewardCalculator.ts: 'Gold Card'
// Must match wallet: card.cardName === 'Gold Card'
```

### App crashes?
```bash
# Clear cache
npx expo start --clear

# Reinstall
rm -rf node_modules
npm install
```

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| API calls per session | 1-3 |
| Search radius | 500m |
| Update frequency | 10s or 50m |
| Results shown | All (sorted) |
| Cache duration | None (real-time) |

---

## 🔐 Security

**Current:** API key hardcoded  
**Risk:** Medium (restricted by usage quotas)  
**Fix:** Move to environment variables

```bash
# Create .env
echo "GOOGLE_PLACES_API_KEY=your_key" > .env

# Update placesApi.ts
import Constants from 'expo-constants';
const API_KEY = Constants.expoConfig?.extra?.apiKey;
```

---

## 📚 Documentation

| Doc | Purpose |
|-----|---------|
| `SETUP_INSTRUCTIONS.md` | Setup guide |
| `GOOGLE_PLACES_INTEGRATION.md` | Technical details |
| `INTEGRATION_COMPLETE.md` | Complete summary |
| `ARCHITECTURE_FLOW.md` | Visual diagrams |
| `QUICK_REFERENCE.md` | This file |

---

## 🎓 How It Works (One Sentence)

**Gets your location → searches Google for nearby places → maps each to reward categories → finds which of your cards gives the best cashback → displays results sorted by highest reward.**

---

## 💡 Tips

- Pull down to refresh places
- Add cards first for better results
- Grant location permissions
- Use real device for accurate GPS
- Check console logs for debugging
- Test at different locations

---

## 🚀 Next Steps

1. ✅ Test basic functionality
2. ✅ Add your personal cards
3. ✅ Test at real locations
4. ⏳ Move API key to env vars
5. ⏳ Add distance calculation
6. ⏳ Implement caching
7. ⏳ Add notifications
8. ⏳ Real map view

---

## 📞 Support

**Check logs:**
```bash
npx expo start
# Watch console output
```

**Clear everything:**
```bash
npx expo start --clear
rm -rf node_modules
npm install
```

**Test API key:**
```bash
curl "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7749,-122.4194&radius=500&key=YOUR_KEY"
```

---

## ✅ Success Checklist

- [ ] App builds without errors
- [ ] Location permission granted
- [ ] Location chip shows city
- [ ] Places appear in list
- [ ] Featured card shows top place
- [ ] Reward percentages shown
- [ ] Pull-to-refresh works
- [ ] No crashes

---

## 🎉 You're Done!

The integration is complete. Just run:

```bash
npx expo start
```

Navigate to Map tab and watch the magic happen! ✨

---

**Questions? Check the full docs or console logs.**

