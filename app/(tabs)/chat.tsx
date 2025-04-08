import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Chat {
  id: string;
  name: string;
  specialty: string;
  lastMessage: string;
  time: string;
  unread: number;
  image: string;
  isOnline: boolean;
}

const chatsData: Chat[] = [
  {
    id: '1',
    name: 'Aziz Rahimov',
    specialty: 'Santexnik',
    lastMessage: 'Men bu ishni qila olaman, narxini ko\'rib chiqib aytaman',
    time: '10:30',
    unread: 2,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true
  },
  {
    id: '2',
    name: 'Jamshid Karimov',
    specialty: 'Elektrik',
    lastMessage: 'E\'lon qo\'yilgan manzilga bora olaman',
    time: '09:15',
    unread: 0,
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    isOnline: false
  },
  {
    id: '3',
    name: 'Dilnoza Rahimova',
    specialty: 'Dizayner',
    lastMessage: 'Men sizning e\'loningizga javob berdim',
    time: 'Dush',
    unread: 0,
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    isOnline: true
  }
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chatsData.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity 
      className="px-4 py-3 flex-row items-center bg-white"
      onPress={() => router.push({
        pathname: '/chat/[id]',
        params: { id: item.id }
      })}
    >
      <View className="relative">
        <Image 
          source={{ uri: item.image }}
          className="w-14 h-14 rounded-full"
        />
        {item.isOnline && (
          <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-text">{item.name}</Text>
          <Text className="text-xs text-secondary">{item.time}</Text>
        </View>
        <Text className="text-xs text-secondary mb-1">{item.specialty}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-text flex-1 mr-2" numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="bg-primary w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-xs text-white font-medium">{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-white rounded-xl px-3 border border-border">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 py-3 px-2 text-text"
            placeholder="Xabarlarni qidirish"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-100 ml-[76px]" />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
} 