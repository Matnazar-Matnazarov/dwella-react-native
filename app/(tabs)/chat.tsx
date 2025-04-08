import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample chat data
const chatData = [
  {
    id: '1',
    name: 'Ali Valiev',
    specialty: 'Santexnik',
    lastMessage: 'Men bu ishni qila olaman, narxini ko\'rib chiqib aytaman',
    time: '10:30',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    online: true
  },
  {
    id: '2',
    name: 'Bobur Mirzaev',
    specialty: 'Elektrik',
    lastMessage: 'E\'lon qo\'yilgan manzilga bora olaman',
    time: '09:15',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    online: false
  },
  {
    id: '3',
    name: 'Shaxzod Usmonov',
    specialty: 'Duradgor',
    lastMessage: 'Men sizning e\'loningizga javob berdim',
    time: 'Dush',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    online: true
  }
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = chatData.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity className="bg-card p-4 rounded-lg shadow-sm border border-border mb-3">
      <View className="flex-row items-center">
        <View className="relative">
          <View className="w-14 h-14 bg-gray-200 rounded-full mr-4 overflow-hidden">
            <Image 
              source={{ uri: item.avatar }} 
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          {item.online && (
            <View className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-text">{item.name}</Text>
            <Text className="text-xs text-secondary">{item.time}</Text>
          </View>
          <Text className="text-sm text-secondary">{item.specialty}</Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-sm text-text flex-1 mr-2" numberOfLines={1}>{item.lastMessage}</Text>
            {item.unread > 0 && (
              <View className="bg-primary rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs">{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <View className="p-4">
        <Text className="text-2xl font-bold text-text mb-2">Xabarlar</Text>
        <Text className="text-base text-secondary mb-4">Ustalar bilan muloqot qiling</Text>
        
        <View className="mb-4">
          <View className="flex-row items-center border border-border rounded-lg bg-card px-3">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 p-3 text-text"
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
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
} 