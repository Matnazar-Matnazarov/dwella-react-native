// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      // Show error message
      return;
    }

    setLoading(true);
    try {
      // Implement email registration logic here
      // 1. Create user account
      // 2. Send verification email
      // 3. Show verification message
      router.push('/verify-email');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Implement Google sign up logic here
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
        <View className="items-center pt-16 pb-8">
          <View className="w-20 h-20 bg-primary/10 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="home" size={40} color="#4F46E5" />
          </View>
          <Text className="text-3xl font-bold text-text mb-2">Dwella</Text>
          <Text className="text-base text-secondary">Ro'yxatdan o'tish</Text>
        </View>

        {/* Registration Form */}
        <View className="px-4 pt-6">
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">To'liq ism</Text>
            <TextInput
              className="border border-border rounded-lg p-4 bg-card text-text"
              placeholder="To'liq ismingizni kiriting"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Parol</Text>
            <View className="relative">
              <TextInput
                className="border border-border rounded-lg p-4 bg-card text-text pr-12"
                placeholder="Parol yarating"
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

          <View className="mb-6">
            <Text className="text-sm font-medium text-text mb-1">Parolni tasdiqlash</Text>
            <View className="relative">
              <TextInput
                className="border border-border rounded-lg p-4 bg-card text-text pr-12"
                placeholder="Parolni qayta kiriting"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white font-medium text-lg">
              {loading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="text-secondary mx-4">yoki</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          <TouchableOpacity 
            className="bg-white border border-border rounded-lg p-4 flex-row items-center justify-center shadow-sm mb-6"
            onPress={handleGoogleSignUp}
          >
            <Image 
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              className="w-5 h-5 mr-3"
            />
            <Text className="text-text font-medium">Google orqali ro'yxatdan o'tish</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mb-6">
            <Text className="text-secondary">Hisobingiz bormi? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-primary font-medium">Kirish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}