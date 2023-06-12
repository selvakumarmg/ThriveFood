import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SearchInput from './SearchInput';

const Header = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    // Perform search logic here
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Food Buz</Text>
      <View style={styles.searchInputContainer}>
        <SearchInput value={searchText} onChangeText={handleSearch} />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  menuIconContainer: {
    width: windowWidth * 0.1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
  },
  searchIconContainer: {
    width: windowWidth * 0.1,
  },
  searchInputContainer: {
    flex: 1,
    marginLeft: 16,
  },
});

export default Header;
