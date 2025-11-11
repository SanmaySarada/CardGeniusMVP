# CardChooser Mobile - React Native

This is the **React Native version** of CardChooser, a mobile app that helps you maximize cashback rewards by recommending the best credit card for every purchase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- iOS: Xcode 14+ and iOS Simulator
- Android: Android Studio and Android Emulator

### Installation

1. **Install dependencies:**
```bash
cd native
npm install
```

2. **Configure Supabase (Optional):**
Create a `.env` file in the `native` directory:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

3. **Start the app:**
```bash
# Start Expo development server
npx expo start

# Or run directly on iOS
npx expo start --ios

# Or run directly on Android
npx expo start --android
```

## 📱 Features Converted

### ✅ Fully Implemented
- **Onboarding Flow** - 3-step permission setup
- **Wallet Screen** - Beautiful 3D card stack with gradients
- **Add Card** - Mock card scanning with haptic feedback
- **Card Details** - Bottom sheet with stats and actions
- **Dashboard** - Transaction list and spending charts
- **Map View** - Location-based merchant recommendations
- **Notifications** - Cashback alerts
- **Settings** - Privacy info and preferences

### 🎨 Design System
- **iOS-inspired UI** with native components
- **Linear gradients** for card backgrounds
- **Blur effects** using expo-blur
- **Haptic feedback** for interactions
- **Smooth animations** with React Native Reanimated
- **Native navigation** with React Navigation

## 🛠️ Tech Stack

### Core
- **React Native** 0.73+ with TypeScript
- **Expo** ~50.0 (managed workflow)
- **React Navigation** 6.x (native stack + bottom tabs)

### UI & Styling
- **Expo Linear Gradient** - Card gradients
- **Expo Blur** - Glass morphism effects
- **React Native Chart Kit** - Spending charts
- **Custom StyleSheet** - iOS design tokens

### Device Features
- **Expo Location** - Geolocation with reverse geocoding
- **Expo Camera** - Card scanning (ready for OCR)
- **Expo Haptics** - Native vibration feedback
- **AsyncStorage** - Local data persistence

### Backend
- **Supabase** - Authentication & database (same schema as web)
- **Row Level Security** - User data isolation

## 📁 Project Structure

```
native/
├── App.tsx                      # Main navigation setup
├── index.js                     # Entry point
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── src/
│   ├── screens/                 # 8 screens
│   │   ├── Onboarding.tsx
│   │   ├── Wallet.tsx
│   │   ├── AddCard.tsx
│   │   ├── CardDetail.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Map.tsx
│   │   ├── Notifications.tsx
│   │   └── Settings.tsx
│   ├── components/              # Reusable components
│   │   ├── EnhancedWalletCard.tsx
│   │   ├── IOSButton.tsx
│   │   └── LocationChip.tsx
│   ├── theme/                   # Design system
│   │   ├── colors.ts
│   │   └── typography.ts
│   ├── hooks/                   # Custom hooks
│   │   └── useLocation.ts
│   ├── utils/                   # Utilities
│   │   └── storage.ts
│   ├── data/                    # Mock data
│   │   ├── mockCards.ts
│   │   └── mockTransactions.ts
│   ├── types/                   # TypeScript types
│   │   └── card.ts
│   └── integrations/            # External services
│       └── supabase/
│           ├── client.ts
│           └── types.ts
```

## 🔐 Privacy & Security

**Same privacy-first approach as the web version:**
- ✅ No PAN (Primary Account Number) storage
- ✅ Only card metadata (brand, bank, name)
- ✅ Token-based references
- ✅ Row Level Security (RLS)
- ✅ Local-first data storage

## 📊 Key Differences from Web

| Feature | Web | Mobile |
|---------|-----|--------|
| **Routing** | React Router | React Navigation |
| **Styling** | Tailwind CSS | StyleSheet + tokens |
| **Charts** | Recharts | React Native Chart Kit |
| **Storage** | localStorage | AsyncStorage |
| **Location** | Browser API | Expo Location |
| **Camera** | WebRTC | Expo Camera |
| **Animations** | CSS transitions | Reanimated |
| **Blur** | CSS backdrop-filter | Expo Blur |
| **Icons** | Lucide React | Emojis/Unicode |

## 🚧 What's Mock/Ready for Integration

### Currently Mock
- ⚠️ Card scanning (2s delay simulation)
- ⚠️ Bank authentication (mock credentials)
- ⚠️ Transaction data (hardcoded)
- ⚠️ Cashback calculations (static)
- ⚠️ Push notifications

### Ready to Integrate
- 📍 Real card scanning (OCR/SDK)
- 📍 Plaid/Stripe for bank connections
- 📍 Supabase real-time subscriptions
- 📍 Firebase Cloud Messaging (push)
- 📍 Background location tracking

## 🎯 Building for Production

### iOS Build
```bash
# Build for TestFlight
npx eas build --platform ios --profile production

# Or local build
npx expo run:ios --configuration Release
```

### Android Build
```bash
# Build for Google Play
npx eas build --platform android --profile production

# Or local build
npx expo run:android --variant release
```

### Required Permissions

**iOS (Info.plist):**
- `NSLocationWhenInUseUsageDescription`
- `NSCameraUsageDescription`

**Android (AndroidManifest.xml):**
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`
- `CAMERA`

## 🔧 Configuration

### Expo Config
Edit `app.json` to customize:
- App name and slug
- Bundle identifiers
- Splash screen
- App icons
- Permissions

### Environment Variables
Use `.env` for sensitive data:
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

## 📦 Dependencies

### Core (12)
```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.4",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "@react-navigation/bottom-tabs": "^6.5.11"
}
```

### Expo Modules (8)
```json
{
  "expo-location": "~16.5.5",
  "expo-camera": "~14.0.5",
  "expo-linear-gradient": "~12.7.2",
  "expo-blur": "~12.9.2",
  "expo-haptics": "~12.8.1"
}
```

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npx expo start --clear
```

### iOS build fails
```bash
cd ios && pod install
```

### Android gradle errors
```bash
cd android && ./gradlew clean
```

## 📱 Tested On

- ✅ iOS 15+
- ✅ Android 10+
- ✅ iPhone 12/13/14/15 (simulator)
- ✅ Pixel 5/6/7 (emulator)

## 🎨 Design Credits

- iOS Human Interface Guidelines
- Apple SF Pro font family
- Material Design color system

## 📄 License

Same as parent project - see root LICENSE file.

---

**Built with ❤️ using React Native & Expo**

For the web version, see the parent directory.

