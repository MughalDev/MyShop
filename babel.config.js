module.exports = {
  presets: [
    'module:@react-native/babel-preset', // mobile
    '@babel/preset-env',                 // web
    '@babel/preset-react'                // web
  ],
  plugins: [
    'react-native-web' // 👈 maps react-native imports to react-native-web
  ]
};