import React from 'react';
import { Text, StyleSheet } from 'react-native';

const EmptyText = ({ children }) => (
  <Text style={styles.emptyText}>{children}</Text>
);

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default EmptyText;
