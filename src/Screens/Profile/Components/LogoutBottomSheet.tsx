import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { CustomText } from '../../../Components/CustomText';
import { PrimaryButton } from '../../../Components/PrimaryButton';
import { colors } from '../../../Theme/colors';
import { moderateScale, verticalScale } from '../../../Utils/scaling';

interface LogoutBottomSheetProps {
  onLogout: () => void;
  onCancel: () => void;
}

export const LogoutBottomSheet = forwardRef<
  BottomSheetModal,
  LogoutBottomSheetProps
>(({ onLogout, onCancel }, ref) => {
  const snapPoints = useMemo(() => [460], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../Assets/Images/logout.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <CustomText
            variant="bold"
            size={24}
            color={colors.textDark}
            style={styles.title}
            align="center"
          >
            Xác nhận đăng xuất
          </CustomText>
          <CustomText
            variant="regular"
            size={14}
            color={colors.textDark}
            align="center"
            style={styles.message}
          >
            Bạn có chắc chắn muốn đăng xuất không?
          </CustomText>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Đăng xuất"
            onPress={onLogout}
            style={styles.logoutButton}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <CustomText
              variant="bold"
              size={16}
              color={colors.primary}
              align="center"
            >
              Hủy bỏ
            </CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
  },
  indicator: {
    backgroundColor: '#E0E0E0',
    width: moderateScale(40),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  imageContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(24),
    width: moderateScale(192),
    height: moderateScale(192),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginBottom: verticalScale(32),
    width: '100%',
  },
  title: {
    marginBottom: moderateScale(8),
  },
  message: {
    lineHeight: moderateScale(20),
  },
  buttonContainer: {
    width: '100%',
  },
  logoutButton: {
    backgroundColor: colors.primary,
    marginBottom: moderateScale(16),
  },
  cancelButton: {
    height: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
