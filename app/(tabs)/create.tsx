import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = () => {
    // Here you would handle the submission of the job announcement
    console.log({ title, description, budget, category, location, images });
  };

  const addImage = () => {
    // Here you would implement image selection functionality
    console.log('Add image');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-text mb-2">E'lon qo'shish</Text>
          <Text className="text-base text-secondary mb-6">Ustalar bilan bog'lanish uchun e'lon yarating</Text>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Sarlavha</Text>
            <TextInput
              className="border border-border rounded-lg p-3 bg-card text-text"
              placeholder="Ish haqida qisqacha ma'lumot"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Batafsil ma'lumot</Text>
            <TextInput
              className="border border-border rounded-lg p-3 bg-card text-text h-32"
              placeholder="Ish haqida batafsil ma'lumot"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Byudjet</Text>
            <View className="flex-row items-center border border-border rounded-lg bg-card">
              <TextInput
                className="flex-1 p-3 text-text"
                placeholder="Byudjetni kiriting"
                placeholderTextColor="#9CA3AF"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
              <Text className="px-3 text-secondary">so'm</Text>
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Kategoriya</Text>
            <View className="border border-border rounded-lg bg-card">
              <TextInput
                className="p-3 text-text"
                placeholder="Ish kategoriyasini tanlang"
                placeholderTextColor="#9CA3AF"
                value={category}
                onChangeText={setCategory}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-text mb-1">Manzil</Text>
            <View className="flex-row items-center border border-border rounded-lg bg-card">
              <Ionicons name="location-outline" size={20} color="#6B7280" style={{ marginLeft: 12 }} />
              <TextInput
                className="flex-1 p-3 text-text"
                placeholder="Ish joylashuvi"
                placeholderTextColor="#9CA3AF"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-sm font-medium text-text mb-1">Rasmlar</Text>
            <TouchableOpacity 
              className="border border-border border-dashed rounded-lg p-4 items-center justify-center bg-card"
              onPress={addImage}
            >
              <Ionicons name="image-outline" size={24} color="#6B7280" />
              <Text className="text-secondary mt-2">Rasm qo'shish</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            className="bg-primary rounded-lg p-4 items-center shadow-sm"
            onPress={handleSubmit}
          >
            <Text className="text-white font-medium text-lg">E'lonni joylashtirish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}