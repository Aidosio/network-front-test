import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { H3, Body, BodySmall, Caption } from './ui/Typography';
import { Apartment, ApartmentStatus } from '../types';
import { colors, spacing } from '../theme';
import { formatPrice, formatRooms } from '../theme';

interface ApartmentCardProps {
  apartment: Apartment;
  onPress: () => void;
}

function getStatusBadge(status: ApartmentStatus): {
  label: string;
  variant: 'success' | 'warning' | 'error';
} {
  switch (status) {
    case 'available':
      return { label: 'Доступна', variant: 'success' };
    case 'reserved':
      return { label: 'Забронирована', variant: 'warning' };
    case 'sold':
      return { label: 'Продана', variant: 'error' };
  }
}

export default function ApartmentCard({
  apartment,
  onPress,
}: ApartmentCardProps) {
  const statusBadge = getStatusBadge(apartment.status);
  const isAvailable = apartment.status === 'available';

  return (
    <Card
      style={[styles.card, !isAvailable && styles.cardDisabled]}
      onPress={isAvailable ? onPress : undefined}
    >
      <View style={styles.topRow}>
        <Body style={styles.roomsText}>
          {formatRooms(apartment.rooms)}
        </Body>
        <BodySmall>№ {apartment.number}</BodySmall>
      </View>

      <View style={styles.detailRow}>
        <BodySmall>{apartment.floor} этаж</BodySmall>
        <BodySmall style={styles.separator}>|</BodySmall>
        <BodySmall>{apartment.area} м²</BodySmall>
      </View>

      <H3 color={colors.primary} style={styles.price}>
        {formatPrice(apartment.price)} ₸
      </H3>

      <View style={styles.bottomRow}>
        <Badge label={statusBadge.label} variant={statusBadge.variant} />
        <Caption style={styles.buildingName}>
          {apartment.buildingName}
        </Caption>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  roomsText: {
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  separator: {
    marginHorizontal: spacing.sm,
  },
  price: {
    marginBottom: spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buildingName: {
    flex: 1,
    textAlign: 'right',
  },
});
