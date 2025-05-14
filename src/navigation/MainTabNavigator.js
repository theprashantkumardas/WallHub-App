// navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons

// Import your stacks/screens
import HomeStackNavigator from './HomeStackNavigator';
import CategoriesScreen from '../screens/CategoriesScreen'; // For direct Categories tab
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f4511e', // Active tab color
        tabBarInactiveTintColor: 'gray',   // Inactive tab color
        headerShown: false, // We let the StackNavigator inside Home handle its own header
                           // For other tabs, you might want to show a header here or in the screen itself.
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // The stack for Categories -> Wallpapers -> Detail
        options={{ title: 'Home' }} // Title for the tab, header managed by HomeStackNavigator
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen} // Direct link to Categories list
        options={{
          title: 'Categories',
          headerShown: true, // Show a header for this tab
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown: true, // Show a header for this tab
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true, // Show a header for this tab
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;