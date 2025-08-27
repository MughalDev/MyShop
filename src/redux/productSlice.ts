import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, CartItem } from '../utills/types';
import { fetchProducts as fetchProductsAPI } from '../utills/api';
import { ProductState, CartState, initialProductState , initialCartState} from '../utills/types';

// Fetch products from API (with offline cache fallback)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProductsAPI();
      // Save products in cache for offline support
      await AsyncStorage.setItem('@cachedProducts', JSON.stringify(response));
      return response;
    } catch (error) {
      // If API fails, load cached products (if available)
      const cached = await AsyncStorage.getItem('@cachedProducts');
      if (cached) return JSON.parse(cached);
      return rejectWithValue((error as Error).message || 'Failed to fetch');
    }
  }
);

// Load favorite items from AsyncStorage
export const loadFavorites = createAsyncThunk('products/loadFavorites', async () => {
  const stored = await AsyncStorage.getItem('@favorites');
  return stored ? JSON.parse(stored) : [];
});


// PRODUCT SLICE
export const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    // Toggle favorite (add/remove product from favorites list)
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        // If already in favorites, remove it
        state.favorites = state.favorites.filter((fid) => fid !== id);
      } else {
        // Otherwise, add to favorites
        state.favorites.push(id);
      }
    },

    // Filter products by category (restore all if 'All' is selected)
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
      // While fetching, set loading = true
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      // On success, update products, cache, and categories
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.cachedProducts = action.payload;
        state.categories = ['All', ...new Set(action.payload.map(p => p.category))];
      })
      // On failure, save error message
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Load favorites from AsyncStorage
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

// CART SLICE
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    // Add product to cart (if already exists, increase quantity)
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove product from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    // Update product quantity in cart
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
  },
});

// ACTIONS
export const { toggleFavorite, setFilterCategory } = productSlice.actions;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;


// MIDDLEWARE
// Middleware to save favorites whenever toggleFavorite is triggered
export const saveFavoritesMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type === 'products/toggleFavorite') {
    const { favorites } = store.getState().products;
    AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
  }
  return result;
};

// ROOT EXPORT
// Export both slices as a combined reducer object
export default {
  products: productSlice.reducer,
  cart: cartSlice.reducer,
};
