import { configureStore } from '@reduxjs/toolkit';
import reducers from './productSlice';
import { saveFavoritesMiddleware } from './productSlice';

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveFavoritesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;