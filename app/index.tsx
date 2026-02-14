import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import SplashScreen from "../src/screens/SplashScreen";
import * as SplashScreenExpo from "expo-splash-screen";

SplashScreenExpo.preventAutoHideAsync();

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (!loading) {
        // Keep splash visible for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

       

        if (user) {
          router.replace("/dashboard");
        } else {
          router.replace("/(auth)/login");
        }

        await SplashScreenExpo.hideAsync();
        setAppReady(true); // ✅ important
      }
    };

    prepareApp();
  }, [user, loading]);

  if (!appReady) {
    return <SplashScreen />;
  }

  return null;
};

export default App;
