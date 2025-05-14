// navigation/HomeStackNavigator.js (Previously AppNavigator.js)
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import WallpapersScreen from '../screens/WallpapersScreen';
import WallpaperDetailScreen from '../screens/WallpaperDetailScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Categories" // This will be handled by the tab
      screenOptions={{
        // You might want to move common screenOptions to the Tab Navigator
        // or keep them here if they are specific to this stack.
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="CategoriesHome" // Renaming to avoid clashes if 'Categories' is used elsewhere
        component={CategoriesScreen}
        options={{ title: 'Wallpaper Categories' }}
      />
      <Stack.Screen
        name="Wallpapers"
        component={WallpapersScreen}
        // Title set dynamically
      />
      <Stack.Screen
        name="WallpaperDetail"
        component={WallpaperDetailScreen}
        // Title set dynamically
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;