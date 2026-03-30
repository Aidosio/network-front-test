import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { colors, typography as typographyTheme } from '../../theme';

interface TypographyProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
}

export function H1({ children, style, color }: TypographyProps) {
  return (
    <Text style={[typographyTheme.h1, { color: color || colors.text }, style]}>
      {children}
    </Text>
  );
}

export function H2({ children, style, color }: TypographyProps) {
  return (
    <Text style={[typographyTheme.h2, { color: color || colors.text }, style]}>
      {children}
    </Text>
  );
}

export function H3({ children, style, color }: TypographyProps) {
  return (
    <Text style={[typographyTheme.h3, { color: color || colors.text }, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, style, color }: TypographyProps) {
  return (
    <Text
      style={[typographyTheme.body, { color: color || colors.text }, style]}
    >
      {children}
    </Text>
  );
}

export function BodySmall({ children, style, color }: TypographyProps) {
  return (
    <Text
      style={[
        typographyTheme.bodySmall,
        { color: color || colors.textSecondary },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Caption({ children, style, color }: TypographyProps) {
  return (
    <Text
      style={[
        typographyTheme.caption,
        { color: color || colors.textLight },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
