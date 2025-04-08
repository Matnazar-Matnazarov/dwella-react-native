// app/(tabs)/masters.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mastersData = [
  { id: '1', name: 'Ali Valiev', specialty: 'Santexnik', rating: 4.8, reviews: 120, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Bobur Mirzaev', specialty: 'Elektrik', rating: 4.5, reviews: 85, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Shaxzod Usmonov', specialty: 'Duradgor', rating: 4.9, reviews: 150, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Dilnoza Karimova', specialty: 'Dizayner', rating: 4.7, reviews: 95, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '5', name: 'Jamshid Rahimov', specialty: 'Plastik oyna', rating: 4.6, reviews: 110, image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  // Qo'shimcha ustalar qo'shishingiz mumkin
];

export default function MastersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMasters = mastersData.filter(master => 
    master.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    master.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMaster = ({ item }) => (
    <TouchableOpacity className="bg-card p-4 rounded-lg shadow-sm border border-border mb-4">
      <View className="flex-row items-center">
        <View className="w-14 h-14 bg-gray-200 rounded-full mr-4 overflow-hidden">
          <Image 
            source={{ uri: item.image }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text">{item.name}</Text>
          <Text className="text-sm text-secondary">{item.specialty}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={16} color="#FBBF24" />
            <Text className="text-sm text-secondary ml-1">{item.rating} ({item.reviews} sharh)</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
          <Ionicons name="chatbubble-outline" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold text-text mb-2">Ustalar</Text>
        <Text className="text-base text-secondary mb-4">Ustalar bilan bog'lanish va ish buyurtma berish</Text>
        
        <View className="mb-4">
          <View className="flex-row items-center border border-border rounded-lg bg-card px-3">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 p-3 text-text"
              placeholder="Usta yoki kasb bo'yicha qidirish"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        
        <FlatList
          data={filteredMasters}
          renderItem={renderMaster}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}