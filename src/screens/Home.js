/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FoodItem from '../components/molecules/FoodItem';
import SearchInput from '../components/atoms/SearchInput';
import FoodList from '../components/organisms/FoodList';
import EmptyText from '../components/atoms/EmptyText';
import Header from '../components/atoms/Header';

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        'https://hashtagloyalty.s3.ap-southeast-1.amazonaws.com/Take+Home+Assignment+-+Thrive.json'
      );
      const data = await response.json();

      // Add quantity property to each menu item
      const menuItemsWithQuantity = data.items.map((item) => ({
        ...item,
        quantity: 0, // Set the initial quantity to 0
      }));

      setMenuItems(menuItemsWithQuantity);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredList = menuItems.filter((food) =>
      food.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFoodList(filteredList);
  };

  const renderItem = ({ item }) => (
    <FoodItem
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      category={item.category}
      image={item.image}
      type={item.item_type}
      quantity={item.quantity}
    />
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 45,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#e74c3c',
          }}
        >
          Food Buzz
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../assets/images/cart.png')}
            style={{ height: 24, width: 24, tintColor: '#e74c3c' }}
          />
        </TouchableWithoutFeedback>
      </View>
      <SearchInput value={searchText} onChangeText={handleSearch} />
      <FoodList
        data={filteredFoodList.length > 0 ? filteredFoodList : menuItems}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyText>No food found.</EmptyText>}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
