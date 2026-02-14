import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useAuth } from "../src/context/AuthContext";
import * as SplashScreenExpo from "expo-splash-screen";

SplashScreenExpo.preventAutoHideAsync();

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const prepareApp = async () => {
      if (!loading) {
        // Show splash for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("User:", user);

        if (user) {
          router.replace("/dashboard");
        } else {
          router.replace("/(auth)/login");
        }

        // Hide splash
        await SplashScreenExpo.hideAsync();
      }
    };

    prepareApp();
  }, [user, loading]);

  return null; // Important: don't render custom splash
};

export default App;
