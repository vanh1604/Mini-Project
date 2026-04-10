import { StyleSheet } from 'react-native';
import { colors } from '../../../../Theme/colors';
import { moderateScale } from '../../../../Utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(32),
  },
  backButton: {
    marginBottom: moderateScale(12),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: colors.textDark,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textDark,
  },
  headerSection: {
    marginBottom: moderateScale(12),
  },
  subhead: {
    marginBottom: moderateScale(4),
  },
  title: {
    marginBottom: moderateScale(8),
  },
  description: {
    lineHeight: moderateScale(20),
  },

  submitButton: {
    borderRadius: moderateScale(48),
    backgroundColor: colors.textGray3,
    marginTop: moderateScale(16),
  },
});
