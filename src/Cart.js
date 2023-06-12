import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FoodItem from './components/molecules/FoodItem';
import EmptyText from './components/atoms/EmptyText';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('cartItems', cartItems);
  }, []);
  const itemSubtotal = cartItems.reduce(
    (subtotal, item) => subtotal + item.price,
    0
  );

  // Calculate the tax rate
  const taxRate = 0.1; // 10%

  // Calculate the tax applied
  const taxApplied = itemSubtotal * taxRate;

  // Calculate the grand total
  const grandTotal = itemSubtotal + taxApplied;

  // Handle checkout button press
  const handleCheckout = () => {
    const orderDetails = {
      items: cartItems,
      itemSubtotal,
      taxApplied,
      grandTotal,
    };
    const orderJson = JSON.stringify(orderDetails);

    // Display order completion pop-up
    Alert.alert('Order Completed', `Order Details: ${orderJson}`);
    dispatch({ type: 'CLEAR_CART' });
  };

  const renderItem = ({ item }) => (
    <FoodItem
      name={item.name}
      price={item.price}
      description={item.description}
      category={item.category}
      image={item.image}
      type={item.item_type}
      quantity={item.quantity}
      flag="cart"
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyText>Cart is Empty</EmptyText>}
        ListHeaderComponent={<Text style={styles.cartHeader}>Cart Items</Text>}
      />
      {cartItems.length > 0 && (
        <>
          {/* Existing footer content */}
          <View style={styles.taxContainer}>
            <Text style={styles.taxLabel}>
              Tax ({(taxRate * 100).toFixed(0)}%):
            </Text>
            <Text style={styles.taxPrice}>$ {taxApplied.toFixed(2)}</Text>
          </View>
          <View style={styles.containerBottom}>
            <Text style={styles.containerBottomLabel}>Total:</Text>
            <Text style={styles.containerBottomPrice}>
              $ {grandTotal.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  cartHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#e74c3c',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taxLabel: {
    fontSize: 16,
    color: '#333',
  },
  taxPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
    marginTop: 16,
  },
  containerBottomLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
  },
  containerBottomPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CartPage;
