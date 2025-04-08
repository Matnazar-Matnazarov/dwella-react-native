import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function VerifyEmailScreen() {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendEmail = () => {
    // Implement resend verification email logic here
    setTimer(60);
    setCanResend(false);
  };

  return (
    <View className="flex-1 bg-background px-4">
      <View className="items-center pt-20">
        <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-6">
          <Ionicons name="mail" size={48} color="#4F46E5" />
        </View>
        
        <Text className="text-2xl font-bold text-text mb-2">
          Email manzilingizni tasdiqlang
        </Text>
        
        <Text className="text-base text-secondary text-center mb-8">
          Biz sizning email manzilingizga tasdiqlash havolasini yubordik. Iltimos, emailingizni tekshiring va havolani bosing.
        </Text>

        <TouchableOpacity 
          className={`w-full rounded-lg p-4 items-center shadow-sm mb-4 ${
            canResend ? 'bg-primary' : 'bg-gray-200'
          }`}
          onPress={handleResendEmail}
          disabled={!canResend}
        >
          <Text className={`font-medium text-lg ${
            canResend ? 'text-white' : 'text-gray-500'
          }`}>
            {canResend ? 'Qayta yuborish' : `Qayta yuborish (${timer}s)`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="mt-4"
          onPress={() => router.back()}
        >
          <Text className="text-primary">Orqaga qaytish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 