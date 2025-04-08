import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View className="flex-1 p-4 bg-gray-50">
      <View className="max-w-4xl mx-auto">
        <View className="text-center space-y-6">
          <Text className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Ishonchli ustalar{'\n'}
            <Text className="text-indigo-600">va buyurtmalar</Text>
          </Text>
          <Text className="text-base text-gray-500 max-w-2xl mx-auto">
            Dwella - bu ustalar va mijozlarni bog‘lovchi platforma. Bu yerda siz o‘zingizga kerakli ustani topishingiz yoki buyurtma olishingiz mumkin.
          </Text>
          <View className="flex-row justify-center gap-4">
            <TouchableOpacity className="flex-row items-center justify-center px-6 py-3 bg-indigo-600 rounded-md">
              <Text className="text-white font-medium">E'lon berish</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-md">
              <Text className="text-gray-700 font-medium">Usta qidirish</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-12 flex-row gap-6">
          <View className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <Text className="text-xl font-semibold text-gray-900 mb-4">Mijozlar uchun</Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" className="mr-2" />
                <Text className="text-base text-gray-500">E'lon joylashtiring</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" className="mr-2" />
                <Text className="text-base text-gray-500">Ustalar takliflarini ko‘ring</Text>
              </View>
            </View>
          </View>
          <View className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <Text className="text-xl font-semibold text-gray-900 mb-4">Ustalar uchun</Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" className="mr-2" />
                <Text className="text-base text-gray-500">Buyurtmalarni ko‘ring</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" className="mr-2" />
                <Text className="text-base text-gray-500">Taklif bering</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}