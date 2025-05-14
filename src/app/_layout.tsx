import { Stack } from "expo-router";

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Needed at the root
import MainTabNavigator from '../navigation/MainTabNavigator'; // Adjust path if needed

export default function App() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
