import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Image,
} from 'react-native';
import { colors } from '../../../../../Theme/colors';
import { styles } from './styles';
import { CustomText } from '../../../../../Components/CustomText';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  onClear: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  required,
  value,
  onClear,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && {
          backgroundColor: colors.unreadBackground,
          borderColor: colors.borderGray,
        },
      ]}
    >
      <View style={styles.textInputGroup}>
        {label && value ? (
          <View style={styles.labelContainer}>
            <CustomText style={styles.innerLabel}>{label}</CustomText>
            {required && (
              <CustomText color={colors.error} style={styles.asterisk}>
                {' '}
                *
              </CustomText>
            )}
          </View>
        ) : null}
        <TextInput
          style={[styles.input, isFocused && { color: colors.black }]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isSecure}
          placeholderTextColor={isFocused ? colors.black : colors.placeholder}
          {...rest}
        />
      </View>
      {value ? (
        <TouchableOpacity style={styles.iconButton} onPress={onClear}>
          <View style={styles.clearIconWrapper}>
            <Image
              source={require('../../../../../Assets/Icons/delete.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: isFocused ? colors.black : colors.textMuted,
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ) : null}
      {value ? <View style={styles.divider} /> : null}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setIsSecure(!isSecure)}
      >
        <Image
          source={require('../../../../../Assets/Icons/eye.png')}
          style={[
            styles.eyeIcon,
            { tintColor: isFocused ? colors.black : colors.textMuted },
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
