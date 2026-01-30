import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../../utils/cn';

interface SocialButtonProps extends TouchableOpacityProps {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
}

export const SocialButton = ({ iconName, size = 24, className, ...props }: SocialButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "w-16 h-16 rounded-full border border-gray-200 justify-center items-center bg-white shadow-sm",
        className
      )}
      activeOpacity={0.7}
      {...props}
    >
      <Ionicons name={iconName} size={size} color="black" />
    </TouchableOpacity>
  );
};
