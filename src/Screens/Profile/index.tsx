import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ProfileStackParamList } from '../../Navigation/profileNavigator';
import { RootStackParamList } from '../../Navigation/appNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { styles } from './styles';
import { MenuItem } from './Components/menuItem';
import { LogoutBottomSheet } from './Components/LogoutBottomSheet';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../Navigation/bottomNav';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const logoutBottomSheetRef = useRef<BottomSheetModal>(null);

  const handleLogoutPress = useCallback(() => {
    logoutBottomSheetRef.current?.present();
  }, []);

  const handleConfirmLogout = useCallback(() => {
    logoutBottomSheetRef.current?.dismiss();
    (navigation as any).reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  }, [navigation]);

  const handleCancelLogout = useCallback(() => {
    logoutBottomSheetRef.current?.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <Image
            source={require('../../Assets/Images/unionProfile.png')}
            style={styles.headerBackground as any}
          />
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../Assets/Icons/avatar.png')}
              style={styles.avatar as any}
              defaultSource={require('../../Assets/Images/Group.png')}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nguyễn Thị Khánh Dương</Text>
            <Text style={styles.employeeId}>Mã nhân viên: VNPOST123</Text>
          </View>
        </View>

        {/* Heading */}
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Thông tin cá nhân</Text>
        </View>

        {/* Personal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cá nhân</Text>
          <View style={styles.card}>
            <MenuItem
              icon={require('../../Assets/Icons/user.png')}
              title="Thông tin cá nhân"
              onPress={() => navigation.navigate('ProfileDetails')}
            />
            <MenuItem
              icon={require('../../Assets/Icons/lock.png')}
              title="Thay đổi mật khẩu"
              onPress={() => navigation.navigate('ChangePassword')}
            />
            <MenuItem
              icon={require('../../Assets/Icons/user-edit.png')}
              title="Thay đổi thông tin cá nhân"
              onPress={() => navigation.navigate('EditProfile')}
              hideBottomBorder
            />
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>
          <View style={styles.card}>
            <MenuItem
              icon={require('../../Assets/Icons/gallery-edit.png')}
              title="Thay đổi hình nền"
              onPress={() => navigation.navigate('ChangeBackground')}
              hideBottomBorder
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <LogoutBottomSheet
        ref={logoutBottomSheetRef}
        onLogout={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </View>
  );
}
