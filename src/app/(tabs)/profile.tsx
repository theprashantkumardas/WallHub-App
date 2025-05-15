// // src/app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function ProfileTabScreen() {
  const router = useRouter(); // For future navigation to login/register

  const handleLogin = () => {
    // router.push('/login'); // Example: if you create an src/app/login.tsx
    Alert.alert("Login/Register", "Authentication features are not yet implemented.");
  };

  return (
    <>
      <Stack.Screen options={{ title: 'My Profile' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Profile & Settings</Text>
        <Text style={styles.message}>User authentication, favorites, and settings will appear here.</Text>
        <View style={styles.buttonContainer}>
            <Button title="Login or Register" onPress={handleLogin} color="#f4511e"/>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  }
});

// // src/app/(tabs)/index.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import { Stack } from 'expo-router';

// export default function ProfileTabScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Stack.Screen options={{ title: 'Profile Placeholder' }} />
//       <Text>Profile Tab Content</Text>
//     </View>
//   );
// }
