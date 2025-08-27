import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  Image,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchProducts, setFilterCategory, toggleFavorite } from '../redux/productSlice'; // Product actions
import { addToCart } from '../redux/productSlice'; // Cart action
import ProductCard from '../components/ProductCard';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../utills/color';
import { pickerSelectStyles } from '../utills/pickerSelectStyles';
import { scale, verticalScale } from '../utills/dimentions';

const ProductListScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const { products, loading, error, categories, favorites } = useSelector(
    (state: RootState) => state.products,
  );

  // Local states
  const [search, setSearch] = useState(''); // search text
  const [refreshing, setRefreshing] = useState(false); // pull-to-refresh state
  const [selectedCategory, setSelectedCategory] = useState('All'); // selected category

  // Get screen width to decide grid columns
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 2 : 1; // 2 columns for tablets, 1 for phones

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on search text
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts()).finally(() => setRefreshing(false));
  };

  // Add product to cart
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  // Toggle favorite product
  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Input */}
      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        accessibilityLabel="Search input"
      />

      {/* 📂 Category Picker */}
      <View style={styles.innerBar}>
        <RNPickerSelect
          value={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            dispatch(setFilterCategory(itemValue)); // update filter in redux
          }}
          items={categories.map((category) => ({
            label: category,
            value: category,
          }))}
          // style={pickerSelectStyles} // uncomment if you want custom picker styles
          placeholder={{ label: 'Select a category', value: null, color: colors.Text }}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Image
              source={require('../images/downArrow.png')}
              style={{
                width: scale(10),
                height: scale(10),
                marginTop: Platform.OS === 'android' ? scale(20) : scale(5),
              }}
              tintColor={colors.Primary}
              resizeMode="contain"
            />
          )}
        />
      </View>

      {/* 📦 Product List Section */}
      {loading ? (
        <Text style={styles.message}>Loading...</Text> // Show loading state
      ) : error ? (
        <Text style={styles.error}>Error: {error}. Retrying...</Text> // Show error state
      ) : filteredProducts.length === 0 ? (
        <Text style={styles.message}>No products found</Text> // Show empty state
      ) : (
        <FlatList
          data={filteredProducts}
          key={numColumns} // re-render when columns change
          numColumns={numColumns}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('Details', { productId: item.id })}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
              onAddToCart={() => handleAddToCart(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.Background },

  // 🔍 Search bar styles
  search: {
    paddingVertical: 12, // top & bottom padding
    paddingHorizontal: 15, // left & right padding
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 1, // full border
    borderColor: colors.Grey, // border color
    borderRadius: 8, // rounded edges
    backgroundColor: colors.white,
    fontSize: 16, // text size
    color: colors.Text, // text color
  },

  // 📂 Picker styles
  picker: { height: 50, width: '100%' },

  // ℹ️ Status messages
  message: { textAlign: 'center', marginTop: 20, color: colors.Text },
  error: { textAlign: 'center', marginTop: 20, color: colors.Error },

  // Picker wrapper
  innerBar: {
    width: '90%',
    height: verticalScale(60),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ProductListScreen;
