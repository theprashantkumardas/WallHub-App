// // src/app/(tabs)/search.tsx
import { Stack, useRouter, Href } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import WallpaperGridItem from '../../components/WallpaperGridItem';
import { searchWallpapersAPI, Wallpaper } from '../../services/api';

export default function SearchTabScreen() {
  const router = useRouter();
  // ... (state and functions)
     const [searchTerm, setSearchTerm] = useState('');
     const [results, setResults] = useState<Wallpaper[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [searched, setSearched] = useState(false);


     const handleSearch = async () => {
         if (!searchTerm.trim()) {
         setResults([]);
         setSearched(true);
         return;
         }
         setLoading(true);
         setError(null);
         setSearched(true);
         try {
         const data = await searchWallpapersAPI(searchTerm);
         setResults(data);
         } catch (err) {
         console.error("Search API error:", err);
         setError("Failed to fetch search results. Please try again.");
         setResults([]);
         } finally {
         setLoading(false);
         }
     };

  return (
    <>
      <Stack.Screen options={{ title: 'Search Wallpapers' }} />
      <View style={styles.container}>
        {/* ... search bar ... */}
         <View style={styles.searchBarContainer}>
         <TextInput
             style={styles.input}
             placeholder="Search by name, tag..."
             value={searchTerm}
             onChangeText={setSearchTerm}
             onSubmitEditing={handleSearch}
             returnKeyType="search"
         />
         <Button title="Search" onPress={handleSearch} color="#f4511e" />
         </View>

        {/* ... loading, error, no results ... */}
         {loading && <ActivityIndicator size="large" color="#f4511e" style={styles.loader} />}

         {!loading && error && <Text style={styles.errorText}>{error}</Text>}

         {!loading && !error && searched && results.length === 0 && (
         <Text style={styles.noResultsText}>No wallpapers found for "{searchTerm}".</Text>
         )}

        {!loading && !error && results.length > 0 && (
          <FlatList
            data={results}
            renderItem={({ item }) => {
              const pathWithParams = `/(stack)/wallpaper/${item._id}?wallpaperName=${encodeURIComponent(item.name)}`;
              return (
                <WallpaperGridItem
                  wallpaper={item}
                  onPress={() => router.push(pathWithParams as Href)}
                />
              );
            }}
            keyExtractor={(item) => item._id}
            numColumns={3}
            contentContainerStyle={styles.resultsContainer}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
     // ... your styles
     container: {
         flex: 1,
         padding: 10,
         backgroundColor: '#f5f5f5',
     },
     searchBarContainer: {
         flexDirection: 'row',
         alignItems: 'center',
         marginBottom: 15,
         backgroundColor: '#fff',
         borderRadius: 8,
         paddingHorizontal: 10,
         paddingVertical: 5,
         elevation: 2,
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 1,
     },
     input: {
         flex: 1,
         height: 40,
         fontSize: 16,
         marginRight: 10,
     },
     loader: {
         marginTop: 30,
     },
     errorText: {
         textAlign: 'center',
         color: 'red',
         fontSize: 16,
         marginTop: 20,
     },
     noResultsText: {
         textAlign: 'center',
         fontSize: 16,
         color: '#666',
         marginTop: 20,
     },
     resultsContainer: {
         paddingBottom: 10,
         alignItems: 'center',
     },
});

// // src/app/(tabs)/index.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import { Stack } from 'expo-router';

// export default function SearchTabScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Stack.Screen options={{ title: 'Search Placeholder' }} />
//       <Text>Search Tab Content</Text>
//     </View>
//   );
// }
