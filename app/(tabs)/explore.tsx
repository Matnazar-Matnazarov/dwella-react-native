import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock data for categories
const categories = [
  { id: 1, name: 'Barchasi', icon: 'th-large' },
  { id: 2, name: 'Elektr', icon: 'bolt' },
  { id: 3, name: 'Santexnika', icon: 'tint' },
  { id: 4, name: 'Qurilish', icon: 'building' },
  { id: 5, name: 'Tamirlash', icon: 'wrench' },
  { id: 6, name: 'Dizayn', icon: 'paint-brush' },
];

// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: 'Elektr ishlari',
    description: 'Barcha turdagi elektr ishlari bajariladi',
    price: '500 000 so\'m',
    category: 'Elektr',
    image: require('../../assets/electrician.jpeg'),
  },
  {
    id: 2,
    title: 'Santexnika ishlari',
    description: 'Santexnika ishlari bajariladi',
    price: '400 000 so\'m',
    category: 'Santexnika',
    image: require('../../assets/plumber.jpeg'),
  },
  {
    id: 3,
    title: 'Qurilish ishlari',
    description: 'Qurilish ishlari bajariladi',
    price: '600 000 so\'m',
    category: 'Qurilish',
    image: require('../../assets/constructor_avatar.jpeg'),
  },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterAnnouncements(text, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterAnnouncements(searchQuery, category);
  };

  const filterAnnouncements = (query: string, category: string) => {
    let filtered = announcements;
    
    if (query) {
      filtered = filtered.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(query.toLowerCase()) ||
          announcement.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category !== 'Barchasi') {
      filtered = filtered.filter(
        (announcement) => announcement.category === category
      );
    }
    
    setFilteredAnnouncements(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Qidirish..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect(category.name)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.announcementsContainer}>
        {filteredAnnouncements.map((announcement) => (
          <TouchableOpacity 
            key={announcement.id} 
            style={styles.announcementCard}
            onPress={() => router.push(`/${announcement.id}`)}
          >
            <Image source={announcement.image} style={styles.announcementImage} />
            <View style={styles.announcementInfo}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementDescription} numberOfLines={2}>
                {announcement.description}
              </Text>
              <View style={styles.announcementFooter}>
                <Text style={styles.announcementPrice}>{announcement.price}</Text>
                <Text style={styles.announcementCategory}>{announcement.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    maxHeight: 75,
    marginRight: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    marginLeft: 8,
    color: '#6B7280',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  announcementsContainer: {
    flex: 1,
    padding: 16,
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  announcementImage: {
    width: 100,
    height: 100,
  },
  announcementInfo: {
    flex: 1,
    padding: 12,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
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
  announcementCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
});
