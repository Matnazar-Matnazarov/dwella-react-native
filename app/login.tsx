import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Implement email/password login logic here
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Implement Google login logic here
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Logo and Header */}
        <View className="items-center pt-20 pb-10">
          <View className="w-24 h-24 bg-primary/10 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="home" size={48} color="#4F46E5" />
          </View>
          <Text className="text-3xl font-bold text-text mb-2">Dwella</Text>
          <Text className="text-base text-secondary">Tizimga kirish</Text>
        </View>

        {/* Login Form */}
        <View className="px-4 pt-8">
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Email</Text>
            <TextInput
              className="border border-border rounded-lg p-4 bg-card text-text"
              placeholder="Email manzilingizni kiriting"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-text mb-1">Parol</Text>
            <View className="relative">
              <TextInput
                className="border border-border rounded-lg p-4 bg-card text-text pr-12"
                placeholder="Parolingizni kiriting"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-primary rounded-lg p-4 items-center shadow-sm mb-4"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white font-medium text-lg">
              {loading ? 'Kirish...' : 'Kirish'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="mb-6"
            onPress={() => router.push('/forgot-password')}
          >
            <Text className="text-primary text-center">Parolni unutdingizmi?</Text>
          </TouchableOpacity>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="text-secondary mx-4">yoki</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          <TouchableOpacity 
            className="bg-white border border-border rounded-lg p-4 flex-row items-center justify-center shadow-sm mb-6"
            onPress={handleGoogleLogin}
          >
            <Image 
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              className="w-5 h-5 mr-3"
            />
            <Text className="text-text font-medium">Google orqali kirish</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-secondary">Hisobingiz yo'qmi? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-primary font-medium">Ro'yxatdan o'tish</Text>
            </TouchableOpacity>
          </View>
    </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}