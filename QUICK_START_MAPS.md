# 🗺️ Quick Start - Google Maps Integration

## ⚡ TL;DR - Get Maps Working in 3 Minutes

### 1. Get API Key (2 minutes)
```
1. Go to: https://console.cloud.google.com/
2. Enable "Maps JavaScript API"
3. Create API key
4. Copy it
```

### 2. Add to .env File (30 seconds)
Create `.env` in project root:
```bash
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB_your_key_here
```

### 3. Start App (30 seconds)
```bash
npm run dev
```

### 4. Test It! 
Open: http://localhost:8080/map

✅ **You should see a real Google Map with your location!**

---

## 🎮 Try This Right Now

1. **Drag the blue marker** - Move your "location" anywhere on the map
2. **Zoom in/out** - Use mouse wheel or pinch gesture
3. **Pan around** - Click and drag the map
4. **See merchant markers** - 3 mock merchants near SF

---

## 🎯 What You Can Do

### Already Working:
- ✅ Real interactive Google Map
- ✅ Your current location (auto-detected)
- ✅ **Draggable location marker** (move it anywhere!)
- ✅ Reverse geocoding (shows city name)
- ✅ Mock merchant markers
- ✅ iOS-style floating UI

### Coming Soon:
- 🔄 Real nearby merchants (Google Places API)
- 🔄 Card recommendations based on location
- 🔄 Click merchants for details
- 🔄 Search for places

---

## 🔍 Visual Guide

### What You'll See:

```
┌─────────────────────────────────────┐
│  📍 San Francisco                   │  ← Location chip
├─────────────────────────────────────┤
│                                     │
│     🏪         🎯         🛒        │  ← Merchant markers
│                                     │
│              📍                     │  ← YOU (draggable!)
│              ⭕                     │  ← Pulse ring
│                                     │
│         [Google Map Here]           │
│                                     │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐ │
│  │ Starbucks                     │ │  ← Merchant card
│  │ Use Discover it • 5% cashback │ │
│  └───────────────────────────────┘ │
├─────────────────────────────────────┤
│  💳 Wallet  |  🗺️ Map  |  🔔 Alerts │  ← Navigation
└─────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Problem: "Google Maps API Key Required" message

**Solution:**
```bash
# Check if .env exists
ls -la .env

# If not, create it
echo 'VITE_GOOGLE_MAPS_API_KEY=your_key_here' > .env

# Restart dev server
npm run dev
```

### Problem: Map not loading

**Solution 1:** Check browser console (F12)
- Look for Google Maps errors
- Check API key is valid

**Solution 2:** Enable the API
- Go to Google Cloud Console
- Make sure "Maps JavaScript API" is enabled

**Solution 3:** Check API restrictions
- Add `http://localhost:*` to allowed domains

### Problem: Can't drag the marker

**Solution:** Click directly on the **blue circle**, not the pulse ring animation

---

## 📖 Full Documentation

For detailed setup instructions:
→ See: `docs/GOOGLE_MAPS_SETUP.md`

For data integration details:
→ See: `docs/DATA_INTEGRATION.md`

For complete integration summary:
→ See: `INTEGRATION_SUMMARY.md`

---

## 🎉 What's Integrated

### ✅ Phase 1 Complete:
- Google Maps JavaScript API
- Interactive map with controls
- User location detection
- Draggable location marker
- Reverse geocoding
- Mock merchant markers
- Floating UI components

### 📦 Data Files Added:
- Card rewards matrix (504 cards)
- Python reference scripts
- Category mappings
- Brand recognitions

---

## 🚀 Next Steps

Want to go further? Here's what to do next:

### 1. **Add Real Merchants** (Google Places API)
See: `native/GOOGLE_PLACES_INTEGRATION.md`

### 2. **Connect Rewards Engine**
Convert Python scripts to TypeScript
See: `docs/DATA_INTEGRATION.md`

### 3. **Card Recommendations**
Map merchants to card categories
Show best cashback for each location

---

## 💰 API Costs

Don't worry about costs for personal projects:

**Free Tier:**
- 28,000 map loads per month
- $200 credit per month for other APIs

**For a personal project with <100 users:** FREE ✅

Set up billing alerts just in case!

---

## ⚡ Quick Commands

```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Check for issues
npm run lint
```

---

## 📞 Need Help?

Check these files:
1. `docs/GOOGLE_MAPS_SETUP.md` - Detailed setup guide
2. `INTEGRATION_SUMMARY.md` - What's been done
3. `docs/DATA_INTEGRATION.md` - Data integration guide

---

**Status**: ✅ Google Maps is ready to use!
**Date**: November 11, 2025

**👉 Just add your API key to `.env` and start the app!**

