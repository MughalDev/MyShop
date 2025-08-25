import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppContent from './src/Navigation';

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;