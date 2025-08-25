import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, CartItem } from '../utills/types';
import { fetchProducts as fetchProductsAPI } from '../utills/api';

interface ProductState {
  products: Product[];
  cachedProducts: Product[]; // For offline support
  favorites: string[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

interface CartState {
  items: CartItem[];
}

export const initialProductState: ProductState = {
  products: [],
  cachedProducts: [],
  favorites: [],
  categories: [],
  loading: false,
  error: null,
};

export const initialCartState: CartState = {
  items: [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchProductsAPI();
    await AsyncStorage.setItem('@cachedProducts', JSON.stringify(response)); // Cache products
    return response;
  } catch (error) {
    const cached = await AsyncStorage.getItem('@cachedProducts');
    if (cached) return JSON.parse(cached);
    return rejectWithValue((error as Error).message || 'Failed to fetch');
  }
});

export const loadFavorites = createAsyncThunk('products/loadFavorites', async () => {
  const stored = await AsyncStorage.getItem('@favorites');
  return stored ? JSON.parse(stored) : [];
});

export const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fid) => fid !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') {
        state.products = state.cachedProducts;
      } else {
        state.products = state.cachedProducts.filter(p => p.category === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.cachedProducts = action.payload;
        state.categories = ['All', ...new Set(action.payload.map(p => p.category))];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
  },
});

export const { toggleFavorite, setFilterCategory } = productSlice.actions;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const saveFavoritesMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type === 'products/toggleFavorite') {
    const { favorites } = store.getState().products;
    AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
  }
  return result;
};

export default {
  products: productSlice.reducer,
  cart: cartSlice.reducer,
};