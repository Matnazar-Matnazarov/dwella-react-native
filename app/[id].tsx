import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

interface JobDetail {
  id: string;
  title: string;
  description: string;
  budget: string;
  location: string;
  category: string;
  postedTime: string;
  image: string;
  isActive: boolean;
  client: {
    name: string;
    phone: string;
    email: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Sample job data
const jobData: JobDetail = {
  id: '1',
  title: 'Santexnik kerak',
  description: 'Kvartiraga santexnik kerak. Suv oqimi bilan bog\'liq muammo bor. Vannaxona va oshxona santexnikasi bilan bog\'liq ishlar kerak.',
  budget: '500,000',
  location: 'Tashkent, Chilonzor',
  category: 'santexnik',
  postedTime: '2 soat oldin',
  image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  isActive: true,
  client: {
    name: 'Jamshid Rahimov',
    phone: '+998 90 123 45 67',
    email: 'jamshid.rahimov@example.com'
  },
  coordinates: {
    latitude: 41.3111,
    longitude: 69.2797
  }
};

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  // In real app, fetch job data using id

  const handleCall = () => {
    Linking.openURL(`tel:${jobData.client.phone}`);
  };

  const handleChat = () => {
    router.push({
      pathname: '/chat/[id]',
      params: { id: jobData.id }
    });
  };

  const handleOpenMap = () => {
    const { latitude, longitude } = jobData.coordinates;
    const url = Platform.select({
      ios: `maps:${latitude},${longitude}?q=${jobData.location}`,
      android: `geo:${latitude},${longitude}?q=${jobData.location}`
    });
    Linking.openURL(url!);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-white border-b border-border">
        <View className="flex-row items-center justify-between px-4 pt-14 pb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-text">E'lon ma'lumotlari</Text>
          <TouchableOpacity className="p-2 -mr-2">
            <Ionicons name="share-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Job Image */}
        <View className="w-full h-64">
          <Image 
            source={{ uri: jobData.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Job Info */}
        <View className="bg-white p-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-bold text-text">{jobData.title}</Text>
            <View className={`px-2 py-1 rounded ${jobData.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Text className={`text-xs ${jobData.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {jobData.isActive ? 'Faol' : 'Yakunlangan'}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="cash-outline" size={20} color="#6B7280" />
            <Text className="text-lg text-secondary ml-2">{jobData.budget} so'm</Text>
          </View>
          
          <View className="flex-row items-center mb-4">
            <Ionicons name="time-outline" size={20} color="#6B7280" />
            <Text className="text-secondary ml-2">{jobData.postedTime}</Text>
          </View>

          <Text className="text-base text-text mb-4">{jobData.description}</Text>

          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <Text className="text-secondary ml-2">{jobData.location}</Text>
          </View>

          <TouchableOpacity 
            onPress={handleOpenMap}
            className="flex-row items-center justify-center bg-primary/10 p-3 rounded-lg mt-2"
          >
            <Ionicons name="map-outline" size={20} color="#4F46E5" />
            <Text className="text-primary font-medium ml-2">Xaritada ko'rish</Text>
          </TouchableOpacity>
        </View>

        {/* Map */}
        <View className="bg-white mt-2 p-4">
          <Text className="text-lg font-semibold text-text mb-2">Manzil</Text>
          <View className="w-full h-48 rounded-lg overflow-hidden">
            <MapView
              className="w-full h-full"
              initialRegion={{
                latitude: jobData.coordinates.latitude,
                longitude: jobData.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: jobData.coordinates.latitude,
                  longitude: jobData.coordinates.longitude,
                }}
                title={jobData.location}
              />
            </MapView>
          </View>
        </View>

        {/* Client Info */}
        <View className="bg-white mt-2 p-4 mb-24">
          <Text className="text-lg font-semibold text-text mb-4">Mijoz ma'lumotlari</Text>
          
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="person-outline" size={24} color="#4F46E5" />
            </View>
            <View className="ml-3">
              <Text className="font-medium text-text">{jobData.client.name}</Text>
              <Text className="text-secondary text-sm">{jobData.client.email}</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-2">
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <Text className="text-secondary ml-2">{jobData.client.phone}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-border">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={handleCall}
            className="bg-primary/10 flex-row items-center justify-center px-6 py-3 rounded-lg flex-1 mr-3"
          >
            <Ionicons name="call-outline" size={20} color="#4F46E5" />
            <Text className="text-primary font-medium ml-2">Qo'ng'iroq</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleChat}
            className="bg-primary flex-row items-center justify-center px-6 py-3 rounded-lg flex-1"
          >
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Xabar yozish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} 