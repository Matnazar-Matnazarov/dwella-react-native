import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, Platform, StatusBar } from 'react-native';
import { router } from 'expo-router';

const TAB_BAR_HEIGHT = 80;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: TAB_BAR_HEIGHT,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarItemStyle: {
          height: TAB_BAR_HEIGHT,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        header: ({ options, route }) => {
          return (
            <View className="bg-white">
              <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
              <View style={{ paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight }} />
              <View className="px-4 pb-4">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-2xl font-bold text-text">
                    {route.name === 'index' ? 'Dwella' : 
                     route.name === 'explore' ? "E'lonlar" :
                     route.name === 'chat' ? 'Xabarlar' :
                     route.name === 'masters' ? 'Ustalar' : ''}
                  </Text>
                  <View className="flex-row items-center">
                    <TouchableOpacity 
                      className="relative mr-4"
                      onPress={() => router.push('/notifications')}
                    >
                      <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                        <Ionicons name="notifications-outline" size={22} color="#1F2937" />
                      </View>
                      <View className="absolute -top-0.5 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => router.push('/(tabs)/profile')}
                    >
                      <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                        <Ionicons name="person-outline" size={22} color="#1F2937" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-secondary text-base">
                  {route.name === 'index' ? 'Ustalar va buyurtmalar platformasi' :
                   route.name === 'explore' ? 'Ustalar va mijozlar uchun e\'lonlar' :
                   route.name === 'chat' ? 'Ustalar bilan muloqot qiling' :
                   route.name === 'masters' ? 'Professional ustalarni toping' : ''}
                </Text>
              </View>
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bosh sahifa',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: 'Bosh',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "E'lonlar",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: "E'lonlar",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center -mt-6">
              <View className="w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg">
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Xabarlar',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center relative">
              <Ionicons 
                name={focused ? "chatbubble" : "chatbubble-outline"} 
                size={24} 
                color={color} 
              />
              <View className="absolute -top-1 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </View>
          ),
          tabBarLabel: 'Xabarlar',
        }}
      />
      <Tabs.Screen
        name="masters"
        options={{
          title: 'Ustalar',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <Ionicons 
                name={focused ? "people" : "people-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: 'Ustalar',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}