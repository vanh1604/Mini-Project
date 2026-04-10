import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AuthStackParamList } from '../../Navigation/stackNavigator';
import { RootStackParamList } from '../../Navigation/appNavigator';
import { CustomText } from '../../Components/CustomText';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { colors } from '../../Theme/colors';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, 'Login'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('ntkd02@vnpost.vn');
  const [password, setPassword] = useState('••••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Background Gradient */}
      <View style={styles.backgroundContainer}>
        <Svg height="100%" width="100%" style={styles.backgroundContainer}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop
                offset="0"
                stopColor={colors.gradientStart}
                stopOpacity={1}
              />
              <Stop
                offset="0.75"
                stopColor={colors.gradientEnd}
                stopOpacity={1}
              />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>

      {/* Decorative Union Pattern */}
      <View style={styles.unionContainer}>
        <Image
          source={require('../../Assets/Images/Union.png')}
          style={styles.unionImage}
          resizeMode="cover"
        />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Image
                source={require('../../Assets/Images/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.content}>
              <View style={styles.greetings}>
                <CustomText
                  variant="regular"
                  size={14}
                  style={styles.welcomeText}
                >
                  Chúc một ngày tốt lành,
                </CustomText>
                <CustomText variant="bold" size={20} style={styles.nameText}>
                  NGUYỄN THỊ KHÁNH DƯƠNG
                </CustomText>
              </View>
            </View>
            <View style={styles.bottomSheet}>
              <CustomText variant="bold" size={18} style={styles.sheetTitle}>
                Đăng nhập để bắt đầu
              </CustomText>

              <View style={styles.inputGroup}>
                <CustomText style={styles.inputLabel}>Tên đăng nhập</CustomText>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor={colors.placeholder}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <CustomText style={styles.inputLabel}>Mật khẩu</CustomText>
                <View style={[styles.inputContainer, styles.passwordContainer]}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Mật khẩu"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      source={require('../../Assets/Icons/eye.png')} // TODO: Replace with eye icon
                      style={styles.eyeIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.rememberContainer}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.8}
              >
                <View
                  style={[styles.checkbox, rememberMe && styles.checkboxActive]}
                >
                  {rememberMe && (
                    <CustomText color={colors.white} size={12}>
                      ✓
                    </CustomText>
                  )}
                </View>
                <CustomText size={16} style={styles.rememberText}>
                  Nhớ mật khẩu
                </CustomText>
              </TouchableOpacity>

              <PrimaryButton
                title="Đăng nhập"
                onPress={() => navigation.navigate('Main')}
                style={styles.loginButton}
              />

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => {}}
              >
                <CustomText
                  variant="bold"
                  size={16}
                  style={styles.forgotPasswordText}
                >
                  Quên mật khẩu?
                </CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
