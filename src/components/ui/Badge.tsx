import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';

interface BadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info';
}

const variantColors = {
  success: { bg: colors.successLight, text: colors.success },
  warning: { bg: colors.warningLight, text: colors.warning },
  error: { bg: colors.errorLight, text: colors.error },
  info: { bg: colors.primaryLight, text: colors.primary },
};

export default function Badge({ label, variant }: BadgeProps) {
  const colorSet = variantColors[variant];

  return (
    <View style={[styles.badge, { backgroundColor: colorSet.bg }]}>
      <Text style={[styles.text, { color: colorSet.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
});
