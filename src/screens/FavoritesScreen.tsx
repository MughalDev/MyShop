import React, { useEffect } from 'react';
import { View, Text, FlatList, useWindowDimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loadFavorites } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { colors } from '../utills/color';
import { responsiveFont } from '../utills/fontSize';

const FavoritesScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  // Extract products & favorites list from Redux store
  const { products, favorites } = useSelector((state: RootState) => state.products);

  // Dynamically adjust number of columns based on screen width
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 2 : 1; // Tablet = 2 columns, Mobile = 1 column

  // Load favorite items when the screen is mounted
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  // Filter only the products that are in the favorites list
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <View style={styles.container}>
      {favoriteProducts.length === 0 ? (
        // Show message if no favorites are found
        <Text style={styles.message}>No favorites yet</Text>
      ) : (
        // Display list of favorite products
        <FlatList
          data={favoriteProducts}
          key={numColumns} // Re-render FlatList when column count changes
          numColumns={numColumns} // Support responsive layout
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              // Navigate to product details screen when clicked
              onPress={() => navigation.navigate('Details', { productId: item.id })}
              isFavorite={true} // Marked as favorite
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

// Styles for FavoritesScreen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.Background },
  message: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: colors.Text, 
    fontSize: responsiveFont(18) 
  },
});

export default FavoritesScreen;
