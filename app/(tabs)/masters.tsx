// app/(tabs)/masters.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Master {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  completedJobs: number;
  location: string;
  isAvailable: boolean;
}

const mastersData: Master[] = [
  {
    id: '1',
    name: 'Aziz Rahimov',
    specialty: 'Santexnik',
    rating: 4.8,
    reviews: 120,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    completedJobs: 85,
    location: 'Tashkent, Chilonzor',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Jamshid Karimov',
    specialty: 'Elektrik',
    rating: 4.9,
    reviews: 95,
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    completedJobs: 65,
    location: 'Tashkent, Mirzo-Ulug\'bek',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Dilnoza Rahimova',
    specialty: 'Dizayner',
    rating: 4.7,
    reviews: 75,
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    completedJobs: 45,
    location: 'Tashkent, Yunusobod',
    isAvailable: false
  }
];

export default function MastersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('barchasi');

  const categories = [
    { id: 'barchasi', name: 'Barchasi', icon: 'grid-outline', color: '#4F46E5' },
    { id: 'santexnik', name: 'Santexnik', icon: 'build-outline', color: '#3B82F6' },
    { id: 'elektrik', name: 'Elektrik', icon: 'flash-outline', color: '#F59E0B' },
    { id: 'dizayner', name: 'Dizayner', icon: 'color-palette-outline', color: '#EC4899' },
    { id: 'duradgor', name: 'Duradgor', icon: 'hammer-outline', color: '#10B981' }
  ];

  const filteredMasters = mastersData.filter(master => {
    const matchesSearch = master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         master.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'barchasi' || 
                          master.specialty.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const renderMasterItem = ({ item }: { item: Master }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl mb-3 overflow-hidden border border-border"
      onPress={() => router.push({
        pathname: '/master/[id]',
        params: { id: item.id }
      })}
    >
      <View className="p-4">
        <View className="flex-row items-center">
          <View className="relative">
            <Image 
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-full"
            />
            {item.isAvailable && (
              <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
          </View>
          <View className="flex-1 ml-3">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-lg font-semibold text-text">{item.name}</Text>
              <View className={`px-2 py-1 rounded-full ${item.isAvailable ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Text className={`text-xs font-medium ${item.isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                  {item.isAvailable ? 'Mavjud' : 'Band'}
                </Text>
              </View>
            </View>
            <Text className="text-secondary text-sm mb-1">{item.specialty}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#FBBF24" />
              <Text className="text-secondary text-sm ml-1">{item.rating} ({item.reviews} sharh)</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row items-center">
            <Ionicons name="briefcase-outline" size={14} color="#6B7280" />
            <Text className="text-secondary text-sm ml-1">{item.completedJobs} ta ish</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="text-secondary text-sm ml-1">{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="px-4">
        <View className="mb-4">
          <View className="flex-row items-center bg-white rounded-xl px-3 border border-border">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 py-3 px-2 text-text"
              placeholder="Usta yoki kasb bo'yicha qidirish"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View className="mb-4">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${
                  selectedCategory === category.id 
                    ? 'bg-primary' 
                    : 'bg-white border border-border'
                }`}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={18} 
                  color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
                />
                <Text 
                  className={`text-sm font-medium ml-2 ${
                    selectedCategory === category.id 
                      ? 'text-white' 
                      : 'text-secondary'
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredMasters}
          renderItem={renderMasterItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}

