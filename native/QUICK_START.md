# 🚀 CardChooser Mobile - Quick Start

## Install & Run (5 minutes)

### 1️⃣ Install Dependencies
```bash
cd native
npm install
```

### 2️⃣ Start the App
```bash
npx expo start
```

### 3️⃣ Choose Platform
Press in terminal:
- **`i`** - Open iOS Simulator
- **`a`** - Open Android Emulator  
- **Scan QR** - Run on your phone with Expo Go app

---

## 📱 What You'll See

### Screen Flow:
1. **Onboarding** → Welcome + Location + Notifications permissions
2. **Wallet** → 3D card stack with mock cards
3. **Add Card** → Card scanning simulation
4. **Dashboard** → Transactions and spending charts
5. **Map** → Location-based merchant recommendations
6. **Notifications** → Cashback alerts
7. **Settings** → Privacy info

### Navigation:
- **Bottom Tabs**: Wallet | Map | Alerts
- **Stack Navigation**: Modal screens for details
- **Gestures**: Swipe to go back (iOS)

---

## 🎨 Features

✅ Beautiful iOS-inspired design  
✅ 3D card stack with gradients  
✅ Blur effects & glass morphism  
✅ Haptic feedback  
✅ Pull-to-refresh  
✅ Real geolocation  
✅ Mock card scanning  
✅ Spending charts  
✅ Smooth animations  

---

## 🔧 Configuration

### Optional: Add Supabase
Create `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key
```

### Optional: Customize
Edit `app.json`:
- App name
- Bundle ID
- Colors
- Icons

---

## 📦 Project Structure

```
native/
├── App.tsx              # Navigation setup
├── src/
│   ├── screens/        # 8 pages
│   ├── components/     # Reusable UI
│   ├── theme/          # Colors & typography
│   ├── utils/          # Storage helpers
│   └── data/           # Mock data
```

---

## 🐛 Troubleshooting

**Metro won't start?**
```bash
npx expo start --clear
```

**iOS simulator not found?**
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

**Android build errors?**
```bash
cd android && ./gradlew clean
```

---

## 🚀 Build for Production

### iOS (TestFlight)
```bash
eas build --platform ios
```

### Android (Google Play)
```bash
eas build --platform android
```

---

## 📚 Learn More

- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Full README](./README.md)
- [Conversion Guide](../REACT_NATIVE_CONVERSION.md)

---

## ✨ That's It!

Your app is ready to run. Just:
```bash
npx expo start
```

Press **`i`** for iOS or **`a`** for Android! 📱

