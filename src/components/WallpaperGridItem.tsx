// src/components/WallpaperGridItem.tsx
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallpaper } from '../services/api'; // Import your Wallpaper type

interface WallpaperGridItemProps {
  wallpaper: Wallpaper;
  onPress: () => void;
}

const numColumns = 3; // Or 2, depending on your preference
const itemMargin = 5;
const itemWidth = (Dimensions.get('window').width - (itemMargin * (numColumns + 1) * 2)) / numColumns;


const WallpaperGridItem: React.FC<WallpaperGridItemProps> = ({ wallpaper, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={{ uri: wallpaper.imageUrl }} style={styles.wallpaperImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: itemWidth,
    height: itemWidth * 1.5, // Adjust aspect ratio as needed (e.g., 1.6 for portrait)
    margin: itemMargin,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0', // Placeholder color
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default WallpaperGridItem;