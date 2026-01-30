import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { useAuth } from '../../src/context/AuthContext';
import { SocialButton } from '@/src/components/ui/SocialButton';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await signUp(email, password);
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/dashboard');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Back Button */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="items-center justify-center w-10 h-10 rounded-full bg-gray-50"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="justify-center flex-1 px-8">
        {/* Title Section */}
        <View className="mb-10">
          <Text className="text-4xl font-light tracking-tighter text-black">
            Join <Text className="font-bold">CloudALERT</Text>
          </Text>
          <Text className="mt-2 text-base italic text-gray-500">
            Start planning without weather concerns.
          </Text>
        </View>

        {/* Input Form */}
        <View className="space-y-6">
          <Input 
            label="Email Address"
            placeholder="hello@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            rightIcon={email.includes('@') ? <Ionicons name="checkmark-circle" size={18} color="black" /> : undefined}
          />

          <Input 
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Input 
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Action Button */}
        <Button 
          className="h-16 mt-12 rounded-2xl"
          onPress={handleRegister}
          isLoading={isLoading}
        >
          <View className="flex-row items-center">
            <Text className="mr-2 text-lg font-bold tracking-widest text-white uppercase">
              Create Account
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </View>
        </Button>
        
          {/* Social Buttons - Minimalist Outlines */}
                <View className="flex-row justify-center my-6 space-x-6">
                  <SocialButton iconName="logo-google" className='m-2'/>
                  <SocialButton iconName="logo-apple" size={26} className='m-2' />
                </View>

        {/* Footer */}
        <View className="flex-row items-center justify-center mt-10">
          <Text className="text-gray-400">Already a member? </Text>
          <Button 
             variant="ghost" 
             title="Sign In" 
             onPress={() => router.back()}
             className="h-auto min-h-0 p-0"
             textClassName="text-black font-bold border-b border-black text-base tracking-normal normal-case"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}