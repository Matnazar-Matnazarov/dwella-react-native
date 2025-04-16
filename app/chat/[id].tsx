import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Mock data for chat messages
const messages = [
  {
    id: 1,
    sender: 'user',
    message: 'Salom, ish haqida gaplashamizmi?',
    time: '12:30',
  },
  {
    id: 2,
    sender: 'master',
    message: 'Salom, albatta. Qanday ish kerak?',
    time: '12:31',
  },
  {
    id: 3,
    sender: 'user',
    message: 'Uyimda elektr ta\'mirlash ishi bor. Qancha bo\'ladi?',
    time: '12:32',
  },
  {
    id: 4,
    sender: 'master',
    message: 'Ish joyini ko\'ribgina aytish mumkin. Manzilingizni yozing.',
    time: '12:33',
  },
];

const master = {
  id: 1,
  name: 'Ali Valiyev',
  avatar: require('../../assets/electrician.jpeg'),
  isOnline: true,
};

export default function ChatConversation() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Implement message sending logic
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={master.avatar} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{master.name}</Text>
          <Text style={styles.status}>Online</Text>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.masterMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentButton}>
          <FontAwesome name="paperclip" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Xabar yozing..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FontAwesome name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  status: {
    fontSize: 12,
    color: '#6B7280',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
  },
  masterMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
  },
  messageText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    color: '#6B7280',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attachmentButton: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
}); 