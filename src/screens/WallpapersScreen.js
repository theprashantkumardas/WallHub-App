// screens/WallpapersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchWallpapers } from '../services/api';

const WallpapersScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params; // Get categoryId from navigation
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: categoryName || 'Wallpapers' }); // Set screen title

    const loadWallpapers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchWallpapers(categoryId);
        setWallpapers(response.data);
      } catch (err) {
        console.error("Error fetching wallpapers:", err.response ? err.response.data : err.message);
        setError("Failed to load wallpapers. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadWallpapers();
  }, [categoryId, categoryName, navigation]); // Re-run if categoryId changes

  const renderWallpaper = ({ item }) => (
    <TouchableOpacity
      style={styles.wallpaperItem}
      onPress={() => navigation.navigate('WallpaperDetail', { wallpaperId: item._id, wallpaperName: item.name })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.wallpaperImage} />
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
  }

  if (wallpapers.length === 0) {
      return <View style={styles.centered}><Text>No wallpapers found in this category.</Text></View>;
  }

  return (
    <FlatList
      data={wallpapers}
      renderItem={renderWallpaper}
      keyExtractor={(item) => item._id.toString()}
      numColumns={3} // Display wallpapers in three columns
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
  },
  wallpaperItem: {
    flex: 1,
    margin: 2,
    height: 200, // Adjust as needed
    borderRadius: 8,
    overflow: 'hidden',
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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

export default WallpapersScreen;