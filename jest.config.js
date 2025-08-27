module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'ios.js', 'android.js'],
  setupFiles: ['<rootDir>/setup.js'], // Use setupFiles to apply mock early
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Keep for AsyncStorage mock
  transformIgnorePatterns: [
    '/node_modules/(?!react-native|react-native-.*)/',
  ],
};