import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/productSlice';
import {colors} from '../utills/color'

const CartScreen = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleQuantityChange = (id: string, quantity: number) => dispatch(updateQuantity({ id, quantity }));

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <Text>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Text>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.quantity}
        value={item.quantity.toString()}
        onChangeText={(text) => handleQuantityChange(item.id, parseInt(text) || 1)}
        keyboardType="numeric"
      />
    </View>
  );

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: colors.Background },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: colors.white, marginBottom: 5 },
  remove: { color: colors.Error },
  quantity: { width: 50, borderWidth: 1, borderColor: colors.Grey, textAlign: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', padding: 10 },
});

export default CartScreen;