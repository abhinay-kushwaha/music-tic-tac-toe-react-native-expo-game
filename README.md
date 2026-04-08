# 🎵 Music Tic Tac Toe

A React Native Expo game that combines the classic Tic Tac Toe gameplay with background music and fun animations.

## Features

- 🎮 Classic 3×3 Tic Tac Toe gameplay for two players
- 🎵 Background music powered by `expo-audio`
- 🎉 Win/draw animations with confetti
- 📱 Runs on Android, iOS, and Web

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- **For Android:** [Android Studio](https://developer.android.com/studio) with an emulator configured, **or** a physical Android device with the [Expo Go](https://expo.dev/client) app installed.
- **For iOS (macOS only):** [Xcode](https://developer.apple.com/xcode/) with a simulator configured, **or** a physical iOS device with the [Expo Go](https://expo.dev/client) app installed.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abhinay-kushwaha/music-tic-tac-toe-react-native-expo-game.git
cd music-tic-tac-toe-react-native-expo-game
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

This will launch the **Expo development server** and display a QR code in your terminal.

## Running the App

### On a Physical Device (Easiest)

1. Install the **Expo Go** app on your phone:
   - [Android — Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS — App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Run `npx expo start` in the project directory.
3. Scan the QR code shown in the terminal with:
   - **Android:** the Expo Go app's built-in QR scanner.
   - **iOS:** the default Camera app.

### On an Android Emulator

```bash
npx expo start --android
```

Make sure an Android Virtual Device (AVD) is already running in Android Studio.

### On an iOS Simulator (macOS only)

```bash
npx expo start --ios
```

Make sure Xcode and the iOS Simulator are installed.

### In a Web Browser

```bash
npx expo start --web
```

Opens the app in your default browser via Expo's web support.

## Project Structure

```
music-tic-tac-toe-react-native-expo-game/
├── App.jsx               # Root component (NavigationContainer)
├── index.js              # Entry point — registers App.jsx with Expo's registerRootComponent
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
├── assets/               # Images, GIFs, icons, and music
├── components/
│   ├── Board.jsx         # Game board component
│   ├── Cell.jsx          # Individual cell component
│   ├── PlayerInfo.jsx    # Player info display
│   ├── navigation/
│   │   └── Navigation.jsx      # Stack navigator (Splash → Main)
│   ├── pages/
│   │   └── MainCompo.jsx       # Main game page
│   └── Splash Screen/          # Note: directory name contains a space
│       └── SplashScreen.jsx
├── screens/
│   ├── HomeScreen.jsx    # Home screen
│   └── GameScreen.jsx    # Game screen
└── utils/
    ├── gameLogic.js      # Win/draw detection logic
    └── forAPK.jsx        # APK build helpers
```

## Building for Production

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for production builds.

### Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

### Build for Android (APK / AAB)

```bash
# Preview build (internal APK)
eas build --platform android --profile preview

# Production build (AAB for Play Store)
eas build --platform android --profile production
```

### Build for iOS

```bash
eas build --platform ios --profile production
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails | Delete `node_modules/` and `package-lock.json`, then run `npm install` again |
| QR code not working | Make sure your phone and computer are on the **same Wi-Fi network** |
| Metro bundler stuck | Press `r` in the terminal to reload, or restart with `npx expo start --clear` |
| Audio not playing on web | Web audio requires a user interaction before playback; tap the screen first |

## License

This project is open source. See the repository for details.
