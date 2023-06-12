import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

const FoodItem = ({
  name,
  price,
  description,
  category,
  image,
  type,
  flag,
  id,
  quantity,
}) => {
  const item = {
    name,
    price,
    description,
    category,
    image,
    type,
    id,
    quantity,
  };
  const dispatch = useDispatch();
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₹{price}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Category</Text>
            <Text style={styles.detailsValue}>{category}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Type</Text>
            <Text style={styles.detailsValue}>{type}</Text>
          </View>
        </View>
        {quantity === 0 && flag !== 'cart' ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                dispatch({ type: 'DECREASE_QUANTITY', payload: { id } })
              }
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                dispatch({
                  type: 'INCREASE_QUANTITY',
                  payload: { itemId: id },
                });
              }}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  price: {
    fontSize: 14,
    color: '#535353',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: '#6d6d6d',
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  detailsItem: {
    marginRight: 16,
  },
  detailsLabel: {
    fontSize: 12,
    color: '#7e7e7e',
  },
  detailsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#333333',
  },
  addToCartButton: {
    backgroundColor: '#ff5656',
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default FoodItem;
