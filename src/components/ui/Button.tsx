import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { cn } from '../../utils/cn';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  textClassName?: string;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'default',
  isLoading = false,
  disabled = false,
  className,
  children,
  textClassName,
}: ButtonProps) => {
  const baseStyles = "flex-row items-center justify-center rounded-full";
  
  const variants = {
    primary: "bg-black shadow-lg",
    secondary: "bg-gray-100",
    outline: "border border-gray-200 bg-transparent",
    ghost: "bg-transparent",
  };

  const sizes = {
    default: "h-14 px-6",
    sm: "h-10 px-4",
    lg: "h-16 px-8",
    icon: "h-16 w-16",
  };

  const textBaseStyles = "font-semibold tracking-widest uppercase";
  const textVariants = {
    primary: "text-white",
    secondary: "text-black",
    outline: "text-black",
    ghost: "text-black",
  };

  const containerClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && "opacity-50",
    className
  );

  const textClasses = cn(
    textBaseStyles,
    textVariants[variant],
    size === 'lg' ? 'text-lg' : 'text-base',
    textClassName
  );

  return (
    <TouchableOpacity
      className={containerClasses}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? "#fff" : "#000"} />
      ) : (
        <>
          {title && <Text className={textClasses}>{title}</Text>}
          {children}
        </>
      )}
    </TouchableOpacity>
  );
};
