import { StyleSheet } from 'react-native';
import { colors } from '../../../../Theme/colors';
import { moderateScale } from '../../../../Utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(16),
  },

  title: {
    marginBottom: moderateScale(4),
    paddingVertical: moderateScale(8),
  },
  form: {
    marginTop: moderateScale(12),
  },
  errorText: {
    marginTop: moderateScale(-12),
    marginBottom: moderateScale(16),
  },
  submitButton: {
    borderRadius: moderateScale(48),
    backgroundColor: colors.textGray3,
    color: colors.textGray2,
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: colors.textDark,
    marginBottom: moderateScale(12),
  },
});
