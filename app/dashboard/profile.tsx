import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

  const SettingItem = ({ icon, label, onPress, value }: { icon: any, label: string, onPress?: () => void, value?: any }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between p-4 mb-3 bg-gray-50 rounded-2xl border border-gray-100"
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 items-center justify-center bg-white rounded-full border border-gray-100 mr-4 shadow-sm">
          <Ionicons name={icon} size={20} color="black" />
        </View>
        <Text className="text-base font-medium text-black">{label}</Text>
      </View>
      {value !== undefined ? value : <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Header */}
        <Text className="text-3xl font-light tracking-tighter mt-8 mb-6">
          My <Text className="font-bold">Profile</Text>
        </Text>

        {/* Profile Card */}
        <View className="items-center py-8 mb-8 bg-black rounded-[40px] shadow-lg relative overflow-hidden">
             {/* Decorative circle */}
             <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gray-800 opacity-20" />
             
             <View className="p-1 rounded-full bg-white/20 mb-4">
               <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center overflow-hidden border-2 border-white">
                 <Image 
                   source={{ uri: 'https://i.pravatar.cc/300' }} 
                   className="w-full h-full"
                 />
                 {/* Fallback if image fails to load */}
                 <View className="absolute inset-0 items-center justify-center bg-gray-300 -z-10">
                    <Ionicons name="person" size={40} color="white" />
                 </View>
               </View>
             </View>
             <Text className="text-2xl font-bold text-white">Alex Johnson</Text>
             <Text className="text-gray-400 mt-1">London, UK</Text>
             
             <View className="flex-row mt-6 space-x-8">
                <View className="items-center px-4">
                  <Text className="text-white font-bold text-lg">12</Text>
                  <Text className="text-gray-500 text-xs uppercase tracking-widest">Reminders</Text>
                </View>
                <View className="w-[1px] h-full bg-gray-700" />
                <View className="items-center px-4">
                  <Text className="text-white font-bold text-lg">5</Text>
                  <Text className="text-gray-500 text-xs uppercase tracking-widest">Alerts</Text>
                </View>
             </View>
        </View>

        {/* Settings Group */}
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Settings</Text>
        
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
        <SettingItem icon="notifications-outline" label="Notifications" onPress={() => {}} />
        <SettingItem icon="location-outline" label="Location Services" onPress={() => {}} />
        
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 mt-4">Account</Text>
        <SettingItem icon="shield-checkmark-outline" label="Privacy & Security" onPress={() => {}} />
        <SettingItem icon="help-circle-outline" label="Help & Support" onPress={() => {}} />
        
        <TouchableOpacity 
          className="flex-row items-center justify-center p-5 mt-6 mb-10 bg-red-50 rounded-3xl border border-red-100"
          onPress={() => router.replace('/')} // Logout
        >
          <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          <Text className="ml-2 font-bold text-red-600">Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
