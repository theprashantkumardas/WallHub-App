// // src/app/(tabs)/index.tsx
import { Href, Stack, useRouter } from 'expo-router'; // Href might be optional if only string is passed
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import CategoryListItem from '../../components/CategoryListItem';
import { Category, fetchCategories } from '../../services/api';

export default function HomeTabScreen() {
  const router = useRouter();
  // ... (state and functions)
   const [categories, setCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [refreshing, setRefreshing] = useState(false);

   const loadCategories = useCallback(async () => {
     try {
       setError(null);
       setLoading(true);
       const data = await fetchCategories();
       setCategories(data);
     } catch (err) {
       console.error("Error fetching categories:", err);
       setError("Failed to load categories. Pull to refresh.");
     } finally {
       setLoading(false);
       setRefreshing(false);
     }
   }, []);

   useEffect(() => {
     loadCategories();
   }, [loadCategories]);

   const onRefresh = useCallback(() => {
     setRefreshing(true);
     loadCategories();
   }, [loadCategories]);

   if (loading && !refreshing) {
     return <View style={styles.centered}><ActivityIndicator size="large" color="#f4511e" /></View>;
   }

   if (error && categories.length === 0) {
     return (
       <View style={styles.centered}>
         <Text style={styles.errorText}>{error}</Text>
         <Button title="Retry" onPress={loadCategories} />
       </View>
     );
   }


  return (
    <>
      <Stack.Screen options={{ title: 'Wallpaper Categories' }} />
      <FlatList
        data={categories}
        renderItem={({ item }) => {
          // Construct the full Href string with query parameters
          const pathWithParams = `/(stacks)/wallpapers?categoryId=${item._id}`;
          return (
            <CategoryListItem
              category={item}
              onPress={() => router.push(pathWithParams as Href)}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#f4511e']} />}
        ListEmptyComponent={!loading && !error ? <View style={styles.centered}><Text>No categories found.</Text></View> : null}
      />
    </>
  );
}

const styles = StyleSheet.create({
     // ... your styles
     listContainer: {
         padding: 5,
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


// // src/app/(tabs)/index.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import { Stack } from 'expo-router';

// export default function HomeTabScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Stack.Screen options={{ title: 'Home Placeholder' }} />
//       <Text>Home Tab Content</Text>
//     </View>
//   );
// }
