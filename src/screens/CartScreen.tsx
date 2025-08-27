import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/productSlice';
import { colors } from '../utills/color';
import { responsiveFont } from '../utills/fontSize';

const CartScreen = () => {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const { items } = useSelector((state: RootState) => state.cart);

  // Remove item from cart by id
  const handleRemove = (id: string) => dispatch(removeFromCart(id));

  // Update product quantity in cart
  const handleQuantityChange = (id: string, quantity: number) =>
    dispatch(updateQuantity({ id, quantity }));

  // Render each cart item row
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      {/* Show product name, price and quantity */}
      <Text>
        {item.name} - ${item.price.toFixed(2)} x {item.quantity}
      </Text>

      {/* Remove item from cart */}
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>

      {/* Input for updating quantity */}
      <TextInput
        style={styles.quantity}
        value={item.quantity.toString()}
        onChangeText={(text) =>
          handleQuantityChange(item.id, parseInt(text) || 1) // Default to 1 if invalid
        }
        keyboardType="numeric"
      />
    </View>
  );

  // Calculate total cart price
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* List of cart items */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Show total cart price */}
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

// Styles for CartScreen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: colors.Background },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 5,
  },
  remove: { color: colors.Error },
  quantity: {
    width: 50,
    borderWidth: 1,
    borderColor: colors.Grey,
    textAlign: 'center',
  },
  total: {
    fontSize: responsiveFont(18),
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 10,
  },
});

export default CartScreen;
