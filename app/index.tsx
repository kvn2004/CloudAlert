import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useAuth } from "../src/context/AuthContext";
import SplashScreen from "../src/screens/SplashScreen";

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Use replace to avoid going back to splash
        router.replace("/dashboard");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [user, loading]);

  // While loading or deciding, show Splash
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SplashScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
});

export default App;
