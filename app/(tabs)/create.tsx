import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface ImageItem {
  uri: string;
  id: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'santexnik', name: 'Santexnik', icon: 'water-outline' },
  { id: 'elektrik', name: 'Elektrik', icon: 'flash-outline' },
  { id: 'duradgor', name: 'Duradgor', icon: 'hammer-outline' },
  { id: 'dizayner', name: 'Dizayner', icon: 'color-palette-outline' },
  { id: 'plastik', name: 'Plastik oyna', icon: 'grid-outline' },
  { id: 'boshqa', name: 'Boshqa', icon: 'ellipsis-horizontal-outline' }
];

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState<Location>({
    latitude: 41.2995,
    longitude: 69.2401,
    address: ''
  });
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadDarkMode();
    requestLocationPermission();
  }, []);

  const loadDarkMode = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('darkMode');
      setIsDarkMode(darkMode === 'true');
    } catch (error) {
      console.error('Error loading dark mode:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      // Get address from coordinates
      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
      
      setLocation({
        latitude,
        longitude,
        address: address ? `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim() : ''
      });
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert('Xato', 'Joylashuvni aniqlashda xatolik yuz berdi');
    }
  };

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImages(prev => [...prev, { 
          uri: result.assets[0].uri, 
          id: Date.now().toString() 
        }]);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Xato', 'Rasmni tanlashda xatolik yuz berdi');
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleLocationSelect = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation(prev => ({
      ...prev,
      latitude,
      longitude
    }));
    setShowMap(false);
  };

  const handleSubmit = async () => {
    if (!title || !description || !budget || !category || !location.address) {
      Alert.alert('Xato', 'Barcha maydonlarni to\'ldiring');
      return;
    }

    setLoading(true);
    try {
      // Save to AsyncStorage
      const jobData = {
        id: Date.now().toString(),
        title,
        description,
        budget,
        category,
        location,
        images,
        createdAt: new Date().toISOString(),
      };

      const existingJobs = await AsyncStorage.getItem('jobs');
      const jobs = existingJobs ? [...JSON.parse(existingJobs), jobData] : [jobData];
      await AsyncStorage.setItem('jobs', JSON.stringify(jobs));

      Alert.alert('Muvaffaqiyatli', 'E\'lon muvaffaqiyatli joylashtirildi');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Xato', 'E\'lonni saqlashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-background'}`}
    >
      {/* Header */}
      <View className={`p-4 flex-row items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b border-border`}>
        <TouchableOpacity 
          className="p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#1F2937'} 
          />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-text'}`}>
          E'lon qo'shish
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="mb-4">
            <Text className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-text'}`}>
              Sarlavha
            </Text>
            <TextInput
              className={`border rounded-xl p-3.5 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-border text-text'
              }`}
              placeholder="Ish haqida qisqacha ma'lumot"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View className="mb-4">
            <Text className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-text'}`}>
              Batafsil ma'lumot
            </Text>
            <TextInput
              className={`border rounded-xl p-3.5 h-32 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-border text-text'
              }`}
              placeholder="Ish haqida batafsil ma'lumot"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          <View className="mb-4">
            <Text className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-text'}`}>
              Byudjet
            </Text>
            <View className={`flex-row items-center border rounded-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-border'
            }`}>
              <TextInput
                className={`flex-1 p-3.5 ${isDarkMode ? 'text-white' : 'text-text'}`}
                placeholder="Byudjetni kiriting"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
              <Text className={`px-4 ${isDarkMode ? 'text-gray-400' : 'text-secondary'}`}>
                so'm
              </Text>
            </View>
          </View>
          
          <View className="mb-4">
            <Text className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-text'}`}>
              Kategoriya
            </Text>
            <TouchableOpacity 
              className={`border rounded-xl p-3.5 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-border'
              }`}
              onPress={() => setShowCategories(!showCategories)}
            >
              <View className="flex-row items-center justify-between">
                <Text className={
                  category 
                    ? isDarkMode ? 'text-white' : 'text-text'
                    : isDarkMode ? 'text-gray-400' : 'text-secondary'
                }>
                  {category ? categories.find(c => c.id === category)?.name : "Ish kategoriyasini tanlang"}
                </Text>
                <Ionicons 
                  name={showCategories ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                />
              </View>
            </TouchableOpacity>
            
            {showCategories && (
              <View className={`mt-2 border rounded-xl overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-border'
              }`}>
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={cat.id}
                    className={`flex-row items-center p-3 ${
                      index !== categories.length - 1 
                        ? isDarkMode ? 'border-b border-gray-700' : 'border-b border-border'
                        : ''
                    }`}
                    onPress={() => {
                      setCategory(cat.id);
                      setShowCategories(false);
                    }}
                  >
                    <Ionicons 
                      name={cat.icon as any} 
                      size={20} 
                      color={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                    />
                    <Text className={`ml-3 ${
                      isDarkMode ? 'text-white' : 'text-text'
                    }`}>
                      {cat.name}
                    </Text>
                    {category === cat.id && (
                      <Ionicons 
                        name="checkmark" 
                        size={20} 
                        color="#4F46E5" 
                        style={{ marginLeft: 'auto' }} 
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View className="mb-4">
            <Text className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-text'}`}>
              Manzil
            </Text>
            <TouchableOpacity 
              className={`border rounded-xl ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-border'
              }`}
              onPress={() => setShowMap(true)}
            >
              {showMap ? (
                <View className="h-48 rounded-xl overflow-hidden">
                  <MapView
                    className="flex-1"
                    initialRegion={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    onPress={handleLocationSelect}
                  >
                    <Marker
                      coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }}
                    />
                  </MapView>
                  <TouchableOpacity 
                    className="absolute top-2 right-2 bg-white rounded-full p-2"
                    onPress={() => setShowMap(false)}
                  >
                    <Ionicons name="close" size={24} color="#1F2937" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="flex-row items-center justify-between p-3.5">
                  <View className="flex-row items-center flex-1">
                    <Ionicons 
                      name="location-outline" 
                      size={20} 
                      color={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                    />
                    <Text className={`ml-2 flex-1 ${
                      location.address 
                        ? isDarkMode ? 'text-white' : 'text-text'
                        : isDarkMode ? 'text-gray-400' : 'text-secondary'
                    }`}>
                      {location.address || "Xaritadan manzilni tanlang"}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    className="ml-2"
                    onPress={getCurrentLocation}
                  >
                    <Ionicons 
                      name="locate" 
                      size={20} 
                      color={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-2">
                    <Ionicons 
                      name="map-outline" 
                      size={20} 
                      color={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                    />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <View className="mb-6">
            <Text className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-text'}`}>
              Rasmlar
            </Text>
            <View className="flex-row flex-wrap -mx-1">
              {images.map((image) => (
                <View key={image.id} className="w-1/3 p-1">
                  <View className="relative rounded-xl overflow-hidden aspect-square">
                    <Image 
                      source={{ uri: image.uri }} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <TouchableOpacity 
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                      onPress={() => handleRemoveImage(image.id)}
                    >
                      <Ionicons name="close" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              {images.length < 6 && (
                <View className="w-1/3 p-1">
                  <TouchableOpacity 
                    className={`border-2 border-dashed rounded-xl aspect-square items-center justify-center ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-border'
                    }`}
                    onPress={handleAddImage}
                  >
                    <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mb-2">
                      <Ionicons 
                        name="image-outline" 
                        size={24} 
                        color="#4F46E5" 
                      />
                    </View>
                    <Text className="text-primary text-sm">Rasm qo'shish</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-secondary'}`}>
              Maksimum 6 ta rasm qo'shish mumkin
            </Text>
          </View>
          
          <TouchableOpacity 
            className={`rounded-xl p-4 items-center shadow-sm ${
              loading ? 'opacity-70' : ''
            } bg-primary`}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-medium text-lg">
                E'lonni joylashtirish
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}