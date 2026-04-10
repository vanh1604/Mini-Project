import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Toast, {
  ToastConfig as ToastConfigType,
  ToastConfigParams,
} from 'react-native-toast-message';
import { colors } from '../../Theme/colors';
import { CustomText } from '../CustomText';
import { moderateScale } from '../../Utils/scaling';
import { typography } from '../../Theme/typography';

export const toastConfig: ToastConfigType = {
  success: ({ text1, text2, props }: ToastConfigParams<any>) => (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../Assets/Icons/toastIconSuccess.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        {text1 ? (
          <CustomText
            variant="bold"
            size={typography.sizes.regular}
            color={colors.white}
          >
            {text1}
          </CustomText>
        ) : null}
        {text2 ? (
          <CustomText
            variant="regular"
            size={typography.sizes.small}
            color={colors.white}
            style={styles.description}
          >
            {text2}
          </CustomText>
        ) : null}
      </View>
      {props?.buttonText && props?.buttonAction ? (
        <TouchableOpacity onPress={props.buttonAction} style={styles.button}>
          <CustomText
            variant="bold"
            size={typography.sizes.regular}
            color={colors.primary}
          >
            {props.buttonText}
          </CustomText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => Toast.hide()}>
          <Image
            source={require('../../Assets/Icons/deleteWhite.png')}
            style={styles.iconClose}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '90%',
    backgroundColor: colors.tagTextSuccess,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: moderateScale(12),
  },
  icon: {
    width: moderateScale(36),
    height: moderateScale(36),
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: moderateScale(4),
  },
  iconClose: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: colors.white,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(24),
    padding: moderateScale(8),
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
