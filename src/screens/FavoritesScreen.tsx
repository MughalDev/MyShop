import React, { useEffect } from 'react';
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loadFavorites } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { StyleSheet } from 'react-native';
import {colors} from '../utills/color'
import { responsiveFont } from '../utills/fontSize';

const FavoritesScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { products, favorites } = useSelector((state: RootState) => state.products);
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 2 : 1;

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <View style={styles.container}>
      {favoriteProducts.length === 0 ? (
        <Text style={styles.message}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          key={numColumns}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('Details', { productId: item.id })}
              isFavorite={true}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.Background },
  message: { textAlign: 'center', marginTop: 20, color: colors.Text, fontSize: responsiveFont(18) },
});

export default FavoritesScreen;