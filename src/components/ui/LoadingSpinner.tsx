import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  label?: string;
}

export default function LoadingSpinner({
  size = 'large',
  color = colors.primary,
  label,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container} testID="loading-spinner">
      <ActivityIndicator size={size} color={color} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
