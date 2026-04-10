import { StyleSheet } from 'react-native';
import { colors } from '../../../Theme/colors';

export const styles = StyleSheet.create({
  // FilterChips
  chipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: colors.unreadBackground,
    borderColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: colors.transparent,
    borderColor: colors.inputBorder,
  },
  chipContent: {
    alignItems: 'center',
  },
  chipLabel: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  chipLabelActive: {
    color: colors.primary,
  },
  chipLabelInactive: {
    color: colors.textDark,
  },
  chipSupportTextActive: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.textSuccessDark,
    lineHeight: 16,
  },
  chipSupportTextInactive: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.badgeRed,
    borderWidth: 2,
    borderColor: colors.white,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },

  // SectionHeader
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    lineHeight: 24,
  },
  sectionSubtitle: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.placeholder,
    lineHeight: 16,
  },

  // NotificationRow
  rowContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  rowUnread: {
    backgroundColor: colors.unreadBackground,
  },
  rowRead: {
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: colors.placeholder,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    lineHeight: 20,
  },
  rowDetails: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.placeholder,
    lineHeight: 16,
    marginTop: 4,
  },
  rowTime: {
    fontFamily: 'System',
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
    lineHeight: 12,
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  actionButtonText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
});
