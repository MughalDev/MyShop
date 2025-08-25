import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Product } from '../utills/types';
import ImagePlaceholder from 'react-native-image-placeholder';
import { colors } from '../utills/color';
import { responsiveFont } from '../utills/fontSize';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, onPress, isFavorite, onToggleFavorite, onAddToCart }) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const cardWidth = isWide ? (width / 2 - 20) : (width - 20);

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      accessibilityLabel={`View details for ${product.name}`}
      accessibilityRole="button"
    >
      <ImagePlaceholder
        source={{ uri: product.image }}
        style={styles.image}
        placeholderStyle={styles.placeholder}
        placeholderColor= {colors.Background}
        loadingIndicatorSource={{ uri: 'https://via.placeholder.com/150' }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      {onToggleFavorite && (
        <TouchableOpacity
          onPress={onToggleFavorite}
          accessibilityLabel={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          accessibilityRole="button"
        >
          <Text style={styles.favorite}>{isFavorite ? '❤️' : '♡'}</Text>
        </TouchableOpacity>
      )}
      {onAddToCart && (
        <TouchableOpacity
          onPress={onAddToCart}
          style={styles.cartButton}
          accessibilityLabel={`Add ${product.name} to cart`}
          accessibilityRole="button"
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}, (prev, next) => prev.product.id === next.product.id && prev.isFavorite === next.isFavorite);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  placeholder: {
    width: '100%',
    height: 150,
  },
  info: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: responsiveFont(16),
    fontWeight: 'bold',
    color: colors.Text,
  },
  price: {
    fontSize: responsiveFont(14),
    color: colors.Primary,
  },
  favorite: {
    fontSize: responsiveFont(20),
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: colors.Success,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  cartText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ProductCard;