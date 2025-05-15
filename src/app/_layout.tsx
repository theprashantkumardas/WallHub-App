// src/app/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';

// This could be used for global providers, modals, etc.
// For now, it just renders the child route (which will be the Tabs layout).
export default function RootLayout() {
  return <Slot />;
}