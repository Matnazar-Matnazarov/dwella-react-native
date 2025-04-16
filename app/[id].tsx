import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

// Mock data for announcement details
const announcement = {
  id: 1,
  title: 'Elektr ta\'mirlash ishi',
  description: 'Uyimda elektr ta\'mirlash ishi bor. Tajribali usta kerak. Ish joyi: Yunusobod tumani, 5-mavze. Ish haqida batafsil ma\'lumot uchun telefon orqali bog\'laning.',
  price: '500 000 so\'m',
  location: 'Toshkent, Yunusobod tumani',
  date: '2024-03-15',
  images: [
    require('../assets/electrician.jpeg'),
    require('../assets/electrician.jpeg'),
  ],
  user: {
    name: 'Ali Valiyev',
    phone: '+998901234567',
    rating: 4.8,
    reviews: 24,
  },
};

export default function AnnouncementDetail() {
  const { id } = useLocalSearchParams();

  const handleCall = () => {
    Linking.openURL(`tel:${announcement.user.phone}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>E\'lon ma\'lumotlari</Text>
      </View>

      <View style={styles.imageContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {announcement.images.map((image, index) => (
            <Image 
              key={index} 
              source={image} 
              style={styles.image} 
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
        <Text style={styles.price}>{announcement.price}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <FontAwesome name="map-marker" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{announcement.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="calendar" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{announcement.date}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tavsif</Text>
        <Text style={styles.description}>{announcement.description}</Text>

        <Text style={styles.sectionTitle}>E'lon egasi</Text>
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{announcement.user.name}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="#F59E0B" />
              <Text style={styles.rating}>{announcement.user.rating}</Text>
              <Text style={styles.reviews}>({announcement.user.reviews} baho)</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <FontAwesome name="phone" size={20} color="#FFFFFF" />
            <Text style={styles.callButtonText}>Qo'ng'iroq qilish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
  },
  content: {
    padding: 16,
  },
  announcementTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoText: {
    marginLeft: 8,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  userCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 8,
    marginRight: 8,
    color: '#1F2937',
    fontWeight: '600',
  },
  reviews: {
    color: '#6B7280',
  },
  callButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
}); 