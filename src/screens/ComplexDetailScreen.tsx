import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Apartment, ApartmentFilter } from '../types';
import { getComplexById, getComplexApartments } from '../api/complexApi';
import { useApi } from '../hooks/useApi';
import ApartmentCard from '../components/ApartmentCard';
import FilterBar from '../components/FilterBar';
import Badge from '../components/ui/Badge';
import Divider from '../components/ui/Divider';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { H2, Body, BodySmall, Caption } from '../components/ui/Typography';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ComplexDetail'>;

export default function ComplexDetailScreen({ route, navigation }: Props) {
  const { complexId } = route.params;
  const [filters, setFilters] = useState<ApartmentFilter>({});

  const {
    data: complex,
    loading: complexLoading,
    error: complexError,
    refetch: refetchComplex,
  } = useApi(() => getComplexById(complexId), [complexId]);

  const {
    data: apartments,
    loading: apartmentsLoading,
    error: apartmentsError,
  } = useApi(
    () => getComplexApartments(complexId, filters),
    [complexId, filters],
  );

  const filteredApartments = useMemo(() => {
    if (!apartments) return [];
    if (filters.rooms === undefined) return apartments;
    if (filters.rooms === 3) {
      return apartments.filter((a) => a.rooms >= 3);
    }
    return apartments.filter((a) => a.rooms === filters.rooms);
  }, [apartments, filters.rooms]);

  const handleApartmentPress = useCallback(
    (apartment: Apartment) => {
      navigation.navigate('ApartmentDetail', {
        apartmentId: apartment.id,
      });
    },
    [navigation],
  );

  const getStatusBadge = () => {
    if (!complex) return null;
    switch (complex.status) {
      case 'selling':
        return <Badge label="Продажа" variant="success" />;
      case 'under_construction':
        return <Badge label="Строится" variant="warning" />;
      case 'completed':
        return <Badge label="Сдан" variant="info" />;
    }
  };

  const renderHeader = () => {
    if (!complex) return null;

    return (
      <View style={styles.header}>
        {complex.description && (
          <Body style={styles.description}>{complex.description}</Body>
        )}

        <BodySmall>
          {complex.address}, {complex.city}
        </BodySmall>

        <View style={styles.infoRow}>
          <Caption>Застройщик: </Caption>
          <BodySmall>{complex.developer}</BodySmall>
        </View>

        {complex.completionDate && (
          <View style={styles.infoRow}>
            <Caption>Срок сдачи: </Caption>
            <BodySmall>
              {new Date(complex.completionDate).toLocaleDateString('ru-RU')}
            </BodySmall>
          </View>
        )}

        <View style={styles.statusRow}>{getStatusBadge()}</View>

        {complex.buildings.length > 0 && (
          <View style={styles.buildingsSection}>
            <Caption>
              Корпуса: {complex.buildings.map((b) => b.name).join(', ')}
            </Caption>
          </View>
        )}

        <Divider />

        <View style={styles.apartmentHeader}>
          <H2>Квартиры</H2>
          {apartments && (
            <BodySmall>{filteredApartments.length} шт.</BodySmall>
          )}
        </View>

        <FilterBar filters={filters} onFiltersChange={setFilters} />
      </View>
    );
  };

  if (complexLoading && !complex) {
    return <LoadingSpinner label="Загрузка..." />;
  }

  if (complexError && !complex) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{complexError}</Text>
        <Button title="Повторить" onPress={refetchComplex} variant="outline" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredApartments}
        renderItem={({ item }) => (
          <ApartmentCard
            apartment={item}
            onPress={() => handleApartmentPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          apartmentsLoading ? (
            <LoadingSpinner size="small" label="Загрузка квартир..." />
          ) : apartmentsError ? (
            <View style={styles.inlineError}>
              <Text style={styles.errorText}>{apartmentsError}</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Квартиры не найдены
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  statusRow: {
    marginTop: spacing.sm,
  },
  buildingsSection: {
    marginTop: spacing.sm,
  },
  apartmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  inlineError: {
    padding: spacing.md,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: spacing.xl * 2,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
