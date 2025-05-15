// src/app/(stack)/_layout.tsx
// This layout defines the navigation stack for screens typically reached from the "Home" tab.
// It's linked to the "Home" tab via the `index` screen in `(tabs)`.
import { Stack } from 'expo-router';
import React from 'react';

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#000000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      
    </Stack>
  );
}