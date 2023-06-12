import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const FoodListScreen = () => {
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
      setMenuItems(data.items);
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
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants or cuisines"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredFoodList.length > 0 ? filteredFoodList : menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No food found.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  listContent: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default FoodListScreen;
