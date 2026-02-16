/* eslint-disable react-hooks/rules-of-hooks */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import { subscribeToReminders } from "../../src/services/firestore.service";
import { useAuth } from "@/src/context/AuthContext";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { user, loading, logout } = useAuth();
  const [reminderCount, setReminderCount] = useState(0);
  useEffect(() => {
    const unsubscribe = subscribeToReminders((data) => {
      setReminderCount(data.length);
    });

    return unsubscribe;
  }, []);
  const SettingItem = ({
    icon,
    label,
    onPress,
    value,
  }: {
    icon: any;
    label: string;
    onPress?: () => void;
    value?: any;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between p-4 mb-3 border border-gray-100 bg-gray-50 rounded-2xl"
    >
      <View className="flex-row items-center">
        <View className="items-center justify-center w-10 h-10 mr-4 bg-white border border-gray-100 rounded-full shadow-sm">
          <Ionicons name={icon} size={20} color="black" />
        </View>
        <Text className="text-base font-medium text-black">{label}</Text>
      </View>
      {value !== undefined ? (
        value
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-white">
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Header */}
        <Text className="mt-8 mb-6 text-3xl font-light tracking-tighter">
          My <Text className="font-bold">Profile</Text>
        </Text>

        {/* Profile Card */}
        <View className="items-center py-8 mb-8 bg-black rounded-[40px] shadow-lg relative overflow-hidden">
          {/* Decorative circle */}
          <View className="absolute w-40 h-40 bg-gray-800 rounded-full -top-10 -right-10 opacity-20" />

          <View className="p-1 mb-4 rounded-full bg-white/20">
            <View className="items-center justify-center w-24 h-24 overflow-hidden bg-gray-200 border-2 border-white rounded-full">
              {user?.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  className="w-full h-full"
                />
              ) : (
                <View className="items-center justify-center w-full h-full bg-gray-300">
                  <Ionicons name="person" size={40} color="white" />
                </View>
              )}

              {/* Fallback if image fails to load */}
              <View className="absolute inset-0 items-center justify-center bg-gray-300 -z-10">
                <Ionicons name="person" size={40} color="white" />
              </View>
            </View>
          </View>
          <Text className="text-2xl font-bold text-white">
            {user?.displayName || user?.email?.split("@")[0] || "User"}
          </Text>

          <Text className="mt-1 text-gray-400">{user?.email}</Text>

          <View className="flex-row mt-6 space-x-8">
            <View className="items-center px-4">
              <Text className="text-lg font-bold text-white">
                {reminderCount}
              </Text>

              <Text className="text-xs tracking-widest text-gray-500 uppercase">
                Reminders
              </Text>
            </View>
            <View className="w-[1px] h-full bg-gray-700" />
            <View className="items-center px-4">
              <Text className="text-lg font-bold text-white">5</Text>
              <Text className="text-xs tracking-widest text-gray-500 uppercase">
                Alerts
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Group */}
        <Text className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
          Settings
        </Text>

        <SettingItem
          icon="moon-outline"
          label="Dark Mode"
          value={
            <Switch
              trackColor={{ false: "#e5e7eb", true: "#000" }}
              thumbColor={"#fff"}
              onValueChange={() => setIsDarkMode(!isDarkMode)}
              value={isDarkMode}
            />
          }
        />
        <SettingItem
          icon="notifications-outline"
          label="Notifications"
          onPress={() => {}}
        />
        <SettingItem
          icon="location-outline"
          label="Location Services"
          onPress={() => {}}
        />

        <Text className="mt-4 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
          Account
        </Text>
        <SettingItem
          icon="shield-checkmark-outline"
          label="Privacy & Security"
          onPress={() => {}}
        />
        <SettingItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => {}}
        />

        <TouchableOpacity
          className="flex-row items-center justify-center p-5 mt-6 mb-10 border border-red-100 bg-red-50 rounded-3xl"
          onPress={async () => {
            await logout();
            router.replace("/(auth)/login");
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          <Text className="ml-2 font-bold text-red-600">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
