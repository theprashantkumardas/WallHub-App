// screens/SearchScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    // TODO: Implement search logic
    // This would involve making an API call to a new backend endpoint
    // e.g., /api/wallpapers/search?q=searchTerm or filter existing wallpapers
    console.log("Search for:", searchTerm);
    alert(`Search functionality for "${searchTerm}" is not yet implemented.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Wallpapers</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name, tag, etc."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
      {/* TODO: Display search results here */}
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default SearchScreen;