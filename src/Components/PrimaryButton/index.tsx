import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { CustomText } from '../CustomText';
import { styles } from './styles';
import { colors } from '../../Theme/colors';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  isLoading = false,
  style,
  disabled,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        (disabled || isLoading) && styles.disabled,
        style,
      ]}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <CustomText variant="bold" color={colors.white} style={styles.title}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};
