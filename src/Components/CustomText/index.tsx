import React from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './styles';

export interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  variant?: 'regular' | 'bold' | 'medium';
  color?: string;
  size?: number;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'regular',
  color,
  size,
  align = 'left',
  style,
  ...rest
}) => {
  const variantStyle = styles[variant];

  return (
    <Text
      style={[
        styles.base,
        variantStyle,
        color ? { color } : undefined,
        size ? { fontSize: size } : undefined,
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
