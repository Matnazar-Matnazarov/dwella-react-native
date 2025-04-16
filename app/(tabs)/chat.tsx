import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// Mock data for chat conversations
const chats = [
  {
    id: 1,
    name: 'Ali Valiyev',
    lastMessage: 'Salom, qanday yordam bera olaman?',
    time: '12:30',
    unread: 2,
    avatar: require('../../assets/constructor_avatar.jpeg'),
  },
  {
    id: 2,
    name: 'Hasan Hasanov',
    lastMessage: 'Ertaga kelaman',
    time: '11:45',
    unread: 0,
    avatar: require('../../assets/plumber.jpeg'),
  },
  {
    id: 3,
    name: 'Shavkat Rahimov',
    lastMessage: 'Narx kelishiladi',
    time: '10:20',
    unread: 1,
    avatar: require('../../assets/constructor_avatar.jpeg'),
  },
];

export default function Chat() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Xabarlar</Text>
      </View>

      <ScrollView style={styles.conversationsContainer}>
        {chats.map((conversation) => (
          <Link key={conversation.id} href={`/chat/${conversation.id}`} asChild>
            <TouchableOpacity style={styles.conversationCard}>
              <Image source={conversation.avatar} style={styles.avatar} />
              <View style={styles.conversationInfo}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{conversation.name}</Text>
                  <Text style={styles.time}>{conversation.time}</Text>
                </View>
                <View style={styles.messageContainer}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conversation.lastMessage}
                  </Text>
                  {conversation.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conversation.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  conversationsContainer: {
    flex: 1,
  },
  conversationCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  conversationInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
}); 