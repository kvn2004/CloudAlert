import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, ActivityIndicator, StyleSheet, Text, View, Easing, Image } from "react-native";

const SplashScreen: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const cloudAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulsing animation for title
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Cloud moving animation
    Animated.loop(
      Animated.timing(cloudAnim, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const cloudTranslate = cloudAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 400], // move clouds horizontally
  });

  return (
    <View style={styles.container}>
      {/* Background animated clouds */}
      <Animated.Image
        source={require("../../assets/clouds.png")}
        style={[styles.clouds, { transform: [{ translateX: cloudTranslate }] }]}
        resizeMode="contain"
      />

      <BlurView intensity={80} tint="light" style={styles.glassCard}>
        {/* Pulsing Title */}
        <Animated.Text style={[styles.titleText, { transform: [{ scale: pulseAnim }] }]}>
          CloudAlert
        </Animated.Text>

        <Text style={styles.tagText}>Plan your day without weather worries</Text>

        {/* Animated Bell Icon */}
        <Image
          source={require("../../assets/bell.png")}
          style={styles.bellIcon}
          resizeMode="contain"
        />

        {/* Loading Indicator */}
        <ActivityIndicator size="large" color="#0F172A" style={{ marginTop: 20 }} />
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  clouds: {
    position: "absolute",
    top: 50,
    width: 600,
    height: 200,
    opacity: 0.2,
  },
  glassCard: {
    width: "85%",
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  titleText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: "#ffffff60",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  bellIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SplashScreen;
