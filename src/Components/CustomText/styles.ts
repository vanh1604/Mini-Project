import { StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';
import { typography } from '../../Theme/typography';

export const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
    fontSize: typography.sizes.regular,
  },
  regular: {
    fontWeight: typography.weights.regular,
  },
  medium: {
    fontWeight: typography.weights.medium,
  },
  bold: {
    fontWeight: typography.weights.bold,
  },
});
