import React from 'react';
import { View, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center p-4 bg-gray-50">
      <Text className="text-3xl font-bold text-center text-indigo-600 mb-2">Dwella</Text>
      <Text className="text-base text-center text-gray-600 mb-6">Kirish</Text>
      <Text className="text-base text-gray-500">Bu yerda kirish formasi bo‘ladi.</Text>
    </View>
  );
}