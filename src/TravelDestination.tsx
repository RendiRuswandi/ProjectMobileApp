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
import Icon from 'react-native-vector-icons/Ionicons';

interface Recommendation {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: ImageSourcePropType;
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Phinisi Luxury Private Trip',
    location: 'Complimentary pick-up',
    price: 3000,
    rating: 4.8,
    image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
  },
  {
    id: 2,
    title: 'Katamaran Hotel & Resort',
    location: 'Labuan Bajo, Manggarai Barat',
    price: 300,
    rating: 4.9,
    image: { uri: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500' },
  },
  {
    id: 3,
    title: 'AYANA Komodo Waecicu',
    location: 'Labuan Bajo, Manggarai Barat',
    price: 400,
    rating: 4.9,
    image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
  },
];

const TravelDestination: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<Recommendation>(recommendations[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (amount: number) => {
    if (quantity + amount >= 1) {
      setQuantity((prevQuantity) => prevQuantity + amount);
    }
  };

  const totalPrice = selectedTrip.price * quantity;

  const formatCurrency = (number: number): string => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500' }}
          style={styles.headerImage}
        >
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={[styles.headerButton, { right: 20, left: undefined }]}>
              <Icon name="sunny-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.weatherText}>24° C</Text>
            </View>
            <View style={styles.headerTextContainer}>
              <View style={styles.ratingBox}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>
              <Text style={styles.destinationTitle}>Labuan Bajo</Text>
              <Text style={styles.destinationSubtitle}>
                From crystal-clear waters to breathtaking sunsets, Labuan Bajo is calling!
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.countryText}>🇮🇩 Indonesia</Text>
          <Text style={styles.discoverTitle}>Discover the Beauty of Labuan Bajo</Text>
          <View style={styles.reviewCard}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewAuthor}>By Hansen</Text>
              <Text style={styles.reviewContent}>
                Wow amazing yahh, best experience in my life very very worth it i like it! Very good
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>

          <Text style={styles.recommendationTitle}>Recomendation in Bajo</Text>

          <View style={styles.recommendationListContainer}>
            {recommendations.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectedTrip(item);
                  setQuantity(1);
                }}
                style={styles.recoCardWrapper}
              >
                <View style={[styles.recoCard, selectedTrip.id === item.id && styles.recoCardSelected]}>
                  <Image source={item.image} style={styles.recoImage} />
                  <View style={styles.recoContent}>
                    <Text style={styles.recoTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View style={styles.recoLocationContainer}>
                      <Icon name="location-sharp" size={14} color="#6B7280" />
                      <Text style={styles.recoLocation} numberOfLines={1}>
                        {item.location}
                      </Text>
                    </View>
                    <View style={styles.recoFooter}>
                      <View style={styles.recoRatingContainer}>
                        <Icon name="star" size={16} color="#FBBF24" />
                        <Text style={styles.recoRating}>{item.rating}</Text>
                      </View>
                      <Text style={styles.recoPrice}>
                        ${formatCurrency(item.price)}
                        <Text style={styles.perNight}> / night</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 150 }} />
      </ScrollView>

      <View style={styles.bookingBar}>
        <View style={styles.bookingBarTopRow}>
            <View style={styles.quantitySelector}>
                <TouchableOpacity onPress={() => handleQuantityChange(1)} style={[styles.quantityButton, styles.plusButton]}>
                    <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={[styles.quantityButton, styles.minusButton]}>
                    <Icon name="remove" size={20} color="#374151" />
                </TouchableOpacity>
            </View>

            <View style={styles.totalAmountContainer}>
                <Text style={styles.totalAmountLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>${formatCurrency(totalPrice)}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#111827' },
  scrollView: { flex: 1, backgroundColor: '#F3F4F6' },
  headerImage: { width: '100%', height: 520, justifyContent: 'flex-end' },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  headerButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  weatherText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerTextContainer: { marginBottom: 120 },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  ratingText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 6 },
  destinationTitle: { fontSize: 42, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  destinationSubtitle: { fontSize: 16, color: '#E5E7EB', maxWidth: '95%', marginTop: 4, lineHeight: 22 },
  contentContainer: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -100,
    paddingTop: 24,
  },
  countryText: { fontSize: 16, fontWeight: '500', color: '#4B5563', paddingHorizontal: 20 },
  discoverTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 8, paddingHorizontal: 20 },
  reviewCard: {
    marginHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  avatar: { width: 45, height: 45, borderRadius: 25 },
  reviewTextContainer: { flex: 1, marginLeft: 12 },
  reviewAuthor: { fontWeight: 'bold', color: '#111827' },
  reviewContent: { color: '#4B5563', fontSize: 13, marginTop: 4, lineHeight: 18 },
  viewAllButton: {
    marginHorizontal: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  viewAllText: { color: '#374151', fontWeight: '600' },
  recommendationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 30,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  
  recommendationListContainer: {
    paddingHorizontal: 20,
  },
  recoCardWrapper: {
    marginBottom: 16, 
  },
  recoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: 'transparent',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recoCardSelected: { borderColor: '#F59E0B' },
  recoImage: { 
    width: '100%', 
    height: 180, 
  },
  recoContent: { padding: 14 },
  recoTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  recoLocationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  recoLocation: { color: '#6B7280', marginLeft: 4, fontSize: 13 },
  recoFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  recoRatingContainer: { flexDirection: 'row', alignItems: 'center' },
  recoRating: { marginLeft: 4, fontWeight: 'bold', color: '#1F2937', fontSize: 14 },
  recoPrice: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  perNight: { fontSize: 13, color: '#6B7280', fontWeight: 'normal' },
  
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 25,
  },
  bookingBarTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantitySelector: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    backgroundColor: '#F97316',
  },
  minusButton: {
    backgroundColor: '#FFFFFF',
  },
  quantityText: { 
    color: '#FFFFFF', 
    fontSize: 22, 
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  totalAmountContainer: { 
    alignItems: 'flex-end',
  },
  totalAmountLabel: { 
    color: '#9CA3AF', 
    fontSize: 14,
  },
  totalAmount: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    width: '100%',
  },
  bookNowText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18,
  },
});

export default TravelDestination;