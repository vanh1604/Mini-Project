import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomText } from '../../../../Components/CustomText';
import { PrimaryButton } from '../../../../Components/PrimaryButton';
import { PasswordInput } from './Components/PasswordInput';
import { PasswordCriteria } from './Components/PasswordCriteria';
import {
  changePasswordSchema,
  ChangePasswordFormData,
} from '../../../../Utils/validators';
import { styles } from './styles';
import { colors } from '../../../../Theme/colors';
import { Icon } from '@ant-design/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { showSuccessToast } from '../../../../Utils/toast';

export const ChangePasswordScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  const newPasswordValue = watch('newPassword');

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log('Change Password Data:', data);
    showSuccessToast('Thay đổi mật khẩu thành công');
    // TODO: Integrate Change Password API logic here
  };
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require('../../../../Assets/Icons/arrowLeft.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <CustomText
            variant="bold"
            size={28}
            color={colors.textDark}
            style={styles.title}
          >
            Thay đổi mật khẩu
          </CustomText>
          <CustomText variant="regular" size={14} color={colors.black}>
            Vui lòng kiểm tra kỹ mật khẩu trước khi thay đổi
          </CustomText>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  label="Mật khẩu hiện tại"
                  required
                  placeholder="Nhập mật khẩu hiện tại"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('oldPassword', '', { shouldValidate: true })
                  }
                />
                {errors.oldPassword && (
                  <CustomText
                    style={styles.errorText}
                    color={colors.error}
                    size={12}
                  >
                    {errors.oldPassword.message}
                  </CustomText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  label="Mật khẩu mới"
                  required
                  placeholder="Nhập mật khẩu mới"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('newPassword', '', { shouldValidate: true })
                  }
                />
                {errors.newPassword && (
                  <CustomText
                    style={styles.errorText}
                    color={colors.error}
                    size={12}
                  >
                    {errors.newPassword.message}
                  </CustomText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  label="Nhập lại mật khẩu mới"
                  required
                  placeholder="Nhập lại mật khẩu mới"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('confirmNewPassword', '', {
                      shouldValidate: true,
                    })
                  }
                />
                {errors.confirmNewPassword && (
                  <CustomText
                    style={styles.errorText}
                    color={colors.error}
                    size={12}
                  >
                    {errors.confirmNewPassword.message}
                  </CustomText>
                )}
              </View>
            )}
          />
        </View>

        <PasswordCriteria password={newPasswordValue} />

        <PrimaryButton
          title="Xác nhận"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.submitButton,
            isValid ? { backgroundColor: colors.primary } : {},
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
