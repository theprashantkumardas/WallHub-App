// src/app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) => {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
};

export default function TabLayout() {
  // const colorScheme = useColorScheme(); // If using color schemes

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Example using Colors
        tabBarActiveTintColor: '#f4511e', // Your active color
        tabBarInactiveTintColor: 'gray',
        // headerShown: false, // Default; headers are managed by stacks within tabs
      }}>
      <Tabs.Screen
        name="index" // Corresponds to (tabs)/index.tsx
        options={{
          title: 'Home',
          headerShown: false, // The Stack in (stack)/_layout.tsx will manage Home's headers
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories" // Corresponds to (tabs)/categories.tsx
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <TabBarIcon name="grid" color={color} />,
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="search" // Corresponds to (tabs)/search.tsx
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponds to (tabs)/profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-circle" color={color} />,
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Tabs>
  );
}