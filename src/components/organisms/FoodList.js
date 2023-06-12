import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const FoodList = ({ data, renderItem, ListEmptyComponent }) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
    ListEmptyComponent={ListEmptyComponent}
    contentContainerStyle={styles.listContent}
  />
);

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
});

export default FoodList;
