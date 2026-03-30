import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { H3, Body, BodySmall, Caption } from './ui/Typography';
import { Complex, ComplexStatus } from '../types';
import { colors, spacing, borderRadius } from '../theme';
import { formatPrice } from '../theme';

interface ComplexCardProps {
  complex: Complex;
  onPress: () => void;
}

function getStatusBadge(status: ComplexStatus): {
  label: string;
  variant: 'success' | 'warning' | 'info';
} {
  switch (status) {
    case 'selling':
      return { label: 'Продажа', variant: 'success' };
    case 'under_construction':
      return { label: 'Строится', variant: 'warning' };
    case 'completed':
      return { label: 'Сдан', variant: 'info' };
  }
}

export default function ComplexCard({ complex, onPress }: ComplexCardProps) {
  const statusBadge = getStatusBadge(complex.status);

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageLetter}>
          {complex.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <H3 style={styles.name}>{complex.name}</H3>
        </View>

        <BodySmall>
          {complex.address}, {complex.city}
        </BodySmall>

        <Caption>{complex.developer}</Caption>

        {complex.minPrice != null && (
          <Body color={colors.primary} style={styles.price}>
            от {formatPrice(complex.minPrice)} ₸
          </Body>
        )}

        <View style={styles.badgeRow}>
          <Badge
            label={`${complex.availableCount} доступно`}
            variant="info"
          />
          <View style={styles.badgeSpacer} />
          <Badge label={statusBadge.label} variant={statusBadge.variant} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  imagePlaceholder: {
    height: 140,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLetter: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
  },
  content: {
    gap: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
  },
  price: {
    marginTop: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  badgeSpacer: {
    width: spacing.sm,
  },
});
