// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Sample user data
const userData = {
  name: 'Aziz Karimov',
  email: 'aziz.karimov@example.com',
  phone: '+998 90 123 45 67',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  rating: 4.8,
  reviews: 24,
  completedJobs: 15,
  activeJobs: 2,
  memberSince: '2022-yil, Yanvar',
  location: 'Tashkent, Uzbekistan',
  bio: 'Professional santexnik. 5 yillik tajribaga ega. Kichik va o\'rta hajmdagi loyihalarda ishlash imkoniyati.',
  specialties: ['Santexnik', 'Duradgor', 'Elektrik']
};

// Define type for menu items
interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color?: string;
}

// Menu items
const menuItems: MenuItem[] = [
  { id: 'profile', title: 'Profil', icon: 'person-outline' },
  { id: 'settings', title: 'Sozlamalar', icon: 'settings-outline' },
  { id: 'notifications', title: 'Bildirishnomalar', icon: 'notifications-outline' },
  { id: 'help', title: 'Yordam', icon: 'help-circle-outline' },
  { id: 'about', title: 'Ilova haqida', icon: 'information-circle-outline' },
  { id: 'logout', title: 'Chiqish', icon: 'log-out-outline', color: 'text-red-500' }
];

export default function ProfileScreen() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuPress = (itemId: string) => {
    if (itemId === 'logout') {
      Alert.alert(
        "Chiqish",
        "Haqiqatan ham chiqmoqchimisiz?",
        [
          {
            text: "Yo'q",
            style: "cancel"
          },
          { 
            text: "Ha", 
            onPress: () => router.replace('/login')
          }
        ]
      );
    } else {
      // Handle other menu items
      setShowMenu(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      
      {/* Header with back button */}
      <View className="bg-primary pt-12 pb-4 px-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            className="bg-white/20 p-2 rounded-full"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Profil</Text>
          <TouchableOpacity 
            className="bg-white/20 p-2 rounded-full"
            onPress={() => setShowMenu(!showMenu)}
          >
            <Ionicons name="menu" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu dropdown */}
      {showMenu && (
        <View className="absolute top-16 right-4 z-10 bg-card rounded-lg shadow-lg border border-border w-48">
          {menuItems.map(item => (
            <TouchableOpacity 
              key={item.id}
              className="flex-row items-center p-3 border-b border-border"
              onPress={() => handleMenuPress(item.id)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={item.color ? '#EF4444' : '#6B7280'} 
              />
              <Text className={`ml-3 ${item.color || 'text-secondary'}`}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView className="flex-1">
        {/* Profile header */}
        <View className="bg-card p-4 border-b border-border">
          <View className="flex-row items-center">
            <View className="w-24 h-24 rounded-full overflow-hidden mr-4 border-4 border-primary/20">
              <Image 
                source={{ uri: userData.avatar }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-text">{userData.name}</Text>
              <Text className="text-secondary">{userData.specialties.join(', ')}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={16} color="#FBBF24" />
                <Text className="text-secondary ml-1">{userData.rating} ({userData.reviews} sharh)</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
              <Ionicons name="pencil" size={20} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row bg-card p-4 border-b border-border">
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-text">{userData.completedJobs}</Text>
            <Text className="text-secondary text-sm">Bajarilgan</Text>
          </View>
          <View className="flex-1 items-center border-x border-border">
            <Text className="text-xl font-bold text-text">{userData.activeJobs}</Text>
            <Text className="text-secondary text-sm">Faol</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-text">{userData.rating}</Text>
            <Text className="text-secondary text-sm">Reyting</Text>
          </View>
        </View>

        {/* User info */}
        <View className="bg-card p-4 mb-4 mt-4 mx-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-text mb-3">Shaxsiy ma'lumotlar</Text>
          
          <View className="mb-3">
            <Text className="text-secondary text-sm">Email</Text>
            <Text className="text-text">{userData.email}</Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-secondary text-sm">Telefon</Text>
            <Text className="text-text">{userData.phone}</Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-secondary text-sm">Manzil</Text>
            <Text className="text-text">{userData.location}</Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-secondary text-sm">A'zo bo'lgan sana</Text>
            <Text className="text-text">{userData.memberSince}</Text>
          </View>
          
          <View>
            <Text className="text-secondary text-sm">Bio</Text>
            <Text className="text-text">{userData.bio}</Text>
          </View>
        </View>

        {/* Specialties */}
        <View className="bg-card p-4 mb-4 mx-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-text mb-3">Mutaxassislik</Text>
          <View className="flex-row flex-wrap">
            {userData.specialties.map((specialty, index) => (
              <View key={index} className="bg-primary/10 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-primary">{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews section */}
        <View className="bg-card p-4 mb-4 mx-4 rounded-lg shadow-sm">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-text">Sharhlar</Text>
            <TouchableOpacity>
              <Text className="text-primary">Barchasini ko'rish</Text>
            </TouchableOpacity>
          </View>
          
          {/* Sample review */}
          <View className="border-b border-border pb-3 mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-medium text-text">Jamshid Rahimov</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FBBF24" />
                <Text className="text-secondary text-sm ml-1">4.9</Text>
              </View>
            </View>
            <Text className="text-secondary text-sm mb-1">2 kun oldin</Text>
            <Text className="text-text">Ajoyib ish! Juda professional yondashuv va sifatli ish. Tez va to'g'ri bajarildi.</Text>
          </View>
          
          {/* Sample review */}
          <View className="border-b border-border pb-3 mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-medium text-text">Dilnoza Karimova</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FBBF24" />
                <Text className="text-secondary text-sm ml-1">4.7</Text>
              </View>
            </View>
            <Text className="text-secondary text-sm mb-1">1 hafta oldin</Text>
            <Text className="text-text">Barcha ishlar vaqtida bajarildi. Narx ham hamyonbop edi.</Text>
          </View>
          
          {/* Sample review */}
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-medium text-text">Bobur Mirzaev</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FBBF24" />
                <Text className="text-secondary text-sm ml-1">5.0</Text>
              </View>
            </View>
            <Text className="text-secondary text-sm mb-1">2 hafta oldin</Text>
            <Text className="text-text">Eng yaxshi ustalardan biri. Har doim tavsiya qilaman!</Text>
          </View>
        </View>
        
        {/* Logout button */}
        <TouchableOpacity 
          className="bg-red-500/10 p-4 mb-6 mx-4 rounded-lg flex-row items-center justify-center"
          onPress={() => handleMenuPress('logout')}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text className="text-red-500 font-medium ml-2">Chiqish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}