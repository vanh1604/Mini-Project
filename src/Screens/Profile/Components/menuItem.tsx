import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { styles } from './styles';

interface MenuItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
  hideBottomBorder?: boolean;
}

export const MenuItem = ({
  icon,
  title,
  onPress,
  hideBottomBorder,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon as any} />
      </View>
      <View
        style={[
          styles.contentContainer,
          !hideBottomBorder && styles.contentContainerBorder,
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.trailingContainer}>
          <Image
            source={require('../../../Assets/Icons/Vector.png')}
            style={styles.chevron as any}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
