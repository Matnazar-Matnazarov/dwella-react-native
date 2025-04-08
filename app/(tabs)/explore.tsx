import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Define types for job listings
interface JobListing {
  id: string;
  title: string;
  description: string;
  budget: string;
  location: string;
  category: string;
  postedTime: string;
  image: string;
  isActive: boolean;
}

// Define type for categories
interface Category {
  id: string;
  name: string;
  icon: string;
}

// Categories for filtering
const categories: Category[] = [
  { id: 'all', name: 'Barchasi', icon: 'grid-outline' },
  { id: 'santexnik', name: 'Santexnik', icon: 'water-outline' },
  { id: 'elektrik', name: 'Elektrik', icon: 'flash-outline' },
  { id: 'duradgor', name: 'Duradgor', icon: 'hammer-outline' },
  { id: 'dizayner', name: 'Dizayner', icon: 'color-palette-outline' },
  { id: 'plastik', name: 'Plastik oyna', icon: 'window-outline' }
];

// Sample job listings data
const jobListings: JobListing[] = [
  {
    id: '1',
    title: 'Santexnik kerak',
    description: 'Kvartiraga santexnik kerak. Suv oqimi bilan bog\'liq muammo bor.',
    budget: '500,000',
    location: 'Tashkent, Chilonzor',
    category: 'santexnik',
    postedTime: '2 soat oldin',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    id: '2',
    title: 'Elektrik ish',
    description: 'Ofis binosida elektr tarmog\'ini yangilash kerak.',
    budget: '1,200,000',
    location: 'Tashkent, Mirzo-Ulug\'bek',
    category: 'elektrik',
    postedTime: '5 soat oldin',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    id: '3',
    title: 'Duradgor ish',
    description: 'Xonani ta\'mirlash kerak. Devorlarni oqish va shiftni ta\'mirlash.',
    budget: '800,000',
    location: 'Tashkent, Yakkasaroy',
    category: 'duradgor',
    postedTime: '1 kun oldin',
    image: 'https://images.unsplash.com/photo-1584622650111-9938b6c7d1d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    id: '4',
    title: 'Dizayner kerak',
    description: 'Kvartira interyerini loyihalash kerak. 3 xonali kvartira.',
    budget: '2,500,000',
    location: 'Tashkent, Yunusobod',
    category: 'dizayner',
    postedTime: '2 kun oldin',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    id: '5',
    title: 'Plastik oyna o\'rnatish',
    description: '3 xonali kvartira uchun plastik oynalarni o\'rnatish kerak.',
    budget: '3,000,000',
    location: 'Tashkent, Mirobod',
    category: 'plastik',
    postedTime: '3 kun oldin',
    image: 'https://images.unsplash.com/photo-1584622650111-9938b6c7d1d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  }
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderJobItem = ({ item }: { item: JobListing }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm border border-border mb-4 overflow-hidden"
      onPress={() => router.push({
        pathname: '/[id]',
        params: { id: item.id }
      })}
    >
      <View className="flex-row">
        <View className="w-1/3">
          <Image 
            source={{ uri: item.image }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="w-2/3 p-3">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-lg font-semibold text-text" numberOfLines={1}>{item.title}</Text>
            <View className={`px-2 py-1 rounded ${item.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Text className={`text-xs ${item.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {item.isActive ? 'Faol' : 'Yakunlangan'}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-secondary mb-2" numberOfLines={2}>{item.description}</Text>
          <View className="flex-row items-center mb-1">
            <Ionicons name="cash-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-secondary ml-1">{item.budget} so'm</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-secondary ml-1">{item.location}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center p-3 bg-background border-t border-border">
        <View className="bg-primary/10 px-2 py-1 rounded">
          <Text className="text-xs text-primary">{item.category}</Text>
        </View>
        <Text className="text-xs text-secondary">{item.postedTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold text-text mb-1">E'lonlar</Text>
            <Text className="text-base text-secondary">Ustalar va mijozlar uchun e'lonlar</Text>
          </View>
        </View>
        
        <View className="mb-4">
          <View className="flex-row items-center border border-border rounded-lg bg-white px-3">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 p-3 text-text"
              placeholder="E'lonlarni qidirish"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        
        <View className="mb-4">
          <Text className="text-sm font-medium text-text mb-2">Kategoriyalar</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                className={`mr-2 px-3 py-1 rounded-full flex-row items-center ${
                  selectedCategory === category.id 
                    ? 'bg-primary' 
                    : 'bg-white border border-border'
                }`}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={16} 
                  color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'} 
                  style={{ marginRight: 4 }}
                />
                <Text 
                  className={`text-sm ${
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
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}