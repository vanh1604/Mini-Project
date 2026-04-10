import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { CustomText } from '../../../../Components/CustomText';
import { PrimaryButton } from '../../../../Components/PrimaryButton';
import { InputField } from './Components/InputField';
import { editProfileSchema, EditProfileFormData } from './schema';
import { styles } from './styles';
import { colors } from '../../../../Theme/colors';
import { showSuccessToast } from '../../../../Utils/toast';

export const EditProfileScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      dob: '',
      phone: '',
      email: '',
      address: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: EditProfileFormData) => {
    console.log('Edit Profile Data:', data);
    showSuccessToast(
      'Thay đổi thông tin thành công',
      'Vui lòng kiểm tra lại thông tin',
      'Xem',
      () => {
        navigation.goBack();
      },
    );
    // TODO: Call API to update profile
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerSection}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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
              Thay đổi thông tin tài khoản
            </CustomText>
            <CustomText
              variant="regular"
              size={14}
              color={colors.textDark}
              style={styles.description}
            >
              Thông tin cá nhân cần phải chính xác với thông tin được lưu trữ
              tại Cơ sở dữ liệu quốc gia
            </CustomText>
          </View>

          {/* Form Fields */}
          <View>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Họ"
                  required
                  placeholder="NGUYỄN"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('lastName', '', { shouldValidate: true })
                  }
                  error={errors.lastName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Chữ đệm và tên"
                  required
                  placeholder="THỊ KHÁNH DƯƠNG"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('firstName', '', { shouldValidate: true })
                  }
                  error={errors.firstName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Ngày sinh"
                  required
                  placeholder="26/12/2000"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() => setValue('dob', '', { shouldValidate: true })}
                  error={errors.dob?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Số điện thoại"
                  required
                  placeholder="0912678900"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('phone', '', { shouldValidate: true })
                  }
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Email"
                  required
                  placeholder="ntkd02@vnpost.vn"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('email', '', { shouldValidate: true })
                  }
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Địa chỉ liên hệ"
                  required
                  placeholder="Số 5, Phạm Hùng, P. Mỹ Đình, Q. Nam Từ Liêm, Hà Nội"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onClear={() =>
                    setValue('address', '', { shouldValidate: true })
                  }
                  error={errors.address?.message}
                />
              )}
            />
          </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
