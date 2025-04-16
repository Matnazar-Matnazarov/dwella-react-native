import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+998 90 123 45 67',
  avatar: require('../../assets/constructor_avatar.jpeg'),
  announcements: 5,
  reviews: 12,
  rating: 4.8,
};

const menuItems = [
  {
    id: 1,
    title: 'Mening e\'lonlarim',
    icon: 'list',
    route: '/my-announcements',
  },
  {
    id: 2,
    title: 'Bildirishnomalar',
    icon: 'bell',
    route: '/notifications',
  },
  {
    id: 3,
    title: 'Sozlamalar',
    icon: 'cog',
    route: '/settings',
  },
  {
    id: 4,
    title: 'Yordam',
    icon: 'question-circle',
    route: '/help',
  },
  {
    id: 5,
    title: 'Chiqish',
    icon: 'sign-out',
    route: '/login',
  },
];

export default function Profile() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.announcements}</Text>
            <Text style={styles.statLabel}>E'lonlar</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.reviews}</Text>
            <Text style={styles.statLabel}>Sharhlar</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.rating}</Text>
            <Text style={styles.statLabel}>Baho</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              if (item.id === 5) {
                handleLogout();
              } else {
                router.push(item.route);
              }
            }}
          >
            <View style={styles.menuItemContent}>
              <FontAwesome name={item.icon} size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#6B7280" />
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
  },
}); 