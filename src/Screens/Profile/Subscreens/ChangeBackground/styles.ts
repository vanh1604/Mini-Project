import { StyleSheet } from 'react-native';
import { colors } from '../../../../Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
