// App.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ImageSourcePropType,
} from 'react-native';

// 1. IMPOR NAVIGASI
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// =================================================================
// MENENTUKAN TIPE UNTUK SETIAP LAYAR (PENTING UNTUK .tsx)
// =================================================================

// Tipe untuk layar di dalam Bottom Tab
type TabParamList = {
  HomeTab: undefined;     // 'HomeTab' adalah nama rute untuk Layar Home
  TicketsTab: undefined;
  ProfileTab: undefined;
};

// Tipe untuk semua layar di aplikasi (Stack)
type RootStackParamList = {
  Welcome: undefined;             // Layar "Start Exploring"
  Main: { screen: string };       // Ini akan berisi seluruh Bottom Tab Navigator
  Detail: undefined;            // Layar "Destination Detail" (Labuan Bajo)
};

// Tipe properti navigasi untuk setiap layar
type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
type HomeProps = BottomTabScreenProps<TabParamList, 'HomeTab'>;
type TicketsProps = BottomTabScreenProps<TabParamList, 'TicketsTab'>;
type ProfileProps = BottomTabScreenProps<TabParamList, 'ProfileTab'>;
type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

// Tipe gabungan untuk Layar Home agar bisa navigasi ke Detail
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;


// =================================================================
// LAYAR 1: WELCOME SCREEN (image_f1c064.png)
// =================================================================
const welcomeBackgroundImage = { uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop" };

const WelcomeScreen = ({ navigation }: WelcomeProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={welcomeBackgroundImage} resizeMode="cover" style={styles.welcomeImageBackground}>
        <View style={styles.welcomeOverlay}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Your Next Adventure Starts Here</Text>
            <Text style={styles.welcomeSubtitle}>
              Life's too short to stay in one place. Find your next favorite city, beach, or mountain and let's get moving!
            </Text>
          </View>
          {/* TOMBOL INI AKAN PINDAH KE HALAMAN "Main" (Home) */}
          <TouchableOpacity 
            style={styles.welcomeButton}
            onPress={() => navigation.replace('Main', { screen: 'HomeTab' })}
          >
            <Text style={styles.welcomeButtonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// =================================================================
// LAYAR 2: HOME SCREEN (image_f1c088.png)
// =================================================================
const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.pageSafeArea}>
      <ScrollView style={styles.pageContainer}>
        <Text style={styles.pageTitle}>Hi, Haikal</Text>
        <View style={styles.promoCard}>
          <Text style={styles.promoTitle}>Plan Your Summer!</Text>
          <Icon name="arrow-forward-outline" size={24} color="#C45124" />
        </View>
        <Text style={styles.pageSubtitle}>Popular Destination</Text>

        {/* TOMBOL INI AKAN PINDAH KE HALAMAN "Detail" */}
        <TouchableOpacity 
          style={styles.destinationCard}
          onPress={() => navigation.navigate('Detail')}
        >
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1599363643913-33d3a9d28892' }}
            style={styles.destinationImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.destinationOverlay}>
              <Text style={styles.destinationCountry}>🇮🇩 Indonesia</Text>
              <Text style={styles.destinationName}>Labuan Bajo</Text>
              <Text style={styles.destinationPrice}>$4.000/pax</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// =================================================================
// LAYAR 3: TICKETS SCREEN (image_f1c3e6.png)
// =================================================================
const TicketsScreen = ({ navigation }: TicketsProps) => {
  return (
    <SafeAreaView style={styles.pageSafeArea}>
      <View style={styles.pageContainer}>
        <Text style={styles.pageTitle}>Tickets</Text>
        <Text style={styles.pageSubtitle}>4 Tickets Found</Text>
        {/* Placeholder untuk kartu tiket */}
        <View style={styles.ticketCard}>
          <Text style={styles.ticketRoute}>NL ✈ IDN</Text>
          <Text>Rotterdam -> Labuan Bajo</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// =================================================================
// LAYAR 4: PROFILE SCREEN (Placeholder)
// =================================================================
const ProfileScreen = ({ navigation }: ProfileProps) => {
  return (
    <SafeAreaView style={styles.pageSafeArea}>
      <View style={styles.pageContainer}>
        <Text style={styles.pageTitle}>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

// =================================================================
// LAYAR 5: DESTINATION DETAIL SCREEN (image_f9432e.jpg, dll.)
// =================================================================
const DetailScreen = ({ navigation }: DetailProps) => {
  // Kode lengkap dari halaman detail destinasi
  const [selectedTrip, setSelectedTrip] = useState<Recommendation>(recommendations[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const handleQuantityChange = (amount: number) => {
    if (quantity + amount >= 1) setQuantity((prev) => prev + amount);
  };
  const totalPrice = selectedTrip.price * quantity;
  const formatCurrency = (num: number) => new Intl.NumberFormat('de-DE').format(num);

  return (
    <SafeAreaView style={styles.detailSafeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1599363643913-33d3a9d28892' }}
          style={styles.detailHeaderImage}
        >
          <View style={styles.detailHeaderOverlay}>
            {/* TOMBOL INI AKAN KEMBALI KE HALAMAN SEBELUMNYA (Home) */}
            <TouchableOpacity 
              style={styles.detailHeaderButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={[styles.detailHeaderButton, { right: 20, left: undefined }]}>
              <Icon name="sunny-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.detailWeatherText}>24° C</Text>
            </View>
            <View style={styles.detailHeaderTextContainer}>
              <View style={styles.detailRatingBox}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.detailRatingText}>5.0</Text>
              </View>
              <Text style={styles.detailDestinationTitle}>Labuan Bajo</Text>
              <Text style={styles.detailDestinationSubtitle}>
                From crystal-clear waters to breathtaking sunsets, Labuan Bajo is calling!
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.detailContentContainer}>
          <Text style={styles.detailCountryText}>🇮🇩 Indonesia</Text>
          <Text style={styles.detailDiscoverTitle}>Discover the Beauty of Labuan Bajo</Text>
          <View style={styles.detailReviewCard}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.detailAvatar} />
            <View style={styles.detailReviewTextContainer}>
              <Text style={styles.detailReviewAuthor}>By Riqi starboy</Text>
              <Text style={styles.detailReviewContent}>
                Wow amazing yahh, best experience in my life...
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.detailViewAllButton}>
            <Text style={styles.detailViewAllText}>View All</Text>
          </TouchableOpacity>
          <Text style={styles.detailRecommendationTitle}>Recomendation in Bajo</Text>
          <View>
            {recommendations.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedTrip(item)}
                style={styles.detailRecoCardWrapper}
              >
                <View style={[styles.detailRecoCard, selectedTrip.id === item.id && styles.detailRecoCardSelected]}>
                  <Image source={item.image} style={styles.detailRecoImage} />
                  <View style={styles.detailRecoContent}>
                    <Text style={styles.detailRecoTitle} numberOfLines={1}>{item.title}</Text>
                    {/* ... (Konten kartu lainnya) ... */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>
      <View style={styles.detailBookingBar}>
        <View style={styles.detailBookingBarTopRow}>
          <View style={styles.detailQuantitySelector}>
            <TouchableOpacity onPress={() => handleQuantityChange(1)} style={[styles.detailQuantityButton, styles.detailPlusButton]}>
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.detailQuantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={[styles.detailQuantityButton, styles.detailMinusButton]}>
              <Icon name="remove" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
          <View style={styles.detailTotalAmountContainer}>
            <Text style={styles.detailTotalAmountLabel}>Total Amount</Text>
            <Text style={styles.detailTotalAmount}>${formatCurrency(totalPrice)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailBookNowButton}>
          <Text style={styles.detailBookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
// Data dummy untuk Layar Detail
interface Recommendation { id: number; title: string; image: ImageSourcePropType; price: number; }
const recommendations: Recommendation[] = [
  { id: 1, title: 'Phinisi Luxury Private Trip', price: 3000, image: { uri: 'https://images.unsplash.com/photo-1577938987455-152163b84173?w=500' } },
  { id: 2, title: 'Katamaran Hotel & Resort', price: 300, image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' } },
];


// =================================================================
// 6. PENGATUR BOTTOM TAB NAVIGATOR (Navbar Bawah)
// =================================================================

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Sembunyikan header default
        tabBarShowLabel: true, // Tampilkan label di bawah ikon
        tabBarActiveTintColor: '#F97316', // Warna ikon aktif
        tabBarInactiveTintColor: '#9CA3AF', // Warna ikon non-aktif
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home';
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TicketsTab') {
            iconName = focused ? 'paper-plane' : 'paper-plane-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label: string = 'Home';
          if (route.name === 'HomeTab') label = 'Home';
          else if (route.name === 'TicketsTab') label = 'Tickets';
          else if (route.name === 'ProfileTab') label = 'Profile';
          return <Text style={{ color: color, fontSize: 12 }}>{label}</Text>;
        }
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="TicketsTab" component={TicketsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// =================================================================
// 7. PENGATUR UTAMA APLIKASI (STACK NAVIGATOR)
// =================================================================

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false, // Sembunyikan header di semua layar
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// =================================================================
// 8. STYLESHEET GABUNGAN
// =================================================================

const styles = StyleSheet.create({
  container: { flex: 1 },
  // --- Style WelcomeScreen ---
  welcomeImageBackground: { flex: 1, justifyContent: 'flex-end' },
  welcomeOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 24, paddingBottom: 48 },
  welcomeTextContainer: { marginBottom: 30 },
  welcomeTitle: { fontSize: 42, fontWeight: 'bold', color: 'white', lineHeight: 50 },
  welcomeSubtitle: { fontSize: 16, color: 'white', marginTop: 12, lineHeight: 24 },
  welcomeButton: { backgroundColor: '#00C89C', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  welcomeButtonText: { color: '#0D2C24', fontSize: 18, fontWeight: 'bold' },

  // --- Style Layar Utama (Home, Tickets, Profile) ---
  pageSafeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  pageContainer: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  pageSubtitle: { fontSize: 20, fontWeight: '600', color: '#374151', marginBottom: 16 },
  promoCard: { backgroundColor: '#FED7AA', borderRadius: 20, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  promoTitle: { fontSize: 24, fontWeight: 'bold', color: '#C45124' },
  destinationCard: { height: 250, borderRadius: 16 },
  destinationImage: { flex: 1 },
  destinationOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: 16, justifyContent: 'flex-end' },
  destinationCountry: { color: 'white', fontWeight: 'bold' },
  destinationName: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  destinationPrice: { color: 'white', fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  ticketCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, height: 100 },
  ticketRoute: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  
  // --- Style Tab Bar ---
  tabBar: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    position: 'absolute',
    borderTopWidth: 0,
  },
  
  // --- Style DetailScreen (Prefixed with 'detail') ---
  detailSafeArea: { flex: 1, backgroundColor: '#111827' },
  detailHeaderImage: { width: '100%', height: 520, justifyContent: 'flex-end' },
  detailHeaderOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)', padding: 20, justifyContent: 'flex-end' },
  detailHeaderButton: { position: 'absolute', top: 60, left: 20, zIndex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  detailWeatherText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  detailHeaderTextContainer: { marginBottom: 120 },
  detailRatingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, alignSelf: 'flex-start' },
  detailRatingText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 6 },
  detailDestinationTitle: { fontSize: 42, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  detailDestinationSubtitle: { fontSize: 16, color: '#E5E7EB', maxWidth: '95%', marginTop: 4, lineHeight: 22 },
  detailContentContainer: { backgroundColor: '#F3F4F6', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -100, paddingTop: 24 },
  detailCountryText: { fontSize: 16, fontWeight: '500', color: '#4B5563', paddingHorizontal: 20 },
  detailDiscoverTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 8, paddingHorizontal: 20 },
  detailReviewCard: { marginHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 16, marginTop: 20, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  detailAvatar: { width: 45, height: 45, borderRadius: 25 },
  detailReviewTextContainer: { flex: 1, marginLeft: 12 },
  detailReviewAuthor: { fontWeight: 'bold', color: '#111827' },
  detailReviewContent: { color: '#4B5563', fontSize: 13, marginTop: 4, lineHeight: 18 },
  detailViewAllButton: { marginHorizontal: 20, backgroundColor: '#E5E7EB', borderRadius: 20, paddingVertical: 12, alignItems: 'center', marginTop: 20 },
  detailViewAllText: { color: '#374151', fontWeight: '600' },
  detailRecommendationTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginTop: 30, marginBottom: 16, paddingHorizontal: 20 },
  detailRecoCardWrapper: { marginBottom: 16, paddingHorizontal: 20 },
  detailRecoCard: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 2.5, borderColor: 'transparent', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  detailRecoCardSelected: { borderColor: '#F59E0B' },
  detailRecoImage: { width: '100%', height: 180 },
  detailRecoContent: { padding: 14 },
  detailRecoTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  detailBookingBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1F2937', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 25 },
  detailBookingBarTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  detailQuantitySelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  detailQuantityButton: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  detailPlusButton: { backgroundColor: '#F97316' },
  detailMinusButton: { backgroundColor: '#FFFFFF' },
  detailQuantityText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginHorizontal: 16 },
  detailTotalAmountContainer: { alignItems: 'flex-end' },
  detailTotalAmountLabel: { color: '#9CA3AF', fontSize: 14 },
  detailTotalAmount: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  detailBookNowButton: { backgroundColor: '#F97316', paddingVertical: 16, borderRadius: 28, alignItems: 'center', width: '100%' },
  detailBookNowText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default App;