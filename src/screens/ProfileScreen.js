// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // TODO: Add login/logout logic and display user info

  const handleLogin = () => {
    // navigation.navigate('Login'); // Assuming you'll have a LoginScreen
    alert("Login functionality not yet implemented.");
  };

  const handleRegister = () => {
    // navigation.navigate('Register'); // Assuming you'll have a RegisterScreen
    alert("Registration functionality not yet implemented.");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>User authentication and profile features will be here.</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
       <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      {/* TODO: If logged in, show user details and logout button */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 15,
    width: '60%'
  }
});

export default ProfileScreen;