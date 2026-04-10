import { StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';
import { verticalScale, moderateScale } from '../../Utils/scaling';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    fontSize: moderateScale(16),
  },
});
