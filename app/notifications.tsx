import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'Yangi xabar',
    message: 'Ali Valiyev sizga xabar yubordi',
    time: '12:30',
    read: false,
  },
  {
    id: 2,
    type: 'announcement',
    title: 'E\'lon yangilandi',
    message: 'Sizning e\'loningiz yangilandi',
    time: '11:45',
    read: true,
  },
  {
    id: 3,
    type: 'system',
    title: 'Tizim yangilanishi',
    message: 'Yangi funksiyalar qo\'shildi',
    time: '10:20',
    read: true,
  },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bildirishnomalar</Text>
      </View>

      <ScrollView style={styles.notificationsContainer}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.read && styles.unreadNotification,
            ]}
          >
            <View style={styles.notificationIcon}>
              <FontAwesome
                name={
                  notification.type === 'message'
                    ? 'envelope'
                    : notification.type === 'announcement'
                    ? 'bullhorn'
                    : 'info-circle'
                }
                size={24}
                color="#3B82F6"
              />
            </View>
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          </TouchableOpacity>
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
  notificationsContainer: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    backgroundColor: '#F3F4F6',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
}); 