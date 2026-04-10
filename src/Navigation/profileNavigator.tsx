import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/Profile';
import {
  ProfileDetailsScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  ChangeBackgroundScreen,
} from '../Screens/Profile/Subscreens';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileDetails: undefined;
  ChangePassword: undefined;
  EditProfile: undefined;
  ChangeBackground: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangeBackground" component={ChangeBackgroundScreen} />
    </Stack.Navigator>
  );
}
