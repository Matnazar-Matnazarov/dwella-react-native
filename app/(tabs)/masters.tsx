import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

// Mock data for masters
const masters = [
  {
    id: 1,
    name: 'Ali Valiyev',
    category: 'Elektr',
    rating: 4.8,
    reviews: 124,
    experience: '5 yil',
    price: '500 000 so\'m',
    image: require('../../assets/electrician.jpeg'),
  },
  {
    id: 2,
    name: 'Hasan Hasanov',
    category: 'Santexnika',
    rating: 4.7,
    reviews: 98,
    experience: '3 yil',
    price: '400 000 so\'m',
    image: require('../../assets/plumber.jpeg'),
  },
  {
    id: 3,
    name: 'Shavkat Rahimov',
    category: 'Qurilish',
    rating: 4.9,
    reviews: 156,
    experience: '7 yil',
    price: '600 000 so\'m',
    image: require('../../assets/constructor_avatar.jpeg'),
  },
];

export default function Masters() {
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [filteredMasters, setFilteredMasters] = useState(masters);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterMasters(category);
  };

  const filterMasters = (category: string) => {
    if (category === 'Barchasi') {
      setFilteredMasters(masters);
    } else {
      const filtered = masters.filter((master) => master.category === category);
      setFilteredMasters(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ustalar</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            // TODO: Implement advanced filter modal
          }}
        >
          <FontAwesome name="filter" size={20} color="#1F2937" />
        </TouchableOpacity>
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

      <ScrollView style={styles.mastersContainer}>
        {filteredMasters.map((master) => (
          <TouchableOpacity 
            key={master.id} 
            style={styles.masterCard}
            onPress={() => router.push(`/master/${master.id}`)}
          >
            <Image source={master.image} style={styles.masterImage} />
            <View style={styles.masterInfo}>
              <Text style={styles.masterName}>{master.name}</Text>
              <Text style={styles.masterCategory}>{master.category}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="#F59E0B" />
                <Text style={styles.ratingText}>{master.rating}</Text>
                <Text style={styles.reviewsText}>({master.reviews} baho)</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <FontAwesome name="briefcase" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{master.experience}</Text>
                </View>
                <View style={styles.detailItem}>
                  <FontAwesome name="money" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{master.price}</Text>
                </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    maxHeight: 75,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    maxHeight: 45,
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
  mastersContainer: {
    flex: 1,
    padding: 16,
  },
  masterCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  masterImage: {
    width: 100,
    height: 100,
  },
  masterInfo: {
    flex: 1,
    padding: 12,
  },
  masterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  masterCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    color: '#6B7280',
  },
}); 