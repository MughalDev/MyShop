This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# My Shop
Project Overview
This is a cross-platform e-commerce app built with bare React Native and TypeScript. It fetches products from a mock API, allows searching, filtering by category, viewing details, adding to favorites, managing a shopping cart, and viewing favorites. It runs on iOS, Android with responsive design.

# Technologies used:

React Native
TypeScript
React Navigation
Redux Toolkit for state
AsyncStorage for persistence
Jest for testing
react-native-image-placeholder for lazy loading

# Key features:

Product list with search, category filtering, loading/empty states, pull-to-refresh
Product details with favorite toggle
Favorites screen with real-time updates
Shopping cart with add/remove functionality
Deep linking
Responsive grid (1-2 columns)
Accessibility support
Offline product caching
Error handling with retry

Project Setup Instructions
text# Install dependencies
npm install

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android

 State Management: Redux Toolkit – Provides slices for products, favorites, and cart, with async thunks for API/persistence and middleware for saving. Chosen for structured state management.
 Component Architecture: Reusable ProductCard component with memoization.
 Data Persistence: AsyncStorage for favorites and cached products – Ensures offline access and cross-platform persistence.
 Performance: React.memo for ProductCard, lazy-loaded images with placeholders.
 Security: No sensitive data; API is public mock.
 Testing: Unit tests for components and slice logic.

Screenshots/GIFs
(Attach your own screenshots here, e.g.:

List Screen: products, search
Details Screen: details and toggle
Cart Screen: cart items
Favorites Screen: favorited items
Deep Link: Demo URL navigation)

Submission Checklist

✅ Full source code with dependencies
✅ README with instructions
✅ Technical decisions documented
✅ TypeScript used
✅ 2+ unit tests passing
✅ Cross-platform (iOS/Android)
✅ Favorites persist
✅ Search implemented
✅ Deep links working
✅ Production-ready quality
✅ Shopping cart functionality
✅ Offline support
✅ Performance optimizations
✅ Error handling
✅ Pull-to-refresh
- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
