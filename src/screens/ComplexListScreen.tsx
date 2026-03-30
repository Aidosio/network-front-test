import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Complex, ComplexStatus } from '../types';
import { getComplexes, getCities } from '../api/complexApi';
import { useApi } from '../hooks/useApi';
import ComplexCard from '../components/ComplexCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { colors, spacing, borderRadius, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ComplexList'>;

const statuses: { label: string; value: ComplexStatus | undefined; color: string; bg: string }[] = [
  { label: 'Все', value: undefined, color: colors.primary, bg: colors.primaryLight },
  { label: 'Продажа', value: 'selling', color: colors.success, bg: colors.successLight },
  { label: 'Строится', value: 'under_construction', color: colors.warning, bg: colors.warningLight },
  { label: 'Сдан', value: 'completed', color: colors.textSecondary, bg: '#F1F5F9' },
];

export default function ComplexListScreen({ navigation }: Props) {
  const [city, setCity] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ComplexStatus | undefined>(undefined);

  const { data: citiesData } = useApi(() => getCities(), []);

  const cities = useMemo(() => {
    const base: { label: string; value: string | undefined }[] = [
      { label: 'Все города', value: undefined },
    ];
    if (citiesData) {
      for (const c of citiesData) {
        base.push({ label: c.name, value: c.name });
      }
    }
    return base;
  }, [citiesData]);

  const { data: complexes, loading, error, refetch } = useApi(
    () => getComplexes({ city, status }),
    [city, status],
  );

  const handleComplexPress = useCallback(
    (complex: Complex) => {
      navigation.navigate('ComplexDetail', {
        complexId: complex.id,
        complexName: complex.name,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Complex }) => (
      <ComplexCard complex={item} onPress={() => handleComplexPress(item)} />
    ),
    [handleComplexPress],
  );

  const keyExtractor = useCallback((item: Complex) => item.id, []);

  const hasFilters = city !== undefined || status !== undefined;

  const clearFilters = () => {
    setCity(undefined);
    setStatus(undefined);
  };

  if (loading && !complexes) {
    return <LoadingSpinner label="Загрузка комплексов..." />;
  }

  if (error && !complexes) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Повторить" onPress={refetch} variant="outline" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtersBlock}>
        {/* City selector - horizontally scrollable */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityRow}
        >
          {cities.map((c) => {
            const isActive = city === c.value;
            return (
              <TouchableOpacity
                key={c.label}
                style={[styles.cityCard, isActive && styles.cityCardActive]}
                onPress={() => setCity(c.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.cityText, isActive && styles.cityTextActive]}
                  numberOfLines={1}
                >
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Status selector - pill chips */}
        <View style={styles.statusRow}>
          {statuses.map((s) => {
            const isActive = status === s.value;
            return (
              <TouchableOpacity
                key={s.label}
                style={[
                  styles.statusChip,
                  { borderColor: isActive ? s.color : colors.border },
                  isActive && { backgroundColor: s.bg },
                ]}
                onPress={() => setStatus(s.value)}
                activeOpacity={0.7}
              >
                {isActive && (
                  <View style={[styles.statusDot, { backgroundColor: s.color }]} />
                )}
                <Text
                  style={[
                    styles.statusText,
                    isActive && { color: s.color, fontWeight: '600' },
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Active filter summary */}
        {hasFilters && (
          <TouchableOpacity style={styles.clearRow} onPress={clearFilters}>
            <Text style={styles.clearText}>Сбросить фильтры</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={complexes || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Ничего не найдено</Text>
            <Text style={styles.emptyText}>
              Попробуйте изменить параметры фильтра
            </Text>
            {hasFilters && (
              <Button
                title="Сбросить фильтры"
                onPress={clearFilters}
                variant="outline"
                style={{ marginTop: spacing.md }}
              />
            )}
          </View>
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

  /* ── Filters block ── */
  filtersBlock: {
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  /* City cards */
  cityRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cityCard: {
    minWidth: 100,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cityCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  cityText: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  cityTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },

  /* Status pills */
  statusRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },

  /* Clear filters */
  clearRow: {
    alignItems: 'center',
    paddingTop: spacing.sm + 2,
  },
  clearText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '500',
  },

  /* ── List ── */
  listContent: {
    padding: spacing.md,
  },

  /* ── States ── */
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
