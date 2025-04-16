import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#1F2937',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: "Kirish",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="register" 
          options={{ 
            title: "Ro'yxatdan o'tish",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="verify-email" 
          options={{ 
            title: "Email tasdiqlash",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="[id]" 
          options={{ 
            title: "E'lon ma'lumotlari",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="master/[id]" 
          options={{ 
            title: "Usta ma'lumotlari",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="chat/[id]" 
          options={{ 
            title: "Xabar",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="notifications" 
          options={{ 
            title: "Bildirishnomalar",
            headerShown: false,
          }} 
        />
      </Stack>
    </>
  );
}
