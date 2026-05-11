# React Native / Expo PUDO Checklist

## 1. PLAN (Architecture & Strategy)
- [ ] **Failure Modes & Store Review:** Identify App Store / Play Store review edge cases, account deletion rules, and blocker policies BEFORE polishing the UI.
- [ ] **Native Build Config:** Establish EAS Build profiles or Bare RN configs early as they are silent killers. Identify constraints with third-party SDKs.
- [ ] **Framework Base:** Decide between Expo Managed Workflow vs. Bare React Native based on native module requirements.
- [ ] **Navigation:** Plan navigation structure using React Navigation or Expo Router (file-based).
- [ ] **Offline & Storage:** Plan offline-first capabilities using AsyncStorage, MMKV, or SQLite.
- [ ] **UI Library:** Select a styling strategy (Tailwind via NativeWind, Tamagui, or StyleSheet).

## 2. UNDERSTAND (Context & Auditing)
- [ ] **Native Dependencies & Plugins:** Audit `package.json` for libraries requiring auto-linking or custom native code (EAS Plugins). Prioritize diagnosing native dependency crashes.
- [ ] **Platform Differences:** Identify features that require diverging logic between iOS (`.ios.tsx`) and Android (`.android.tsx`).
- [ ] **State Management:** Review global state for performance impacts on re-renders (context vs. atomic state like Jotai).

## 3. DEVELOP (Implementation)
- [ ] **Layouts & Flexbox:** Build fluid, responsive layouts using React Native Flexbox. Handle Safe Areas (notches, dynamic islands).
- [ ] **Interactivity:** Use `Animated` API or `react-native-reanimated` for 60fps/120fps animations on the UI thread.
- [ ] **Lists:** Replace `ScrollView` with `FlatList` or `FlashList` for rendering large datasets efficiently.
- [ ] **Permissions:** Implement graceful permission requests (Camera, Location, Push Notifications).

## 4. OPTIMIZE (Performance & Review)
- [ ] **JS Thread vs UI Thread:** Ensure heavy calculations do not block the JS thread (causing UI stutter).
- [ ] **Image Optimization:** Use `expo-image` or `react-native-fast-image` for caching and aggressive memoization.
- [ ] **App Size:** Strip unused native modules, compress assets, and use Hermes engine to optimize startup time.
- [ ] **Testing:** Implement automated E2E flows with Maestro/Detox and unit tests using React Native Testing Library.