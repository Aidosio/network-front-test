import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { ApartmentFilter } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';

interface FilterBarProps {
  filters: ApartmentFilter;
  onFiltersChange: (filters: ApartmentFilter) => void;
}

interface FilterChip {
  label: string;
  value: number | undefined;
}

const roomOptions: FilterChip[] = [
  { label: 'Все', value: undefined },
  { label: 'Студия', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3+', value: 3 },
];

export default function FilterBar({
  filters,
  onFiltersChange,
}: FilterBarProps) {
  const handleRoomSelect = (rooms: number | undefined) => {
    onFiltersChange({ ...filters, rooms });
  };

  const isActiveRoom = (value: number | undefined) => {
    return filters.rooms === value;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {roomOptions.map((option) => (
          <TouchableOpacity
            key={option.label}
            style={[
              styles.chip,
              isActiveRoom(option.value) && styles.chipActive,
            ]}
            onPress={() => handleRoomSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                isActiveRoom(option.value) && styles.chipTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },
});
