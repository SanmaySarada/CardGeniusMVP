# Google Maps Integration Setup

## Overview

The CardChooser React app now uses **real Google Maps** with interactive features:
- ✅ Interactive map with zoom/pan controls
- ✅ User location marker (draggable!)
- ✅ Nearby merchant markers
- ✅ Real-time location updates
- ✅ Reverse geocoding for address display

---

## Getting Your Google Maps API Key

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create a New Project (or use existing)
1. Click the project dropdown at the top
2. Click "New Project"
3. Name it "CardChooser" or similar
4. Click "Create"

### Step 3: Enable Required APIs
1. Go to **APIs & Services** → **Library**
2. Search for and enable these APIs:
   - **Maps JavaScript API** (required for map display)
   - **Places API** (needed for nearby merchant search)
   - **Geocoding API** (optional, for address lookups)

### Step 4: Create API Key
1. Go to **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"API Key"**
4. Copy the key (it looks like: `AIzaSyB...`)

### Step 5: Restrict Your API Key (Important!)
For security, restrict your key:

1. Click on your API key name
2. Under **"API restrictions"**:
   - Select "Restrict key"
   - Check: Maps JavaScript API, Places API, Geocoding API
3. Under **"Website restrictions"**:
   - Add: `http://localhost:*` (for development)
   - Add: `https://yourdomain.com/*` (for production)
4. Click **"Save"**

---

## Adding the API Key to Your Project

### Option 1: Create .env file (Recommended)

Create a file named `.env` in your project root:

```bash
cd "/Users/sanmaysarada/Downloads/mellow-card-main 3"
touch .env
```

Add this line to the `.env` file:

```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB_your_actual_api_key_here
```

### Option 2: Use the Existing .env File

If you already have a `.env` file, just add the line above to it.

---

## Verify Installation

### 1. Check that the library is installed:
```bash
npm list @vis.gl/react-google-maps
```

Should show: `@vis.gl/react-google-maps@x.x.x`

### 2. Start the dev server:
```bash
npm run dev
```

### 3. Navigate to the Map page:
Open: http://localhost:8080/map

### 4. What you should see:
- ✅ Real Google Map centered on your location
- ✅ Blue user marker with pulsing ring
- ✅ You can drag the user marker to move your "location"
- ✅ Mock merchant markers (Starbucks, Target, Whole Foods)
- ✅ Location chip at top showing your city
- ✅ Merchant card at bottom when near a place

### 5. If you see an error message:
**"Google Maps API Key Required"** → Add your API key to `.env`

---

## Testing Draggable Location

### Try This:
1. Go to http://localhost:8080/map
2. Wait for map to load
3. **Click and drag** the blue user location marker
4. Watch the location update in real-time!
5. The location chip at the top will update with the new address

---

## Map Features

### Current Features:
- **Interactive Map**: Zoom, pan, and explore
- **User Location**: Shows your current position
- **Draggable Marker**: Move your location by dragging
- **Merchant Markers**: Shows nearby places (currently mock data)
- **Reverse Geocoding**: Converts coordinates to city names
- **Floating UI**: Clean iOS-style overlays

### Coming Soon:
- Real Google Places API integration
- Search nearby merchants
- Card recommendations based on nearby places
- Click merchant markers for details
- Navigation to merchants

---

## File Structure

```
src/
├── components/
│   └── GoogleMap.tsx         ⭐ NEW - Google Maps component
│
├── pages/
│   └── Map.tsx               ✏️ UPDATED - Now uses real maps
│
└── hooks/
    └── useLocation.tsx       (existing - for browser geolocation)
```

---

## Troubleshooting

### Map Not Loading?

**Check 1: API Key Set?**
```bash
# In your project root
cat .env | grep GOOGLE_MAPS_API_KEY
```

**Check 2: API Enabled?**
- Go to Google Cloud Console
- Check that "Maps JavaScript API" is enabled

**Check 3: Browser Console**
- Open DevTools (F12)
- Look for Google Maps errors
- Common: "RefererNotAllowedMapError" → Add localhost to API restrictions

### Dragging Not Working?

Make sure you're clicking directly on the **blue marker circle**, not the pulse ring.

### Location Not Accurate?

The browser's geolocation can be approximate. For best results:
- Allow location permissions in your browser
- Use HTTPS (in production)
- Manually drag the marker to adjust

---

## API Costs

### Google Maps Pricing (as of 2025):

**Maps JavaScript API:**
- First 28,000 loads per month: FREE
- After that: $7 per 1,000 loads

**Places API:**
- First $200 credit per month: FREE
- Place Search: $32 per 1,000 requests

For a personal project with < 100 daily users, you'll likely stay within the free tier.

Set up billing alerts in Google Cloud Console to monitor usage!

---

## Next Steps

### 1. Google Places API Integration
Replace the mock merchants with real nearby places:
- Use Places Nearby Search
- Get real merchant data
- Show accurate distances

### 2. Card Recommendations
Connect to the rewards matrix:
- Map merchant types to card categories
- Calculate best cashback
- Show in the merchant card preview

### 3. Search Functionality
Add a search bar to find specific places:
- Autocomplete suggestions
- Jump to searched location
- Get directions

---

## Documentation Links

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Places API](https://developers.google.com/maps/documentation/places/web-service)
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/)

---

**Status**: ✅ Google Maps integrated and working!
**Date**: November 11, 2025

