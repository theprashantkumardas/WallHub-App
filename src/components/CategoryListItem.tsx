// src/components/CategoryListItem.tsx
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../services/api'; // Import your Category type

interface CategoryListItemProps {
  category: Category;
  onPress: () => void;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <ImageBackground source={{ uri: category.imageUrl }} style={styles.imageBackground} imageStyle={styles.imageStyle}>
        <View style={styles.overlay} />
        <Text style={styles.categoryName}>{category.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Align text to bottom
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 8, // Ensure image itself has rounded corners if needed
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Dark overlay for better text visibility
    borderRadius: 8,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    zIndex: 1, // Ensure text is above overlay
  },
});

export default CategoryListItem;