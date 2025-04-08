import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Notification {
  id: string;
  type: 'message' | 'job' | 'review' | 'system';
  title: string;
  description: string;
  time: string;
  image?: string;
  isRead: boolean;
  link?: {
    screen: string;
    params?: any;
  };
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'Yangi xabar',
    description: 'Aziz Rahimov sizga xabar yubordi',
    time: '2 daqiqa oldin',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    isRead: false,
    link: {
      screen: '/chat/[id]',
      params: { id: '1' }
    }
  },
  {
    id: '2',
    type: 'job',
    title: 'Yangi taklif',
    description: 'Sizning e\'loningizga yangi taklif keldi',
    time: '1 soat oldin',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    isRead: false,
    link: {
      screen: '/[id]',
      params: { id: '1' }
    }
  },
  {
    id: '3',
    type: 'review',
    title: 'Yangi sharh',
    description: 'Jamshid sizning ishingizga baho qo\'ydi',
    time: '3 soat oldin',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
    isRead: true,
    link: {
      screen: '/master/[id]',
      params: { id: '1' }
    }
  },
  {
    id: '4',
    type: 'system',
    title: 'Tizim yangilandi',
    description: 'Ilovaning yangi versiyasi o\'rnatildi',
    time: '1 kun oldin',
    isRead: true
  }
];

export default function NotificationsScreen() {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'chatbubble';
      case 'job':
        return 'briefcase';
      case 'review':
        return 'star';
      case 'system':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const getIconBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'bg-blue-100';
      case 'job':
        return 'bg-green-100';
      case 'review':
        return 'bg-yellow-100';
      case 'system':
        return 'bg-gray-100';
      default:
        return 'bg-primary/10';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return '#3B82F6';
      case 'job':
        return '#10B981';
      case 'review':
        return '#F59E0B';
      case 'system':
        return '#6B7280';
      default:
        return '#4F46E5';
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-white">
        <View style={{ paddingTop: 50 }} />
        <View className="px-4 pb-4 flex-row items-center">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1 ml-4">
            <Text className="text-2xl font-bold text-text">Bildirishnomalar</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
            <Ionicons name="checkmark-done" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`mb-3 p-4 rounded-xl border ${notification.isRead ? 'bg-white border-border' : 'bg-primary/5 border-primary/10'}`}
              onPress={() => notification.link && router.push(notification.link.screen as any)}
            >
              <View className="flex-row items-center">
                {notification.image ? (
                  <Image 
                    source={{ uri: notification.image }}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <View className={`w-12 h-12 rounded-full ${getIconBgColor(notification.type)} items-center justify-center`}>
                    <Ionicons 
                      name={getIcon(notification.type)} 
                      size={24} 
                      color={getIconColor(notification.type)} 
                    />
                  </View>
                )}
                <View className="flex-1 ml-3">
                  <View className="flex-row items-center justify-between">
                    <Text className={`font-medium ${notification.isRead ? 'text-text' : 'text-primary'}`}>
                      {notification.title}
                    </Text>
                    <Text className="text-xs text-secondary">{notification.time}</Text>
                  </View>
                  <Text className="text-secondary mt-1" numberOfLines={2}>
                    {notification.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 