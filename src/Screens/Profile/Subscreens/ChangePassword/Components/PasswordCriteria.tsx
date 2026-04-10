import React from 'react';
import { Image, View } from 'react-native';
import { CustomText } from '../../../../../Components/CustomText';
import { colors } from '../../../../../Theme/colors';
import { styles } from './styles';

interface PasswordCriteriaProps {
  password?: string;
}

export const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
  password = '',
}) => {
  const criteria = [
    {
      label: 'Có khoảng 8 đến 20 ký tự',
      isValid: password.length >= 8 && password.length <= 20,
    },
    {
      label: 'Bao gồm số, chữ viết hoa, chữ viết thường',
      isValid:
        /[0-9]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password),
    },
    {
      label: 'Bao gồm ít nhất một ký tự đặc biệt !@#%().',
      isValid: /[!@#%().]/.test(password),
    },
  ];

  return (
    <View style={styles.criteriaWrapper}>
      <CustomText
        variant="bold"
        size={14}
        style={styles.criteriaHeading}
        color={colors.black}
      >
        Mật khẩu của bạn cần phải:
      </CustomText>
      {criteria.map((item, index) => (
        <View key={index} style={styles.criterionRow}>
          <View style={styles.criterionIconWrapper}>
            <Image
              source={require('../../../../../Assets/Icons/tick-circle.png')}
              style={[
                styles.criterionIcon,
                {
                  tintColor: item.isValid ? colors.success : colors.textMuted,
                },
              ]}
              resizeMode="contain"
            />
          </View>
          <CustomText
            style={styles.criterionText}
            color={colors.black}
            size={12}
          >
            {item.label}
          </CustomText>
        </View>
      ))}
    </View>
  );
};
