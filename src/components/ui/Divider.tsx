import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '../../theme';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ style }: DividerProps) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
});
