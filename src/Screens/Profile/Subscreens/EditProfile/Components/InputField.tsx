import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Image,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../../../Theme/colors';
import { typography } from '../../../../../Theme/typography';
import { moderateScale } from '../../../../../Utils/scaling';
import { CustomText } from '../../../../../Components/CustomText';

interface InputFieldProps extends TextInputProps {
  label?: string;
  required?: boolean;
  onClear?: () => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  value,
  onClear,
  style,
  onFocus,
  onBlur,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={{ marginBottom: moderateScale(16) }}>
      <View
        style={[
          styles.inputContainer,
          isFocused && {
            backgroundColor: colors.unreadBackground,
            borderColor: colors.borderGray,
          },
          error ? { borderColor: colors.error } : null,
          style,
        ]}
      >
        <View style={styles.textInputGroup}>
          {label && (
            <View style={styles.labelContainer}>
              <CustomText style={styles.innerLabel}>{label}</CustomText>
              {required && (
                <CustomText color={colors.error} style={styles.asterisk}>
                  {' '}
                  *
                </CustomText>
              )}
            </View>
          )}
          <TextInput
            style={[styles.input, isFocused && { color: colors.black }]}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.black}
            {...rest}
          />
        </View>
        {value && onClear ? (
          <TouchableOpacity style={styles.iconButton} onPress={onClear}>
            <View style={styles.clearIconWrapper}>
              <Image
                source={require('../../../../../Assets/Icons/delete.png')}
                style={{
                  width: moderateScale(24),
                  height: moderateScale(24),
                  tintColor: isFocused ? colors.black : colors.textMuted,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <CustomText
          color={colors.error}
          size={12}
          style={{ marginTop: moderateScale(4) }}
        >
          {error}
        </CustomText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    height: moderateScale(56),
  },
  textInputGroup: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: moderateScale(4),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerLabel: {
    fontSize: typography.sizes.small,
    color: colors.textGray,
  },
  asterisk: {
    fontSize: typography.sizes.small,
  },
  input: {
    fontSize: typography.sizes.medium,
    color: colors.inputText,
    paddingVertical: 0,
    height: moderateScale(24),
  },
  iconButton: {
    padding: moderateScale(4),
    marginLeft: moderateScale(8),
  },
  clearIconWrapper: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
