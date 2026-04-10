import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../Theme/colors';
import { scale, verticalScale, moderateScale } from '../../Utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: scale(16),
  },
  button: {
    position: 'relative',
    right: 0,
    top: 0,
  },
  buttonText: {
    color: colors.primary,
    fontSize: scale(16),
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(12),
    paddingBottom: verticalScale(16),
  },
  progressContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: scale(12),
  },
  progressBar: {
    height: verticalScale(4),
    flex: 1,
    borderRadius: moderateScale(2),
    marginHorizontal: scale(2),
  },
  activeProgress: {
    backgroundColor: colors.primary,
  },
  inactiveProgress: {
    backgroundColor: '#FDEFC7',
  },
  slide: {
    width: scale(375),
    zIndex: 10,
    flex: 1,
  },
  imageContainer: {
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(375) * 0.8,
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(24),
  },
  titleLine1: {
    lineHeight: verticalScale(36),
    color: '#000000',
  },
  titleLine2: {
    lineHeight: verticalScale(36),
  },
  subtitle: {
    marginTop: verticalScale(12),
    color: colors.textSecondary,
    lineHeight: verticalScale(24),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(34),
  },
  childUnionRight: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    zIndex: -1,
  },
  childUnionLeft: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
