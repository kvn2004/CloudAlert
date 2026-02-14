import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center w-10 h-10 ${focused ? 'bg-gray-100 rounded-xl' : ''}`}>
              <Ionicons name={focused ? "cloud" : "cloud-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center w-10 h-10 ${focused ? 'bg-gray-100 rounded-xl' : ''}`}>
              <Ionicons name={focused ? "list" : "list-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reminders/add"
        options={{
          href: null, // Hidden from tab bar
          tabBarStyle: { display: 'none' }, // Hide tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center w-10 h-10 ${focused ? 'bg-gray-100 rounded-xl' : ''}`}>
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
