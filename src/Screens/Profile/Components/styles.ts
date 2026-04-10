import { StyleSheet } from 'react-native';
import { colors } from '../../../Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  contentContainerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'SF Pro',
    fontWeight: '600', // semi-bold
    fontSize: 14,
    color: colors.textDark,
    letterSpacing: -0.4,
    lineHeight: 20,
  },
  details: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 12,
    color: colors.placeholder,
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  trailingContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-end', // Arrow right-aligned
  },
  chevron: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
