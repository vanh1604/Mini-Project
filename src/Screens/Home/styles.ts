import { StyleSheet } from 'react-native';
import { scale } from '../../Utils/scaling';
import { colors } from '../../Theme/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    height: scale(290),
    width: scale(375),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  action: {
    color: colors.primary,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  informationContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginTop: scale(-48),
    marginHorizontal: scale(16),
    backgroundColor: colors.white,
    borderRadius: scale(12),
  },
  information: {
    marginVertical: scale(16),
    marginHorizontal: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  informationText: {
    flex: 1,
  },
  informationTextTitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  informationTextName: {
    fontWeight: '600',
    fontSize: 14,
  },
  informationTextCode: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  extraInformation: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    flexDirection: 'column',
    gap: scale(12),
    overflow: 'hidden',
  },

  extraInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(4),
  },
  extraInfoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  extraInfoValue: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
    width: scale(180),
    textAlign: 'right',
  },
  section: {
    marginTop: scale(16),
  },
});
