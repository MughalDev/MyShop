export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string; // Added for categories
}

export interface CartItem extends Product {
  quantity: number;
}

// Product state interface (for product list, categories, favorites, etc.)
export interface ProductState {
  products: Product[];        // Currently displayed products
  cachedProducts: Product[];  // Backup (for offline support)
  favorites: string[];        // Favorite product IDs
  categories: string[];       // Product categories
  loading: boolean;           // Loading state
  error: string | null;       // Error state
}

export const initialProductState: ProductState = {
  products: [],
  cachedProducts: [],
  favorites: [],
  categories: [],
  loading: false,
  error: null,
};

// Cart state interface (for shopping cart items)
export interface CartState {
  items: CartItem[];          // Items in the cart
}

export const initialCartState: CartState = {
  items: [],
};