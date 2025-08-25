import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Comprehensive mock for react-native
jest.mock('react-native', () => {
  return {
    __DEV__: true, // Ensure __DEV__ is defined
    Platform: {
      OS: 'ios', // or 'android' for testing
      select: (obj: any) => obj.ios || obj.default, // Simple select mock
      isTV: false,
      isTesting: true, // Useful for test environment
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667 })), // Default iPhone dimensions
    },
    View: 'View',
    Text: 'Text',
    Image: 'Image',
    // Mock Utilities namespace to handle internal imports
    Utilities: {
      Platform: {
        OS: 'ios',
        select: (obj: any) => obj.ios || obj.default,
        isTV: false,
      },
    },
    // Add other components or APIs as needed
  };
});

// Optional: Log to verify mock
console.log('React Native mock applied with __DEV__:', global.__DEV__);