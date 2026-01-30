import { BlurView } from "expo-blur";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <BlurView intensity={70} tint="light" style={styles.glassCard}>
        <Text style={styles.titleText}>CloudAlert</Text>
        <Text style={styles.tagText}>
          Plan your day without weather worries
        </Text>

        {/* Loading Animation */}
        <Text className="text-blue-500 font-bold mb-4">NativeWind Configured!</Text>
        <ActivityIndicator
          size="small"
          color="#0F172A"
          style={{ marginTop: 20 }}
        />
      </BlurView>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  glassCard: ViewStyle;
  titleText: TextStyle;
  tagText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2F7",
  },

  glassCard: {
    width: "85%",
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  titleText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    textAlign: "center",
  },
});

export default SplashScreen;
