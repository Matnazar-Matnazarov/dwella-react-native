import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-text mb-2">
            Ishonchli ustalar{'\n'}
            <Text className="text-primary">va buyurtmalar</Text>
          </Text>
          <Text className="text-base text-secondary">
            Dwella - bu ustalar va mijozlarni bog'lovchi platforma. Bu yerda siz o'zingizga kerakli ustani topishingiz yoki buyurtma olishingiz mumkin.
          </Text>
        </View>

        <View className="flex-row mb-8">
          <TouchableOpacity 
            className="flex-1 mr-2 bg-primary rounded-xl p-4"
            onPress={() => router.push('/create')}
          >
            <View className="items-center justify-center">
              <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mb-3">
                <Ionicons name="add-circle" size={24} color="#FFFFFF" />
              </View>
              <Text className="text-white font-medium text-base mb-1">E'lon berish</Text>
              <Text className="text-white/80 text-sm text-center">Ustalar takliflarini ko'ring</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 ml-2 bg-white rounded-xl p-4 border border-border"
            onPress={() => router.push('/(tabs)/masters')}
          >
            <View className="items-center justify-center">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-3">
                <Ionicons name="search" size={24} color="#4F46E5" />
              </View>
              <Text className="text-text font-medium text-base mb-1">Usta qidirish</Text>
              <Text className="text-secondary text-sm text-center">Professional ustalarni toping</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-4">Mijozlar uchun</Text>
          <View className="bg-white rounded-xl p-4 border border-border">
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#10B981" />
                </View>
                <Text className="text-secondary flex-1">E'lon joylashtiring va takliflarni ko'ring</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#10B981" />
                </View>
                <Text className="text-secondary flex-1">Ustalar bilan bog'laning va kelishing</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#10B981" />
                </View>
                <Text className="text-secondary flex-1">Ishni baholang va sharh qoldiring</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-4">Ustalar uchun</Text>
          <View className="bg-white rounded-xl p-4 border border-border">
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#4F46E5" />
                </View>
                <Text className="text-secondary flex-1">Buyurtmalarni ko'ring va taklif bering</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#4F46E5" />
                </View>
                <Text className="text-secondary flex-1">Mijozlar bilan bog'laning</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#4F46E5" />
                </View>
                <Text className="text-secondary flex-1">Ishlaringizni ko'rsating va reyting yig'ing</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}