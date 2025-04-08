import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Kirish" }} />
      <Stack.Screen name="register" options={{ title: "Ro'yxatdan o'tish" }} />
    </Stack>
  );
}