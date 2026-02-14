import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddReminderScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center pt-4 pb-2 my-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center bg-gray-100 rounded-full mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">New Reminder</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Title</Text>
            <TextInput
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-lg text-black"
              placeholder="e.g. Bring Umbrella"
              placeholderTextColor="#9ca3af"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Time</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-100 p-4 rounded-2xl">
              <Ionicons name="time-outline" size={22} color="#9ca3af" style={{ marginRight: 10 }} />
              <TextInput
                className="flex-1 text-lg text-black"
                placeholder="00:00 AM"
                placeholderTextColor="#9ca3af"
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Description</Text>
            <TextInput
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-lg text-black min-h-[120px]"
              placeholder="Add details..."
              placeholderTextColor="#9ca3af"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Type</Text>
            <View className="flex-row flex-wrap mt-2">
              {['Weather', 'Task', 'Health', 'Home'].map((chip) => (
                <TouchableOpacity key={chip} className="mr-3 mb-3 px-5 py-2 rounded-full bg-gray-100 border border-gray-200">
                  <Text className="font-medium text-gray-600">{chip}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity className="mr-3 mb-3 px-5 py-2 rounded-full bg-black border border-black">
                <Text className="font-medium text-white">Custom</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View className="pb-6">
            <TouchableOpacity 
              className="w-full bg-black py-4 rounded-3xl items-center shadow-lg"
              onPress={() => router.back()} 
            >
              <Text className="text-white font-bold text-lg">Create Reminder</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
