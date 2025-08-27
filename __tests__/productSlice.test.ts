import { productSlice, cartSlice, toggleFavorite, setFilterCategory, addToCart, removeFromCart, updateQuantity  } from '../src/redux/productSlice'; // Adjust path
import { Product, CartItem } from '../src/utills/types';
import {initialProductState, initialCartState} from '../src/utills/types'

// Combine reducers for testing
const reducer = (state: any, action: any) => ({
  products: productSlice.reducer(state.products, action),
  cart: cartSlice.reducer(state.cart, action),
});

describe('Product Slice Reducers', () => {
  test('should toggle favorite status of a product', () => {
    const initialState = {
      products: initialProductState,
      cart: initialCartState,
    };

    // Add a favorite
    let state = reducer(initialState, toggleFavorite('2'));
    expect(state.products.favorites).toContain('2');
    expect(state.products.favorites.length).toBe(1); // Starts empty, adds '2'

    // Remove the favorite
    state = reducer(state, toggleFavorite('2'));
    expect(state.products.favorites).not.toContain('2');
    expect(state.products.favorites.length).toBe(0);
  });

  test('should add or update quantity in cart', () => {
    const initialState = {
      products: initialProductState,
      cart: initialCartState,
    };

    const product: Product = {
      id: '1',
      name: 'Test Product',
      price: 10,
      image: 'test.jpg',
      description: 'Test',
      category: 'Test',
    };

    // Add product to cart
    let state = reducer(initialState, addToCart(product));
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0]).toEqual({ ...product, quantity: 1 });

    // Add same product again (increase quantity)
    state = reducer(state, addToCart(product));
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].quantity).toBe(2);
  });
});