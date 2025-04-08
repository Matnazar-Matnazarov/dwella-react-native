import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'user' | 'other';
}

interface ChatUser {
  id: string;
  name: string;
  image: string;
  online: boolean;
  lastSeen?: string;
}

// Sample chat data
const chatUser: ChatUser = {
  id: '1',
  name: 'Aziz Rahimov',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  online: true
};

const messages: Message[] = [
  {
    id: '1',
    text: 'Assalomu alaykum, ish haqida gaplashsak bo\'ladimi?',
    time: '10:30',
    sender: 'other'
  },
  {
    id: '2',
    text: 'Va alaykum assalom, albatta',
    time: '10:31',
    sender: 'user'
  },
  {
    id: '3',
    text: 'Qachon kelishingiz mumkin?',
    time: '10:31',
    sender: 'other'
  },
  {
    id: '4',
    text: 'Men bugun soat 15:00 da bo\'shman',
    time: '10:32',
    sender: 'user'
  }
];

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const windowHeight = Dimensions.get('window').height;
  const inputHeight = 60;
  const headerHeight = Platform.OS === 'ios' ? 88 : 64;
  const contentHeight = windowHeight - inputHeight - headerHeight;

  const handleSend = () => {
    if (newMessage.trim()) {
      // In real app, send message to backend
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      {/* Header */}
      <View className="bg-white border-b border-border">
        <View className="flex-row items-center px-4 pt-14 pb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center flex-1 ml-2"
            onPress={() => router.push('/master/[id]', { id: chatUser.id })}
          >
            <View className="relative">
              <Image 
                source={{ uri: chatUser.image }}
                className="w-10 h-10 rounded-full"
              />
              {chatUser.online && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-medium text-text">{chatUser.name}</Text>
              <Text className="text-sm text-secondary">
                {chatUser.online ? 'Online' : chatUser.lastSeen}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <Ionicons name="call-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            className={`flex-row mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'other' && (
              <Image 
                source={{ uri: chatUser.image }}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <View 
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-primary rounded-tr-none' 
                  : 'bg-gray-100 rounded-tl-none'
              }`}
            >
              <Text 
                className={message.sender === 'user' ? 'text-white' : 'text-text'}
              >
                {message.text}
              </Text>
              <Text 
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/80' : 'text-secondary'
                }`}
              >
                {message.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="bg-white border-t border-border p-2">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4">
          <TouchableOpacity className="p-2">
            <Ionicons name="camera-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 py-2 px-3 text-text"
            placeholder="Xabar yozing..."
            placeholderTextColor="#9CA3AF"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            className={`p-2 ${newMessage.trim() ? 'opacity-100' : 'opacity-50'}`}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={24} 
              color="#4F46E5"
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 