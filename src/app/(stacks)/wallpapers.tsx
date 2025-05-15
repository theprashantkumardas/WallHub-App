// src/app/(stack)/wallpapers.tsx
import { Href, Stack, useLocalSearchParams, useRouter } from 'expo-router'; // Ensure Href is imported
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import WallpaperGridItem from '../../components/WallpaperGridItem';
import { fetchWallpapers, Wallpaper } from '../../services/api';

export default function WallpapersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ categoryId?: string; categoryName?: string }>();
  const { categoryId, categoryName } = params;

  // ... (your existing state and functions are fine) ...
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadWallpapers = useCallback(async () => {
    if (!categoryId) {
      setError("Category ID is missing.");
      console.log("Category ID is missing.");
      
      setLoading(false);
      setRefreshing(false);
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const data = await fetchWallpapers(categoryId);
      setWallpapers(data);
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
      setError("Failed to load wallpapers. Pull to refresh.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [categoryId]);


  useEffect(() => {
    loadWallpapers();
  }, [loadWallpapers]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadWallpapers();
  }, [loadWallpapers]);

  if (loading && !refreshing) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#f4511e" /></View>;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadWallpapers} />
      </View>
    );
  }


  return (
    <>
      <Stack.Screen options={{ title: categoryName || 'Wallpapers' }} />
      <FlatList
        data={wallpapers}
        renderItem={({ item }) => {
          // Define the navigation target object
          const navigationTarget = {
            pathname: `/(stacks)/wallpaper/${item._id}` as Href, // Cast the dynamic string for pathname
            params: { wallpaperName: item.name }
          };

          return (
            <WallpaperGridItem
              wallpaper={item}
              // Provide the fully typed object to router.push.
              // If TS still complains about the overall object, cast it too.
              onPress={() => router.push(navigationTarget as any)} // Try 'as any' on the object if Href<string> fails
                                                                   // or as Href<typeof navigationTarget.pathname>
            />
          );
        }}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#f4511e']}/>}
        ListEmptyComponent={!loading && !error ? <View style={styles.centered}><Text>No wallpapers found in this category.</Text></View> : null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // ... your styles ...
  listContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    flexGrow: 1,
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