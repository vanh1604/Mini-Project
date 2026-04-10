import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

export type FilterType = 'all' | 'unread';

interface ChipData {
  id: FilterType;
  label: string;
}

const CHIPS: ChipData[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'unread', label: 'Chưa đọc' },
];

interface FilterChipsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterChips = ({
  activeFilter,
  onFilterChange,
}: FilterChipsProps) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {CHIPS.map(chip => {
          const isActive = activeFilter === chip.id;
          return (
            <TouchableOpacity
              key={chip.id}
              style={[
                styles.chip,
                isActive ? styles.chipActive : styles.chipInactive,
              ]}
              onPress={() => onFilterChange(chip.id)}
            >
              <View style={styles.chipContent}>
                <Text
                  style={[
                    styles.chipLabel,
                    isActive
                      ? styles.chipLabelActive
                      : styles.chipLabelInactive,
                  ]}
                >
                  {chip.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
