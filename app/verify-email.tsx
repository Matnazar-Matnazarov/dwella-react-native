import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = () => {
    // TODO: Implement verification logic
    router.replace('/(tabs)');
  };

  const handleResendCode = () => {
    // TODO: Implement resend code logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Email tasdiqlash</Text>
        <Text style={styles.subtitle}>
          Email manzilingizga yuborilgan tasdiqlash kodini kiriting
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tasdiqlash kodi"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Tasdiqlash</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
            <Text style={styles.resendButtonText}>Kodni qayta yuborish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 8,
  },
  verifyButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
}); 