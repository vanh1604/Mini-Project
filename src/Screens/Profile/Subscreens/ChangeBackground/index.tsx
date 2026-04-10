import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const ChangeBackgroundScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thay đổi hình nền</Text>
      <Text>Toi da o day commit 1</Text>
    </View>
  );
};
