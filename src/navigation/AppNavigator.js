// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import WallpapersScreen from '../screens/WallpapersScreen';
import WallpaperDetailScreen from '../screens/WallpaperDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    // <NavigationContainer> <--- REMOVE THIS WRAPPER
      <Stack.Navigator
        initialRouteName="Categories" // This might also be handled by Expo Router's entry point
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: 'Wallpaper Categories' }}
        />
        <Stack.Screen
          name="Wallpapers"
          component={WallpapersScreen}
        />
        <Stack.Screen
          name="WallpaperDetail"
          component={WallpaperDetailScreen}
        />
      </Stack.Navigator>
    // </NavigationContainer> <--- REMOVE THIS WRAPPER
  );
};

export default AppNavigator;