import { moderateScale } from '../Utils/scaling';

export const typography = {
  sizes: {
    tiny: moderateScale(10),
    small: moderateScale(12),
    regular: moderateScale(14),
    medium: moderateScale(16),
    large: moderateScale(18),
    xlarge: moderateScale(24),
    xxlarge: moderateScale(32),
    heading1: moderateScale(28),
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
