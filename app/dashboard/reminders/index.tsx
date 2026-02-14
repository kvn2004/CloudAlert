import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Mock Data
const REMINDERS = [
  { id: '1', title: 'Bring Umbrella', time: '08:00 AM', active: true, type: 'Weather' },
  { id: '2', title: 'Car Wash', time: '10:30 AM', active: false, type: 'Task' },
  { id: '3', title: 'Evening Jog', time: '06:00 PM', active: true, type: 'Health' },
  { id: '4', title: 'Check Heater', time: '09:00 PM', active: true, type: 'Home' },
];

export default function RemindersScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center justify-between p-4 mb-3 bg-gray-50 rounded-2xl border border-gray-100">
      <View className="flex-row items-center flex-1">
        <View className={`w-12 h-12 items-center justify-center rounded-xl mr-4 ${item.active ? 'bg-black' : 'bg-gray-200'}`}>
          <Ionicons 
            name={item.type === 'Weather' ? 'rainy-outline' : 'notifications-outline'} 
            size={24} 
            color={item.active ? 'white' : 'gray'} 
          />
        </View>
        <View className="flex-1">
          <Text className={`text-base font-semibold ${item.active ? 'text-black' : 'text-gray-400 line-through'}`}>
            {item.title}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">{item.time} • {item.type}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between pt-4 pb-6 my-4">
          <Text className="text-3xl font-light tracking-tighter">
            My <Text className="font-bold">Reminders</Text>
          </Text>
          <TouchableOpacity className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <Ionicons name="filter-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={REMINDERS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      {/* FAB - Add Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-14 h-14 bg-black rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/dashboard/reminders/add')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
