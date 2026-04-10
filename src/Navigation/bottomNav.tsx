import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import NotificationScreen from '../Screens/Notification';
import ProfileNavigator from './profileNavigator';
import { Image, View } from 'react-native';
import { colors } from '../Theme/colors';
import { styles } from './styles';
export type MainTabParamList = {
  Home: undefined;
  News: undefined;
  Utility: undefined;
  Profile: undefined;
  Notification: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

// Temporary mock screens
const NewsScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;
const UtilityScreen = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }} />
);

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDark,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={require('../Assets/Icons/home-2.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={require('../Assets/Icons/messages-2.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Utility"
        component={UtilityScreen}
        options={{
          title: 'Ứng dụng',
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={require('../Assets/Icons/element-3.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'Thông báo',
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={require('../Assets/Icons/notification-bing.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={require('../Assets/Icons/user-square.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
