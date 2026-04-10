import {
  Image,
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { colors } from '../../Theme/colors';
import { scale } from '../../Utils/scaling';

interface IconButtonProps {
  icon: ImageSourcePropType;
  name: string;
}

const IconButton = ({ icon, name }: IconButtonProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
export default IconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  name: {
    width: scale(56),
    marginTop: scale(4),
    fontSize: 12,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
