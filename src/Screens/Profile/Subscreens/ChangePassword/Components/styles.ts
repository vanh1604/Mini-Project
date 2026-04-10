import { StyleSheet } from 'react-native';
import { colors } from '../../../../../Theme/colors';
import { typography } from '../../../../../Theme/typography';
import { moderateScale } from '../../../../../Utils/scaling';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    height: moderateScale(64),
    marginBottom: moderateScale(16),
  },
  textInputGroup: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(2),
  },
  innerLabel: {
    fontSize: moderateScale(12),
    color: colors.primary,
    fontWeight: '500',
  },
  asterisk: {
    fontSize: moderateScale(12),
  },
  input: {
    fontSize: typography.sizes.regular,
    color: colors.inputText,
    paddingVertical: 0,
    height: moderateScale(24),
  },
  divider: {
    width: 1,
    height: moderateScale(24),
    backgroundColor: colors.border,
    marginHorizontal: moderateScale(8),
  },
  iconButton: {
    padding: moderateScale(4),
  },
  criteriaWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  criteriaHeading: {
    marginBottom: moderateScale(12),
  },
  criterionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  criterionText: {
    marginLeft: moderateScale(8),
  },
  eyeIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  clearIconWrapper: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  criterionIconWrapper: {
    width: moderateScale(16),
    height: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  criterionIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
  },
});
