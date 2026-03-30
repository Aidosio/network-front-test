import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'outline' && styles.outlineText,
  ];

  const spinnerColor = variant === 'outline' ? colors.primary : colors.surface;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      testID="button"
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
          testID="button-loading"
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.body,
    fontWeight: '600',
    color: colors.surface,
  },
  outlineText: {
    color: colors.primary,
  },
});
