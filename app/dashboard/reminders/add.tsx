import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createReminder,
  getReminderById,
  updateReminder,
} from "../../../src/services/firestore.service";

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: string;
  time?: any;
}

export default function AddReminderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Weather");
  useEffect(() => {
    if (isEditMode) {
      loadReminder();
    }
  }, [id]);
  const loadReminder = async () => {
    try {
      const reminder = (await getReminderById(id as string)) as Reminder;
      if (!reminder) return;

      setTitle(reminder.title);
      setDescription(reminder.description);
      setSelectedType(reminder.type);

      if (reminder.time?.toDate) {
        const date = reminder.time.toDate();
        const formatted = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setTime(formatted);
      }
    } catch (error) {
      console.error("Failed to load reminder", error);
    }
  };
  const handleSubmit = async () => {
    if (!title || !time) {
      alert("Please enter title and time");
      return;
    }

    try {
      const reminderTime = new Date();
      const [hoursStr, minutesStrRaw] = time.split(":");

      let hours = parseInt(hoursStr);
      let minutes = 0;

      if (minutesStrRaw) {
        const minutesStr = minutesStrRaw.replace(/am|pm/i, "").trim();
        minutes = parseInt(minutesStr);

        if (minutesStrRaw.toLowerCase().includes("pm") && hours < 12) {
          hours += 12;
        }

        if (minutesStrRaw.toLowerCase().includes("am") && hours === 12) {
          hours = 0;
        }
      }

      reminderTime.setHours(hours, minutes, 0, 0);

      const payload = {
        title,
        description,
        time: reminderTime,
        type: selectedType,
      };

      if (isEditMode) {
        await updateReminder(id as string, payload);
        alert("Reminder updated!");
      } else {
        await createReminder(payload);
        alert("Reminder created!");
      }

      router.back();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
          <Text className="text-xl font-bold">
            {isEditMode ? "Edit Reminder" : "New Reminder"}
          </Text>
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
            onPress={handleSubmit}
          >
            <Text className="text-lg font-bold text-white">
              {isEditMode ? "Update Reminder" : "Create Reminder"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
