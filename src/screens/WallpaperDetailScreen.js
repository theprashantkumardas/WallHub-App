// screens/WallpaperDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { fetchWallpaperById } from '../services/api';

const WallpaperDetailScreen = ({ route, navigation }) => {
  const { wallpaperId, wallpaperName } = route.params;
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: wallpaperName || "Wallpaper Details" });

    const loadWallpaper = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchWallpaperById(wallpaperId);
        setWallpaper(response.data);
      } catch (err) {
        console.error("Error fetching wallpaper details:", err.response ? err.response.data : err.message);
        setError("Failed to load wallpaper details.");
      } finally {
        setLoading(false);
      }
    };
    loadWallpaper();
  }, [wallpaperId, wallpaperName, navigation]);

  const handleDownload = async () => {
    if (!wallpaper || !wallpaper.imageUrl) {
      Alert.alert("Error", "Image URL not found.");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Storage permission is required to download images.");
      return;
    }

    setDownloading(true);
    try {
      const fileUri = FileSystem.documentDirectory + `${wallpaper.name.replace(/\s+/g, '_') || 'wallpaper'}_${Date.now()}.jpg`;
      console.log("Downloading to:", fileUri);

      const { uri } = await FileSystem.downloadAsync(wallpaper.imageUrl, fileUri);
      console.log("Downloaded to:", uri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("WallpapersApp", asset, false); // false = don't copy if album exists

      Alert.alert("Success", "Wallpaper saved to your gallery in 'WallpapersApp' album!");

    } catch (downloadError) {
      console.error("Download error:", downloadError);
      Alert.alert("Download Failed", "Could not save wallpaper. " + downloadError.message);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error || !wallpaper) {
    return <View style={styles.centered}><Text style={styles.errorText}>{error || "Wallpaper not found."}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: wallpaper.imageUrl }} style={styles.wallpaperImage} resizeMode="contain" />
      <Text style={styles.wallpaperName}>{wallpaper.name}</Text>
      {wallpaper.description && <Text style={styles.wallpaperDescription}>{wallpaper.description}</Text>}
      <View style={styles.buttonContainer}>
        <Button
          title={downloading ? "Downloading..." : "Download Wallpaper"}
          onPress={handleDownload}
          disabled={downloading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center', // Can make image too small if not full screen
    padding: 10,
  },
  wallpaperImage: {
    width: '100%',
    height: '70%', // Adjust as needed
    marginBottom: 15,
  },
  wallpaperName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  wallpaperDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
      marginTop: 20,
      width: '80%',
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

export default WallpaperDetailScreen;