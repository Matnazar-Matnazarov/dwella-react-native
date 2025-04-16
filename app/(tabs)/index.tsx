import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock data for featured services
const featuredServices = [
  {
    id: 1,
    title: 'Elektrik ishlari',
    image: require('../../assets/electrician.jpeg'),
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Santexnika ishlari',
    image: require('../../assets/plumber.jpeg'),
    rating: 4.7,
  },
  {
    id: 3,
    title: 'Qurilish ishlari',
    image: require('../../assets/constructor_avatar.jpeg'),
    rating: 4.9,
  },
];

// Mock data for recent announcements
const recentAnnouncements = [
  {
    id: 1,
    title: 'Uy ta\'mirlash ishlari',
    description: 'Uy ta\'mirlash ishlari uchun tajribali usta kerak',
    price: '2 000 000 so\'m',
    location: 'Toshkent shahri',
  },
  {
    id: 2,
    title: 'Santexnika o\'rnatish',
    description: 'Yangi uy uchun santexnika o\'rnatish ishlari',
    price: '1 500 000 so\'m',
    location: 'Samarqand shahri',
  },
];

// Mock data for popular services
const popularServices = [
  {
    id: 1,
    name: 'Elektr',
    icon: 'bolt',
    image: require('../../assets/electrician.jpeg'),
  },
  {
    id: 2,
    name: 'Santexnika',
    icon: 'tint',
    image: require('../../assets/plumber.jpeg'),
  },
  {
    id: 3,
    name: 'Qurilish',
    icon: 'building',
    image: require('../../assets/constructor_avatar.jpeg'),
  },
];

// Mock data for latest announcements
const latestAnnouncements = [
  {
    id: 1,
    title: 'Elektr ishlari',
    description: 'Barcha turdagi elektr ishlari bajariladi',
    price: '500 000 so\'m',
    image: require('../../assets/constructor_avatar.jpeg'),
  },
  {
    id: 2,
    title: 'Santexnika ishlari',
    description: 'Santexnika ishlari bajariladi',
    price: '400 000 so\'m',
    image: require('../../assets/constructor_avatar.jpeg'),
  },
];

export default function Home() {
  const [notificationCount, setNotificationCount] = React.useState(3);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dwella</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => router.push('/notifications')}
        >
          <FontAwesome name="bell" size={24} color="#1F2937" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mashhur xizmatlar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          {featuredServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <Image source={service.image} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{service.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>So'nggi e'lonlar</Text>
        {recentAnnouncements.map((announcement) => (
          <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementDescription}>{announcement.description}</Text>
              <View style={styles.announcementFooter}>
                <Text style={styles.announcementPrice}>{announcement.price}</Text>
                <Text style={styles.announcementLocation}>{announcement.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  servicesScroll: {
    flexDirection: 'row',
  },
  serviceCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceInfo: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  announcementLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  createButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#3B82F6',
    fontSize: 14,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  announcementImage: {
    width: 100,
    height: 100,
  },
  announcementInfo: {
    flex: 1,
    padding: 12,
  },
});
