// screens/CategoriesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchCategories } from '../services/api';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.response ? err.response.data : err.message);
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Wallpapers', { categoryId: item._id, categoryName: item.name })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <View style={styles.categoryNameOverlay}>
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
  }

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2} // Display categories in two columns
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  categoryItem: {
    flex: 1,
    margin: 5,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden', // Important for borderRadius with Image
    position: 'relative', // For overlay
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryNameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});

export default CategoriesScreen;