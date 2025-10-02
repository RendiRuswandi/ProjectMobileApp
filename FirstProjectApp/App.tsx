import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// URL untuk gambar latar belakang
const backgroundImage = { uri: "https://images.unsplash.com/photo-1511300636412-01634d339c8c?q=80&w=2070&auto=format&fit=crop" };

const App = () => {
  return (
    <View style={styles.container}>
      {/* Membuat status bar menjadi terang agar terlihat di gambar gelap */}
      <StatusBar barStyle="light-content" />

      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.imageBackground}>
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Your Next Adventure Starts Here</Text>
            <Text style={styles.subtitle}>
              Life's too short to stay in one place. Find your next favorite city, beach, or mountain and let's get moving!
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Mendorong konten ke bawah
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Lapisan gelap untuk kontras teks
    padding: 24,
    paddingBottom: 48, // Beri ruang lebih di bagian bawah
  },
  textContainer: {
    marginBottom: 30, // Jarak antara teks dan tombol
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 12,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#00C89C', // Warna hijau toska
    paddingVertical: 16,
    borderRadius: 30, // Membuat tombol menjadi oval
    alignItems: 'center',
  },
  buttonText: {
    color: '#0D2C24', // Warna teks gelap agar kontras
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;