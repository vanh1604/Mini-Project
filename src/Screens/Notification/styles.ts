import { StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  subhead: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.placeholder,
    lineHeight: 20,
  },
  heading: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 48,
  },
  description: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});