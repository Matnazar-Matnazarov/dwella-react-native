// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 justify-center p-4 bg-gray-50">
      <Text className="text-3xl font-bold text-center text-indigo-600 mb-2">Dwella</Text>
      <Text className="text-base text-center text-gray-600 mb-6">Ro'yxatdan o'tish</Text>
      <View className="bg-white p-6 rounded-lg shadow-md">
        <Text className="text-sm font-medium text-gray-700 mb-2">Ism</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-4"
          placeholder="Ismingiz"
          value={name}
          onChangeText={setName}
        />
        <Text className="text-sm font-medium text-gray-700 mb-2">Email manzil</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-4"
          placeholder="example@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text className="text-sm font-medium text-gray-700 mb-2">Parol</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-4"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity className="bg-indigo-600 p-3 rounded-md mb-4">
          <Text className="text-white text-center font-medium">Ro'yxatdan o'tish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}