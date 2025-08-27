import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchProducts, setFilterCategory, toggleFavorite } from '../redux/productSlice'; // Fixed import
import { addToCart } from '../redux/productSlice'; // Ensure correct import for cart actions
import ProductCard from '../components/ProductCard';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../utills/color';
import { pickerSelectStyles } from '../utills/pickerSelectStyles';
import { scale, verticalScale } from '../utills/dimentions';

const ProductListScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { products, loading, error, categories, favorites } = useSelector(
    (state: RootState) => state.products,
  );
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 2 : 1;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts()).finally(() => setRefreshing(false));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        accessibilityLabel="Search input"
      />
      <View style={styles.innerBar}>
        <RNPickerSelect
          value={selectedCategory} // use `value` instead of selectedValue
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            dispatch(setFilterCategory(itemValue));
          }}
          items={categories.map((category) => ({
            label: category,
            value: category,
          }))}
          style={styles.pickerSelectStyles}
          placeholder={{ label: 'Select a category', value: null, color: colors.Text, }}
          useNativeAndroidPickerStyle={false} // optional, for styling on Android
          Icon={() => {
            return (
              <Image
                source={require('../images/downArrow.png')}
                style={{
                  width: scale(10),
                  height: scale(10),
                  marginTop: scale(20),
                }}
                tintColor={colors.Primary}
                resizeMode="contain"
              />
            );
          }}
        />
      </View>

      {loading ? (
        <Text style={styles.message}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>Error: {error}. Retrying...</Text>
      ) : filteredProducts.length === 0 ? (
        <Text style={styles.message}>No products found</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          key={numColumns}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('Details', { productId: item.id })}
              isFavorite={favorites.includes(item.id)} // Use useSelector for this
              onToggleFavorite={() => handleToggleFavorite(item.id)}
              onAddToCart={() => handleAddToCart(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.Background },
  search: {
    paddingVertical: 12, // top & bottom padding
    paddingHorizontal: 15, // left & right padding
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 1, // full border
    borderColor: colors.Grey, // border color
    borderRadius: 8, // optional: rounded edges
    backgroundColor: colors.white,
    fontSize: 16, // make text cleaner
    color: colors.Text, // if you have a black color
  },
  picker: { height: 50, width: '100%' },
  message: { textAlign: 'center', marginTop: 20, color: colors.Text },
  error: { textAlign: 'center', marginTop: 20, color: colors.Error },
  innerBar: {
    width: '90%',
    height: verticalScale(60),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ProductListScreen;
