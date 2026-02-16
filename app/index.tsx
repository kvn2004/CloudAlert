import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "../src/context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const redirect = async () => {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/(auth)/login");
      }

      await SplashScreen.hideAsync();
    };

    redirect();
  }, [user, loading, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
