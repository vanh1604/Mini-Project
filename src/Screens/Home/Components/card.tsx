import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { scale } from '../../../Utils/scaling';
import { colors } from '../../../Theme/colors';
interface CardProps {
  title: string;
  image: ImageSourcePropType;
  category: string;
}

const Card = ({ title, image, category }: CardProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: scale(260),
    marginRight: scale(16),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: scale(8),
    overflow: 'hidden',
    paddingBottom: scale(12),
  },
  image: {
    width: '100%',
    height: scale(140),
    marginBottom: scale(12),
  },
  category: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: scale(4),
    marginHorizontal: scale(12),
  },
  title: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: 20,
    marginHorizontal: scale(12),
  },
});
