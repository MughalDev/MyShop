// setup.js
global.__DEV__ = true;

// Mock react-native globally before any requires
jest.mock('react-native', () => {
  return {
    __DEV__: true,
    Platform: {
      OS: 'ios',
      select: (obj) => obj.ios || obj.default,
      isTV: false,
      isTesting: true,
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667 })),
    },
    View: 'View',
    Text: 'Text',
    Image: 'Image',
    Utilities: {
      Platform: {
        OS: 'ios',
        select: (obj) => obj.ios || obj.default,
        isTV: false,
      },
    },
    Performance: {
      Systrace: {
        beginEvent: jest.fn(),
        endEvent: jest.fn(),
        beginAsyncEvent: jest.fn(),
        endAsyncEvent: jest.fn(),
      },
    },
    BatchedBridge: {
      __fbBatchedBridgeConfig: {
        remoteModuleConfig: [{}], // Minimal valid config
        localModulesConfig: [{}],
        startupCode: [], // Simulate startup code
      },
      MessageQueue: {
        spy: jest.fn(),
        createDebugLookup: jest.fn(),
        callFunctionReturnFlushedQueue: jest.fn(() => []),
        registerCallableModule: jest.fn(),
        invokeCallbackAndReturnFlushedQueue: jest.fn(() => []),
      },
    },
    TurboModuleRegistry: {
      get: jest.fn((name) => {
        if (name === 'RCTSafeAreaProvider') {
          return {
            getConstants: jest.fn(() => ({ insets: { top: 0, left: 0, right: 0, bottom: 0 } })),
          };
        }
        return null;
      }),
    },
    NativeModules: {
      UIManager: {
        getViewManagerConfig: jest.fn(() => null),
      },
      PlatformConstants: {
        forceTouchAvailable: false,
      },
      RCTSafeAreaProvider: {
        getConstants: jest.fn(() => ({ insets: { top: 0, left: 0, right: 0, bottom: 0 } })),
      },
    },
    requireNativeComponent: jest.fn(() => 'MockNativeComponent'),
  };
});

console.log('✅ React Native mock applied globally, __DEV__:', global.__DEV__);