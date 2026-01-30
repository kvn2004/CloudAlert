import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { cn } from '../../utils/cn';

interface InputProps extends TextInputProps {
  label?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  error?: string;
}

export const Input = ({
  label,
  leftIconName,
  rightIcon,
  containerClassName,
  className,
  error,
  ...props
}: InputProps) => {
  return (
    <View className={cn("w-full", containerClassName)}>
      {label && (
        <Text className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
          {label}
        </Text>
      )}
      <View
        className={cn(
          "flex-row items-center border-b border-gray-200 py-3",
          error ? "border-red-500" : "focus:border-black"
        )}
      >
        {leftIconName && (
           <View className="mr-3">
             <Ionicons name={leftIconName} size={20} color="black" />
           </View>
        )}
        <TextInput
          className={cn("flex-1 text-black text-lg", className)}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {rightIcon}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};
