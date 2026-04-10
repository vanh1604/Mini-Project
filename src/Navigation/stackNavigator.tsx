import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalkthroughScreen from '../Screens/Walkthrough';
import LoginScreen from '../Screens/Login';

export type AuthStackParamList = {
  Walkthrough: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Walkthrough"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
