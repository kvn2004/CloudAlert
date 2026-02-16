/* eslint-disable react-hooks/rules-of-hooks */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  subscribeToReminders,
  deleteReminder,
  updateReminder,
} from "../../../src/services/firestore.service";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RemindersScreen() {
  const router = useRouter();

  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToReminders((data) => {
      setReminders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteReminder(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const renderLeftActions = (id: string) => (
    <TouchableOpacity
      onPress={() => router.push(`/dashboard/reminders/add?id=${id}`)}
      className="items-center justify-center w-20 mb-3 bg-blue-500 rounded-2xl"
    >
      <Ionicons name="pencil-outline" size={24} color="white" />
      <Text className="mt-1 text-xs text-white">Edit</Text>
    </TouchableOpacity>
  );

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      onPress={() => handleDelete(id)}
      className="items-center justify-center w-20 mb-3 bg-red-500 rounded-2xl"
    >
      <Ionicons name="trash-outline" size={24} color="white" />
      <Text className="mt-1 text-xs text-white">Delete</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }: { item: any }) => (
    <Swipeable
      renderLeftActions={() => renderLeftActions(item.id)}
      renderRightActions={() => renderRightActions(item.id)}
    >
      <View className="flex-row items-center justify-between p-4 mb-3 border border-gray-100 bg-gray-50 rounded-2xl">
        <View className="flex-row items-center flex-1">
          <View
            className={`w-12 h-12 items-center justify-center rounded-xl mr-4 ${
              item.active ? "bg-black" : "bg-gray-200"
            }`}
          >
            <Ionicons
              name={
                item.type === "Weather"
                  ? "rainy-outline"
                  : "notifications-outline"
              }
              size={24}
              color={item.active ? "white" : "gray"}
            />
          </View>

          <View className="flex-1">
            <Text
              className={`text-base font-semibold ${
                item.active ? "text-black" : "text-gray-400 line-through"
              }`}
            >
              {item.title}
            </Text>

            <Text className="mt-1 text-xs text-gray-500">
              {item.time?.toDate
                ? item.time.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(item.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
              • {item.type}
            </Text>
          </View>
        </View>

        <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
      </View>
    </Swipeable>
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
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            !loading ? (
              <Text className="mt-10 text-center text-gray-400">
                No reminders found
              </Text>
            ) : null
          }
        />
      </View>

      {/* FAB - Add Button */}
      <TouchableOpacity
        className="absolute items-center justify-center bg-black rounded-full shadow-lg bottom-6 right-6 w-14 h-14"
        onPress={() => router.push("/dashboard/reminders/add")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
