import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../../../Theme/colors';
import { typography } from '../../../../Theme/typography';
import { moderateScale } from '../../../../Utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 48 : StatusBar.currentHeight || 24,
    paddingHorizontal: moderateScale(16),
  },
  navBar: {
    height: moderateScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(8),
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: moderateScale(48),
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: colors.textDark,
  },
  navTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semibold,
    color: colors.textDark,
  },
  titleContainer: {
    paddingVertical: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  largeTitle: {
    fontSize: typography.sizes.heading1,
    fontWeight: typography.weights.bold,
    color: colors.textDark,
  },
  listContainer: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(40),
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: moderateScale(12),
  },
  infoLabelContainer: {
    flex: 1,
    paddingRight: moderateScale(16),
  },
  infoLabel: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.regular,
    color: colors.textGray,
    lineHeight: moderateScale(16),
  },
  infoValueContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  infoValue: {
    fontSize: typography.sizes.regular,
    fontWeight: typography.weights.semibold,
    color: colors.textDark,
    textAlign: 'right',
    lineHeight: moderateScale(20),
  },
  tagContainer: {
    backgroundColor: colors.tagBackgroundSuccess,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(4),
  },
  tagText: {
    fontSize: typography.sizes.regular,
    fontWeight: typography.weights.semibold,
    color: colors.tagTextSuccess,
  },
});
