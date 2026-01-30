import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { SocialButton } from "../../src/components/ui/SocialButton";
import { useAuth } from "../../src/context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, googleSignIn } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    // Replace the following client IDs with your own from Google Cloud Console / Firebase
    clientId:
      "171229360481-to42umi1a7tt0evvvtjjueeqe0enjj57.apps.googleusercontent.com",
    // iosClientId: "<YOUR_IOS_CLIENT_ID>",
    // androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
    // webClientId: "171229360481-to42umi1a7tt0evvvtjjueeqe0enjj57.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === "success") {
        const idToken = response.params?.id_token || response.params?.idToken;
        if (!idToken) {
          Alert.alert("Google Sign-In", "No id token returned from Google");
          return;
        }
        setIsLoading(true);
        try {
          await googleSignIn(idToken);
          router.replace("/dashboard");
        } catch (error: any) {
          Alert.alert("Google Sign-In Failed", error.message || String(error));
        } finally {
          setIsLoading(false);
        }
      }
    };
    handleResponse();
  }, [response]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="justify-center flex-1 px-8">
        {/* Header - Minimalist Typography */}
        <View className="mb-12">
          <Text className="text-4xl font-light tracking-tighter text-black">
            Cloud<Text className="font-bold">ALERT</Text>
          </Text>
          <Text className="mt-2 text-base text-gray-500">
            Sign in to your account
          </Text>
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          <Input
            leftIconName="mail-outline"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            leftIconName="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Action Button - High Contrast Black */}
        <Button
          title="Sign In"
          onPress={handleLogin}
          isLoading={isLoading}
          className="mt-10"
        />

        {/* Divider */}
        <View className="flex-row items-center my-10">
          <View className="flex-1 h-[1px] bg-gray-100" />
          <Text className="mx-4 text-xs font-bold text-gray-400">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-100" />
        </View>

        {/* Social Buttons - Minimalist Outlines */}
        <View className="flex-row justify-center space-x-6">
          <SocialButton
            iconName="logo-google"
            className="m-2"
            onPress={() => {
              // Launch Google auth prompt
              promptAsync();
            }}
            disabled={!request}
          />
          <SocialButton iconName="logo-apple" size={26} className="m-2" />
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-center mt-12">
          <Text className="text-gray-500">New here? </Text>
          <Button
            variant="ghost"
            title="Create Account"
            onPress={() => router.push("/(auth)/register")}
            className="h-auto min-h-0 p-0"
            textClassName="text-black font-bold underline text-base tracking-normal normal-case"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
