// src/app/(stack)/wallpaper/[id].tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator, Alert, ScrollView, Platform, Share, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { fetchWallpaperById, Wallpaper } from '../../../services/api';

export default function WallpaperDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; wallpaperName?: string }>();
  const wallpaperId = params.id;
  const initialWallpaperName = params.wallpaperName;

  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWallpaper = async () => {
      if (!wallpaperId) {
        setError("Wallpaper ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWallpaperById(wallpaperId);
        setWallpaper(data);
      } catch (err) {
        console.error("Error fetching wallpaper details:", err);
        setError("Failed to load wallpaper details.");
      } finally {
        setLoading(false);
      }
    };
    loadWallpaper();
  }, [wallpaperId]);

  const handleDownload = async () => {
    if (!wallpaper || !wallpaper.imageUrl) {
      Alert.alert("Error", "Image URL not found.");
      return;
    }

    const permissions = await MediaLibrary.requestPermissionsAsync();
    if (permissions.status !== 'granted') {
      Alert.alert(
        "Permission Denied",
        "Storage permission is required to download images. Please grant permission in settings."
      );
      return;
    }

    setDownloading(true);
    try {
      const fileName = `${(wallpaper.name || 'wallpaper').replace(/\s+/g, '_')}_${Date.now()}.jpg`;
      const fileUri = FileSystem.documentDirectory + fileName;

      console.log("Downloading to:", fileUri);
      const { uri: downloadedUri } = await FileSystem.downloadAsync(wallpaper.imageUrl, fileUri);
      console.log("Downloaded to:", downloadedUri);

      const asset = await MediaLibrary.createAssetAsync(downloadedUri);
      // Optional: Try to create an album or add to an existing one
      const albumName = "WallArt";
      const album = await MediaLibrary.getAlbumAsync(albumName);
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      }

      Alert.alert("Success", `Wallpaper saved to your gallery in '${albumName}' album!`);

    } catch (downloadError: any) {
      console.error("Download error:", downloadError);
      Alert.alert("Download Failed", "Could not save wallpaper. " + (downloadError.message || "Unknown error"));
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
     if (!wallpaper || !wallpaper.imageUrl) {
      Alert.alert("Error", "Image URL not found to share.");
      return;
    }
    try {
      await Share.share({
        message: `Check out this cool wallpaper: ${wallpaper.name}\n${wallpaper.imageUrl}`,
        url: wallpaper.imageUrl, // For some platforms
        title: wallpaper.name,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }


  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#f4511e" /></View>;
  }

  if (error || !wallpaper) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Wallpaper not found."}</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: wallpaper.name || initialWallpaperName || 'Wallpaper Detail' }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: wallpaper.imageUrl }} style={styles.wallpaperImage} resizeMode="contain" />
        <View style={styles.detailsContainer}>
          <Text style={styles.wallpaperName}>{wallpaper.name}</Text>
          {wallpaper.description && <Text style={styles.wallpaperDescription}>{wallpaper.description}</Text>}
          <View style={styles.tagsContainer}>
            {wallpaper.tags?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
           <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
                <Button
                title={downloading ? "Downloading..." : "Download"}
                onPress={handleDownload}
                disabled={downloading}
                color="#f4511e"
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                title="Share"
                onPress={handleShare}
                color="#5c6bc0" // A different color for share
                />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  wallpaperImage: {
    width: '100%',
    aspectRatio: Platform.OS === 'web' ? 16/9 : 9/16, // Adjust aspect ratio, web might prefer landscape
    maxHeight: Dimensions.get('window').height * 0.7, // Limit image height
    backgroundColor: '#222', // Dark background for image loading
  },
  detailsContainer: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  wallpaperName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  wallpaperDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 10,
  },
  buttonWrapper: {
    marginHorizontal: 10, // Add some space between buttons
    minWidth: 120, // Ensure buttons have a decent width
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});