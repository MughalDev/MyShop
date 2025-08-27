import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleFavorite, fetchProducts, loadFavorites } from '../redux/productSlice';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../utills/color';
import { responsiveFont } from '../utills/fontSize';

// Define route prop type for product details screen
type DetailsScreenRouteProp = RouteProp<{ params: { productId: string } }, 'params'>;

const ProductDetailsScreen = ({ route }: { route: DetailsScreenRouteProp }) => {
  // Extract productId from navigation route
  const { productId } = route.params;

  // Redux hooks
  const dispatch = useDispatch();
  const { products, favorites } = useSelector((state: RootState) => state.products);

  // Find the product by its ID
  const product = products.find((p) => p.id === productId);

  // Fetch products & favorites when component mounts
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // Load products if empty
    }
    dispatch(loadFavorites()); // Always load favorites on screen mount
  }, [dispatch]);

  // Handle case when product is not found
  if (!product) return <Text>Product not found</Text>;

  // Check if product is already in favorites
  const isFavorite = favorites.includes(product.id);

  // Toggle favorite action
  const handleToggle = () => dispatch(toggleFavorite(product.id));

  return (
    <View style={styles.container}>
      {/* Product image */}
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        accessibilityLabel={`${product.name} image`}
      />

      {/* Product details */}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      {/* Favorite button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleToggle}
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.Background,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  name: {
    fontSize: responsiveFont(25),
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.Text,
  },
  description: {
    fontSize: responsiveFont(16),
    textAlign: 'center',
    marginTop: 10,
    color: colors.Text,
  },
  price: {
    fontSize: responsiveFont(18),
    color: colors.Primary,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.Success,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
