import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType,
  multiline = false,
  style,
}: InputProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multiline: {
    minHeight: 100,
    paddingTop: spacing.sm + 2,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
