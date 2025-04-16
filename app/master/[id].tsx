import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

// Mock data for master profile
const master = {
  id: 1,
  name: 'Ali Valiyev',
  category: 'Elektr',
  rating: 4.8,
  reviews: 124,
  experience: '5 yil',
  price: '500 000 so\'m',
  description: '5 yillik tajribaga ega elektr ustasi. Barcha turdagi elektr ishlari bajariladi.',
  avatar: require('../../assets/electrician.jpeg'),
  phone: '+998901234567',
  portfolio: [
    require('../../assets/electrician.jpeg'),
    require('../../assets/electrician.jpeg'),
    require('../../assets/electrician.jpeg'),
  ],
  reviewsList: [
    {
      id: 1,
      user: 'Hasan Hasanov',
      rating: 5,
      comment: 'Ajoyib ish qildi. Juda ham xursandman.',
      date: '2024-03-15',
    },
    {
      id: 2,
      user: 'Shavkat Rahimov',
      rating: 4,
      comment: 'Ishni vaqtida tugatdi. Narxi ham o\'rta.',
      date: '2024-03-10',
    },
  ],
};

export default function MasterProfile() {
  const handleCall = () => {
    Linking.openURL(`tel:${master.phone}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={master.avatar} style={styles.avatar} />
        <Text style={styles.name}>{master.name}</Text>
        <Text style={styles.category}>{master.category}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={20} color="#F59E0B" />
          <Text style={styles.ratingText}>{master.rating}</Text>
          <Text style={styles.reviewsText}>({master.reviews} baho)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ma\'lumot</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <FontAwesome name="briefcase" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{master.experience} tajriba</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="money" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{master.price}</Text>
          </View>
        </View>
        <Text style={styles.description}>{master.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {master.portfolio.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.portfolioImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sharhlar</Text>
        {master.reviewsList.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <View style={styles.reviewRating}>
                <FontAwesome name="star" size={16} color="#F59E0B" />
                <Text style={styles.reviewRatingText}>{review.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        <Link href={`/chat/${master.id}`} asChild>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Xabar yuborish</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callButtonText}>Qo'ng'iroq qilish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  portfolioImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
  },
  reviewCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionsContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 