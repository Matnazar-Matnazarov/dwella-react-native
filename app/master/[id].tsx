import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

interface Review {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  text: string;
  date: string;
}

interface CompletedWork {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  rating: number;
  review: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

interface Master {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  totalReviews: number;
  completedJobs: number;
  activeJobs: number;
  experience: string;
  about: string;
  location: string;
  phone: string;
  email: string;
  certificates: Certificate[];
  completedWorks: CompletedWork[];
  reviews: Review[];
}

// Sample master data
const masterData: Master = {
  id: '1',
  name: 'Aziz Rahimov',
  specialty: 'Professional Santexnik',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  rating: 4.8,
  totalReviews: 124,
  completedJobs: 85,
  activeJobs: 3,
  experience: '5 yil',
  about: 'Professional santexnik. 5 yillik tajribaga ega. Kichik va o\'rta hajmdagi loyihalarda ishlash imkoniyati.',
  location: 'Toshkent, Chilonzor',
  phone: '+998 90 123 45 67',
  email: 'aziz.rahimov@example.com',
  certificates: [
    {
      id: '1',
      title: 'Professional Santexnik',
      issuer: 'Santexnika Akademiyasi',
      year: '2020',
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Suv ta\'minoti mutaxassisi',
      issuer: 'Kommunal xizmatlar markazi',
      year: '2021',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ],
  completedWorks: [
    {
      id: '1',
      title: 'Vannaxona ta\'miri',
      description: 'To\'liq vannaxona ta\'miri, santexnika o\'rnatish',
      image: 'https://images.unsplash.com/photo-1584622650111-9938b6c7d1d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: '2 hafta oldin',
      rating: 5.0,
      review: 'A\'lo darajada bajarilgan ish!'
    },
    {
      id: '2',
      title: 'Isitish tizimi',
      description: 'Markaziy isitish tizimini o\'rnatish',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: '1 oy oldin',
      rating: 4.8,
      review: 'Professional yondashuv va sifatli ish'
    }
  ],
  reviews: [
    {
      id: '1',
      user: {
        name: 'Jamshid Rahimov',
        image: 'https://randomuser.me/api/portraits/men/33.jpg'
      },
      rating: 5.0,
      text: 'Juda yaxshi usta. O\'z ishining ustasi. Tavsiya qilaman.',
      date: '3 kun oldin'
    },
    {
      id: '2',
      user: {
        name: 'Dilnoza Karimova',
        image: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      rating: 4.5,
      text: 'Tez va sifatli ish. Narxi ham hamyonbop.',
      date: '1 hafta oldin'
    }
  ]
};

export default function MasterDetailScreen() {
  const { id } = useLocalSearchParams();
  // In real app, fetch master data using id

  const handleCall = () => {
    Linking.openURL(`tel:${masterData.phone}`);
  };

  const handleChat = () => {
    router.push({
      pathname: '/chat/[id]',
      params: { id: masterData.id }
    });
  };

  const renderRatingStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color="#FBBF24"
          />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-white border-b border-border">
        <View className="flex-row items-center justify-between px-4 pt-14 pb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-text">Usta ma'lumotlari</Text>
          <TouchableOpacity className="p-2 -mr-2">
            <Ionicons name="share-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-white p-4">
          <View className="flex-row">
            <Image 
              source={{ uri: masterData.image }}
              className="w-24 h-24 rounded-full"
            />
            <View className="flex-1 ml-4 justify-center">
              <Text className="text-xl font-bold text-text mb-1">{masterData.name}</Text>
              <Text className="text-secondary mb-2">{masterData.specialty}</Text>
              <View className="flex-row items-center">
                {renderRatingStars(masterData.rating)}
                <Text className="text-secondary ml-2">
                  {masterData.rating} ({masterData.totalReviews} sharh)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row bg-white mt-2 p-4">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-text">{masterData.completedJobs}</Text>
            <Text className="text-secondary">Bajarilgan</Text>
          </View>
          <View className="flex-1 items-center border-x border-border">
            <Text className="text-2xl font-bold text-text">{masterData.activeJobs}</Text>
            <Text className="text-secondary">Faol</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-text">{masterData.experience}</Text>
            <Text className="text-secondary">Tajriba</Text>
          </View>
        </View>

        {/* About */}
        <View className="bg-white mt-2 p-4">
          <Text className="text-lg font-semibold text-text mb-2">Usta haqida</Text>
          <Text className="text-secondary mb-4">{masterData.about}</Text>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <Text className="text-secondary ml-2">{masterData.location}</Text>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <Text className="text-secondary ml-2">{masterData.phone}</Text>
          </View>
          
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
            <Text className="text-secondary ml-2">{masterData.email}</Text>
          </View>
        </View>

        {/* Certificates */}
        <View className="bg-white mt-2 p-4">
          <Text className="text-lg font-semibold text-text mb-4">Sertifikatlar</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {masterData.certificates.map((cert) => (
              <View key={cert.id} className="mr-4 w-64">
                <Image 
                  source={{ uri: cert.image }}
                  className="w-full h-40 rounded-lg mb-2"
                  resizeMode="cover"
                />
                <Text className="font-medium text-text">{cert.title}</Text>
                <Text className="text-secondary text-sm">{cert.issuer} • {cert.year}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Completed Works */}
        <View className="bg-white mt-2 p-4">
          <Text className="text-lg font-semibold text-text mb-4">Bajarilgan ishlar</Text>
          {masterData.completedWorks.map((work) => (
            <View key={work.id} className="mb-4 last:mb-0">
              <Image 
                source={{ uri: work.image }}
                className="w-full h-48 rounded-lg mb-2"
                resizeMode="cover"
              />
              <Text className="font-medium text-text mb-1">{work.title}</Text>
              <Text className="text-secondary mb-2">{work.description}</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  {renderRatingStars(work.rating)}
                  <Text className="text-secondary ml-2">{work.rating}</Text>
                </View>
                <Text className="text-secondary">{work.date}</Text>
              </View>
              <Text className="text-secondary mt-2 italic">"{work.review}"</Text>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View className="bg-white mt-2 p-4 mb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text">Sharhlar</Text>
            <TouchableOpacity>
              <Text className="text-primary">Barchasini ko'rish</Text>
            </TouchableOpacity>
          </View>
          
          {masterData.reviews.map((review) => (
            <View key={review.id} className="mb-4 last:mb-0">
              <View className="flex-row items-center mb-2">
                <Image 
                  source={{ uri: review.user.image }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="flex-1 ml-3">
                  <Text className="font-medium text-text">{review.user.name}</Text>
                  <Text className="text-secondary text-sm">{review.date}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={16} color="#FBBF24" />
                  <Text className="text-secondary ml-1">{review.rating}</Text>
                </View>
              </View>
              <Text className="text-secondary">{review.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-border">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={handleCall}
            className="bg-primary/10 flex-row items-center justify-center px-6 py-3 rounded-lg flex-1 mr-3"
          >
            <Ionicons name="call-outline" size={20} color="#4F46E5" />
            <Text className="text-primary font-medium ml-2">Qo'ng'iroq</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleChat}
            className="bg-primary flex-row items-center justify-center px-6 py-3 rounded-lg flex-1"
          >
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Xabar yozish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} 