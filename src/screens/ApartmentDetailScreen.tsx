import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getApartmentById } from '../api/apartmentApi';
import { useApi } from '../hooks/useApi';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { H1, H2, H3, Body, BodySmall, Caption } from '../components/ui/Typography';
import { colors, spacing, typography } from '../theme';
import { formatPrice, formatRooms } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ApartmentDetail'>;

function getStatusBadge(status: string) {
  switch (status) {
    case 'available':
      return <Badge label="Доступна" variant="success" />;
    case 'reserved':
      return <Badge label="Забронирована" variant="warning" />;
    case 'sold':
      return <Badge label="Продана" variant="error" />;
    default:
      return null;
  }
}

export default function ApartmentDetailScreen({ route, navigation }: Props) {
  const { apartmentId } = route.params;

  const { data: apartment, loading, error, refetch } = useApi(
    () => getApartmentById(apartmentId),
    [apartmentId],
  );

  const handleBooking = () => {
    if (!apartment) return;
    navigation.navigate('Booking', {
      apartmentId: apartment.id,
      apartmentNumber: apartment.number,
      price: apartment.price,
    });
  };

  if (loading) {
    return <LoadingSpinner label="Загрузка..." />;
  }

  if (error || !apartment) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Квартира не найдена'}
        </Text>
        <Button title="Повторить" onPress={refetch} variant="outline" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {apartment.building?.complex && (
          <Card style={styles.complexInfo}>
            <Caption>Жилой комплекс</Caption>
            <H3>{apartment.building.complex.name}</H3>
            <BodySmall>{apartment.building.complex.address}</BodySmall>
          </Card>
        )}

        <Card style={styles.mainCard}>
          <View style={styles.titleRow}>
            <H2>{formatRooms(apartment.rooms)} квартира</H2>
            {getStatusBadge(apartment.status)}
          </View>

          <Divider />

          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Caption>Номер</Caption>
              <Body>{apartment.number}</Body>
            </View>
            <View style={styles.detailItem}>
              <Caption>Корпус</Caption>
              <Body>{apartment.building?.name}</Body>
            </View>
            <View style={styles.detailItem}>
              <Caption>Этаж</Caption>
              <Body>{apartment.floor}</Body>
            </View>
            <View style={styles.detailItem}>
              <Caption>Комнаты</Caption>
              <Body>{apartment.rooms === 0 ? 'Студия' : apartment.rooms}</Body>
            </View>
            <View style={styles.detailItem}>
              <Caption>Площадь</Caption>
              <Body>{apartment.area} м²</Body>
            </View>
            <View style={styles.detailItem}>
              <Caption>Статус корпуса</Caption>
              <Body>
                {apartment.building?.status === 'completed'
                  ? 'Сдан'
                  : 'Строится'}
              </Body>
            </View>
          </View>

          {apartment.layout && (
            <>
              <Divider />
              <Caption>Планировка</Caption>
              <Body>{apartment.layout}</Body>
            </>
          )}

          {apartment.description && (
            <>
              <Divider />
              <Caption>Описание</Caption>
              <Body style={styles.description}>{apartment.description}</Body>
            </>
          )}

          <Divider />

          <Caption>Стоимость</Caption>
          <H1 color={colors.primary} style={styles.price}>
            {formatPrice(apartment.price)} ₸
          </H1>
        </Card>
      </ScrollView>

      {apartment.status === 'available' && (
        <View style={styles.bottomBar}>
          <Button title="Забронировать" onPress={handleBooking} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 3,
  },
  complexInfo: {
    marginBottom: spacing.md,
  },
  mainCard: {
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: spacing.md,
  },
  description: {
    marginTop: spacing.xs,
  },
  price: {
    marginTop: spacing.xs,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
