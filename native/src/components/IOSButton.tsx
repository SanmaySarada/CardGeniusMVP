import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, shadows } from '../theme/colors';
import { typography, borderRadius } from '../theme/typography';

interface IOSButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const IOSButton: React.FC<IOSButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
  onPress,
  children,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(fullWidth && { width: '100%' }),
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: colors.light.primary,
        ...shadows.medium,
      };
    } else if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: colors.light.secondary,
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.light.border,
      };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.text;

    if (variant === 'primary') {
      return {
        ...baseStyle,
        color: colors.light.primaryForeground,
      };
    } else if (variant === 'secondary') {
      return {
        ...baseStyle,
        color: colors.light.secondaryForeground,
      };
    } else {
      return {
        ...baseStyle,
        color: colors.light.foreground,
      };
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.light.primary} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.headline,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

