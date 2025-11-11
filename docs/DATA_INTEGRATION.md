# Data Integration - Credit Card Rewards Matrix

## Files Added to Project

### ✅ Successfully Integrated

#### 1. **Card Rewards Matrix** (`src/data/card_rewards_matrix.csv`)
- **Size**: 447 KB
- **Content**: 504 credit cards × 214 reward categories
- **Purpose**: Real credit card cashback/reward data for recommendation engine

#### 2. **Documentation** (`docs/`)
- `QUICK_START.md` - Quick reference guide for the Python scraper
- `TEST_RESULTS.md` - Test results showing the Python engine works

#### 3. **Reference Scripts** (`scripts/`)
- `map_to_category.py` - Category mapping logic (Python)
- `map.py` - Main recommendation engine (Python)

---

## Current Project Structure

```
/Users/sanmaysarada/Downloads/mellow-card-main 3/
├── src/
│   ├── data/
│   │   ├── card_rewards_matrix.csv ⭐ NEW - Real card data!
│   │   ├── mockCards.ts (existing)
│   │   └── mockTransactions.ts (existing)
│   │
│   ├── utils/
│   │   └── rewardCalculator.ts (existing - needs enhancement)
│   │
│   └── ... (other React files)
│
├── docs/
│   ├── DATA_INTEGRATION.md (this file)
│   ├── QUICK_START.md ⭐ NEW
│   └── TEST_RESULTS.md ⭐ NEW
│
└── scripts/
    ├── map_to_category.py ⭐ NEW (reference)
    └── map.py ⭐ NEW (reference)
```

---

## What's Next?

### To Use This Data in Your React App:

You need to convert the Python logic to TypeScript. Here are the key components:

#### 1. **CSV Parser** (needs to be created)
- Read `card_rewards_matrix.csv` at build time or runtime
- Convert to TypeScript data structure
- Option A: Parse at build time → JSON file
- Option B: Load CSV in browser using Papa Parse library

#### 2. **Category Mapper** (convert `map_to_category.py`)
- Create `src/utils/categoryMapper.ts`
- Port brand overrides (Target, Starbucks, etc.)
- Port Google Places type mappings
- Add fuzzy matching logic

#### 3. **Reward Engine** (convert `map.py`)
- Create `src/utils/rewardEngine.ts`
- Implement card ranking algorithm
- Add search term builder
- Create recommendation logic

#### 4. **Google Places Integration**
- Already have location hooks in `src/hooks/useLocation.tsx`
- Need to add Google Places API calls
- See `native/GOOGLE_PLACES_INTEGRATION.md` for reference

---

## Key Features from Python Scripts

### Brand Recognition (80+ brands)
The Python script recognizes specific brands:
- Target → "Target" category (5% with Target REDcard)
- Starbucks → "Starbucks" category (4% with U.S. Bank Altitude Go)
- Whole Foods → "Whole Foods" category
- Gas stations → "Gas stations (U.S.)" category
- And 70+ more...

### Category Mapping
Maps Google Places types to reward categories:
- `restaurant` → "Restaurants"
- `gas_station` → "Gas stations (U.S.)"
- `supermarket` → "Supermarkets (U.S.)"
- `lodging` → "Hotel"
- And more...

### Smart Ranking Algorithm
1. Takes user's card collection
2. Finds matching reward categories
3. Calculates maximum reward rate
4. Ranks cards by best cashback
5. Shows detailed offer text

---

## Example: How It Works

### User at Starbucks:
1. **Input**: "Starbucks" + location data
2. **Category Mapping**: "Starbucks" → "Starbucks" category (also "Dining")
3. **Card Search**: Look up "Starbucks" and "Dining" columns in CSV
4. **Ranking**:
   - U.S. Bank Altitude® Go: 4% (Dining)
   - AmEx Gold: 4% (Restaurants)
   - Chase Sapphire Reserve: 3% (Dining)
   - Capital One Venture X: 2% (Everywhere)
5. **Recommendation**: "Use U.S. Bank Altitude® Go for 4% back"

---

## Sample Data from CSV

### Chase Sapphire Reserve®
- Travel (chase.com): 10%
- Dining: 10%
- Entertainment (chase.com): 10%
- Everything else: 1%

### American Express® Gold Card
- Restaurants (worldwide): 4%
- Supermarkets (U.S., up to $25k/yr): 4%
- Airlines (Amex Travel): 3%
- Everything else: 1%

### Target REDcard
- Target: 5%
- Target.com: 5%
- Everything else: 0%

---

## Dependencies Needed

To use this data in your React app, you'll need:

### Option 1: Parse CSV at Build Time (Recommended)
```bash
npm install --save-dev csv-parse
```
Create a build script to convert CSV → JSON

### Option 2: Parse CSV at Runtime
```bash
npm install papaparse
npm install --save-dev @types/papaparse
```
Load and parse CSV in browser

### For Fuzzy Matching
```bash
npm install fuse.js
```
For fuzzy string matching like Python's `get_close_matches`

---

## Configuration

### Update User's Cards
In your app, you'll want to let users add their own cards.
Currently, the Python script is configured with these cards:
1. Target REDcard
2. Capital One Venture X Rewards Credit Card
3. American Express® Gold Card
4. Chase Sapphire Reserve®
5. U.S. Bank Altitude® Go

Your React app already has card management in `src/pages/Wallet.tsx`!

---

## Next Steps Checklist

- [ ] Install CSV parsing library (Papa Parse or csv-parse)
- [ ] Create TypeScript types for reward data
- [ ] Convert `map_to_category.py` → `categoryMapper.ts`
- [ ] Convert `map.py` → `rewardEngine.ts`
- [ ] Integrate Google Places API
- [ ] Connect to existing Wallet page
- [ ] Test with real data
- [ ] Deploy!

---

## Questions?

Refer to:
- `scripts/map_to_category.py` - For category mapping logic
- `scripts/map.py` - For recommendation engine logic
- `docs/QUICK_START.md` - For Python script usage
- `docs/TEST_RESULTS.md` - For test results and examples

---

**Status**: ✅ Data files integrated successfully!
**Date**: November 11, 2025

