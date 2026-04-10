import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    </View>
  );
};
