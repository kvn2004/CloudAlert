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
import { createReminder } from "../../../src/services/firestore.service";

export default function AddReminderScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Weather");
  const handleCreateReminder = async () => {
    if (!title || !time) {
      alert("Please enter title and time");
      return;
    }

    try {
      // Convert time string to Date object (you can improve parsing later)
      const reminderTime = new Date();
      const [hours, minutesPart] = time.split(":");
      let minutes = 0;
      let hoursInt = parseInt(hours);
      if (minutesPart?.toLowerCase().includes("pm")) {
        hoursInt += 12;
        minutes = parseInt(minutesPart);
      } else if (minutesPart?.toLowerCase().includes("am")) {
        minutes = parseInt(minutesPart);
      }

      reminderTime.setHours(hoursInt, minutes, 0, 0);

      // Create in Firestore
      await createReminder({
        title,
        description,
        time: reminderTime,
        type: selectedType, // store the type
      });

      alert("Reminder created!");
      router.back(); // Go back to previous screen
    } catch (error) {
      console.error(error);
      alert("Failed to create reminder");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center pt-4 pb-2 my-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-full"
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">New Reminder</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Title
            </Text>
            <TextInput
              className="p-4 text-lg text-black border border-gray-100 bg-gray-50 rounded-2xl"
              placeholder="e.g. Bring Umbrella"
              placeholderTextColor="#9ca3af"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Time
            </Text>
            <View className="flex-row items-center p-4 border border-gray-100 bg-gray-50 rounded-2xl">
              <Ionicons
                name="time-outline"
                size={22}
                color="#9ca3af"
                style={{ marginRight: 10 }}
              />
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
            <Text className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Description
            </Text>
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
            <Text className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Type
            </Text>
            <View className="flex-row flex-wrap mt-2">
              {["Weather", "Task", "Health", "Home"].map((chip) => (
                <TouchableOpacity
                  key={chip}
                  className={`px-5 py-2 mb-3 mr-3 rounded-full ${
                    selectedType === chip ? "bg-black" : "bg-gray-100"
                  }`}
                  onPress={() => setSelectedType(chip)}
                >
                  <Text
                    className={`font-medium ${selectedType === chip ? "text-white" : "text-gray-600"}`}
                  >
                    {chip}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                className={`px-5 py-2 mb-3 mr-3 rounded-full ${selectedType === "Custom" ? "bg-black" : "bg-gray-100"}`}
                onPress={() => setSelectedType("Custom")}
              >
                <Text
                  className={`font-medium ${selectedType === "Custom" ? "text-white" : "text-gray-600"}`}
                >
                  Custom
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View className="pb-6">
          <TouchableOpacity
            className="items-center w-full py-4 mb-3 bg-black shadow-blg rounded-3xl"
            onPress={handleCreateReminder}
          >
            <Text className="text-lg font-bold text-white ">
              Create Reminder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
